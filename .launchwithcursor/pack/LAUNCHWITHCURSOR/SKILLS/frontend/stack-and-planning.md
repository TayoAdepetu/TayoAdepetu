# Stack, philosophy, and planning

Part of [frontend skills](./README.md). Cite as `stack-and-planning.md` Rule N.

---

# Core Philosophy

## 1. Build Systems, Not Screens

Never design isolated pages.

Every UI must feel like it belongs to a larger design system.

That means:

- reusable components
- consistent spacing
- predictable typography
- reusable layout patterns
- shared interaction behaviors
- shared color logic
- shared animation principles

Avoid random styling decisions.

---

# Tech Stack Rules

## 2. Default Frontend Stack

### Web Apps

Always prefer:

- React / Next.js
- TailwindCSS
- shadcn/ui
- motion.dev (or Framer Motion)
- Lucide icons
- React Hook Form
- Zod validation
- TanStack Query
- Zustand (light state)
- TypeScript

---

## 3. Mobile Strategy Follows MVP-SPEC

**MVP-SPEC.md defines the mobile strategy** — PWA, native app, responsive web only, or desktop-only. Do not override the spec with platform defaults.

When MVP-SPEC calls for PWA:

- Same React / Next.js app — responsive + PWA manifest + service worker
- Implement in Phase 4 before launch
- Follow [PWA.md](../PWA.md) for manifest, icons, install UX, and testing

When MVP-SPEC calls for native mobile (Expo, React Native, etc.), follow the spec's stack and user flows.

When MVP-SPEC is desktop-only, optimize for desktop — still use accessible, responsive layouts where helpful, but skip PWA install UX.

---

# Project Planning Rules

### Reference Frontend Rules in Every Development Phase

When the AI outlines a project plan, roadmap, or development phases, **each phase must explicitly reference the applicable rules** from this frontend skills folder (cite file + rule number).

For **hosting, env vars, database, Redis, R2, deploy manifest, and PWA** requirements, also apply [`Infrastructure.md`](../Infrastructure.md) and [`PWA.md`](../PWA.md) from Phase 1 onward — especially Infrastructure Rules 2–4, 8, 13, and the Phase 1 checklist.

**Monorepo deploy:** if web/admin import `@myorg/*` from `packages/*`, their `build` scripts must compile workspace deps before `next build` (same as api before `nest build`). See SETUP.md § monorepo workspace packages.

Do not treat frontend standards as implicit. Call them out so implementation stays consistent.

For each phase, include a **Frontend compliance** subsection that lists:

- which files/rules from `SKILLS/frontend/` apply to that phase
- concrete deliverables tied to those rules (e.g. token files, design-system page updates, component samples)
- acceptance criteria for visual and UX quality
- for implement prompts: the agent must **self-check** the phase done-when before claiming the phase complete (founder does not QA between phases)

Example (adapt to the project):

**Week 1 – Foundation**

Frontend compliance:

- Rule 5 — create design token files (`colors`, `typography`, `spacing`, etc.) — [design-system.md](./design-system.md)
- Rule 4 — scaffold the design-system page with token swatches and initial button/card samples
- Rule 8 — research and document font choices with rationale for this product — [visual-foundation.md](./visual-foundation.md)
- Rule 12 — establish 8px spacing scale in tokens
- Rule 18 — mobile-first layout conventions documented on the design-system page

**Week 5 – Marketing Website & Admin Dashboard**

Frontend compliance:

- Rule 6 — build UI from shared components only; no one-off page markup
- Rule 7 — extend shadcn primitives with project tokens
- Rule 27 — dashboard information hierarchy — [surfaces.md](./surfaces.md)
- Rule 4 — update design-system page with any new components shipped this phase
- Rule 29 — forms/password patterns if auth UI ships — [forms.md](./forms.md)

Every phase that touches UI must cite at least the rules relevant to that work. Backend-only phases may note “N/A — no UI deliverables” or reference rules only if shared tokens or API-driven content affect the frontend.

The final plan file must be **Phase Verify** using [verify-checklist.md](./verify-checklist.md).
