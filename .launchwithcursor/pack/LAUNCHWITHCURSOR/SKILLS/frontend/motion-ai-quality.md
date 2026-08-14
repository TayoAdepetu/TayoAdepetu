# Motion, AI habits, Tailwind, and quality bar

Part of [frontend skills](./README.md). Cite as `motion-ai-quality.md` Rule N.

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

See **Rule 5 (Design Token Files)** in [design-system.md](./design-system.md) for file structure and sync requirements.

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
- mobile-ready when MVP-SPEC targets mobile users (PWA install UX only if spec requires it)
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
