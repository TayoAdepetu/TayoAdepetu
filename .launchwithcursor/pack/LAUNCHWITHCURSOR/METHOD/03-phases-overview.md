# Phase-by-Phase Build Guide

Each phase includes a **prompt to paste into Cursor** and **done when** criteria.

Prerequisites: `MVP-SPEC.md` exists. Read [02-cursor-mastery.md](./02-cursor-mastery.md) first.

---

## Phase 1 — Foundation

**Deliverables:** Repo structure, design tokens, design-system page, deploy manifest, `.env.example`

**Prompt:**

```
Read MVP-SPEC.md and create Phase 1 only.

Stack (do not debate alternatives):
- Next.js or React + Tailwind + shadcn/ui for frontend
- NestJS + Prisma + Postgres for API if MVP-SPEC requires a separate backend
- Monorepo with apps/web, apps/api if spec says monorepo; else single Next.js app

Apply:
- LAUNCHWITHCURSOR/SKILLS/FRONTEND.md (especially Rules 4, 5, 6, 7, 12, 18)
- LAUNCHWITHCURSOR/SKILLS/Infrastructure.md (Rules 1-5, 11, Phase 1 checklist)
- LAUNCHWITHCURSOR/SKILLS/BACKEND.md if API exists

Create launchwithcursor.deploy.json at repo root.
Create .env.example at repo root (no secrets, no platform-injected keys).
Scaffold design-system page with live component samples.

Write docs/plans/phase-1.md documenting what you built. Do not start Phase 2.
```

**Test:** App runs locally. Design-system page renders. Manifest file exists.

**Done when:** Infrastructure Phase 1 checklist is satisfied.

---

## Phase 2 — Core product

**Deliverables:** Must Have user flows (no auth yet — use mock data or skip protected routes)

**Prompt:**

```
Execute Phase 2 from docs/plans/phase-2.md (create the plan file first from MVP-SPEC Must Have features if missing).

Build core user flows only. FRONTEND.md Rules 6, 24, 25, 31 apply.
No authentication yet unless trivial guest access is enough.
Do not start Phase 3.
List manual test steps when done.
```

**Test:** Walk through each Must Have flow in the browser.

---

## Phase 3 — Auth + data

**Deliverables:** Sign up, login, protected routes, Prisma models, migrations

**Prompt:**

```
Execute Phase 3: authentication and database persistence.

Follow LAUNCHWITHCURSOR/SKILLS/BACKEND.md for auth pattern and Prisma conventions.
Follow Infrastructure.md for DATABASE_URL usage and migrateCommand in manifest.
Seed command must be idempotent.

Update launchwithcursor.deploy.json migrate/seed on the API service.
Do not start Phase 4.
```

**Test:** Create account, log in, log out, data persists after refresh.

---

## Phase 4 — Mobile + polish

**Deliverables:** Mobile strategy from MVP-SPEC (PWA if spec requires it), loading/empty/error states, polish

**Prompt:**

```
Execute Phase 4:

Read MVP-SPEC.md first for mobile strategy (PWA, native, or desktop-only).

1. If MVP-SPEC calls for PWA or an installable web app, implement PWA per LAUNCHWITHCURSOR/SKILLS/PWA.md on the customer-facing app. Otherwise skip PWA manifest/install work and follow the spec's mobile approach.
2. Audit all screens for FRONTEND.md Rules 31 (empty/loading/error) and Rule 18 (mobile-first where the spec targets mobile users)
3. Remove any placeholder lorem ipsum — use realistic copy from MVP-SPEC

Do not start Phase 5.
```

**Test:** If PWA is in scope: Add to Home Screen on phone and confirm offline shell loads. All Must Have flows work at the widths MVP-SPEC targets.

---

## Phase 5 — Deploy + go live

**Deliverables:** Production deploy on LaunchWithCursor

**Steps (you + Cursor):**

1. Paste this prompt into Cursor:

```
Read launchwithcursor-setup.md and do what it says.
```

2. Push to GitHub
3. Dashboard: link repo, sync manifest, provision DB/Redis/R2, env vars
4. Deploy API → then web
5. Run [launch-checklist.md](../DEPLOY/launch-checklist.md)

**Prompt if deploy fails:**

```
Deploy failed. Here is the build log:
[paste log]

Fix only what blocks deploy. Follow Infrastructure.md rules.
```

---

## Phase 6 — Iterate

**Deliverables:** Fixes and small improvements from real users

**Prompt:**

```
User feedback: [describe issue]
Expected: [X]
Actual: [Y]

Fix this only. Keep FRONTEND.md and BACKEND.md conventions.
```

**Rule:** Add Nice-to-Have features only after Must Have is stable in production.

---

## Phase planning prompt (run once before Phase 1 code)

```
Read MVP-SPEC.md, LAUNCHWITHCURSOR/METHOD/03-phases-overview.md, LAUNCHWITHCURSOR/SKILLS/FRONTEND.md, LAUNCHWITHCURSOR/SKILLS/BACKEND.md, and LAUNCHWITHCURSOR/SKILLS/Infrastructure.md.

Create docs/plans/phase-1.md through phase-6.md with:
- Goals and deliverables per phase
- FRONTEND compliance subsection (rule numbers) per phase
- Backend compliance subsection where applicable
- Acceptance criteria

No code — markdown plans only.
```
