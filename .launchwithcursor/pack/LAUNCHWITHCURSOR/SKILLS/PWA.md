# PWA Rules for Cursor AI Assistant

**Use this file when MVP-SPEC.md calls for a PWA or installable web app.** Do not add PWA work if the spec says desktop-only, responsive web only, or native mobile instead.

Read with [frontend/README.md](./frontend/README.md) / Rule 3 in [frontend/stack-and-planning.md](./frontend/stack-and-planning.md) (Mobile strategy follows MVP-SPEC). Legacy: [FRONTEND.md](./FRONTEND.md).

---

## Core Philosophy

## 1. MVP-SPEC Decides; This File Implements PWA

**MVP-SPEC.md is the source of truth** for whether the product is:

- an installable PWA
- a responsive web app without install UX
- a native mobile app (Expo, React Native, etc.)
- desktop-only

When the spec calls for PWA:

- **Do:** Responsive web + installable PWA
- **Follow:** the rules below for manifest, icons, install UX, and testing

When the spec calls for native mobile, follow the spec's stack and flows — do not substitute PWA.

---

## When to Apply These Rules

| MVP-SPEC says | Apply PWA.md? |
| ------------- | ------------- |
| PWA / installable web app | **Yes** |
| Responsive web, mobile-friendly (no install) | Partial — skip install prompt; still use mobile-first UI |
| Native mobile app | **No** — follow MVP-SPEC instead |
| Desktop-only / internal admin | **No** unless spec asks for install UX |
| API-only (NestJS) | No |

Implement PWA in **Phase 4** only when MVP-SPEC requires it.

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

Use brand colors from design tokens ([frontend/design-system.md](./frontend/design-system.md) Rule 5).

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
- [ ] App works at 375px width with thumb-friendly tap targets ([frontend/visual-foundation.md](./frontend/visual-foundation.md) Rule 18)

---

## After MVP (not now)

When MVP-SPEC or product traction calls for capabilities beyond the current mobile strategy (e.g. push notifications, deep native APIs), update MVP-SPEC and revisit the approach.

---

## Phase 4 acceptance criteria

**Done when:**

- [ ] Manifest loads on production URL
- [ ] Icons render correctly when installed
- [ ] Primary user flow works installed on a real phone
- [ ] Install prompt or iOS instructions shown to mobile users
