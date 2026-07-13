# Infrastructure & LaunchWithCursor PaaS Rules for Cursor AI Assistant

Use this document from **day one** of every client project that will deploy on **LaunchWithCursor PaaS**. These rules prevent rework (wrong env names, missing add-ons, local-only infra that never matches production).

When creating a **project plan** or outlining **development phases**, read and apply these rules — and reference the relevant rule numbers in Phase 1 (Foundation) and Phase 6 (Deployment).

> **Legacy filenames:** `codeknowledge.deploy.json` and `codeknowledge-setup.md` still work. Prefer `launchwithcursor.deploy.json` and `launchwithcursor-setup.md` for new projects.

---

## Core Philosophy

## 1. Build for the Platform From Inception

Clients develop and test on LaunchWithCursor — not on ad-hoc Docker Compose, custom env aliases, or local-only infra that diverges from production.

That means:

- provision **only the add-ons the project actually uses** (Postgres, Redis, R2) — but do it on the dashboard early when they _are_ needed, including during dev/test
- when an add-on is used, read the **exact env var names** the platform injects — never rename or map them in code
- commit `launchwithcursor.deploy.json` (or legacy `codeknowledge.deploy.json`) before the first deploy attempt
- one root `.env.example` for dashboard import; real `.env` stays git-ignored

Avoid introducing alternate names “for clarity” (e.g. `STORAGE_BUCKET` when the platform provides `R2_BUCKET_NAME`).

**Not every project needs every add-on.** A marketing-only Next.js site may need none of them. Only wire up and provision what the scope requires.

---

## LaunchWithCursor Environment Variables (Canonical Names)

## 2. Platform-Injected Variables — Use As-Is (When Needed)

**Only use these variables in code and config when the project actually needs that add-on.** Do not add `R2_*` reads, Redis clients, or Prisma/database code “just in case.”

When an add-on _is_ provisioned on LaunchWithCursor, the platform injects the keys below. Application code must read them under **these exact names** — do not alias, wrap, or duplicate them in `.env.example`.

| Variable               | Add-on               | Use when…                                                 |
| ---------------------- | -------------------- | --------------------------------------------------------- |
| `DATABASE_URL`         | Managed Postgres     | The app persists data (Prisma, ORM, SQL)                  |
| `REDIS_URL`            | Managed Redis        | The app uses Redis (job queues, cache, pub/sub, sessions) |
| `R2_ACCOUNT_ID`        | Cloudflare R2        | The app stores/uploads files or assets                    |
| `R2_ACCESS_KEY_ID`     | Cloudflare R2        | Same as above                                             |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2        | Same as above                                             |
| `R2_BUCKET_NAME`       | Cloudflare R2        | Same as above                                             |
| `R2_ENDPOINT`          | Cloudflare R2        | Same as above                                             |
| `R2_PUBLIC_URL`        | Cloudflare R2        | Same as above                                             |
| `PORT`                 | Every hosted service | Always (runtime)                                          |
| `NODE_ENV`             | Every hosted service | Always (runtime; platform sets `production`)              |
| `EMAIL_API_URL`        | Platform Email       | The app sends transactional email via the platform API    |
| `EMAIL_API_KEY`        | Platform Email       | Same as above                                             |
| `EMAIL_FROM_DOMAIN`    | Platform Email       | Verified sender domain (after DNS verification)           |

For S3/R2 clients (only when file storage is in scope): use `R2_ENDPOINT`, `R2_BUCKET_NAME`, credentials above; region is `'auto'`; `forcePathStyle: false` for R2.

App-specific tuning (not platform-injected) may use separate names, e.g. `UPLOAD_URL_TTL`, `MAX_UPLOAD_BYTES` — only when uploads exist.

---

## `.env.example` Rules

## 3. Single Root `.env.example`

- One file at the **repo root** — not per app.
- Lists every key the **developer must set in the dashboard** (JWT secrets, AI keys, CORS, etc.).
- **Must NOT** list platform-injected keys (Rule 2) — only comment that they come from provisioning.
- For local API runs: developers copy provisioned values from the dashboard into a git-ignored root `.env`.

---

## Deploy Manifest

## 4. Deploy Manifest at Repo Root

**Preferred filename:** `launchwithcursor.deploy.json`  
**Legacy alias:** `codeknowledge.deploy.json` (still read by the platform)

Create this in Phase 1 for any hosted project. One manifest describes all services.

Each service entry must include:

| Field                           | Rule                                                                                                                                                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rootDir`                       | Path to the deployable app (`apps/api`, not the monorepo root)                                                                                                                                                              |
| `internalPort`                  | `3000` unless documented otherwise                                                                                                                                                                                          |
| `buildCommand` / `startCommand` | Prefer `null` for Next.js (platform auto-detects). Otherwise `pnpm run build` / `pnpm run start` — **never** bare `next build` / `next start` / `nest build`. Compiled APIs may use `node dist/main.js` for `startCommand`. |
| `migrateCommand`                | Set for any Prisma/DB app (`npx prisma migrate deploy`)                                                                                                                                                                     |
| `needsDatabase`                 | `true` **only** if the service uses Postgres                                                                                                                                                                                |
| `needsRedis`                    | `true` **only** if the service uses Redis (queues, cache, sessions)                                                                                                                                                         |
| `needsStorage`                  | `true` **only** if the service uses R2 for uploads/assets                                                                                                                                                                   |
| `needsEmail`                    | `true` **only** if the service sends email via the platform Email API                                                                                                                                                       |

Set each flag to `false` (or omit when the schema default applies) when that add-on is not part of the project. The dashboard uses these booleans to offer provisioning — do not flag add-ons the app will never use.

---

## Runtime Conventions

## 5. Listen on `PORT`

Every server (NestJS, Next.js, Express, etc.) must bind to:

```ts
const port = Number(process.env.PORT) || 3000;
await app.listen(port);
```

Do not hard-code production ports in code. `API_PORT` / `WEB_PORT` are for local `pnpm dev` only.

---

## 6. Trust Proxy Hops (API Behind Cloudflare + PaaS)

Set `TRUST_PROXY_HOPS` in the dashboard for rate limiting and client IP:

- `0` — direct local connection
- `1` — platform router only (Cloudflare DNS-only)
- `2` — Cloudflare proxy + platform router (typical production)

---

## 7. No Project-Owned Docker for Hosting

Do not add Dockerfiles or `docker-compose` for production. LaunchWithCursor builds containers for you: **Next.js** apps use a slim standalone image; other stacks use **Nixpacks**.

Optional local Docker for Postgres/MinIO is discouraged — when an add-on _is_ required, prefer platform-provisioned instances even during development so environments match.

---

## Next.js on LaunchWithCursor

## 11. Enable `output: 'standalone'` (Required for Hosted Next.js)

LaunchWithCursor builds Next.js apps as a **standalone** container (~150–400 MB). The deploy **fails without this** — set it in Phase 1 for every Next.js app you plan to host (`apps/web`, `apps/admin`, etc.).

```ts
// next.config.ts / next.config.mjs — monorepo apps/web
import path from 'path';

const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'), // repo root from apps/*
  transpilePackages: ['@myorg/ui'], // workspace packages you import
};
export default nextConfig;
```

Also ensure:

- `package.json` has `build` (`next build`) and `start` (`next start` — honors `PORT`)
- Node 20+ (`engines.node` on root or app `package.json`, or `.nvmrc`)
- In the manifest: `buildCommand: null`, `startCommand: null` (recommended)
- `migrateCommand` in the manifest **only** if that Next app uses a database (uncommon for marketing/admin shells; API owns DB in most monorepos)

Do **not** add standalone output to Next apps that will never be deployed — only hosted Next.js services need it.

---

## pnpm Native Dependencies

## 12. `pnpm.onlyBuiltDependencies` (When Using pnpm + Prisma/Native Modules)

pnpm 10+ **blocks dependency install scripts** in Docker unless allowlisted. LaunchWithCursor runs `pnpm install` during build; blocked scripts cause silent failures (missing Prisma engine, broken `argon2`, etc.).

When the repo uses **pnpm** and depends on `prisma`, `@prisma/client`, `argon2`, `sharp`, `bcrypt`, or similar native packages, add to **root** `package.json`:

```json
{
  "pnpm": {
    "onlyBuiltDependencies": ["@prisma/client", "@prisma/engines", "prisma", "argon2"]
  }
}
```

Only list packages the project actually uses. Run `pnpm approve-builds` locally if prompted, then commit.

Ensure `prisma generate` runs before the production build — e.g. `"build": "prisma generate && nest build"` in `apps/api/package.json`, not a bare `nest build` in the deploy manifest.

---

## Monorepo Shape

## 8. One Manifest Service Per Deployable App

If the repo is a monorepo (`apps/web`, `apps/api`, `apps/admin`):

- one `services[]` entry per app you host
- skip shared `packages/*` (libraries, not runnable)
- skip mobile (Expo/EAS) — use PWA on web instead

Set `projectType: "monorepo"`.

---

## PWA on Hosted Frontends

## 13. Customer-Facing Apps Need PWA (Phase 4)

Hosted Next.js or React apps that end users open on phones must implement PWA before launch.

- Follow [PWA.md](./PWA.md) — manifest, icons, install UX
- No platform manifest changes required — PWA lives in app code
- Re-deploy web service after changing icons or `NEXT_PUBLIC_*` assets

Admin-only dashboards: PWA optional.

---

## Node & Build

## 9. Node 20+

Root or app `package.json` must declare `"engines": { "node": ">=20" }` (or a `.nvmrc` with `20`).

Monorepo API builds must account for workspace packages (`@scope/types` etc.) — verify the manifest `buildCommand` installs/builds from the repo correctly on first deploy.

---

## Git & LaunchWithCursor Extension

## 10. Git Ignore vs Commit

| Path | Action |
| ---- | ------ |
| `.launchwithcursor/cache/` | Git-ignore (machine-local sync pointers) |
| `.launchwithcursor/pack/` | Commit (METHOD + SKILLS starter pack) |
| `.launchwithcursor/project.json` | Commit (extension project link) |
| `.codeknowledge/` | Git-ignore (legacy layout — migrate away) |
| `launchwithcursor.deploy.json` | Commit (preferred) |
| `codeknowledge.deploy.json` | Commit (legacy alias) |
| `.env` | Git-ignore |
| `.env.example` | Commit |
| `launchwithcursor-setup.md` | Commit (optional but recommended) |

---

## Phase 1 Checklist (Structural)

Before marking Foundation complete, confirm:

- [ ] `launchwithcursor.deploy.json` or `codeknowledge.deploy.json` exists; `needsDatabase` / `needsRedis` / `needsStorage` are `true` **only on services that actually use those add-ons**
- [ ] Root `.env.example` follows Rules 2–3 (no platform-injected keys listed; only keys the app truly needs)
- [ ] When file storage is in scope: code uses `R2_*` names (Rule 2), not custom `STORAGE_*` aliases
- [ ] Every **hosted** Next.js app has `output: 'standalone'` and `outputFileTracingRoot` pointing at the repo root (Rule 11)
- [ ] **pnpm monorepos:** root `package.json` has `pnpm.onlyBuiltDependencies` for Prisma/native deps in use (Rule 12)
- [ ] Manifest uses `buildCommand`/`startCommand: null` for Next.js, or `pnpm run *` — not bare framework CLI commands (Rule 4)
- [ ] Hosted services listen on `PORT` (Rule 5)
- [ ] `.gitignore` includes `.env`, `.launchwithcursor/cache/`, and legacy `.codeknowledge/` if present
- [ ] Client project linked on LaunchWithCursor; **only required add-ons** provisioned for dev (Postgres and/or Redis and/or R2 as scope dictates)

---

## Reference

- Operational deploy steps: `launchwithcursor-setup.md` (extension install, dashboard Deploy tab, Sync from repo)
- Founder method: `LAUNCHWITHCURSOR/README.md`
- PWA: `LAUNCHWITHCURSOR/SKILLS/PWA.md`
