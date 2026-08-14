# Backend Rules for Cursor AI Assistant

Opinionated **NestJS + Prisma + Postgres** backend rules for MVPs deployed on **LaunchWithCursor**.

When creating a **project plan** or **development phases**, read and apply these rules — reference rule numbers in each backend phase (like `SKILLS/frontend/`).

For env vars, deploy manifest, and platform add-ons, also apply [Infrastructure.md](./Infrastructure.md).

---

## Core Philosophy

## 1. One API Service Owns the Database

In a monorepo:

- `apps/api` — NestJS, Prisma, migrations, seeds
- `apps/web` / `apps/admin` — Next.js frontends, **no** `migrateCommand`

Set `needsDatabase: true` only on the API service in `launchwithcursor.deploy.json`.

### Workspace packages (`packages/*`)

If **any** hosted app (api, web, admin) imports `@myorg/shared`, `@myorg/types`, etc. from `packages/*`:

1. Each package **`main` / `exports` → `dist/`** (never `src/`).
2. Update **all importing apps' `build` scripts in the same commit** — not api alone:

```json
// apps/api
"build": "prisma generate && pnpm --filter @myorg/api^... run build && nest build"

// apps/web and apps/admin (when they import @myorg/*)
"build": "pnpm --filter @myorg/web^... run build && next build"
```

3. **Verify before deploy:**

```bash
rm -rf packages/*/dist apps/api/dist apps/web/.next apps/admin/.next
cd apps/api && pnpm run build && node dist/src/main.js
cd ../web && pnpm run build
cd ../admin && pnpm run build
```

NestJS does not bundle workspace deps at runtime. Next.js still needs `dist/` to exist when package exports point there — `transpilePackages` is not a substitute.

See [Infrastructure.md](./Infrastructure.md) Rule 8 and SETUP.md § monorepo workspace packages.

---

## Default Stack

## 2. Backend Stack (No Alternatives for MVP)

| Layer | Choice |
| ----- | ------ |
| Framework | NestJS |
| ORM | Prisma |
| Database | Postgres (`DATABASE_URL` from platform) |
| Validation | class-validator + class-transformer (DTOs) |
| Auth | JWT access tokens (or session cookies if spec requires) |
| Password hashing | argon2 or bcrypt |
| Background jobs | BullMQ + Redis (`REDIS_URL`, `REDIS_KEY_PREFIX`) |
| File uploads | R2 (`R2_*` env vars) |
| API docs | Swagger via `@nestjs/swagger` (optional but recommended) |

---

## Project Structure

## 3. Module Layout

```
apps/api/src/
  main.ts
  app.module.ts
  modules/
    auth/
    users/
    [feature]/
      [feature].module.ts
      [feature].controller.ts
      [feature].service.ts
      dto/
  common/
    guards/
    decorators/
    filters/
  prisma/
    schema.prisma
    migrations/
```

**Rules:**

- One NestJS module per domain feature
- Controllers thin — business logic in services
- DTOs for every request body and query shape
- No raw SQL unless Prisma cannot express the query

---

## Prisma

## 4. Schema Conventions

- `id` — `String @id @default(cuid())` or `uuid()`
- `createdAt` / `updatedAt` on every model
- Use `@relation` explicitly — no orphan foreign keys
- Enum types for fixed status fields
- Soft delete only when product requires it

**Generator / binaryTargets (hosted Linux):**

```prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

Required for slim Docker and Nixpacks containers. Missing `debian-openssl-3.0.x` → **Query engine not found** at runtime.

**Migrations:**

- Commit `prisma/migrations/` to Git
- Local: `prisma migrate dev`
- Production manifest: `migrateCommand` with correct `cd` path for monorepos

**Seeds:**

- Idempotent (`upsert`) — runs on every deploy
- Dev-only data clearly separated from production seeds
- **Hosted Nest slim (pnpm deploy):** `npx prisma db seed` runs `package.json` → `prisma.seed`. Prod images exclude devDependencies — **`prisma.seed` must invoke compiled JavaScript** (e.g. `"node dist/prisma/seed.js"`), not `ts-node` or `tsx`. Local-only scripts may still use `tsx prisma/seed.ts`.
- Pin **`prisma`** and **`@prisma/client`** to the same exact version in `apps/api/package.json` (avoid `"^6.x"` ranges that mismatch the lockfile in Docker).

---

## API Design

## 5. REST Conventions

| Pattern | Example |
| ------- | ------- |
| List | `GET /v1/projects` |
| Get one | `GET /v1/projects/:id` |
| Create | `POST /v1/projects` |
| Update | `PATCH /v1/projects/:id` |
| Delete | `DELETE /v1/projects/:id` |

- Prefix routes with `/v1/`
- Return consistent JSON shapes: `{ data }` or `{ data, meta }` for lists
- HTTP status codes: 201 create, 400 validation, 401 unauth, 403 forbidden, 404 not found

---

## Authentication

## 6. JWT Pattern (Default)

- `POST /v1/auth/register` — create user, return tokens
- `POST /v1/auth/login` — return tokens
- `POST /v1/auth/logout` — optional token invalidation
- `GET /v1/auth/me` — current user (guarded)

**Env vars (dashboard, not Git):**

- `JWT_SECRET` — long random string
- `JWT_EXPIRES_IN` — e.g. `7d`

**Rules:**

- Hash passwords with argon2/bcrypt — never store plain text
- `@UseGuards(JwtAuthGuard)` on protected controllers
- `@CurrentUser()` decorator for user id in handlers

---

## Redis & BullMQ

## 7. Queue Rules

Only add queues when MVP-SPEC requires async work (email, image processing, etc.).

```ts
const prefix = `${process.env.REDIS_KEY_PREFIX}bull`;

new Queue('emails', {
  connection: { url: process.env.REDIS_URL!, maxRetriesPerRequest: null },
  prefix,
});
```

- Set `needsRedis: true` on API service
- Workers must run in production (same container or dedicated worker process)
- All Redis keys prefixed with `REDIS_KEY_PREFIX`

---

## File Storage (R2)

## 8. Upload Pattern

- Use platform `R2_*` env vars exactly (Infrastructure.md Rule 2)
- Validate file type and size before upload
- Store object key in database; serve via `R2_PUBLIC_URL` or signed URLs
- Set `needsStorage: true` on the service that uploads

---

## Runtime

## 9. Listen on PORT

```ts
const port = Number(process.env.PORT) || 3000;
await app.listen(port, '0.0.0.0');
```

## 10. CORS

```ts
app.enableCors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? [],
  credentials: true,
});
```

Monorepo: `CORS_ORIGIN=https://app.example.com,https://admin.example.com` (full origins, comma-separated, no spaces).

## 11. Trust Proxy

Set `TRUST_PROXY_HOPS=2` in dashboard when behind Cloudflare + platform router (Infrastructure.md Rule 6).

---

## Build & Deploy

## 12. package.json Scripts

NestJS uses **slim Docker automatically** when `framework: "nestjs"` in the manifest — no build strategy choice in the dashboard.

```json
{
  "scripts": {
    "build": "prisma generate && nest build",
    "start": "node dist/main.js"
  }
}
```

Manifest:

- `buildCommand`: `null` or `pnpm run build`
- `startCommand`: `node dist/main.js`
- `migrateCommand`: verify path — e.g. `cd apps/api && npx prisma migrate deploy`

## 13. pnpm Native Dependencies

If using pnpm, add `onlyBuiltDependencies` for `prisma`, `@prisma/client`, `argon2` (Infrastructure.md Rule 12).

---

## Error Handling

## 14. Consistent API Errors

Use a global exception filter:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

Never leak stack traces to clients in production.

---

## Security Basics

## 15. Non-Negotiables

- [ ] Input validation on every DTO
- [ ] Rate limit auth endpoints
- [ ] No secrets in Git
- [ ] Parameterized queries only (Prisma default)
- [ ] Authorize by user id on every resource access (users can only access their own data unless admin)

---

## Phase Planning

## 16. Backend Compliance Subsection

Each phase that touches the API must list:

- which BACKEND.md rules apply
- deliverables (modules, endpoints, migrations)
- acceptance criteria (curl or manual test steps)

Backend-only phases: cite Infrastructure.md for deploy impact.

---

## Phase 1 Checklist (API exists)

- [ ] `apps/api` with NestJS + Prisma scaffold
- [ ] `prisma/schema.prisma` with initial models from MVP-SPEC; `binaryTargets` includes `debian-openssl-3.0.x`
- [ ] `main.ts` listens on `PORT`
- [ ] If API imports `packages/*`: each package exports from `dist/`; **api + web + admin** build scripts compile workspace deps; full verify passes after clean `packages/*/dist`
- [ ] Manifest entry with correct `rootDir`, `migrateCommand`, `needsDatabase`
- [ ] Root `.env.example` lists `JWT_SECRET`, `CORS_ORIGIN` (not `DATABASE_URL`)

---

## Reference

- Platform rules: [Infrastructure.md](./Infrastructure.md)
- Deploy setup: `launchwithcursor-setup.md`
- Frontend consumption: TanStack Query + `NEXT_PUBLIC_API_URL` with full `https://` URL
