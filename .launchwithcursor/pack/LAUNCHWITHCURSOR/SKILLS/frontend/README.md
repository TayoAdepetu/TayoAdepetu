# Frontend skills — router

Treat this folder as the frontend operating system for LaunchWithCursor MVP projects.

**Do not load every file at once.** Read this router, apply the **Non-negotiables**, then open only the files that match the work in progress.

When creating or executing phase plans, cite **file + rule number** (e.g. `forms.md` Rule 29).

Legacy entry point: [`../FRONTEND.md`](../FRONTEND.md) (shim). Prefer this folder.

For hosting, env, deploy, and PWA: also apply [`../Infrastructure.md`](../Infrastructure.md) and [`../PWA.md`](../PWA.md) when relevant.

---

## Routing table

| When you are working on… | Read |
| --- | --- |
| Planning phases / citing compliance | [stack-and-planning.md](./stack-and-planning.md) |
| Design system page, tokens, shadcn, components | [design-system.md](./design-system.md) |
| Typography, color, spacing, modern UI, responsive | [visual-foundation.md](./visual-foundation.md) |
| Forms, auth fields, password, money inputs | [forms.md](./forms.md) |
| Dashboards, tables, empty/loading/error | [surfaces.md](./surfaces.md) |
| Cognitive load, CTAs, accessibility | [ux-a11y.md](./ux-a11y.md) |
| Motion, AI UI habits, Tailwind, premium quality | [motion-ai-quality.md](./motion-ai-quality.md) |
| Final UX confirmation after all build phases | [verify-checklist.md](./verify-checklist.md) |

---

## Non-negotiables (always apply)

1. **Build from a design system** — tokens + design-system page in Phase 1; reuse shared components (Rules 4–7).
2. **Password fields** — every password input has a visible, keyboard-accessible show/hide toggle (including confirm-password). See [forms.md](./forms.md).
3. **Form shell** — auth and single-column forms use a bordered (or clearly elevated) form card/shell with consistent padding. Structural form borders are required; do not strip them in the name of “minimalism” (Rule 15 targets decorative noise, not form containers).
4. **Auth heading alignment** — when the form is a centered card layout, center the title and supporting subtitle; left-align field labels and inputs inside the shell.
5. **8px spacing + mobile-first** when MVP-SPEC targets mobile users (Rules 12, 18).
6. **Empty, loading, and error states** on main flows; skeleton boxes for async lists (Rule 31).
7. **One primary CTA per section**, title-case button labels (Rule 25).
8. **Accessibility** — labels, focus, contrast, keyboard (Rule 26).
9. **Mobile strategy follows MVP-SPEC** — PWA only if the spec requires it (Rule 3 + [`../PWA.md`](../PWA.md)).
10. **Before claiming MVP build complete** — run [verify-checklist.md](./verify-checklist.md) (fix gaps only; no new features).

---

## Phase plans

Each UI phase must include a **Frontend compliance** subsection listing applicable files/rules, deliverables, and acceptance criteria. See [stack-and-planning.md](./stack-and-planning.md).

After all build phases, execute **Phase Verify** using [verify-checklist.md](./verify-checklist.md).
