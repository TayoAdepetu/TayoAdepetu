# Launch Checklist

Run this **before** sharing your MVP with real users.

---

## Code & repo

- [ ] `launchwithcursor.deploy.json` committed (or legacy `codeknowledge.deploy.json`)
- [ ] `.env.example` complete — no secrets committed
- [ ] Latest code pushed to the branch you deploy from
- [ ] Migrations committed and applied in production
- [ ] **Monorepo:** each `packages/*` exports from `dist/`; **api, web, and admin** build scripts compile workspace deps; all builds pass after `rm -rf packages/*/dist`
- [ ] **Prisma:** `binaryTargets` includes `debian-openssl-3.0.x` for hosted Linux
- [ ] **NestJS API:** deploy log shows `docker build (NestJS slim)` (not multi-GB Nixpacks)

---

## Platform (LaunchWithCursor dashboard)

- [ ] All services deployed successfully (API before web in monorepos)
- [ ] API health/docs URL returns **JSON** in browser or curl (not Traefik plain-text 404)
- [ ] Database provisioned and tables visible under **Deploy → Database → Manage data**
- [ ] Redis provisioned (if `needsRedis: true`)
- [ ] R2 provisioned (if `needsStorage: true`)
- [ ] Env vars filled from `.env.example`
- [ ] `NEXT_PUBLIC_*` URLs point to production `https://` domains (not localhost)
- [ ] `CORS_ORIGIN` includes all web/admin origins (monorepo APIs)
- [ ] Custom domain + TLS working (if applicable)
- [ ] `TRUST_PROXY_HOPS=2` on API if behind Cloudflare proxy

---

## PWA & mobile

**Apply only when MVP-SPEC.md calls for PWA or mobile install UX.**

- [ ] Web app manifest loads (`/manifest.webmanifest` or Next.js manifest route)
- [ ] Icons 192×192 and 512×512 present
- [ ] "Add to Home Screen" works on iOS Safari and Android Chrome
- [ ] Core flows usable at 375px width
- [ ] Tap targets large enough (44px minimum)

---

## Product quality

- [ ] Sign up / login work in production
- [ ] Password fields have show/hide toggles (frontend/forms.md Rule 29)
- [ ] Auth forms use a bordered FormShell; centered titles when layout is a centered card
- [ ] Empty, loading, and error states on main screens (frontend/surfaces.md Rule 31)
- [ ] No broken links on main flows
- [ ] Forms validate with clear error messages
- [ ] Primary CTA obvious on each screen (frontend/ux-a11y.md Rule 25)
- [ ] Phase Verify checklist was run (frontend/verify-checklist.md)

---

## Security basics

- [ ] Passwords hashed (never stored plain text)
- [ ] JWT/session secrets set in dashboard (not in Git)
- [ ] HTTPS only in production
- [ ] File uploads validated (type + size) if applicable

---

## Smoke test script

Walk through in production (desktop + phone):

1. Land on homepage
2. Complete primary user flow from MVP-SPEC
3. Sign up / log in
4. Perform one action that saves data
5. Refresh — data still there
6. Log out and log back in

---

## After launch

- [ ] Share with 5–10 target users
- [ ] Optionally hire one or more **manual testers** on the project **QA / Testers** page (collaborative or independent mode)
- [ ] Log feedback in a simple doc or Notion
- [ ] Fix critical bugs before adding Nice-to-Have features
- [ ] Use mentorship for blockers > 2 hours — don't stay stuck
- [ ] Manual testing marketplace is **not** mentorship — it is paid QA
