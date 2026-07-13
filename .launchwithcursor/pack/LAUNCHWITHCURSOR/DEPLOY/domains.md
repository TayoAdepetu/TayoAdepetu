# Domains for founders

Custom domains make your app feel professional. LaunchWithCursor can host on a subdomain immediately; add your own domain when you are ready to share widely.

---

## Subdomain vs custom domain

| Option | When to use |
|--------|-------------|
| **Platform subdomain** | Testing, demos, first deploy — works in minutes |
| **Domain you buy** | Public launch, marketing site, branded email |
| **Domain you already own** | Transfer or point DNS to LaunchWithCursor |

---

## Buy a domain in the dashboard

1. Go to **Domains** in your workspace sidebar
2. Search for an available name
3. Purchase with wallet funds
4. Attach to your hosted app: **Deploy → Domains** → select service → add hostname

TLS certificates are provisioned automatically for attached domains.

---

## Use a domain you already own

1. **Domains → Transfer** — start transfer to Cloudflare registrar (if eligible), or
2. Add DNS records at your current registrar pointing to the platform (manual mode on **Deploy → Domains**)

For email sending, verify the same domain under **Deploy → Email**.

---

## Checklist before going live on a custom domain

- [ ] Web service deployed and healthy
- [ ] Domain attached to the **website** service (not API internal hostname)
- [ ] `NEXT_PUBLIC_*` URLs updated to `https://yourdomain.com`
- [ ] `CORS_ORIGIN` includes the new web origin
- [ ] Smoke test on phone and desktop

---

## Cursor prompt (update URLs after domain change)

```
We attached production domain [yourdomain.com]. Update all NEXT_PUBLIC_* and CORS-related env vars in .env.example and document what to set on the dashboard. Do not change business logic.
```

---

## More help

- Dashboard: `/orgs/[your-org]/domains`
- [Deploy troubleshooting](./troubleshooting.md)
- [Launch checklist](./launch-checklist.md)
