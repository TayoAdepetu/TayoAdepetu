# Cursor Mastery for MVP Founders

**Goal:** Open Cursor, pull your platform plans, implement phases. You are not expected to become a software engineer.

---

## Step 1 — Install Cursor on your laptop

1. Go to [cursor.com/download](https://cursor.com/download)
2. Install for Mac, Windows, or Linux
3. Sign in with your Cursor account
4. **File → Open Folder** — empty folder (Path A) or your existing project (Path B)

**Done when:** Cursor opens a folder without errors.

---

## Step 2 — Extension + Spec & Plans (not manual skill shopping)

1. Install the **LaunchWithCursor** extension from the dashboard setup guide
2. Run **LaunchWithCursor: Sign In**
3. The extension installs `.launchwithcursor/pack/LAUNCHWITHCURSOR/` (skills, METHOD, SETUP)
4. Run **LaunchWithCursor: Pull Spec & Plans** after you have generated MVP-SPEC and phase plans on the website

You do **not** need to paste `FRONTEND.md`, `BACKEND.md`, or `Infrastructure.md` into chat yourself. `AGENTS.md` and the phase prompts tell Cursor which skill files to use.

---

## Step 3 — Implement one phase per chat

On [Build phases](/guides/build-phases), copy the implement prompt for Phase 1, paste into Cursor, let it finish. Then Phase 2, and so on, ending with **Phase Verify**.

Template (if you type it yourself):

```
Implement phase [N] from docs/plans/phase-[N].md only.
Follow AGENTS.md and the frontend skills cited in that plan.
Self-check the phase done-when before claiming done.
Do not start the next phase.
```

**Do not** ask Cursor to “build the whole app” in one message.

**You do not need to test the app after every phase.** Cursor must self-check each phase’s done-when. You smoke-test (or hire testers) after Phase Verify or on a staging deploy.

---

## Step 4 — Fix pass (when something breaks)

```
Something is broken. Here is what I expected: [X].
Here is what happened: [Y].
Error message or screenshot: [paste].
Only fix this issue. Do not refactor unrelated code.
```

---

## Step 5 — Models

- Use a strong model in Cursor for hard bugs if needed
- **Phase plans and MVP-SPEC are generated on LaunchWithCursor** with the platform’s best available models — prefer that over inventing plans in Cursor
- Optional: ask Cursor to tweak a plan file later; not required for the first build

---

## Step 6 — Commit and deploy

After phases + verify + setup confirmation:

```
git add -A && git commit -m "MVP: initial phases"
```

Push to GitHub → LaunchWithCursor dashboard → Deploy.

If deploy fails, paste the **build log** into Cursor with:

```
Deploy failed. Here is the build log:
[paste log]

Fix only what blocks deploy. Follow Infrastructure.md rules.
```

---

## Common mistakes

| Mistake | Fix |
| ------- | --- |
| Hand-writing plans in Cursor | Generate plans on [Build phases](/guides/build-phases) |
| Pasting every skill file manually | Use extension pack + AGENTS.md |
| Testing every phase as a founder | Wait until Phase Verify / staging |
| One mega-prompt for the whole MVP | One phase per Cursor chat |
| Skipping Phase Verify | Always run the verify checklist phase last |
| Ignoring MVP-SPEC mobile strategy | Spec decides PWA / native / desktop |
