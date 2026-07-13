# Component Library

This folder is my **portable collection of favorite AI-generated components**. I copy `component-library/` between projects — it is not tied to any single repo. Each file captures a component I liked and may want again elsewhere.

Paste this file when starting a session, then tell me what you need.

---

## What this folder is

- A curated stash of UI sections I want to reuse (sliders, timelines, cards, etc.)
- One `{name}-prompt.md` per component — the prompt _is_ the portable artifact
- Exported as-is to new projects; I add new favorites over time, I don't replace the whole folder each time
- **Nothing in these files assumes the target project exists** — imports, paths, config files, and design tokens from the project where a component was built may not exist elsewhere

---

## Two ways to use this with you

### A. Add a component to the collection

When I like a component in the current project and want to keep it:

1. Read the **live source file** in the repo — not memory
2. Create `component-library/{kebab-case-name}-prompt.md`
3. Keep it lean — the component source _is_ the spec
4. Write for **portability**, not for the origin project (see structure below)

> "Add **TestimonialSlider** to my component library."

### B. Use the collection in a new project

When I've copied this folder into another project and want to implement something from it:

1. Read the matching `{name}-prompt.md` from `component-library/`
2. **Do not copy imports and paths blindly** — map dependencies to what exists in the current project, or create equivalents
3. Replace design tokens (`gtn-primary`, etc.) with the target project's colors
4. Wire content using however _this_ project handles data (props, config, CMS, etc.)
5. Match the reference component's structure, layout, and behavior

> "Implement **testimonial-slider** from my component library on the homepage."

> "Implement these from my component library: **TestimonialSlider**, **ServiceProcess** — adapt to this project's stack."

---

## Required structure for each `{name}-prompt.md`

### 1. Title + short intro (3–5 lines)

- What the section does (project-agnostic description)
- Typical use case (homepage, service page, etc.)
- Stack it expects (React, Tailwind, Framer Motion, etc.)
- Note: code below is a snapshot from a specific project — adapt before use

### 2. Reference component

- Full source in one `tsx` / `jsx` fenced code block
- Preserve the original code as-is (including origin-project imports and tokens) — that is the visual/behavioral reference

### 3. Dependencies to adapt

List what the reference code assumes that **may not exist** in another project:

- Custom wrappers (e.g. `FadeInView`, `Section`, `Container`)
- UI primitives (e.g. shadcn `Button`)
- Motion utilities (e.g. `slideFade` variants)
- Design tokens / Tailwind classes (e.g. `gtn-primary`, `text-lead`)
- Utils (e.g. `cn`)

Say whether each can be swapped for a local equivalent, inlined, or installed.

### 4. Wiring (minimal, generic)

- Props/types the component expects
- Example **content shape** only — not origin-project file paths
- One generic usage snippet (pass props from wherever the target project gets data)

**Do not include:**

- Paths like `src/config/gtn/home.ts` or "live source of truth" pointers
- References to origin-project templates, routes, or config files
- Brand-specific copy tied to one client

No long prose specs unless I ask.

---

## Naming

Use `{component-name}-prompt.md` in kebab-case:

| Component               | File                                |
| ----------------------- | ----------------------------------- |
| `TestimonialSlider`     | `testimonial-slider-prompt.md`      |
| `ServiceProcess`        | `service-process-prompt.md`         |
| `EcosystemValuesSlider` | `ecosystem-values-slider-prompt.md` |

---

## Quality bar

- File length ≈ component length + ~40 lines (intro, dependencies, generic wiring)
- Code block = actual source snapshot, not a summary
- When **adding**: capture from live file, but document portability gaps
- When **implementing**: adapt dependencies first, then drop in the component logic
- No separate `.tsx` copy inside `component-library/` — the markdown prompt is enough

---

## If something is missing

- Component doesn't exist in the current project → say so; ask which file to use, or offer to build it first then add to the library
- Prompt doesn't exist in the folder yet → offer to create it from a live component, or implement from scratch if I describe what I want
- A dependency has no equivalent in the target project → create a minimal local version or suggest the closest substitute before implementing
