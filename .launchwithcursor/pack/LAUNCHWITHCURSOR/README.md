# LaunchWithCursor — Founder Guide Library

**For non-software engineers building MVPs with Cursor and deploying on LaunchWithCursor.**

Read guides in this order. Give each linked file to Cursor when the step says to.

---

## Quick start (day 1)

1. Read [METHOD/00-start-here.md](./METHOD/00-start-here.md)
2. Run [METHOD/01-idea-to-spec.md](./METHOD/01-idea-to-spec.md) in ChatGPT → save `MVP-SPEC.md`
3. Open Cursor → follow [METHOD/02-cursor-mastery.md](./METHOD/02-cursor-mastery.md)
4. Download `launchwithcursor-setup.md` from the dashboard → tell Cursor to read it and do what it says (extension installs the starter pack automatically after sign-in)

---

## Reading order

| Order | Guide | When to use |
| ----- | ----- | ----------- |
| 1 | [METHOD/00-start-here.md](./METHOD/00-start-here.md) | Before you write any code |
| 2 | [METHOD/01-idea-to-spec.md](./METHOD/01-idea-to-spec.md) | Turn your idea into a build spec (ChatGPT) |
| 3 | [METHOD/02-cursor-mastery.md](./METHOD/02-cursor-mastery.md) | How to get great results from Cursor |
| 4 | [METHOD/03-phases-overview.md](./METHOD/03-phases-overview.md) | Phase-by-phase build + prompts |
| 5 | [SKILLS/frontend/README.md](./SKILLS/frontend/README.md) | Every UI decision (routed skill files; legacy shim [FRONTEND.md](./SKILLS/FRONTEND.md)) |
| 6 | [SKILLS/PWA.md](./SKILLS/PWA.md) | When MVP-SPEC calls for an installable web app (PWA) |
| 7 | [SKILLS/BACKEND.md](./SKILLS/BACKEND.md) | API, database, auth (NestJS) |
| 8 | [SKILLS/Infrastructure.md](./SKILLS/Infrastructure.md) | Env vars, deploy manifest, platform rules |
| 9 | [DEPLOY/launch-checklist.md](./DEPLOY/launch-checklist.md) | Before you go live |
| 10 | [MEMBERSHIP/fair-usage-policy.md](./MEMBERSHIP/fair-usage-policy.md) | What mentorship includes |

---

## Supported MVP stack (marketing path)

| Layer | Technology |
| ----- | ---------- |
| Frontend | React or Next.js |
| Backend API | NestJS |
| Database | Postgres (platform-managed) |
| Cache / queues | Redis (platform-managed) |
| File storage | Cloudflare R2 (platform-managed) |
| Mobile | **Defined in MVP-SPEC.md** — PWA, native, or desktop-only |

---

## Deploy files (commit to Git)

| File | Purpose |
| ---- | ------- |
| `launchwithcursor.deploy.json` | **Preferred** deploy manifest (repo root) |
| `codeknowledge.deploy.json` | Legacy alias — still works |
| `launchwithcursor-setup.md` | AI setup skill (repo root) |
| `.env.example` | Keys to fill on dashboard (no secrets) |

---

## Component prompts (optional)

Reusable UI section specs live in [SKILLS/component-library/](./SKILLS/component-library/).

---

## Install into your project (automated)

Founders only install the **LaunchWithCursor extension**. Starter files (this folder) ship inside the VSIX and copy to `.launchwithcursor/pack/LAUNCHWITHCURSOR/` on first open and after extension updates.

1. Install the extension from the dashboard setup guide.
2. Open your project in Cursor and run **LaunchWithCursor: Sign In**.

To refresh after an update: **LaunchWithCursor: Check for Updates** → reload the window.

Tell Cursor after setup:

> Read AGENTS.md and follow `.launchwithcursor/pack/LAUNCHWITHCURSOR/README.md` for this project.

---

## For platform maintainers (edit packs here)

Edit files in this **`LAUNCHWITHCURSOR/`** folder at the repo root — that is the single source of truth.

When you change setup, skills, or method docs:

1. Edit files here (same as always).
2. Publish a new extension: `pnpm extension:publish` (bumps version and bundles this folder into the VSIX).

Founders never download packs manually; they only update the extension.

---

## What stays outside this folder (platform repo only)

Deploy templates live in the platform monorepo at `templates/` — not inside `LAUNCHWITHCURSOR/`:

| File | Why separate |
| ---- | ------------ |
| `templates/launchwithcursor-setup.md` | Served by the dashboard `/setup-skill` route |
| `templates/codeknowledge-setup.md` | Legacy stub for existing projects |
| `templates/launchwithcursor.deploy.schema.json` | Machine-readable manifest schema |
| `templates/codeknowledge.deploy.schema.json` | Legacy schema alias |

Founders do **not** copy `templates/` — they download the setup skill from the dashboard.
