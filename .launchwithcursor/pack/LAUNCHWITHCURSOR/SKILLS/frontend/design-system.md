# Design system and components

Part of [frontend skills](./README.md). Cite as `design-system.md` Rule N.

---

# Design System Rules

## 4. Design System Page (Required)

Every project must include a dedicated **design-system page** (or route) that serves as the living branding guide for the product.

This page is not optional. It must be created early in the project — ideally in the first development phase — and kept in sync with the codebase as styling evolves.

The design-system page must document:

- brand identity overview (product tone, visual direction, reference products)
- typography (primary and secondary fonts, scale, weights, line-heights)
- color palette (primary, accent, neutrals, semantic colors) with swatches
- spacing, radii, shadows, and border conventions
- motion and interaction principles
- iconography rules

It must also include **live samples** of major UI components, including at minimum:

- buttons (primary, secondary, ghost, destructive, loading, disabled)
- cards (default, elevated, interactive, empty)
- inputs and form controls (including password field with show/hide — see [forms.md](./forms.md))
- modals and dialogs
- navigation elements (navbar, sidebar, tabs)
- tables and list items
- empty, loading, and error states

These samples must use the same components and tokens as production UI — not one-off demo markup.

The design-system page is the visual source of truth for stakeholders. When tokens or components change, this page must be updated in the same change.

---

## 5. Design Token Files (Single Source of Truth)

Fonts, colors, spacing, radii, shadows, typography scales, and other styling decisions must **not** be scattered across components.

Create dedicated token file(s) that centralize all project styling. Examples (adapt to stack):

- `src/styles/tokens/colors.ts` (or `.css` / Tailwind theme extension)
- `src/styles/tokens/typography.ts`
- `src/styles/tokens/spacing.ts`
- `src/styles/tokens/radii.ts`
- `src/styles/tokens/shadows.ts`

Or a consolidated theme file (e.g. `theme.ts`, `globals.css` CSS variables, or `tailwind.config` theme extension).

Rules:

- components and pages consume tokens — they do not hardcode brand values
- changing a token in one place must propagate everywhere, including the design-system page
- the design-system page must read from the same token source (import swatches, render components built with tokens)
- document each token with a short comment or label where helpful (e.g. `--color-primary: ...` /* CTA, links */)

This makes rebranding, palette tweaks, and font changes scalable: update tokens once, verify on the design-system page, ship.

---

## 6. Component-First Development

Always build UI from reusable components.

Never repeat raw UI structures multiple times.

Preferred structure:

- primitives
- shared components
- feature components
- page sections
- full pages

Example:

- Button
- Input
- PasswordField (with show/hide — never raw password inputs in pages)
- FormShell / AuthCard
- Modal
- Card
- Table
- EmptyState
- DashboardShell
- PricingCard
- StatCard

Every project should evolve into a reusable internal UI library.

---

## 7. Use shadcn/ui Whenever Possible

Default to shadcn components before building custom ones.

Benefits:

- accessibility
- consistency
- speed
- modern patterns
- composability

Customize them to fit the product brand.

Do NOT leave apps looking like default shadcn templates.
