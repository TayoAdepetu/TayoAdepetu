# PWA Rules for Cursor AI Assistant

**Default for every customer-facing MVP on LaunchWithCursor.** Mobile users get an installable web app — not a native App Store / Play Store build.

Read with [FRONTEND.md](./FRONTEND.md) Rule 3 (Mobile = PWA First).

---

## Core Philosophy

## 1. PWA Is the MVP Mobile Strategy

For LaunchWithCursor founders:

- **Do:** Responsive web + installable PWA
- **Do not:** Expo, React Native, or app store submission during MVP

**Why:** Faster iteration, one codebase, no store review delays, same deploy pipeline as web.

---

## When PWA Is Required

| App type | PWA required? |
| -------- | ------------- |
| Customer-facing Next.js / React app | **Yes** |
| Internal admin dashboard only | Optional |
| Marketing landing (no login) | Recommended |
| API-only (NestJS) | No |

Implement PWA in **Phase 4** before launch.

---

## Next.js App Router (preferred)

### Rule 2 — Web App Manifest

Create `app/manifest.ts` (or `app/manifest.json`):

```ts
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Your Product Name',
    short_name: 'Product',
    description: 'One line description',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
```

### Rule 3 — Icons

Place under `public/icons/`:

| File | Size | Purpose |
| ---- | ---- | ------- |
| `icon-192.png` | 192×192 | Android home screen |
| `icon-512.png` | 512×512 | Splash / install |
| `icon-512-maskable.png` | 512×512 | Android adaptive (safe zone centered) |

Use brand colors from design tokens (FRONTEND.md Rule 5).

### Rule 4 — Theme color in layout

In `app/layout.tsx`:

```tsx
export const metadata = {
  themeColor: '#000000', // match manifest theme_color
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Product',
  },
};
```

### Rule 5 — Service worker (offline shell)

**MVP scope:** cache app shell only — do not over-engineer offline data sync.

Options (pick one):

1. **`@serwist/next`** or **`next-pwa`** — if the project already uses one
2. **Minimal custom SW** — cache `/`, static assets, and offline fallback page

**Do not** cache API responses by default in MVP.

### Rule 6 — Install prompt UX

Add a dismissible banner on mobile after second visit:

- Text: "Install [Product] for quick access"
- Button: "Add to Home Screen"
- On iOS: show brief instructions (Share → Add to Home Screen) — iOS has no native install API

---

## React SPA (Vite)

### Rule 7 — Vite PWA plugin

```bash
pnpm add -D vite-plugin-pwa
```

Configure in `vite.config.ts` with `registerType: 'autoUpdate'`, manifest icons, and `display: 'standalone'`.

Serve production build via platform (`npx serve -s dist`) — manifest must be in `dist/` after build.

---

## Platform / deploy notes

- PWA requires **HTTPS** — LaunchWithCursor provides TLS automatically
- No extra manifest fields in `launchwithcursor.deploy.json` — PWA is app code, not platform config
- Re-deploy web service after changing `NEXT_PUBLIC_*` or manifest assets

---

## Testing checklist

- [ ] Chrome DevTools → Application → Manifest shows no errors
- [ ] Lighthouse PWA audit: installable (score not required to be 100 for MVP)
- [ ] Android Chrome: "Install app" appears
- [ ] iOS Safari: Add to Home Screen → opens standalone (no browser chrome)
- [ ] App works at 375px width with thumb-friendly tap targets (FRONTEND.md Rule 18)

---

## After MVP (not now)

When you have thousands of users and need push notifications or deep native APIs, revisit native apps. Until then, iterate on the PWA.

---

## Phase 4 acceptance criteria

**Done when:**

- [ ] Manifest loads on production URL
- [ ] Icons render correctly when installed
- [ ] Primary user flow works installed on a real phone
- [ ] Install prompt or iOS instructions shown to mobile users
