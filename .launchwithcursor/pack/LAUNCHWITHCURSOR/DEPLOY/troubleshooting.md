# Deploy troubleshooting

When something goes wrong at deploy time, use this decision tree. Each path ends with a **Cursor prompt** you can paste.

---

## Build failed

**Symptoms:** Status `failed` during `building`; log mentions TypeScript, webpack, or missing modules.

**Check:**

1. Does `pnpm build` (or your build command) pass locally?
2. Are all dependencies in `package.json` — not only devDependencies if the build needs them?
3. For monorepos: is `rootDir` in the manifest correct for this service?
4. **`Cannot find module '@myorg/…'` / `Can't resolve '@myorg/shared'`** — workspace `packages/*` export from `dist/` but `dist/` is gitignored. **Every** hosted app that imports the package (api, web, admin) must compile deps in its `build` script before `nest build` / `next build`. See SETUP.md § monorepo workspace packages.
5. **Web/admin build fails after fixing api only** — you pointed `packages/*` at `dist/` but only updated the api build script. Add `pnpm --filter @scope/web^... run build && next build` to web/admin too.
6. **Build passes but API crash-loops** — Nest loads `packages/*/src/*.ts` at runtime. Fix `main`/`exports` → `dist/` and api build script. See troubleshooting § "Deploy complete but API unreachable".
7. **`No next.config found at repo root`** on one Next app only — dashboard **Services** still has `rootDir: .` for that service. Run **Sync from repo** and redeploy.

**Cursor prompt:**

```
Deploy build failed. Here is the log:
[paste last 50 lines]

If monorepo + Can't resolve '@myorg/shared': fix packages/* exports (dist/) AND build scripts for every hosted app that imports them (api, web, admin) in one pass. Follow LAUNCHWITHCURSOR/SETUP.md § monorepo workspace packages.

Fix only what blocks the build. Run each affected service build locally after rm -rf packages/*/dist before pushing.
```

---

## Migration failed

**Symptoms:** Deploy stops at `migrating`; Prisma or SQL errors in logs.

**Check:**

1. Are migration files committed under `prisma/migrations/`?
2. Does `migrateCommand` in `launchwithcursor.deploy.json` match your ORM?
3. Did a previous deploy partially apply a migration?

**Cursor prompt:**

```
Production migration failed:
[paste error]

Fix the migration safely. Follow LAUNCHWITHCURSOR/SKILLS/BACKEND.md Prisma conventions.
Do not reset production data.
```

---

## Seed failed

**Symptoms:** Deploy stops at `seeding` after migrate succeeded; log shows `spawn ts-node ENOENT`, `tsx ENOENT`, or Prisma seed command failed.

**Check:**

1. Open `apps/api/package.json` (or the DB-owning service) — what does **`prisma.seed`** run?
2. Nest slim images use **`pnpm deploy --prod`** — `ts-node`, `tsx`, and other devDependencies are **not** in the container.
3. Does the API `build` script emit a compiled seed (e.g. `dist/prisma/seed.js`)?
4. Are `prisma` and `@prisma/client` pinned to the same version (not `"^6.1.0"` with client at `6.19.x`)?

**Fix pattern:**

```json
"prisma": {
  "seed": "node dist/prisma/seed.js"
}
```

Manifest can stay `seedCommand: "npx prisma db seed"` or use `node dist/prisma/seed.js` directly.

**Verify locally:**

```bash
cd apps/api && pnpm run build
cd ../.. && CI=true pnpm --filter '@yourscope/api' --prod deploy /tmp/api-deploy
cd /tmp/api-deploy && npx prisma db seed
```

Full checklist: SETUP.md § **Production seeds (Nest slim / pnpm deploy)**.

**Cursor prompt:**

```
Deploy seed failed after migrate succeeded:
[paste error]

Nest slim prod image has no ts-node/tsx. Compile prisma/seed.ts to dist/, set prisma.seed to node dist/.../seed.js, pin prisma + @prisma/client versions. Follow LAUNCHWITHCURSOR/SETUP.md § Production seeds.
```

---

## Deploy succeeded but site broken (browser test)

**Symptoms:** **Deploy complete** in logs; Cloudflare 502, blank page, or API/auth fails in the browser.

**Check:**

1. Open each production URL in the browser — logs alone are not enough
2. **`INTERNAL_API_URL`** — unset on web/admin when api is a separate service (no `127.0.0.1` between containers)
3. **`NEXT_PUBLIC_API_URL`** — full `https://` production API URL; redeploy web after changing
4. **CORS** on api — every browser origin listed, no typos (`admin` vs `admib`)
5. **Domains** — hostname attached to the correct service (web vs api)

---

## Deploy complete but API unreachable (404, CORS, crash-loop)

**Symptoms:** API deploy log shows **Deploy complete** and **Traefik routing**; dashboard says **running**; web/admin load; `https://api.example.com/...` returns **404** (plain text) or browser shows **CORS** errors; migrate/seed succeeded.

**Likely cause:** API container **crash-loops** — build passed but `node dist/main.js` exits on startup. Common in monorepos when `packages/*` resolve to raw **TypeScript source** instead of compiled **`dist/`**.

**Check:**

1. **Deploy → Logs → api** — look for `[startup:container-logs]` warnings after deploy, or `SyntaxError` / `packages/*/src/index.ts`
2. With VPS access: `docker ps --filter 'name=ck-'` — API shows **`Restarting (1)`** not **`Up`**
3. `docker logs <api-container> --tail 50` — `SyntaxError: Unexpected identifier 'ClassValue'` or `Cannot find module '@myorg/…'`
4. **`packages/*/package.json`** — `main` / `exports` must point at **`dist/`**, not `src/`
5. **`apps/api` build script** — must run `pnpm --filter @scope/api^... run build` before `nest build`

**Verify locally:**

```bash
rm -rf packages/*/dist apps/api/dist
cd apps/api && pnpm run build && node dist/src/main.js
```

**Cursor prompt:**

```
Production API crash-loops on LaunchWithCursor after successful deploy.
docker logs show [paste error — often packages/*/src/*.ts SyntaxError].

Fix monorepo workspace package production build per LAUNCHWITHCURSOR/SETUP.md § monorepo workspace packages:
- packages/* export from dist/
- API build compiles workspace deps before nest build
- Verify with node dist/src/main.js after clean build

No feature work — build/config only.
```

---

## Build slow or disk full

**Symptoms:** Build timeout; log mentions `Not enough disk space`; first deploy on a small VPS takes 20–30 minutes.

**Check:**

1. Platform admin: **Platform → Storage stats** — run safe cleanup; ensure ≥5 GiB free on a 40 GB VPS
2. Deploy **api before web** in monorepos to avoid concurrent large builds
3. Next.js and NestJS use slim Docker automatically — deploy log should show `docker build (standalone)` or `docker build (NestJS slim)`, not multi-GB Nixpacks for those frameworks

---

## Prisma query engine not found at runtime

**Symptoms:** API crash-loops after deploy; logs mention **Query engine not found** or missing `.so.node` for Prisma.

**Fix:** Add to `schema.prisma`:

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

Commit, redeploy API.

---

## Deploy log noise (not failures)

**Symptoms:** Scary Redis or Prisma lines but status is **Deploy complete**.

| Log | Action |
| --- | --- |
| `Redis probe … failed (continuing to start)` on web/admin with `needsRedis: false` | Should not happen — set `needsRedis: false` on frontends and run **Sync from repo** |
| `@prisma/client … could not find Prisma schema` during web install | Ignore if API build runs `prisma generate` |
| `[redis:post-start] queue …` after frontend deploy | Only logged for services with `needsRedis: true` — use **Deploy → Redis** for api |
| Next.js middleware deprecation warning | Non-blocking |

---

## 502 Bad Gateway (app looks healthy in runtime logs)

**Symptoms:** Cloudflare 502; **Deploy → Logs** shows Next.js/Nest "Ready" on port 3000.

**Check:**

1. **Services → internal port** must match what the app listens on (usually `3000` for every service on PaaS)
2. Remove legacy **`API_PORT` / `WEB_PORT`** from Env vars if you migrated from PM2 — they are ignored; misconfigured start scripts that read them can still break routing
3. **Domains** — hostname must be attached to the correct service (web vs api)
4. Redeploy after fixing internal port or env

Deploy logs now include `Traefik routing: <hostname> → container port <n>` and `Using PORT=<n>` for verification.

---

## App starts then crashes

**Symptoms:** Deploy shows `running` briefly then `failed`; runtime errors in logs.

**Check:**

1. Open **Deploy → Logs** and select the service — live container stdout/stderr (last ~500 lines + tail while the page is open)
2. Missing env vars — compare dashboard **Deploy → Env vars** with `.env.example`
3. `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET` set for the API service?
4. Wrong `internalPort` vs what the app listens on?

**Cursor prompt:**

```
Service crashes on startup in production. Logs:
[paste log from Deploy → Logs]

Compare required env vars with .env.example. Fix config only — no feature work.
```

---

## CORS or API unreachable from web

**Symptoms:** Browser network errors; API works via curl but not from the website.

**Check:**

1. `CORS_ORIGIN` includes your production web URL (https, no trailing slash issues)
2. `NEXT_PUBLIC_API_URL` points to production API, not localhost
3. API has `TRUST_PROXY_HOPS=2` when behind Cloudflare

**Cursor prompt:**

```
Production web app cannot reach the API. Browser error:
[paste error]

Fix CORS and public API URL env vars per Infrastructure.md. Test from the browser.
```

---

## Redis / queue errors

**Symptoms:** Jobs not processing; Redis connection refused.

**Check:**

1. Redis provisioned on dashboard if manifest has `needsRedis: true`
2. `REDIS_URL` env var set on the API/worker service
3. BullMQ keys use `REDIS_KEY_PREFIX` if configured

---

## Still stuck?

1. **Build/deploy failures:** **Deploy → Deployments** → select failed deploy → **Explain failure**
2. **Running app errors:** **Deploy → Logs** → select service → copy recent output
3. Paste the suggested fix prompt into Cursor
4. [Request mentorship](/guides/mentorship) if blocked more than 2 hours

See also: [Domains guide](./domains.md) · [Email guide](./email.md) · [Launch checklist](./launch-checklist.md)
