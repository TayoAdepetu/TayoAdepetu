# Cursor Mastery for MVP Founders

**Goal:** Ship faster with fewer rewrites. Cursor builds; you direct.

---

## Step 1 — Before you start

If you have **not** installed Cursor on your computer yet, go to **Step 2** below first.

Once Cursor is installed, work through the rules in this guide as you build. You do not need to memorize everything on day one — come back here when you are prompting, testing, or fixing issues.

---

## Step 2 — Install Cursor on your laptop

Cursor is the AI code editor you will use for the rest of the playbook. Install it once on the computer you build on (Mac, Windows, or Linux).

### 1. Download Cursor

1. Go to [cursor.com/download](https://cursor.com/download)
2. Download the installer for your operating system (Mac, Windows, or Linux)

### 2. Install for your OS

**Mac**

1. Open the downloaded `.dmg` file
2. Drag **Cursor** into your **Applications** folder
3. Open Cursor from Applications (or Spotlight)

**Windows**

1. Run the downloaded `.exe` installer
2. Follow the on-screen prompts
3. Open Cursor from the Start menu

**Linux**

1. Use the installer from [cursor.com/download](https://cursor.com/download) for your distro when available, or download the AppImage
2. For AppImage: make it executable, then run it (`chmod +x Cursor-*.AppImage` then open the file)
3. Open Cursor from your applications menu

### 3. Sign in and open a folder

1. When Cursor opens, sign in with your Cursor account (create one free at [cursor.com](https://cursor.com) if needed)
2. If prompted, you can import settings from VS Code — optional
3. Use **File → Open Folder** and choose an empty folder (or your project folder later)

**Done when:** Cursor opens on your laptop and you can open a folder without errors.

---

## Rule 1 — Plan before code

Never say "build my app." Always:

1. Give Cursor `MVP-SPEC.md` + the skill guides (`FRONTEND.md`, `BACKEND.md`, `Infrastructure.md`)
2. Ask for a **phase plan** (`.md` files only)
3. Review the plan
4. Execute **one phase at a time**

---

## Rule 2 — One phase per session (usually)

Prompt template:

```
Execute Phase [N] from docs/plans/phase-[N].md only.
Follow LAUNCHWITHCURSOR/SKILLS/FRONTEND.md and LAUNCHWITHCURSOR/SKILLS/BACKEND.md rules cited in that plan.
Do not start Phase [N+1].
When done, list what to test manually.
```

---

## Rule 3 — Test after every phase

Do not wait until "everything is built." After each phase, run the app locally and check:

- [ ] App starts without errors
- [ ] New screens/flows from this phase work
- [ ] Mobile width looks acceptable (browser dev tools)

---

## Rule 4 — Fix pass (when something breaks)

Do not say "fix everything." Use:

```
Something is broken. Here is what I expected: [X].
Here is what happened: [Y].
Error message or screenshot: [paste].
Only fix this issue. Do not refactor unrelated code.
```

---

## Rule 5 — Use the best model for planning

- **Planning / architecture / hard bugs:** use the best available model in Cursor
- **Small UI tweaks / copy changes:** faster models are fine

---

## Rule 6 — Reference the skill docs explicitly

Bad: "Make it look professional."

Good: "Build the dashboard following FRONTEND.md Rules 6, 7, 12, 27. Cite rule numbers in your plan."

---

## Rule 7 — Never skip Infrastructure Phase 1 items

Before first deploy, Cursor must:

- Create `launchwithcursor.deploy.json` (or legacy `codeknowledge.deploy.json`)
- Create root `.env.example`
- Set Next.js `output: 'standalone'` for hosted apps
- Run `launchwithcursor-setup.md` workflow

See [Infrastructure.md](../SKILLS/Infrastructure.md).

---

## Rule 8 — Mobile strategy comes from MVP-SPEC

Read **MVP-SPEC.md** before choosing PWA, native mobile, or desktop-only.

- If the spec calls for PWA, use [PWA.md](../SKILLS/PWA.md) and prompt:

```
Implement PWA per LAUNCHWITHCURSOR/SKILLS/PWA.md for our customer-facing app (MVP-SPEC requires PWA).
```

- If the spec calls for native mobile, follow the spec — do not substitute PWA.
- If the spec is desktop-only, skip PWA install UX.

---

## Rule 9 — Commit often

After each working phase:

```
git add -A && git commit -m "Phase [N]: [short description]"
```

Push to GitHub before deploying.

---

## Rule 10 — Deploy is not magic

1. Push to GitHub
2. Dashboard → Deploy → provision database/redis/storage if needed
3. Fill env vars from `.env.example`
4. Deploy API first (if monorepo), then web
5. If deploy fails, paste the **build log** into Cursor with the fix-pass prompt (Rule 4)

---

## Common mistakes

| Mistake | Fix |
| ------- | --- |
| Building all phases without testing | Test after each phase |
| Vague prompts | Reference spec + rule numbers |
| Skipping design system page | FRONTEND.md Rule 4 — do it in Phase 1 |
| localhost API URL in production | Use full `https://` URL in `NEXT_PUBLIC_API_URL` |
| Ignoring MVP-SPEC mobile strategy | Read MVP-SPEC first — PWA only if spec requires it |
