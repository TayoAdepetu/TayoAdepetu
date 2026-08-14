# Visual foundation (type, color, layout, responsive)

Part of [frontend skills](./README.md). Cite as `visual-foundation.md` Rule N.

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

## 15. Prefer Minimalism Over Decorations

Avoid:

- excessive gradients
- heavy shadows
- too many **decorative** borders
- noisy backgrounds
- glassmorphism everywhere

Modern premium UI is:

- clean
- restrained
- focused

**Exception — forms:** a visible border or elevation on the form/auth card is a structural container, not decoration. Do not remove form shells to satisfy this rule. See [forms.md](./forms.md).

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
