# LaunchWithCursor Setup Skill

<!-- launchwithcursor-setup-version: 0.2.3 -->

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
| Extension download URL | `https://codeknowledgeapi.thetayoadepetu.com/v1/extension/download` |
| Extension version info URL | `https://codeknowledgeapi.thetayoadepetu.com/v1/extension/latest` |
| Dashboard URL | `https://codeknowledge.thetayoadepetu.com` |

---

## Step 1 — Install or upgrade the LaunchWithCursor extension

The extension is distributed as a downloadable `.vsix` (it is **not** on the VS Code Marketplace). Always compare your installed version to the latest before deciding whether to install or upgrade.

1. Fetch the latest published version:

   ```bash
   curl -fsSL https://codeknowledgeapi.thetayoadepetu.com/v1/extension/latest
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
   curl -fsSL -o /tmp/codeknowledge.vsix https://codeknowledgeapi.thetayoadepetu.com/v1/extension/download
   cursor --install-extension /tmp/codeknowledge.vsix || code --install-extension /tmp/codeknowledge.vsix
   ```

   - On Windows, download to `%TEMP%\codeknowledge.vsix` and install from there.
   - If the CLI command is missing, tell the user to install it once: open the editor → Command Palette (`Cmd/Ctrl+Shift+P`) → **Shell Command: Install 'code' command in PATH** (or the Cursor equivalent). As a fallback, they can install the downloaded `.vsix` via Extensions sidebar → `⋯` → **Install from VSIX…**.

4. After any fresh install **or** upgrade, ask the user to reload the editor window (Command Palette → **Developer: Reload Window**) so the new version activates.

---

## Step 2 — Start the extension and sign in

1. Make sure the project is the **first/only folder** open in the editor (the extension uses the first workspace folder).
2. If `.launchwithcursor/project.json` already exists at the project root, the user is already signed in — confirm the folder is present, then skip to **Step 3**.
3. Otherwise, tell the user to run **LaunchWithCursor: Sign In** from the Command Palette. This opens their browser to approve the connection — they must click **Approve** there (this one click cannot be automated). They need to already be signed in to the dashboard at `https://codeknowledge.thetayoadepetu.com` (GitHub login).
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

The PaaS builds each service as a container behind a router. **Next.js** apps use a slim standalone image by default (~150–400 MB); other stacks use **Nixpacks** (auto-detects build/start). Two rules matter for every stack:

- **Listen on the port from the `PORT` environment variable**, defaulting to `3000`. The platform routes traffic to that port. Hard-coded ports other than what you declare in the manifest will not receive traffic.
- **Provide a real build and start command** (or rely on the framework's standard `build`/`start` scripts).

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

**Related:** ensure `prisma generate` runs before the production build (`postinstall`, or `"build": "prisma generate && …"`). Warnings like `husky: .git can't be found` during Docker install are normal and safe to ignore.

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
5. **Where must the command run?** The platform container **WORKDIR is the repository root** (`/app`). For monorepos, **build** and **start** commands get an automatic `cd '<rootDir>' && …` prefix when Nixpacks builds the image. **Migrate and seed commands do not** — you must encode the correct working directory or schema path in the manifest string itself when the tool expects to run inside the app folder.

```text
For migrateCommand / seedCommand, pick the approach that matches how the tool resolves paths:

├── Schema/migrations live at repo root (rootDir is ".")
│   └── Often plain: npx prisma migrate deploy
│       (verify with local dry-run from repo root)

├── Schema/migrations live under rootDir (e.g. apps/api/prisma/)
│   ├── Option A: cd into rootDir first
│   │   └── e.g. cd apps/api && npx prisma migrate deploy
│   │       (use the actual rootDir you set in the manifest)
│   ├── Option B: explicit --schema / config flag
│   │   └── e.g. npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
│   └── Option C: package-manager filter from root
│       └── e.g. pnpm --filter @myorg/api exec prisma migrate deploy
│           (only if that is already how the repo runs migrations)

└── Non-Node stack (Laravel, Django, etc.)
    └── Run from the app root (same rootDir rules apply)
        e.g. cd apps/api && php artisan migrate --force
```

**Do not assume** `npx prisma migrate deploy` works from repo root in a monorepo just because it works in a monolith at `.` — confirm where `prisma/schema.prisma` lives relative to `/app` in the container.

6. **Seeds must be idempotent.** `seedCommand` runs on **every** deploy after migrate. Use upsert / find-or-create patterns, not blind inserts.
7. **Provision order for first deploy:** (a) commit manifest + migrations, (b) enable hosting / sync services, (c) **provision database** on dashboard, (d) deploy the service with migrateCommand, (e) check **Deploy → Database → Manage data** for tables.

#### What to look for in deploy logs (api / DB-owning service)

After `Running migrate: …` you should see tool output (Prisma: “schema loaded”, “Applying migration …”; Laravel: migration names). If deploy reaches **Deploy complete** but **Manage data** shows “No tables yet”, common causes:

- Migrate/seed ran from the wrong directory (no schema found, or wrong migrations path) — fix `migrateCommand` / `seedCommand` working directory.
- Hosted service record still has empty migrate command — run **Sync from repo**.
- No migration files in Git on the deployed branch.
- Database was provisioned after a deploy that skipped migrate — redeploy api after provisioning.

Build logs may show `We could not find your Prisma schema in the default locations` during **root** `pnpm install` — that is normal in monorepos. The **build** phase should still load the schema from under `rootDir` (e.g. `cd 'apps/api' && pnpm run build` → `Prisma schema loaded from prisma/schema.prisma`). Migrate must be configured to use that same logical app root.

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
- **PWA:** if customer-facing on mobile, follow `LAUNCHWITHCURSOR/SKILLS/PWA.md` Rule 7 (`vite-plugin-pwa`).

### Next.js

- Ensure `package.json` has `build` (`next build`) and `start` (`next start -p ${PORT:-3000}` or just `next start`, which already honors `PORT`).
- **In `launchwithcursor.deploy.json`**, set `buildCommand` and `startCommand` to `null` (recommended) or use package-manager wrappers (`npm run build`, `pnpm run build`). Do **not** copy raw `next build` / `next start` into the manifest — the platform runs those commands inside Docker without your local shell `PATH`.
- Requires Node 20+. If `package.json` has no `engines.node`, add `"engines": { "node": ">=20" }` (or add a `.nvmrc` containing `20`).
- **Enable standalone output** in `next.config.js` / `next.config.ts` — the platform builds Next.js with a slim standalone image by default. If `output: 'standalone'` is not in the **committed** config on the branch you deploy, the build injects it automatically by wrapping your next.config (you will see this in deploy logs). Still add it to source control for clarity and monorepo tracing settings.

- **Monorepo apps** (`rootDir` like `apps/web`): also set `outputFileTracingRoot` so standalone bundles include shared workspace packages. See prior examples in repo docs or infer `../` depth from `rootDir`.

- **Database (monolith at repo root):** if Prisma (or similar) lives next to this Next app, set `migrateCommand` / `seedCommand` using the [database checklist](#agent-checklist--before-writing-migratecommand--seedcommand) above. Mark `needsDatabase: true`. Front-end-only Next apps in a monorepo usually keep migrate/seed `null` and `needsDatabase: false`.

- `internalPort`: `3000`. `kind`: `website` (use `api` only if it has API routes but no pages).

- **PWA (customer-facing apps):** if end users open this app on mobile, implement PWA per `LAUNCHWITHCURSOR/SKILLS/PWA.md` — web app manifest, icons under `public/icons/`, theme color, and optional service worker for offline shell. No extra platform config needed.

### NestJS (and other Node APIs)

- Ensure `build` and a production start script in **`package.json`** (e.g. `nest build`, `node dist/main.js`).
- In the manifest, prefer `buildCommand: null` or `pnpm run build` / `npm run build` — not bare `nest build`.
- Make `main.ts` listen on `process.env.PORT ?? 3000`.
- **Database:** apply the [database checklist](#agent-checklist--before-writing-migratecommand--seedcommand). For a typical Prisma + Nest service in `apps/api`, migrate/seed often need to run **from that folder** or with an explicit schema path — derive the exact string from the repo; do not copy a generic example without verifying paths.
- **Redis / queues:** if the API uses BullMQ or similar, set `needsRedis: true` and configure workers with `REDIS_URL` + `REDIS_KEY_PREFIX` per the [Redis checklist](#redis-queues-and-job-workers-decide-per-project).
- `internalPort`: match what the app uses (often `3000`). `kind`: `api`.

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

**Monorepo CORS:** on the api service, set `CORS_ORIGIN` to every browser origin that calls the API, comma-separated with no spaces:

```env
CORS_ORIGIN=https://app.example.com,https://admin.example.com
```

Re-deploy the api after changing CORS or other server-only keys.

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
      "migrateCommand": "cd apps/api && npx prisma migrate deploy",
      "seedCommand": "cd apps/api && npx prisma db seed",
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

> If your api `rootDir` is different (e.g. `services/backend`), change both `rootDir` and the `cd …` prefix to match. Alternative: `--schema path/to/schema.prisma` if that is how the repo is structured.

---

## Step 6 — Final checklist and handoff

Verify, then hand off in plain language:

- [ ] Extension installed and signed in; `.launchwithcursor/project.json` exists; `.launchwithcursor/cache/` is git-ignored.
- [ ] `launchwithcursor.deploy.json` (legacy: `launchwithcursor.deploy.json`) at repo root lists every app to host with correct `rootDir` values.
- [ ] Each service listens on `PORT`; build/start work or use framework defaults.
- [ ] **pnpm:** `onlyBuiltDependencies` configured if needed (Step 4).
- [ ] **Database owner service:** migrate/seed commands derived from repo layout (not copied blindly); migration **files** committed to Git.
- [ ] **Queue-backed services:** `needsRedis: true` where needed; workers use `REDIS_KEY_PREFIX` (see [Redis checklist](#redis-queues-and-job-workers-decide-per-project)).
- [ ] `.env.example` at repo root (no secrets); managed keys omitted.
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
   - Fill **Env vars** from `.env.example`.
   - **Deploy the api** (or whichever service owns migrations) — not only front-end services.
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
| `seedCommand` | string \| null | no | One-off command **after** migrate, before start. Same working-directory rules as migrate. Idempotent seeds only. |
| `internalPort` | number | yes | Port inside the container. Default `3000`. |
| `needsDatabase` | boolean | yes | Intent flag only — user must still **Provision** under Deploy → Database. |
| `needsRedis` | boolean | no | Intent flag — user must still **Provision** under Deploy → Redis. Set `true` when the app uses queues, Redis cache, or sessions. |
| `needsStorage` | boolean | no | Intent flag — provision under Deploy → Storage. |
| `domains` | string[] | no | Hostnames for this service. `[]` if none yet. |

Field values map to how the PaaS creates each hosted service. An accurate manifest plus dashboard provision + sync + deploy of the migration-owning service is what makes tables appear in **Manage data**.
