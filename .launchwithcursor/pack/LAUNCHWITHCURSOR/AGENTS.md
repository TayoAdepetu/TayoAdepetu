# Agent instructions — LaunchWithCursor founder projects

Before planning or writing code on a founder MVP project:

1. Read **MVP-SPEC.md** at the repo root first — product scope, user flows, and mobile strategy (PWA, native app, or desktop-only)
2. Implement from **docs/plans/** when those files exist (platform-generated). Prefer `Implement phase N from docs/plans/phase-N.md` over inventing scope. End with **docs/plans/phase-verify.md**
3. Read [README.md](README.md) for guide order
4. For all UI work: start at [SKILLS/frontend/README.md](SKILLS/frontend/README.md) (router + non-negotiables), then open only the cited skill files (e.g. forms.md). Legacy shim: [SKILLS/FRONTEND.md](SKILLS/FRONTEND.md)
5. Apply [SKILLS/PWA.md](SKILLS/PWA.md) **only when MVP-SPEC calls for a PWA or installable web app**
6. Apply [SKILLS/BACKEND.md](SKILLS/BACKEND.md) for NestJS/API work
7. Apply [SKILLS/Infrastructure.md](SKILLS/Infrastructure.md) from Phase 1 for deploy/env/manifest
8. **Monorepos with `packages/*`:** follow [SETUP.md](SETUP.md) § **Monorepo — workspace packages** — export shared libs from `dist/`; update **api, web, and admin** build scripts in the same commit; verify api (`node dist/src/main.js`) and each Next app (`next build`) after `rm -rf packages/*/dist`
9. **Prisma seeds on hosted Nest APIs:** `prisma.seed` must run **compiled JavaScript** (`node dist/.../seed.js`) — prod deploy has no `ts-node`/`tsx`. See [SETUP.md](SETUP.md) § **Production seeds**.

Self-check each phase’s done-when before claiming it complete. Do not require the founder to test between phases.

Default stack: React or Next.js + NestJS + Postgres — unless MVP-SPEC says otherwise.

Deploy manifest: `launchwithcursor.deploy.json` at repo root.
