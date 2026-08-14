# Surfaces (dashboards, tables, empty and loading)

Part of [frontend skills](./README.md). Cite as `surfaces.md` Rule N.

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

### Skeleton loading for fetched lists (required)

Whenever a **list** (or table of rows) is retrieved asynchronously — from an API, TanStack Query, server action, loader, etc. — and will be shown in the UI, **always use skeleton loading boxes while the data is still being retrieved**.

Rules:

- show skeleton placeholders that mirror the final list/table layout (row shape, density, approximate item count) — not a blank screen, spinner-only, or layout jump
- keep skeletons until the fetch settles (success or error); then swap to real content, empty state, or error state
- prefer shared skeleton components (e.g. shadcn `Skeleton`) so list loading looks consistent across the app
- apply the same rule to cards-in-a-grid, feeds, and any repeated item list — not only classic `<ul>` / table UIs

Do not ship list screens that flash empty or sit idle with no structure while data loads.
