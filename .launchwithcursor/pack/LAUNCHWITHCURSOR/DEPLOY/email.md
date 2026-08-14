# Email for founders

Send transactional email (welcome, password reset, receipts) from your app using LaunchWithCursor hosted email.

---

## When you need email

- User sign-up verification
- Password reset links
- Order or booking confirmations
- Admin notifications

If your MVP-SPEC does not require email in v1, skip until Phase 5 — do not over-build early.

---

## Setup steps (dashboard)

1. **Deploy → Email** → Provision email for your app
2. **Add domain** — enter an **apex domain** (`yourdomain.com`) or **subdomain** (`mail.yourdomain.com`). Use whichever matches your `From` address. A subdomain works even if another project already uses the apex on the platform.
3. **DNS records** — copy from the dashboard; use **Add + one-click DNS** only if the zone is in Cloudflare via the platform, otherwise use **Add domain** and paste records manually
4. **Verify domain** — wait for DNS propagation (often 15–60 minutes)
5. **Env vars** — set SMTP/API keys the dashboard shows on the API service

---

## Env vars (typical)

Your `.env.example` should document keys without secrets:

```env
# Set on dashboard — do not commit values
EMAIL_FROM=noreply@yourdomain.com
# Provider-specific keys injected by platform or set manually
```

Follow **Infrastructure.md** for which keys your stack expects.

---

## Test before launch

1. Send a test message from the dashboard or a staging route
2. Check **Deploy → Email → Messages** for delivery status
3. Confirm mail is not in spam (SPF/DKIM records green in dashboard)

---

## Cursor prompt

```
Set up transactional email per LAUNCHWITHCURSOR/SKILLS/Infrastructure.md email section.
Use env vars from .env.example only — no hardcoded secrets.
Add a simple welcome or password-reset flow if MVP-SPEC requires it.
```

---

## More help

- [Domains for founders](./domains.md)
- [Deploy troubleshooting](./troubleshooting.md)
- Dashboard: **Deploy → Email**
