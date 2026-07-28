# Agent instructions — LaunchWithCursor founder projects

Before planning or writing code on a founder MVP project:

1. Read **MVP-SPEC.md** first — it is the source of truth for product scope, user flows, and mobile strategy (PWA, native app, or desktop-only)
2. Read [README.md](README.md) for guide order
3. Apply [SKILLS/FRONTEND.md](SKILLS/FRONTEND.md) for all UI work
4. Apply [SKILLS/PWA.md](SKILLS/PWA.md) **only when MVP-SPEC calls for a PWA or installable web app**
5. Apply [SKILLS/BACKEND.md](SKILLS/BACKEND.md) for NestJS/API work
6. Apply [SKILLS/Infrastructure.md](SKILLS/Infrastructure.md) from Phase 1 for deploy/env/manifest
7. **Monorepos with `packages/*`:** follow [SETUP.md](SETUP.md) § **Monorepo — workspace packages** — export shared libs from `dist/`; update **api, web, and admin** build scripts in the same commit; verify api (`node dist/src/main.js`) and each Next app (`next build`) after `rm -rf packages/*/dist`
8. **Prisma seeds on hosted Nest APIs:** `prisma.seed` must run **compiled JavaScript** (`node dist/.../seed.js`) — prod deploy has no `ts-node`/`tsx`. See [SETUP.md](SETUP.md) § **Production seeds**.

Default stack: React or Next.js + NestJS + Postgres — unless MVP-SPEC says otherwise.

Deploy manifest: `launchwithcursor.deploy.json` at repo root.
