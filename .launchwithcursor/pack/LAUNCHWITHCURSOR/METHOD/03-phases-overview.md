# Phase-by-Phase Build Guide

**Preferred flow:** generate plans on [Build phases](https://launchwithcursor.com/guides/build-phases) (platform AI), pull into the repo with the extension, then implement in Cursor.

This file documents the default phase shape (six build phases + Phase Verify). The platform may adjust scope within those phases for tiny or large MVPs, but always ends with Phase Verify.

Prerequisites: `MVP-SPEC.md` exists on LaunchWithCursor. Read [02-cursor-mastery.md](./02-cursor-mastery.md).

**Founder testing:** do **not** QA after every phase. Cursor self-checks done-when. You review after Phase Verify (or on staging).

---

## Phase 1 — Foundation

**Deliverables:** Repo structure, design tokens, design-system page (including PasswordField / FormShell samples), deploy manifest, `.env.example`

**Cursor prompt:**

```
Implement phase 1 from docs/plans/phase-1.md only.
Follow AGENTS.md and SKILLS/frontend/ (design-system.md, visual-foundation.md, forms.md samples).
Also apply SKILLS/Infrastructure.md Phase 1 checklist.
Self-check done-when. Do not start Phase 2.
```

**Done when:** App runs locally; design-system page renders; `launchwithcursor.deploy.json` exists.

---

## Phase 2 — Core product

**Deliverables:** Must Have user flows (auth deferred unless trivial guest access)

**Cursor prompt:**

```
Implement phase 2 from docs/plans/phase-2.md only.
Apply SKILLS/frontend/ surfaces.md and ux-a11y.md as cited in the plan.
Self-check done-when. Do not start Phase 3.
```

---

## Phase 3 — Auth + data

**Deliverables:** Sign up, login, protected routes, Prisma models, migrations

**Cursor prompt:**

```
Implement phase 3 from docs/plans/phase-3.md only.
Follow SKILLS/BACKEND.md and SKILLS/frontend/forms.md (password toggles, FormShell, centered auth headings).
Self-check done-when. Do not start Phase 4.
```

---

## Phase 4 — Mobile + polish

**Deliverables:** Mobile strategy from MVP-SPEC; empty/loading/error; realistic copy

**Cursor prompt:**

```
Implement phase 4 from docs/plans/phase-4.md only.
Read MVP-SPEC for mobile strategy. PWA only if required — SKILLS/PWA.md.
Apply SKILLS/frontend/surfaces.md Rule 31. Self-check done-when. Do not start Phase 5.
```

---

## Phase 5 — Deploy prep

**Deliverables:** Setup skill / manifest / env readiness for LaunchWithCursor PaaS

**Cursor prompt:**

```
Implement phase 5 from docs/plans/phase-5.md only.
Read launchwithcursor-setup.md / SETUP and confirm deploy readiness.
Self-check done-when. Do not start Phase 6.
```

---

## Phase 6 — Launch prep

**Deliverables:** Final polish items from the plan (not endless feature adds)

**Cursor prompt:**

```
Implement phase 6 from docs/plans/phase-6.md only.
Self-check done-when. Do not start Phase Verify until this phase is done.
```

---

## Phase Verify — UX and quality gate (required last)

**Deliverables:** Fixes only against `SKILLS/frontend/verify-checklist.md`

**Cursor prompt:**

```
Execute Phase Verify from docs/plans/phase-verify.md.

Read .launchwithcursor/pack/LAUNCHWITHCURSOR/SKILLS/frontend/verify-checklist.md
and SKILLS/frontend/README.md non-negotiables.

Audit the app against every checklist item. Fix only gaps.
Do not add features. When done, list what you checked and what you changed.
```

**Done when:** Checklist items pass (password toggles, form shells, states, etc.).

---

## After verify

1. Push to GitHub
2. Dashboard: link repo, sync manifest, provision add-ons, env vars, Deploy
3. Run [launch-checklist.md](../DEPLOY/launch-checklist.md)
4. Optionally hire **one or more manual testers** on the project **QA / Testers** page:
   - **Work as a team** — shared chat; testers see each other’s findings
   - **Work independently** — private founder↔tester chat; peer findings hidden
5. In Cursor: **LaunchWithCursor: Pull Test Findings** → fix from `docs/qa/*.md`

**Prompt if deploy fails:**

```
Deploy failed. Here is the build log:
[paste log]

Fix only what blocks deploy. Follow Infrastructure.md rules.
```

---

## Path B note (existing codebase)

Phase plans from the platform bias toward align / gap-fill / deploy readiness. Do not treat Phase 1 as “delete the app and start over.”

---

## Legacy: planning inside Cursor (optional)

Only if you cannot use the website generator:

```
Read MVP-SPEC.md, LAUNCHWITHCURSOR/METHOD/03-phases-overview.md,
and SKILLS/frontend/README.md (plus BACKEND.md, Infrastructure.md).

Create docs/plans/phase-1.md through phase-6.md and docs/plans/phase-verify.md with
goals, deliverables, frontend compliance (file + rule numbers), done-when, and Cursor prompts.
No code — markdown plans only.
```
