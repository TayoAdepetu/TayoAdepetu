# LaunchWithCursor Setup Skill

<!-- launchwithcursor-setup-version: 0.2.11 -->

> **You are an AI coding assistant (e.g. Cursor). The human asked you to "read this file and do what it says."**
> Follow the steps below in order, top to bottom. Do the work for the user — run the commands, create the files, and explain what you did in plain language. The user is a non-engineer shipping an MVP, so keep your explanations short and friendly, and never ask them to memorize commands.

This file makes a project ready for two things:

1. **LaunchWithCursor VS Code extension** — so the user can see their database schema (from code), API endpoints, and functions on the LaunchWithCursor dashboard.
2. **LaunchWithCursor PaaS deploy** — so that clicking **Deploy** on the dashboard "just works" for JavaScript MVP stacks (React, Next.js, NestJS) in a single site, monolith, or monorepo.

The end result is a committed `launchwithcursor.deploy.json` file (the "deploy manifest"). Legacy repos may use `codeknowledge.deploy.json` — the platform reads both.

> **Safe to re-run anytime** — installs, upgrades, re-scans, and refreshes deploy config without breaking an existing setup.

> **Adapt to this repo.** Rules below describe how the PaaS behaves and what to check. Do not copy example commands blindly — inspect the project's layout, ORM, and scripts, then choose commands that match **this** codebase.

---

## Constants (do not change)

| Name | Value |
| --- | --- |
| Extension ID | `codeknowledge.codeknowledge` |
| Extension download URL | `https://api.launchwithcursor.com/v1/extension/download` |
| Extension version info URL | `https://api.launchwithcursor.com/v1/extension/latest` |
| Dashboard URL | `https://launchwithcursor.com` |

---

## Step 1 — Install or upgrade the LaunchWithCursor extension

The extension is distributed as a downloadable `.vsix` (it is **not** on the VS Code Marketplace). Always compare your installed version to the latest before deciding whether to install or upgrade.

1. Fetch the latest published version:

   ```bash
   curl -fsSL https://api.launchwithcursor.com/v1/extension/latest
   ```

   Note the `version` field in the JSON response (call this **latestVersion**).

2. Check whether the extension is installed and read its version:

   ```bash
   code --list-extensions --show-versions | grep -i codeknowledge || cursor --list-extensions --show-versions | grep -i codeknowledge
   ```

   - If `codeknowledge.codeknowledge` is **not** listed → proceed to install (step 3).
   - If it **is** listed, compare its version to **latestVersion** using semver (major.minor.patch).
     - If installed version **equals or exceeds** latestVersion → tell the user the extension is already up to date and skip to **Step 2**.
     - If installed version is **older** than latestVersion → proceed to upgrade (step 3).

3. Download the latest package and install or upgrade it. Use whichever editor command exists (`cursor` or `code` — both accept the same flags):

   ```bash
   curl -fsSL -o /tmp/codeknowledge.vsix https://api.launchwithcursor.com/v1/extension/download
   cursor --install-extension /tmp/codeknowledge.vsix || code --install-extension /tmp/codeknowledge.vsix
   ```

   - On Windows, download to `%TEMP%\codeknowledge.vsix` and install from there.
   - If the CLI command is missing, tell the user to install it once: open the editor → Command Palette (`Cmd/Ctrl+Shift+P`) → **Shell Command: Install 'code' command in PATH** (or the Cursor equivalent). As a fallback, they can install the downloaded `.vsix` via Extensions sidebar → `⋯` → **Install from VSIX…**.

4. After any fresh install **or** upgrade, ask the user to reload the editor window (Command Palette → **Developer: Reload Window**) so the new version activates.

---

## Step 2 — Start the extension and sign in

1. Make sure the project is the **first/only folder** open in the editor (the extension uses the first workspace folder).
2. If `.launchwithcursor/project.json` already exists at the project root, the user is already signed in — confirm the folder is present, then skip to **Step 3**.
3. Otherwise, tell the user to run **LaunchWithCursor: Sign In** from the Command Palette. This opens their browser to approve the connection — they must click **Approve** there (this one click cannot be automated). They need to already be signed in to the dashboard at `https://launchwithcursor.com` (GitHub login).
4. After approval, the extension scans automatically and installs the starter pack under `.launchwithcursor/pack/`. Confirm success by checking that `.launchwithcursor/project.json` exists.
5. Ensure `.gitignore` ignores only the extension cache (not the whole kit):

   ```gitignore
   # LaunchWithCursor extension cache (do not commit)
   .launchwithcursor/cache/
   .codeknowledge/
   ```

   > Note: `.launchwithcursor/pack/`, root `AGENTS.md`, and `launchwithcursor.deploy.json` **should** be committed.

---

## Step 2.5 — Starter pack (bundled in extension)

The extension installs or updates `.launchwithcursor/pack/LAUNCHWITHCURSOR/` (SETUP.md, SKILLS, METHOD) when you open a project or after an extension update + reload. **No manual download.**

If files are missing, run **LaunchWithCursor: Reinstall Starter Pack** from the Command Palette.

Root **`AGENTS.md`** should point to the pack (the extension creates it if missing):

   ```markdown
   Follow [.launchwithcursor/pack/LAUNCHWITHCURSOR/AGENTS.md](.launchwithcursor/pack/LAUNCHWITHCURSOR/AGENTS.md) for all MVP development.
   ```

**Do not overwrite** `MVP-SPEC.md` or `docs/plans/` when refreshing the pack.

**Done when:** `.launchwithcursor/pack/LAUNCHWITHCURSOR/SKILLS/FRONTEND.md` exists and root `AGENTS.md` points to the pack.

---

## Step 3 — Detect the project shape

Inspect the repository and classify it into exactly one of these shapes. This determines how many services go into the deploy manifest.

```text
Is there a workspace config (pnpm-workspace.yaml, or "workspaces" in root package.json),
or multiple app folders under apps/ , packages/ , or services/ , each with its own
package.json / composer.json / requirements.txt ?
│
├── YES ──> MONOREPO   (one service per deployable app, e.g. apps/web + apps/api + apps/admin)
│
└── NO
     │
     Does the app have a backend and/or a database baked into one codebase
     (e.g. a Next.js app using API routes + Prisma, or a Laravel app)?
     │
     ├── YES ──> MONOLITH  (usually ONE service; database is provisioned separately on the PaaS)
     │
     └── NO  ──> STATIC    (a single front-end site with no server and no database)
```

Notes:

- **STATIC** = e.g. a Vite/CRA React site or a static Next.js export. One website service, no database.
- **MONOLITH** = one app that serves both pages and API and talks to a database (Next.js full-stack, or Laravel). One service. The database is added later in the dashboard, not inside the manifest.
- **MONOREPO** = multiple deployable apps in one repo. One manifest entry per app you want hosted (skip shared `packages/*` libraries that aren't run on their own).

---

## Step 4 — Make each app deploy-ready (per-stack rules)

The PaaS builds each service as a container behind a router. **Next.js** and **NestJS** use automatic **slim Docker** images (~150–500 MB). Other stacks (Express, Laravel, Vite, Python, etc.) use **Nixpacks** with filtered monorepo installs. Founders do **not** choose a build strategy — the platform picks from each service's `framework` in the manifest. Two rules matter for every stack:

- **Listen on the port from the `PORT` environment variable**, defaulting to `3000`. The platform sets `PORT` from each service's **internalPort** and routes Traefik to that port. Hard-coded ports or legacy `WEB_PORT` / `API_PORT` vars will not receive traffic on PaaS.
- **Provide a real build and start command** (or rely on the framework's standard `build`/`start` scripts).

### Legacy PM2 / multi-port local dev

If the repo uses `API_PORT`, `WEB_PORT`, or `ADMIN_PORT` for **local dev** or an old **PM2** setup (unique ports on one VPS), that model does not carry over to PaaS:

| Legacy (PM2 on one VPS) | PaaS (one container per service) |
|-------------------------|----------------------------------|
| api on 3006, web on 3004 | each service `internalPort: 3000` |
| Traefik → `host.docker.internal:3004` | Traefik → container by **hostname** |
| set `WEB_PORT` in `.env` | platform sets `PORT` automatically |

**Do not** add `API_PORT` / `WEB_PORT` to the dashboard. Set **`internalPort: 3000`** on every service in the manifest. Ensure production start commands use `PORT` (Next.js `next start`, Nest `process.env.PORT`, etc.). Keep `*_PORT` in `.env.example` only for local dev, with a comment that PaaS ignores them.

Apply the matching rules below. Make the minimal edits needed; tell the user what you changed.

### pnpm — allow install scripts (Prisma, sharp, native modules)

If the repo uses **pnpm** (`pnpm-lock.yaml` at the root), pnpm 10+ **blocks dependency install scripts** unless you allowlist them. LaunchWithCursor runs `pnpm install` inside Docker; blocked scripts can make the build look successful while the app **fails at runtime** (missing Prisma query engine, broken `sharp` images, `argon2` errors, etc.).

**When to configure:** the project depends on any of `prisma`, `@prisma/client`, `sharp`, `argon2`, `bcrypt`, `esbuild`, or other packages with native binaries.

**Fix — add to the repo root `package.json` and commit** (only list packages this repo actually uses):

```json
{
  "pnpm": {
    "onlyBuiltDependencies": [
      "@prisma/client",
      "@prisma/engines",
      "prisma"
    ]
  }
}
```

Locally you can run `pnpm approve-builds`, review the prompt, and commit the resulting `package.json`.

**Deploy log warning (fix if you see this):**

```text
Ignored build scripts: @prisma/client, prisma, sharp, argon2, ...
Run "pnpm approve-builds" to pick which dependencies should be allowed
```

**Related:** run `prisma generate` in the **API service build script** (not root `postinstall` when you also host Next.js frontends — see [Prisma generate placement](#prisma-generate--api-only-not-root-postinstall-in-monorepos) below). Use `"prepare": "husky || true"` (or skip husky in CI) so Docker install does not fail when `.git` is missing. Warnings like `husky: .git can't be found` or `@prisma/client postinstall: We could not find your Prisma schema` during **web/admin install** are normal in monorepos — ignore them if the API build generates the client.

### Monorepo — workspace packages (`packages/*`) — required for every project

Shared libraries under `packages/*` are common in monorepos (`@myorg/shared`, `@myorg/types`, `@myorg/ui`). **Every hosted service that imports a workspace package must follow these rules** — api, web, and admin alike.

#### Why this matters on LaunchWithCursor

The platform runs **`cd '<rootDir>' && pnpm run build`** per service. It does **not** run root `turbo run build` unless your service `build` script does.

| Service | Build command (typical) | Runtime |
| --- | --- | --- |
| **api** | `nest build` → `node dist/main.js` | Plain Node — resolves `packages/*` via each package's `main` / `exports` |
| **web / admin** | `next build` → standalone server | Webpack bundles at build time — still needs `dist/` to **exist** when `exports` point there |

**Do not fix only the API.** If you point `packages/shared` at `dist/` (required for NestJS), **web and admin that import `@myorg/shared` must compile it before `next build`** or Docker fails with `Can't resolve '@myorg/shared'`.

`transpilePackages` in `next.config` does **not** replace pre-building workspace libs when those libs export from `./dist/` — there is no `dist/` on a fresh clone until each package's `build` script runs.

#### Symptom A — web/admin/api build fails in Docker

```text
Module not found: Can't resolve '@myorg/shared'
```

`dist/` is gitignored and was never built before `next build` / `nest build`.

#### Symptom B — api build passes, api crash-loops in production (web/admin may still load)

Deploy log shows **`Deploy complete`** for api, dashboard says **running**, web/admin load, but API returns **404** or browser shows **CORS** errors. On the VPS, `docker ps` shows **`Restarting (1)`** and logs contain:

```text
file:///app/packages/shared/src/index.ts:1
SyntaxError: Unexpected identifier 'ClassValue'
```

**Cause:** NestJS compiled to `dist/`, but `require('@myorg/shared')` still resolves to **`packages/*/src/*.ts`**. Node cannot execute TypeScript.

#### Agent checklist — when creating or importing `packages/*`

Apply **all steps in one pass** for every monorepo you scaffold — do not ship api-only fixes.

1. **`package.json` exports compiled output only** — never point `main`, `types`, or `exports` at `./src/`:

```json
{
  "name": "@myorg/shared",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc -p tsconfig.json"
  }
}
```

2. **Every hosted app that imports workspace packages** — add `pnpm --filter …^... run build` **before** the framework build:

**API** (`apps/api/package.json`):

```json
"build": "prisma generate && pnpm --filter @myorg/api^... run build && nest build"
```

**Web** (`apps/web/package.json`):

```json
"build": "pnpm --filter @myorg/web^... run build && next build"
```

**Admin** (`apps/admin/package.json`) — same pattern if it imports `@myorg/*`:

```json
"build": "pnpm --filter @myorg/admin^... run build && next build"
```

Use real package names from the repo. `^...` = all workspace dependencies of that app.

- If a package is **only** consumed via Next `transpilePackages` **and** you intentionally keep a separate dev-only export map, document that exception — default is still **build deps first + export `dist/`** for all shared libs used by the API.
- Exclude packages that fail `tsc` in Docker (e.g. UI libs with React Native entrypoints) with an extra `--filter "!@myorg/ui"` when needed.

3. **Verify locally before every deploy** (simulates a fresh Docker clone — run **all** hosted apps):

```bash
rm -rf packages/*/dist apps/api/dist apps/web/.next apps/admin/.next

cd apps/api && pnpm run build && node dist/src/main.js
# Ctrl+C after Nest starts — must not SyntaxError or Cannot find module

cd ../web && pnpm run build
cd ../admin && pnpm run build   # skip if not hosted
```

If any step fails locally, production will fail the same way.

4. **Do not rely on TypeScript path aliases alone** — `tsconfig` paths are compile-time; NestJS does not bundle workspace deps unless you add a bundler. Runtime resolution uses each package's `exports` / `main`.

5. **Phase 1 scaffolding rule for agents:** when you add `packages/shared` (or any `packages/*` imported by api **and** web/admin), update **api + web + admin `build` scripts in the same commit** — never merge api-only workspace fixes.

### Prisma generate — API only, not root `postinstall` in monorepos

**Do not** add `"postinstall": "prisma generate"` to the **repository root** when:

- Prisma schema lives at repo root (`prisma/schema.prisma`), **and**
- You host **Next.js** apps with the platform's **standalone Docker** builder.

That builder runs `pnpm install` with a **slim context** (`apps/` + `packages/` only). There is **no `prisma/` folder** during web/admin install, so root `postinstall` **fails the deploy**.

**Instead:** run `prisma generate` in the **API service build script** (with `--schema=…` if the schema is not under the API's `rootDir`).

**Prisma query engine on Linux containers** — add `binaryTargets` to `schema.prisma` so production can load the engine inside slim Docker / Nixpacks images:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

Use `native` for local dev; `debian-openssl-3.0.x` for hosted Linux containers. Missing target → **Query engine not found** at runtime.

**API slim Docker (pnpm monorepos)** — after the Nest build, the platform runs **`pnpm deploy --filter '<api-package-name>' --prod`** (single package — no `...` suffix) to bundle the API and its workspace dependencies into a prod-only runtime image (~200–500 MB). It does **not** run root `pnpm prune` (that breaks when web/admin Next apps share the same lockfile). Founders do **not** add a Dockerfile or `inject-workspace-packages`. On **pnpm 10+**, the platform may pass `--legacy` for deploy; **pnpm 9** omits it.

**Next.js standalone** uses a slim install context (`apps/` + `packages/` only) — root `postinstall: prisma generate` still breaks web/admin builds when schema is at repo root.

Full monorepo API checklist: [NestJS monorepo — slim Docker + pnpm deploy](#nestjs-monorepo--slim-docker--pnpm-deploy).

### Next.js monorepo — sync `rootDir` per service

Each Next app needs `rootDir` in the manifest (e.g. `apps/web`, not `.`) **and** the same value on the dashboard after **Sync from repo**.

**Symptom:** Deploy fails before Docker build: `No next.config found at repo root` while another Next app deploys fine.

**Cause:** The failing service was created before the manifest existed, or **Sync from repo** was not run — its hosted record still uses repo root (`.`).

**Fix:** Dashboard → **Deploy → Sync from repo** → confirm **Services** shows `apps/web` (not `.`) → redeploy.

### Database, migrations, and seeds (decide per project)

The dashboard has two different “database” concepts — do not confuse them:

| Dashboard area | What it is |
| --- | --- |
| **Project → Database** (main nav) | Schema diagram from **ingested code** (extension scan). Not the live hosted DB. |
| **Deploy → Database → Manage data** | **Live Postgres/MySQL** provisioned for the hosted app. Tables appear here only after migrations run successfully against that DB. |

**`needsDatabase: true` in the manifest is intent only.** It does not provision a database. The user must click **Provision** under **Deploy → Database** in the dashboard. Until then, `DATABASE_URL` is not injected and migrate commands will fail.

**The manifest is not applied automatically on every deploy.** After changing `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`), the user must use **Deploy → Sync from repo** so hosted services pick up new `migrateCommand` / `seedCommand` values, then redeploy the service that owns migrations (usually `api`).

#### Agent checklist — before writing `migrateCommand` / `seedCommand`

Inspect the repo and answer these yourself (paths differ per project):

1. **Which service owns the database?** Usually the API/backend service, not front-end apps. Only that service should have non-null migrate/seed commands and `needsDatabase: true` (unless a monolith combines both).
2. **Where is the schema?** Examples: `prisma/schema.prisma`, `apps/api/prisma/schema.prisma`, Laravel's `database/migrations/`. Note the directory relative to repo root and relative to the service's `rootDir`.
3. **Are migration files committed?** Prisma needs a `prisma/migrations/` folder with SQL (from `prisma migrate dev` / `prisma migrate diff`), not just `schema.prisma`. Laravel needs `database/migrations/`. If only a schema exists, create and commit migrations before expecting tables on the PaaS.
4. **How does the team run migrations locally?** Check `package.json` scripts, `composer.json`, Makefile, or docs. Prefer the same tool the project already uses (`prisma migrate deploy`, `php artisan migrate --force`, `django migrate`, etc.).
5. **Where must the command run?** One-off **migrate** and **seed** containers use **WORKDIR `/app`**. How `/app` is laid out depends on the build:

| Stack | Runtime layout in `/app` | Typical `migrateCommand` when Prisma is under `apps/api/prisma/` |
| --- | --- | --- |
| **NestJS monorepo (slim Docker + pnpm deploy)** | Flattened API package: `./dist/`, `./prisma/`, `./node_modules/` | `npx prisma migrate deploy` (no `cd apps/api`) |
| **NestJS monolith** (`rootDir: "."`) | Same as repo root | `npx prisma migrate deploy` |
| **Nixpacks / other** | Often full monorepo tree at `/app` | `cd apps/api && npx prisma migrate deploy` or `--schema apps/api/prisma/schema.prisma` |

For **build** and **start**, monorepo Nest/Next slim Docker still runs `cd '<rootDir>' && …` during the **build** stage only. **Migrate and seed do not** get an automatic `cd` — encode the path that matches the **running** container layout (table above).

```text
For migrateCommand / seedCommand, pick the approach that matches the running container:

├── NestJS monorepo + pnpm (framework: "nestjs", rootDir: apps/api)
│   └── Slim deploy flattens to /app — use plain:
│       npx prisma migrate deploy
│       npx prisma db seed
│       (schema at apps/api/prisma/ in Git → prisma/ in the container)

├── Schema/migrations live at repo root (rootDir is ".")
│   └── Often plain: npx prisma migrate deploy
│       (verify with local dry-run from repo root)

├── Schema/migrations live under rootDir on Nixpacks / non-deploy layouts
│   ├── Option A: cd into rootDir first
│   │   └── e.g. cd apps/api && npx prisma migrate deploy
│   ├── Option B: explicit --schema flag
│   │   └── e.g. npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
│   └── Option C: package-manager filter from root
│       └── e.g. pnpm --filter @myorg/api exec prisma migrate deploy

└── Non-Node stack (Laravel, Django, etc.)
    └── Run from the app root (same rootDir rules apply)
        e.g. cd apps/api && php artisan migrate --force
```

**Do not assume** one migrate string works for every monorepo — Nest slim **deploy** layout differs from Nixpacks full-tree layout.

6. **Seeds must be idempotent.** `seedCommand` runs on **every** deploy after migrate. Use upsert / find-or-create patterns, not blind inserts.
7. **Production seeds must run as JavaScript** when the API uses Nest slim + `pnpm deploy --prod` — see [Production seeds](#production-seeds-nest-slim--pnpm-deploy) below. Do **not** leave `prisma.seed` pointing at `ts-node` or `tsx`.
8. **Provision order for first deploy:** (a) commit manifest + migrations, (b) enable hosting / sync services, (c) **provision database** on dashboard, (d) deploy the service with migrateCommand, (e) check **Deploy → Database → Manage data** for tables.

#### Production seeds (Nest slim / pnpm deploy)

`seedCommand: "npx prisma db seed"` runs whatever is configured in **`package.json` → `prisma.seed`** (usually in `apps/api/package.json`). The Nest slim runtime image is built with **`pnpm deploy --prod`**, which ships **production dependencies only** — not `ts-node`, `tsx`, or other dev-only runners.

| Symptom | Cause |
| --- | --- |
| Migrate succeeds; seed fails with `spawn ts-node ENOENT` or `tsx ENOENT` | `prisma.seed` uses TypeScript tooling that is not in the prod bundle |
| Seed fails after Docker build with Prisma 7 validation errors on `url = env("DATABASE_URL")` | Bare `npx prisma` pulled latest CLI; pin `prisma` to match `@prisma/client` |

**Required for hosted deploy:**

1. **Compile the seed to JavaScript** in the API `build` script (e.g. emit `dist/prisma/seed.js` via `tsc`, or include `prisma/seed.ts` in Nest's compile output).
2. Point **`prisma.seed`** at Node — not TypeScript runners:

```json
"prisma": {
  "seed": "node dist/prisma/seed.js"
}
```

3. Keep manifest `seedCommand` as `npx prisma db seed`, or set `seedCommand` to `node dist/prisma/seed.js` directly.
4. **Pin Prisma versions** in `apps/api/package.json` — use exact matching versions for `prisma` and `@prisma/client` (e.g. `"6.19.3"`), not wide ranges like `"^6.1.0"` that leave the hosted CLI on an older patch than the lockfile-resolved client.

Local dev may still use `tsx prisma/seed.ts` in a separate `db:seed` script — only **`prisma.seed`** (used by `npx prisma db seed` in production) must run plain Node.

**Verify locally** (from repo root, replace `@myorg/api` with your API package name):

```bash
cd apps/api && pnpm run build
cd ../.. && CI=true pnpm --filter '@myorg/api' --prod deploy /tmp/api-deploy
cd /tmp/api-deploy && npx prisma db seed
```

The last command must succeed **without** `ts-node` or `tsx` installed globally or in the deploy folder.

#### What to look for in deploy logs (api / DB-owning service)

After `Running migrate: …` you should see tool output (Prisma: “schema loaded”, “Applying migration …”; Laravel: migration names). If deploy reaches **Deploy complete** but **Manage data** shows “No tables yet”, common causes:

- Migrate/seed ran from the wrong directory (no schema found, or wrong migrations path) — fix `migrateCommand` / `seedCommand` working directory.
- Hosted service record still has empty migrate command — run **Sync from repo**.
- No migration files in Git on the deployed branch.
- Database was provisioned after a deploy that skipped migrate — redeploy api after provisioning.

Build logs may show `We could not find your Prisma schema in the default locations` during **filtered** `pnpm install` — that is normal in monorepos. The **build** phase should still load the schema from under `rootDir` (e.g. `cd 'apps/api' && pnpm run build` → `Prisma schema loaded from prisma/schema.prisma`). For Nest monorepos, migrate/seed run against the **deployed** layout (`./prisma` at `/app`), not `apps/api/prisma`.

Successful Nest monorepo slim builds show `pnpm --filter '@your/api' --prod deploy '/prod/deploy'` after `webpack compiled successfully` — not `pnpm prune --prod` at repo root.

### Redis, queues, and job workers (decide per project)

**`needsRedis: true` in the manifest is intent only.** It does not provision Redis. The user must click **Provision** under **Deploy → Redis**. Until then, `REDIS_URL` is not injected and queue-backed features will fail at runtime.

After provision, the platform injects two managed env vars (do **not** put them in `.env.example`):

| Var | Purpose |
| --- | --- |
| `REDIS_URL` | Connection string for the shared Redis instance (per-app ACL user). |
| `REDIS_KEY_PREFIX` | Namespace for this app, e.g. `ck:my-app-a1b2:` — **all Redis keys your app writes must start with this prefix** or ACL will deny the command. |

**Deploy → Redis → Queue activity** scans keys under `REDIS_KEY_PREFIX` and shows BullMQ / Sidekiq queue counts, recent jobs, and warnings (paused queue, jobs waiting with no active worker, failures). Use **Refresh** to update without reloading the page. If no queues appear, workers are probably not using the correct key prefix.

#### When you need Redis

- Job queues (BullMQ, Sidekiq, Celery with Redis broker, etc.)
- Caching or rate limiting backed by Redis
- Session storage in Redis

**STATIC** front-end-only sites usually set `needsRedis: false` and skip provision.

#### Agent checklist — queue-backed apps

1. **Which service runs workers?** Often the same `api` service that enqueues jobs. The worker process must be running in production (same container as the API, or a dedicated worker service you add to the manifest).
2. **Scope all keys to `REDIS_KEY_PREFIX`.** Never assume you own the whole Redis instance — other hosted apps share the same server with isolated ACLs.
3. **Do not point `REDIS_URL` at `localhost` in production.** Use the managed value from provision; `localhost` inside a container is not the platform Redis.
4. **Configure your queue library to use the prefix.** Examples:

**BullMQ (Node / NestJS):**

```ts
const prefix = `${process.env.REDIS_KEY_PREFIX}bull`;

new Queue('emails', {
  connection: { url: process.env.REDIS_URL!, maxRetriesPerRequest: null },
  prefix,
});

new Worker(
  'emails',
  async (job) => { /* … */ },
  { connection: { url: process.env.REDIS_URL!, maxRetriesPerRequest: null }, prefix },
);
```

**Sidekiq (Ruby):** set `REDIS_URL` and namespace / key prefix so queue lists live under `#{ENV['REDIS_KEY_PREFIX']}queue:<name>` (e.g. `ck:my-app-a1b2:queue:default`).

5. **Provision order:** (a) commit manifest with `needsRedis: true` on the queue-owning service, (b) enable hosting / sync services, (c) **provision Redis** on dashboard, (d) deploy the service that enqueues and processes jobs, (e) open **Deploy → Redis** to confirm queues appear when workers run.

#### What to look for on Deploy → Redis

- **Waiting jobs, none active** — worker process likely offline or not connected with the same `REDIS_URL` / prefix.
- **Queue paused** — resume from your app or Redis CLI; new jobs will not run until unpaused.
- **Failed jobs** — inspect failure reason in the table; fix the job handler and retry from your worker tooling.
- **No queues detected** — app may only use Redis for cache/sessions (no queue keys), or prefix is misconfigured.

### Platform email (transactional)

Use when the app sends magic links, receipts, or other transactional email — not marketing blasts.

#### Manifest

Set `needsEmail: true` on services that call the platform Email API (usually the API service).

#### Provision on dashboard

1. **Deploy → Email → Enable Email**
2. Add a **sender domain** (e.g. `yourdomain.com`)
3. Choose **one-click Cloudflare DNS** if the zone is on your Cloudflare account, or **manual** + **AI setup guide** for external DNS
4. Click **Check verification** until status is `verified`
5. **Redeploy** the API so managed env vars refresh

#### Managed env vars (do not list in `.env.example`)

| Var | Purpose |
| --- | --- |
| `EMAIL_API_URL` | Platform send endpoint (`POST` JSON) |
| `EMAIL_API_KEY` | Bearer token for your hosted app |
| `EMAIL_FROM_DOMAIN` | Verified sender domain (after DNS verification) |

#### Agent checklist — email in app code

1. Read `EMAIL_API_URL`, `EMAIL_API_KEY`, and `EMAIL_FROM_DOMAIN` from env — never hard-code.
2. Send only from addresses on `EMAIL_FROM_DOMAIN` (e.g. `hello@${process.env.EMAIL_FROM_DOMAIN}`).
3. Use `fetch` or your HTTP client; example:

```ts
await fetch(process.env.EMAIL_API_URL!, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
  },
  body: JSON.stringify({
    from: `hello@${process.env.EMAIL_FROM_DOMAIN}`,
    to: user.email,
    subject: 'Welcome',
    html: '<p>Thanks for signing up</p>',
  }),
});
```

4. Handle rate limits gracefully (429 / forbidden responses).
5. For external DNS, generate the **AI setup guide** on Deploy → Email and give it to the founder's assistant to finish TXT/CNAME records.

### React SPA (Vite or Create React App)

- Ensure `package.json` has a `build` script.
- Static sites need a start command that serves the built files on `PORT`. If there is no production server:
  - Vite: build outputs to `dist/` → start with `npx serve -s dist -l ${PORT:-3000}`.
  - CRA: build outputs to `build/` → start with `npx serve -s build -l ${PORT:-3000}`.
- `internalPort`: `3000`, `kind`: `website`.
- **PWA:** only when **MVP-SPEC.md** calls for PWA — follow `LAUNCHWITHCURSOR/SKILLS/PWA.md` Rule 7 (`vite-plugin-pwa`).

### Next.js

- Ensure `package.json` has `build` (`next build`) and `start` (`next start -p ${PORT:-3000}` or just `next start`, which already honors `PORT`).
- **In `launchwithcursor.deploy.json`**, set `buildCommand` and `startCommand` to `null` (recommended) or use package-manager wrappers (`npm run build`, `pnpm run build`). Do **not** copy raw `next build` / `next start` into the manifest — the platform runs those commands inside Docker without your local shell `PATH`.
- Requires Node 20+. If `package.json` has no `engines.node`, add `"engines": { "node": ">=20" }` (or add a `.nvmrc` containing `20`).
- **Enable standalone output** in `next.config.js` / `next.config.ts` — the platform builds Next.js with a slim standalone image by default. If `output: 'standalone'` is not in the **committed** config on the branch you deploy, the build injects it automatically by wrapping your next.config (you will see this in deploy logs). Still add it to source control for clarity and monorepo tracing settings.

- **Monorepo apps** (`rootDir` like `apps/web`): also set `outputFileTracingRoot` so standalone bundles include shared workspace packages. See prior examples in repo docs or infer `../` depth from `rootDir`.

- **Database (monolith at repo root):** if Prisma (or similar) lives next to this Next app, set `migrateCommand` / `seedCommand` using the [database checklist](#agent-checklist--before-writing-migratecommand--seedcommand) above. Mark `needsDatabase: true`. Front-end-only Next apps in a monorepo usually keep migrate/seed `null` and `needsDatabase: false`.

- `internalPort`: `3000`. `kind`: `website` (use `api` only if it has API routes but no pages).

- **PWA:** only when **MVP-SPEC.md** calls for an installable web app — implement per `LAUNCHWITHCURSOR/SKILLS/PWA.md` (web app manifest, icons under `public/icons/`, theme color, optional service worker). No extra platform config needed.

### NestJS (and other Node APIs)

- The platform builds NestJS (`framework: "nestjs"`) with **slim Docker automatically** (~200–500 MB). Deploy logs show `docker build (NestJS slim)`. No Dockerfile in the repo.
- Ensure `build` and a production start script in **`package.json`** (e.g. `nest build`, `node dist/main.js`).
- In the manifest, prefer `buildCommand: null` or `pnpm run build` / `npm run build` — not bare `nest build`.
- Make `main.ts` listen on `process.env.PORT ?? 3000`.
- **Monorepo (pnpm):** see [NestJS monorepo — slim Docker + pnpm deploy](#nestjs-monorepo--slim-docker--pnpm-deploy) — package `name`, workspace build order, migrate/start commands.
- **Database:** apply the [database checklist](#agent-checklist--before-writing-migratecommand--seedcommand). Nest monorepos use **plain** `npx prisma migrate deploy` (no `cd apps/api`) because the runtime image is flattened.
- **Redis / queues:** if the API uses BullMQ or similar, set `needsRedis: true` and configure workers with `REDIS_URL` + `REDIS_KEY_PREFIX` per the [Redis checklist](#redis-queues-and-job-workers-decide-per-project).
- `internalPort`: match what the app uses (often `3000`). `kind`: `api`.

### NestJS monorepo — slim Docker + pnpm deploy

When `framework: "nestjs"` and the repo is a **pnpm monorepo**, the platform:

1. **Installs** only the API subgraph (`pnpm install --filter '@yourscope/api...'`).
2. **Builds** with `cd '<rootDir>' && pnpm run build` (your manifest `buildCommand` or auto-detect).
3. **Deploys** a prod bundle with `pnpm --filter '@yourscope/api' --prod deploy` into the runtime image (install still uses `@yourscope/api...`).

Founders **do not** add Dockerfiles, `inject-workspace-packages`, or a build-strategy toggle. You **do** need:

| Requirement | Why |
| --- | --- |
| **`name` in `apps/api/package.json`** (e.g. `"@myorg/api"`) | Platform filter for install + deploy |
| **Workspace deps built in API `build` script** | `pnpm --filter @myorg/api^... run build && nest build` — deploy copies compiled `packages/*/dist/` |
| **`startCommand`: `node dist/main.js`** (or `node dist/src/main.js`) | Runtime `/app` is the deployed API root — **no** `cd apps/api` in start |
| **`migrateCommand` / `seedCommand` without `cd`** | e.g. `npx prisma migrate deploy` — schema is at `./prisma` in the container |
| **`prisma.seed` runs compiled JS** | Prod deploy excludes devDeps — use `"seed": "node dist/prisma/seed.js"`, not `ts-node` / `tsx` (see [Production seeds](#production-seeds-nest-slim--pnpm-deploy)) |
| **`prisma` and `@prisma/client` pinned to same version** | Avoid CLI/client mismatch warnings during `prisma generate` in Docker |
| **`binaryTargets`** in `schema.prisma` | See [Prisma generate](#prisma-generate--api-only-not-root-postinstall-in-monorepos) |
| **`pnpm.onlyBuiltDependencies`** when using Prisma, argon2, sharp, etc. | See [pnpm allow install scripts](#pnpm--allow-install-scripts-prisma-sharp-native-modules) |
| **Committed `pnpm-lock.yaml`** | Install uses `--frozen-lockfile` |

**Manifest example (api service only):**

```json
{
  "name": "api",
  "framework": "nestjs",
  "rootDir": "apps/api",
  "startCommand": "node dist/main.js",
  "migrateCommand": "npx prisma migrate deploy",
  "seedCommand": "npx prisma db seed"
}
```

**Local verify before deploy** (from repo root):

```bash
cd apps/api && pnpm run build
cd ../.. && CI=true pnpm --filter '@myorg/api' --prod deploy /tmp/api-deploy
ls /tmp/api-deploy/dist/main.js /tmp/api-deploy/prisma/schema.prisma
cd /tmp/api-deploy && npx prisma db seed
```

Replace `@myorg/api` with your API package name. On **pnpm 10+** only, add `--legacy` to the deploy command if your local pnpm version requires it. If deploy fails, fix workspace `build` scripts first (SETUP.md § [monorepo workspace packages](#monorepo--workspace-packages-packages---required-for-every-project)). If seed fails with `ts-node ENOENT`, fix `prisma.seed` per [Production seeds](#production-seeds-nest-slim--pnpm-deploy).

**Deploy log success pattern:** `webpack compiled successfully` → `pnpm --filter '…' --prod deploy '/prod/deploy'` → image push. Failures after a successful Nest build usually mean workspace packages were not compiled to `dist/` before deploy.

### Laravel (PHP) — not in MVP founder path

> Platform supports Laravel; LaunchWithCursor founder guides focus on React, Next.js, and NestJS only.

- Ensure `composer.json` and `artisan` exist at the service's app root (`rootDir`).
- Build/start are usually Nixpacks auto-detect (`null` in manifest).
- **Database:** `migrateCommand` is commonly `php artisan migrate --force` run from the Laravel root; if `rootDir` is not `.`, prefix with `cd <rootDir> &&` per the checklist.
- **Seeds:** `php artisan db:seed --force` when seeders exist; must be idempotent.
- `internalPort`: `3000`. `kind`: `website` or `api`.

### Python (FastAPI / Flask / Django) — not in MVP founder path

> Platform supports Python; LaunchWithCursor founder guides focus on JavaScript stacks only.

- Ensure `requirements.txt` (or `pyproject.toml`) and a production server entrypoint.
- Start command must bind to `PORT`.
- **Database:** use the project's migration tool (`alembic upgrade head`, `python manage.py migrate`, etc.) from the correct app directory.
- `internalPort`: `3000`. `kind`: `api` or `website`.

### Environment variables (all stacks)

**Monorepo pattern (recommended):** one `.env.example` at the **repository root** lists every key every app reads. On LaunchWithCursor, fill values once on **Deploy → Env vars** (app-wide). Managed add-on keys are injected automatically — do **not** duplicate them in `.env.example`:

`DATABASE_URL`, `REDIS_URL`, `REDIS_KEY_PREFIX`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, and `R2_PUBLIC_URL` (r2.dev URL on provision; optional custom CDN domain in Deploy → Storage)

- **`NEXT_PUBLIC_*` / `VITE_*` / `REACT_APP_*`** — baked in at **image build** time. Re-deploy website services after changing them.
- **Secrets, `CORS_ORIGIN`, etc.** — injected at **runtime**. Re-deploy the API after changing server-only keys.
- **`DATABASE_URL`** — runtime only; available after database provision. Migrate runs at deploy time with runtime env — provision the database **before** expecting migrations to succeed.
- **`REDIS_URL` / `REDIS_KEY_PREFIX`** — runtime only; available after Redis provision. Queue libraries must use the prefix for all keys (see [Redis checklist](#redis-queues-and-job-workers-decide-per-project)).

Create or update `.env.example` with keys only (no secrets). Never commit real `.env`.

**Monorepo front-end → API URL:** `NEXT_PUBLIC_API_URL` must be a **full absolute URL with `https://`** (e.g. `https://api.example.com/api/v1`), not `localhost` and not a bare hostname — otherwise the browser treats it as a path on the web/admin origin.

**Server-side API URL (separate containers):** When web and api are **different hosted services**, there is no shared `127.0.0.1` between containers. On web/admin in production:

| Variable | Production |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | **Required** — full `https://api.example.com` URL |
| `INTERNAL_API_URL` | **Leave unset** — server code should fall back to `NEXT_PUBLIC_API_URL` |

Use `INTERNAL_API_URL=http://127.0.0.1:…` only for **local dev** or legacy PM2 on one VPS. Do not copy it from a laptop `.env` into the dashboard.

**Monorepo CORS:** on the api service, set `CORS_ORIGIN` to every browser origin that calls the API, comma-separated with no spaces:

```env
CORS_ORIGIN=https://app.example.com,https://admin.example.com
```

Re-deploy the api after changing CORS or other server-only keys.

### Deploy logs — noise vs real failures

**`Deploy complete` means the container started** — confirm each service in the **browser**, not from logs alone.

| Log pattern | Usually means |
| --- | --- |
| `@prisma/client postinstall: We could not find your Prisma schema` during **web/admin install** | Normal in monorepos — ignore if API build runs `prisma generate` |
| `husky: .git can't be found` during install | Normal in Docker — use `"prepare": "husky \|\| true"` in root `package.json` |
| `Redis probe … failed (continuing to start)` on web/admin with `needsRedis: false` | Should not appear — probes run only on services with `needsRedis: true`. If you see them, confirm **Sync from repo** updated the service flags |
| `[redis:post-start] queue …` after web/admin deploy | Only logged when that service has `needsRedis: true` — otherwise check **api** deploy logs or **Deploy → Redis** |
| `Staged next.config for Docker: apps/web/…` | Good — `rootDir` is correct for that Next service |
| `Module not found: Can't resolve '@myorg/shared'` during **web/admin** build | Workspace `packages/*` export from `dist/` but web/admin build script does not compile deps before `next build` — fix **all** importing apps. See [monorepo workspace packages](#monorepo--workspace-packages-packages---required-for-every-project) |
| `[startup:container-logs] … workspace package` / `SyntaxError: Unexpected identifier` / `packages/*/src/index.ts` | API crash-loop — workspace `packages/*` not built or `main`/`exports` point at `src/`. See [monorepo workspace packages](#monorepo--workspace-packages-packages---required-for-every-project) |
| `docker build (NestJS slim)` + `pnpm --filter '…' --prod deploy` after Nest build | Good — monorepo API uses prod deploy bundle |
| `pnpm prune --prod` failing with `next@…` / lockfile message after Nest build | Platform bug on old builders — redeploy after platform update; founders do not fix by regenerating lockfile alone |
| API domain returns Traefik **404** while web/admin work; dashboard still **running** | Container may be **Restarting** — check **Deploy → Logs → api** or VPS `docker ps` / `docker logs` |

**Post-deploy browser checks (adapt URLs):**

| Service | Quick test |
| --- | --- |
| **web** | Homepage loads; sign-in; Network tab hits production API URL |
| **admin** | Admin sign-in page loads |
| **api** | Health or docs endpoint returns JSON |

If the UI loads but auth/API fails: check `NEXT_PUBLIC_API_URL`, api `CORS_ORIGIN` / `CORS_ORIGINS`, and that secrets like `JWT_SECRET` are on **api** only.

Deploy clones from GitHub; the deployer needs GitHub read access to the repo.

---

## Step 5 — Write `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`)

Create `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`) at the **repository root**. Fill it from Steps 3–4. See [the schema reference](#manifest-schema-reference).

Keep it minimal: `null` build/start when Nixpacks auto-detect is enough. For **migrate/seed**, use `null` when the service has no database; otherwise set commands you verified against the [database checklist](#agent-checklist--before-writing-migratecommand--seedcommand).

### Example — STATIC (React + Vite)

```json
{
  "version": 1,
  "projectType": "static",
  "services": [
    {
      "name": "web",
      "slug": "web",
      "kind": "website",
      "framework": "vite",
      "rootDir": ".",
      "buildCommand": "npm run build",
      "startCommand": "npx serve -s dist -l ${PORT:-3000}",
      "migrateCommand": null,
      "seedCommand": null,
      "internalPort": 3000,
      "needsDatabase": false,
      "domains": []
    }
  ]
}
```

### Example — MONOLITH (Next.js full-stack with Prisma at repo root)

```json
{
  "version": 1,
  "projectType": "monolith",
  "services": [
    {
      "name": "web",
      "slug": "web",
      "kind": "website",
      "framework": "nextjs",
      "rootDir": ".",
      "buildCommand": null,
      "startCommand": null,
      "migrateCommand": "npx prisma migrate deploy",
      "seedCommand": "npx prisma db seed",
      "internalPort": 3000,
      "needsDatabase": true,
      "domains": []
    }
  ]
}
```

> Monolith: schema at `./prisma/` — plain `npx prisma …` may work. Still confirm migrations are committed and test locally from repo root.

### Example — MONOREPO (web + api + admin)

Use **your** paths and commands. The api entry below is illustrative — replace migrate/seed strings after inspecting where Prisma (or your ORM) lives:

```json
{
  "version": 1,
  "projectType": "monorepo",
  "services": [
    {
      "name": "web",
      "slug": "web",
      "kind": "website",
      "framework": "nextjs",
      "rootDir": "apps/web",
      "buildCommand": null,
      "startCommand": null,
      "migrateCommand": null,
      "seedCommand": null,
      "internalPort": 3000,
      "needsDatabase": false,
      "domains": []
    },
    {
      "name": "api",
      "slug": "api",
      "kind": "api",
      "framework": "nestjs",
      "rootDir": "apps/api",
      "buildCommand": null,
      "startCommand": "node dist/main.js",
      "migrateCommand": "npx prisma migrate deploy",
      "seedCommand": "npx prisma db seed",
      "internalPort": 3000,
      "needsDatabase": true,
      "needsRedis": false,
      "needsStorage": false,
      "domains": []
    },
    {
      "name": "admin",
      "slug": "admin",
      "kind": "website",
      "framework": "nextjs",
      "rootDir": "apps/admin",
      "buildCommand": null,
      "startCommand": null,
      "migrateCommand": null,
      "seedCommand": null,
      "internalPort": 3000,
      "needsDatabase": false,
      "domains": []
    }
  ]
}
```

> Nest monorepo slim Docker **flattens** `apps/api` into `/app` at runtime — migrate/seed use plain `npx prisma …` (no `cd apps/api`). Build still runs from `rootDir` via `cd 'apps/api' && pnpm run build`. If your api `rootDir` differs, keep `rootDir` in sync with where the Nest app and `prisma/` folder live in Git.

---

## Step 6 — Final checklist and handoff

Verify, then hand off in plain language:

- [ ] Extension installed and signed in; `.launchwithcursor/project.json` exists; `.launchwithcursor/cache/` is git-ignored.
- [ ] `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`) at repo root lists every app to host with correct `rootDir` values.
- [ ] **Dashboard Sync from repo** run after manifest changes; each Next service shows `apps/<name>`, not `.`.
- [ ] Each service listens on `PORT`; build/start work or use framework defaults.
- [ ] **Monorepo Nest API:** `apps/api/package.json` has a scoped `name`; `build` compiles workspace deps; manifest `startCommand` is `node dist/main.js`; migrate/seed are plain `npx prisma …` (no `cd apps/api`); **`prisma.seed` runs compiled JS** (not `ts-node`/`tsx`).
- [ ] **Monorepo:** each service `build` compiles `packages/*` deps before nest/next build when those packages export from `dist/`.
- [ ] **No root `postinstall: prisma generate`** when hosting Next.js + API from one repo (Prisma generate only in API build).
- [ ] **pnpm:** `onlyBuiltDependencies` configured if needed (Step 4); root `engines.node` is `>=20` (platform uses Node 20).
- [ ] **Database owner service:** migrate/seed commands derived from repo layout (not copied blindly); migration **files** committed to Git.
- [ ] **Queue-backed services:** `needsRedis: true` only on services that use Redis; workers use `REDIS_KEY_PREFIX`.
- [ ] **Env:** `NEXT_PUBLIC_*` set for production URLs; `INTERNAL_API_URL` unset on web/admin; CORS origins are full `https://` URLs with no typos.
- [ ] `.env.example` at repo root (no secrets); managed keys and local dev port vars (`API_PORT`, `WEB_PORT`) omitted or commented as local-only.
- [ ] Changes committed and pushed.

Tell the user:

1. Commit and push (you can run this for them):

   ```bash
   git add launchwithcursor.deploy.json .gitignore .env.example
   git commit -m "Add LaunchWithCursor deploy manifest and prepare for deploy"
   git push
   ```

2. On the dashboard → project → **Deploy**:
   - Confirm services match the manifest (or use **Sync from repo** if hosting already exists).
   - For each service with `needsDatabase: true`, open **Database** → **Provision** Postgres or MySQL (manifest alone does not create a DB).
   - For queue/cache/session apps, open **Redis** → **Provision** (manifest alone does not create Redis).
   - Fill **Env vars** from `.env.example` (skip local dev port vars and platform-managed keys).
   - **First deploy order:** provision add-ons → deploy **api** (migrations) → deploy **web** / other frontends → browser smoke test each production URL.
   - After a successful deploy, open **Database → Manage data** to confirm tables exist (not the main nav “Database” diagram, which is from code scan).
   - If the app uses job queues, open **Deploy → Redis → Queue activity** after workers start; use **Refresh** to check for stalled or failed jobs.

3. If tables are missing after deploy: check api deployment logs for `Running migrate:` output, confirm **Services → api** shows your migrate command, confirm DB is **active**, then fix working directory in migrate/seed and redeploy api.

4. If queues look stuck: confirm Redis is **active**, workers are deployed, and BullMQ/Sidekiq uses `REDIS_KEY_PREFIX` (see deploy logs / **Queue activity** blockers).

---

## Already deployed? Keep hosting in sync

If hosting is already enabled:

1. Update `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`) and `.env.example`; commit and push.
2. Dashboard → **Deploy** → **Sync from repo** → apply service updates (especially `migrateCommand` / `seedCommand`).
3. **Deploy** the affected services (api first when migrations changed).
4. Re-check **Database → Manage data** after deploy.

Nothing is removed automatically when you drop a service from the manifest — delete it manually from **Services** if needed.

Re-run this skill after major repo changes; then sync from the dashboard.

---

## Manifest schema reference

`launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`) (committed at repo root):

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `version` | number | yes | Manifest schema version. Always `1` for now. |
| `projectType` | `"static" \| "monolith" \| "monorepo"` | yes | Project shape from Step 3. Informational. |
| `services` | array | yes | One entry per app to host. |

Each entry in `services`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | yes | Human-friendly service name (e.g. `web`, `api`, `admin`). |
| `slug` | string | yes | URL/identifier-safe name (lowercase, hyphens). |
| `kind` | `"website" \| "api"` | yes | `website` if UI/pages, `api` if backend-only. |
| `framework` | string | yes | `nextjs`, `react`, `vite`, `cra`, `nestjs`, `express`, `laravel`, `fastapi`, `python`, or `auto`. |
| `rootDir` | string | yes | Path to the app within the repo (`.` or e.g. `apps/api`). Used for build/start cwd prefix; **migrate/seed must include cwd or schema path yourself when needed**. |
| `buildCommand` | string \| null | no | `null` auto-detects. Prefer `pnpm run build` / `npm run build`, not bare framework CLIs. |
| `startCommand` | string \| null | no | Must listen on `PORT`. `null` auto-detects. |
| `migrateCommand` | string \| null | no | One-off command **before** container start. Runs from container WORKDIR (`/app` = repo root) unless you `cd` or pass paths. `null` if none. |
| `seedCommand` | string \| null | no | One-off command **after** migrate, before start. Same working-directory rules as migrate. Idempotent seeds only. Nest slim: **`prisma.seed` must run compiled JS** — see [Production seeds](#production-seeds-nest-slim--pnpm-deploy). |
| `internalPort` | number | yes | Port inside the container. Default `3000`. |
| `needsDatabase` | boolean | yes | Intent flag only — user must still **Provision** under Deploy → Database. |
| `needsRedis` | boolean | no | Intent flag — user must still **Provision** under Deploy → Redis. Set `true` when the app uses queues, Redis cache, or sessions. |
| `needsStorage` | boolean | no | Intent flag — provision under Deploy → Storage. |
| `domains` | string[] | no | Hostnames for this service. `[]` if none yet. |

Field values map to how the PaaS creates each hosted service. An accurate manifest plus dashboard provision + sync + deploy of the migration-owning service is what makes tables appear in **Manage data**.
