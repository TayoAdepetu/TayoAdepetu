# Deploy troubleshooting

When something goes wrong at deploy time, use this decision tree. Each path ends with a **Cursor prompt** you can paste.

---

## Build failed

**Symptoms:** Status `failed` during `building`; log mentions TypeScript, webpack, or missing modules.

**Check:**

1. Does `pnpm build` (or your build command) pass locally?
2. Are all dependencies in `package.json` — not only devDependencies if the build needs them?
3. For monorepos: is `rootDir` in the manifest correct for this service?

**Cursor prompt:**

```
Deploy build failed. Here is the log:
[paste last 50 lines]

Fix only what blocks the build. Follow LAUNCHWITHCURSOR/SKILLS/Infrastructure.md.
Run the build locally to verify before pushing.
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

## App starts then crashes

**Symptoms:** Deploy shows `running` briefly then `failed`; runtime errors in logs.

**Check:**

1. Missing env vars — compare dashboard **Deploy → Env vars** with `.env.example`
2. `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET` set for the API service?
3. Wrong `internalPort` vs what the app listens on?

**Cursor prompt:**

```
Service crashes on startup in production. Logs:
[paste log]

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

1. Open **Deploy → Deployments** → select failed deploy → **Explain failure**
2. Paste the suggested fix prompt into Cursor
3. [Request mentorship](/guides/mentorship) if blocked more than 2 hours

See also: [Domains guide](./domains.md) · [Email guide](./email.md) · [Launch checklist](./launch-checklist.md)
