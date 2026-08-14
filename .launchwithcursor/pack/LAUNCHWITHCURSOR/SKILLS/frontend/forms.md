# Forms

Part of [frontend skills](./README.md). Cite as `forms.md` Rule 29.

Also read the [router non-negotiables](./README.md#non-negotiables-always-apply).

---

# Forms Rules

## 29. Forms Must Feel Effortless

Rules:

- minimal fields
- clear labels (above fields)
- inline validation
- helpful placeholders
- proper spacing
- clear success/error states

Long forms should use:

- steps
- sections
- progress indicators

### Form shell / Auth card (required)

Auth screens and other single-column focused forms must use a **FormShell** (or equivalent AuthCard):

- visible **border** and/or clear elevation so the form reads as a distinct container
- consistent padding (8px scale)
- max-width appropriate for a form (e.g. max-w-md / max-w-lg)
- primary submit button full-width or clearly dominant inside the shell

Do **not** omit the shell because Rule 15 discourages “too many borders.” Rule 15 targets decorative noise; the form container is structural.

### Heading alignment

When the layout is a **centered form card** (typical sign-in / sign-up):

- center the page title and short supporting subtitle above or inside the shell header
- left-align labels, inputs, helper text, and field errors inside the shell
- keep secondary links (e.g. “Forgot password?”) aligned consistently with the form content

When the form is embedded in a wider app layout (settings, multi-column), follow the parent layout’s alignment — do not center headings arbitrarily.

### Money amount fields

When a form asks for a monetary value, the input must use **major units** (the normal human figure — e.g. dollars, euros, naira), **not** minor units (cents, kobo, pence).

Rules:

- display and accept amounts as people expect: `1,250.50`, not `125050`
- format with **thousand separators** as the user types or on blur so large numbers stay readable (e.g. `10,000`, `1,250,000`)
- show the currency symbol or code near the field when helpful, but keep the typed value as the numeric amount in major units
- convert to minor units only at the API/storage boundary — never ask the user to think in cents

### Password fields

Every password input must include a **show/hide toggle** so the user can switch visibility on or off (e.g. eye icon).

Prefer a shared **PasswordField** component — do not scatter one-off password inputs without a toggle.

Rules:

- default to hidden (`type="password"` / secure entry)
- toggle must be keyboard-accessible with a clear label (e.g. "Show password" / "Hide password")
- use the same toggle on sign-up, sign-in, and change-password flows — including confirm-password fields
- show the toggle on web, PWA, and native (secure-text entry with visibility control) when those surfaces exist in MVP-SPEC

### Shared components

Ship once in Phase 1 (or first auth phase) and reuse:

- `PasswordField`
- `FormShell` / `AuthCard`
- text field + inline error pattern
- primary submit button

Live samples of these must appear on the design-system page ([design-system.md](./design-system.md) Rule 4).
