# Phase Verify — frontend checklist

**When:** After all build phases are implemented. **Last plan file:** `docs/plans/phase-verify.md`.

**Mode:** Audit and fix only. Do **not** add features, redesign branding, or expand MVP scope.

Read [README.md](./README.md) non-negotiables, then check every item below. Fix gaps. When done, list what you checked and what you changed.

---

## Forms and auth

- [ ] Every password field (sign-in, sign-up, reset, change password, confirm password) has a visible show/hide toggle that works and is keyboard-accessible ([forms.md](./forms.md) Rule 29)
- [ ] Auth / single-column forms use a bordered or clearly elevated FormShell / AuthCard
- [ ] Centered auth layouts: title and subtitle centered; labels and inputs left-aligned inside the shell
- [ ] Inline validation and clear error/success states on forms
- [ ] Money inputs (if any) use major units with readable formatting

## Design system

- [ ] Design-system page exists and includes live samples for buttons, inputs, password field, form shell, empty/loading/error ([design-system.md](./design-system.md) Rules 4–7)
- [ ] Pages use shared components/tokens — no one-off password inputs without toggle

## States and hierarchy

- [ ] Main flows have empty, loading, and error states; async lists use skeletons ([surfaces.md](./surfaces.md) Rule 31)
- [ ] Each primary screen has one clear primary CTA in title case ([ux-a11y.md](./ux-a11y.md) Rule 25)

## Mobile and MVP-SPEC

- [ ] Layout matches MVP-SPEC mobile strategy (PWA / native / responsive / desktop-only)
- [ ] If PWA in scope: follow [`../PWA.md`](../PWA.md); else do not invent install UX
- [ ] Key flows usable at ~375px width when the spec targets mobile users ([visual-foundation.md](./visual-foundation.md) Rule 18)

## Accessibility smoke

- [ ] Form fields have labels; interactive controls are keyboard reachable; focus states visible ([ux-a11y.md](./ux-a11y.md) Rule 26)

## Copy

- [ ] No lorem ipsum; copy matches MVP-SPEC product language

---

## Cursor prompt (paste)

```
Execute Phase Verify from docs/plans/phase-verify.md.

Read .launchwithcursor/pack/LAUNCHWITHCURSOR/SKILLS/frontend/verify-checklist.md
and SKILLS/frontend/README.md non-negotiables.

Audit the app against every checklist item. Fix only gaps.
Do not add features or start new product work.
When done, list what you checked and what you changed.
```
