# Frontend Design & UI/UX Rules for Cursor AI Assistant

You should treat this as a long-term frontend operating system — not just “design tips.”
The goal is:

- modern UI
- premium feel
- scalable design decisions
- consistency across projects
- fast development with AI
- industry-standard UX patterns
- clean developer experience

Use this document as your permanent frontend framework for all future projects.

When creating a **project plan** or outlining **development phases**, the AI must read and apply these rules — and explicitly reference the relevant rule numbers in each phase (see **Project Planning Rules** below).

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

## 3. Mobile = PWA First (Not Native Apps)

For MVP mobile experiences on LaunchWithCursor:

- **Default:** Progressive Web App (installable from the browser)
- **Stack:** Same React / Next.js app — responsive + PWA manifest + service worker
- **Do not use** React Native, Expo, or app store builds during MVP

Implement PWA in Phase 4 before launch. Follow [PWA.md](./PWA.md) for manifest, icons, install UX, and testing.

Native apps are a post-MVP decision (after product-market fit) — not part of the founder guide path.

---

# Project Planning Rules

### Reference Frontend Rules in Every Development Phase

When the AI outlines a project plan, roadmap, or development phases (weeks, milestones, sprints), **each phase must explicitly reference the applicable rules from this document**.

For **hosting, env vars, database, Redis, R2, deploy manifest, and PWA** requirements, also apply [`Infrastructure.md`](./Infrastructure.md) and [`PWA.md`](./PWA.md) from Phase 1 onward — especially Infrastructure Rules 2–4, 13, and the Phase 1 checklist.

Do not treat frontend standards as implicit. Call them out so implementation stays consistent.

For each phase, include a **Frontend compliance** subsection that lists:

- which rules from `FRONTEND.md` apply to that phase
- concrete deliverables tied to those rules (e.g. token files, design-system page updates, component samples)
- acceptance criteria for visual and UX quality

Example (adapt to the project):

**Week 1 – Foundation**

Frontend compliance:

- Rule 5 — create design token files (`colors`, `typography`, `spacing`, etc.)
- Rule 4 — scaffold the design-system page with token swatches and initial button/card samples
- Rule 8 — research and document font choices with rationale for this product
- Rule 12 — establish 8px spacing scale in tokens
- Rule 18 — mobile-first layout conventions documented on the design-system page

**Week 5 – Marketing Website & Admin Dashboard**

Frontend compliance:

- Rule 6 — build UI from shared components only; no one-off page markup
- Rule 7 — extend shadcn primitives with project tokens
- Rule 27 — dashboard information hierarchy
- Rule 4 — update design-system page with any new components shipped this phase

Every phase that touches UI must cite at least the rules relevant to that work. Backend-only phases may note “N/A — no UI deliverables” or reference rules only if shared tokens or API-driven content affect the frontend.

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
- inputs and form controls
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
- document each token with a short comment or label where helpful (e.g. `--color-primary: ...` /_ CTA, links _/)

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

---

# Typography Rules

## 8. Strict Typography System

Typography creates professionalism more than colors.

Never randomly choose text sizes.

Use a strict scale.

Recommended scale:

- text-xs
- text-sm
- text-base
- text-lg
- text-xl
- text-2xl
- text-4xl
- text-5xl

Rules:

- one primary font
- maximum two fonts
- avoid decorative fonts
- maintain consistent font weights
- use line-height generously

### Font Selection Requires Research

When the AI creates a **project plan** (or begins a new project), it must **research and justify font choices** that suit the specific product — its audience, industry, tone, and platform — rather than defaulting blindly to a generic stack.

Consider:

- product personality (premium, playful, editorial, utilitarian, etc.)
- readability on target devices (mobile vs. web vs. dashboard)
- pairing harmony between heading and body fonts
- licensing and performance (web font load, variable fonts)
- accessibility (x-height, weight range, legibility at small sizes)

Document the chosen fonts and rationale in the project plan and on the design-system page.

**The font list below is reference only — not a rigid law.** Use it as a starting point when research supports it; choose different fonts when the project calls for it.

Reference fonts (examples, not mandates):

- Inter
- Geist
- Satoshi
- Plus Jakarta Sans
- General Sans

---

## 9. Visual Hierarchy Is Mandatory

Every screen must clearly communicate:

1. primary action
2. secondary action
3. supporting information

Use:

- size
- spacing
- contrast
- opacity
- borders
- font weight

Do NOT rely only on colors.

---

# Color Rules

## 10. Limit Color Palette

Use:

- 1 primary color
- 1 accent color
- neutrals
- semantic colors

Avoid rainbow UI.

Premium products usually use restrained color systems.

---

## 11. Prefer Neutral-Heavy Interfaces

Use neutrals for:

- surfaces
- cards
- layouts
- containers

Use brand colors sparingly:

- CTAs
- highlights
- active states
- charts

This creates modern SaaS aesthetics.

---

# Spacing & Layout

## 12. Use the 8px Spacing System

All spacing should be multiples of 4 or 8.

Examples:

- p-2
- p-4
- p-6
- p-8
- gap-4
- gap-6
- gap-8

Avoid random values.

Consistency creates polish.

---

## 13. Prioritize Whitespace

Whitespace is not wasted space.

Crowded interfaces look amateur.

Use generous:

- padding
- margins
- section spacing
- breathing room

Rule:
If a screen feels crowded, increase spacing before changing colors.

---

## 14. Respect Layout Containers

Never let content stretch endlessly.

Use max-width containers:

- max-w-7xl
- max-w-5xl
- max-w-3xl

Readable interfaces feel premium.

---

# Modern UI Rules

## 15. Prefer Minimalism Over Decoration

Avoid:

- excessive gradients
- heavy shadows
- too many borders
- noisy backgrounds
- glassmorphism everywhere

Modern premium UI is:

- clean
- restrained
- focused

---

## 16. Use Depth Carefully

Use subtle:

- shadows
- borders
- blur
- elevation

Do not overdo effects.

A little depth > excessive visual noise.

---

## 17. Design for Real Content

Never design only with placeholder text.

Think about:

- empty states
- long names
- huge tables
- loading states
- errors
- missing images
- mobile constraints

Real-world robustness is part of great UX.

---

# Responsiveness Rules

## 18. Mobile-First Always

Start with mobile layouts first.

Then scale upward.

Avoid designing desktop first.

---

## 19. Let AI Handle Responsiveness — But Verify

AI can generate responsive layouts quickly, but:

- check spacing manually
- check overflow
- verify typography scaling
- verify tap targets
- verify navbar behavior

Never trust responsiveness blindly.

---

## 20. Avoid Complex Breakpoint Logic

Prefer:

- flex
- grid
- wrapping
- stacking

Over:

- excessive breakpoint overrides

Responsive simplicity scales better.

---

# Animation Rules

## 21. Use Motion Intentionally

Animations should:

- guide attention
- improve clarity
- communicate state
- improve perceived performance

Avoid animations that exist only for decoration.

---

## 22. Standard Animation Rules

Preferred animation style:

- fast
- smooth
- subtle

Recommended durations:

- 150ms
- 200ms
- 300ms

Avoid slow animations.

---

## 23. Animate These Things

Good candidates:

- modals
- dropdowns
- page transitions
- hover states
- accordions
- loading skeletons
- sidebar expansion
- notifications

Avoid animating everything.

---

# UX Rules

## 24. Reduce Cognitive Load

Users should not think too hard.

Avoid:

- too many actions
- too many colors
- too many cards
- too much text
- overly complex navigation

Clarity beats creativity.

---

## 25. One Primary Action Per Section

Every screen should have a dominant action.

Example:

- Create Project
- Continue
- Publish
- Save
- Upgrade

Button labels must use **title case**: every word starts with a capital letter (e.g. "Save Changes", "Add to Cart" — not "Save changes" or "add to cart").

Avoid competing CTAs.

---

## 26. Accessibility Is Mandatory

Always:

- use semantic HTML
- ensure keyboard navigation
- maintain color contrast
- use proper labels
- use focus states
- support screen readers

Accessibility improves product quality.

---

# Dashboard Rules

## 27. Dashboards Must Prioritize Information Hierarchy

Order:

1. key metrics
2. important actions
3. secondary analytics
4. supporting content

Do not overload dashboards.

---

## 28. Avoid Excessive Cards

New designers overuse cards.

Instead:

- group related content
- simplify layouts
- reduce unnecessary containers

Too many cards create noise.

---

# Forms Rules

## 29. Forms Must Feel Effortless

Rules:

- minimal fields
- clear labels
- inline validation
- helpful placeholders
- proper spacing
- clear success/error states

Long forms should use:

- steps
- sections
- progress indicators

### Money amount fields

When a form asks for a monetary value, the input must use **major units** (the normal human figure — e.g. dollars, euros, naira), **not** minor units (cents, kobo, pence).

Rules:

- display and accept amounts as people expect: `1,250.50`, not `125050`
- format with **thousand separators** as the user types or on blur so large numbers stay readable (e.g. `10,000`, `1,250,000`)
- show the currency symbol or code near the field when helpful, but keep the typed value as the numeric amount in major units
- convert to minor units only at the API/storage boundary — never ask the user to think in cents

### Password fields

Every password input must include a **show/hide toggle** so the user can switch visibility on or off (e.g. eye icon).

Rules:

- default to hidden (`type="password"` / secure entry)
- toggle must be keyboard-accessible with a clear label (e.g. "Show password" / "Hide password")
- use the same toggle on sign-up, sign-in, and change-password flows — including confirm-password fields

---

# Table Rules

## 30. Tables Must Be Readable

Rules:

- zebra striping optional
- avoid dense spacing
- sticky headers when necessary
- actions grouped consistently
- search + filters always accessible

Mobile tables should transform intelligently.

---

# Empty & Loading States

## 31. Never Leave Dead Space

Always design:

- empty states
- skeleton loaders
- onboarding states
- no-results states
- error states

Polished products handle edge states beautifully.

---

# AI-Specific Instructions

## 32. AI Must Avoid Generic Template UI

Avoid:

- obvious template layouts
- repetitive hero sections
- overused gradients
- generic startup illustrations

Aim for:

- refined spacing
- premium typography
- thoughtful hierarchy
- modern interaction design

---

## 33. AI Must Reuse Existing Patterns

Before creating new UI:

1. inspect current patterns
2. reuse existing spacing
3. reuse existing typography
4. reuse existing components

Consistency > novelty.

---

## 34. AI Should Prioritize Maintainability

Prefer:

- clean Tailwind
- reusable variants
- composable components
- semantic naming

Avoid:

- huge JSX files
- repeated class names
- deeply nested structures

---

# Tailwind Rules

## 35. Tailwind Standards

Prefer:

- utility composition
- cn() helpers
- cva() variants

Avoid:

- massive inline class chaos
- arbitrary values everywhere
- inconsistent spacing

---

## 36. Use Design Tokens

See **Rule 5 (Design Token Files)** for file structure and sync requirements.

In every component:

- consume tokens — do not hardcode brand values
- avoid repeating the same color, font, or spacing literals

Centralize:

- colors
- spacing
- radii
- shadows
- typography

Avoid hardcoding design decisions repeatedly.

---

# Premium Feel Rules

## 37. Premium UI Comes From:

- spacing
- typography
- restraint
- consistency
- motion
- hierarchy

NOT from:

- excessive effects
- random gradients
- too many colors
- visual overload

---

# Product Thinking Rules

## 38. Always Think Like a Product Designer

Before building any screen, ask:

- What is the user's goal?
- What is the fastest path?
- What information matters most?
- What can be removed?
- What action should stand out?

---

# Final Non-Negotiable Rules

## 39. Every Interface Must Be:

- responsive
- accessible
- scalable
- modern
- clean
- performant
- maintainable

---

## 40. Simplicity Is a Competitive Advantage

Do not confuse complexity with sophistication.

The best modern products feel:

- obvious
- calm
- fast
- focused

---

## 41. Always Optimize for Production Quality

Every UI should look:

- startup-ready
- investor-ready
- installable PWA-ready (mobile home screen)
- enterprise-capable

Never ship “AI-looking” interfaces.

---

## 42. Default Visual Direction

Target aesthetic:

- Linear
- Stripe
- Notion
- Vercel
- Raycast
- Arc Browser
- Airbnb
- Framer

Clean, modern, restrained, premium.
