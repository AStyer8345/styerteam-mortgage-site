> Current migration contract (verified November 3, 2026): canonical origin `https://styerteam.com`; public brand **The Styer Team, Powered by Go Rascal Inc.**; legal entity **Go Rascal Inc.**, company NMLS **2072896**; Adam Styer, individual NMLS **513013**, **512-956-6010**, **adamstyer@gorascal.com**. Secure application: `https://gorascal.my1003app.com/513013/register`, verified to display Adam’s name, NMLS and phone. This contract supersedes older local/global branding and hosting notes. Do not restore retired affiliation, license, phone, email or application destinations.

Read /Users/adamstyer/Documents/GOALS.md before starting any session. Interactive sessions must serve current goals — if your task conflicts, log it to TODO.md under NEEDS ADAM and stop. Automated/scheduled tasks continue unless GOALS.md explicitly pauses them.

# styerteam.com — Claude Code Instructions

## Daily Operating System

This repo is a member project of the Daily Operating System at `/Users/adamstyer/Documents/Daily Operating System/`. It is reachable at `<DOS>/projects/styer-mortgage-site/` (symlink back to here).

Sister projects in the network:
- `loanos-clone` · `loanos-marketing` (the product Adam is building)
- `rancho-moonrise` · `adobe-creek-ranch` (STR client sites)
- `client-ops` (ops hub — Styer Mortgage is an active client in the registry)

Top-of-hierarchy reads:
- `/Users/adamstyer/Documents/GOALS.md` — weekly direction (symlink → DOS GOALS.md)
- `/Users/adamstyer/Documents/Daily Operating System/CONTEXT.md` — master state
- `/Users/adamstyer/Documents/Daily Operating System/TODO.md` — master task list

## Read First

1. `CONTEXT.md` — current site status, blockers, session rules
2. Global conventions in `/Users/adamstyer/Documents/CLAUDE.md` apply (voice, defaults, trigger phrases)

## Project

- Repo: `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site`
- Stack: Static HTML/CSS/JS — no framework, no CMS
- Hosting: Vercel project `styerteam-site` (`prj_oPet4IOgPuN9hDtBFYcfbEi3HJEg`); verify the current production deployment and Git ref before releasing.
- Canonical domain: https://styerteam.com; retain both styermortgage.com host redirects, paths and query strings.
- Dev server: `.claude/site-server.js` → port 8766

## Key Rules

- Match existing HTML/CSS patterns exactly before writing new pages
- Preserve existing form names, fields, POST actions and attribution. Vercel bridges `/` form posts and `/.netlify/functions/lead-intake` to the existing LoanOS capture path; Netlify markup remains for compatibility.
- Never add CSS frameworks, JS libraries, or npm packages without Adam's approval
- Never modify GTM container snippet or form field names on landing pages
- Display name: "The Styer Team, Powered by Go Rascal Inc." (footer/nav/OG meta)
- Legal entity name (disclaimers and JSON-LD legalName): "Go Rascal Inc."
- Company NMLS: 2072896; keep separate from Adam’s individual NMLS.
- Retain existing personal-brand social profile URLs; do not infer new profile links.
- Adam's personal NMLS: 513013 (unchanged)

- Adam's direct phone: (512) 956-6010
- Public email: adamstyer@gorascal.com
- Never display raw loan application URL — use anchor text
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`
- New blog posts must be added to `blog.html` noscript block + CollectionPage schema
- Realtor updates (`/realtor-updates/*.html`) must ALSO be registered in the blog index — add to `blog/manifest.json` (drives the grid; sort by date desc), `blog.html` noscript block, and CollectionPage ItemList schema. Keep their canonical URL at `/realtor-updates/` — do NOT move the file into `/blog/`.
- **Never mark a briefing ticket "done" unless every file touched for that ticket is committed in the same session.** Marking tracking metadata as done while leaving the work product uncommitted creates silent drift between the ticket system and `main`. If a ticket's files aren't ready to commit, leave the ticket status untouched. Before marking anything done, run `git status` and confirm a clean tree (or that the relevant files are staged in the commit you're about to make).

## Deploy Workflow

1. Inspect Vercel’s production deployment, connected repository and commit; do not assume the default branch is live.
2. Run `CONTEXT=deploy-preview npm run build` and relevant routing, affiliation and form tests.
3. Deploy the reviewed commit to Vercel and verify READY, `/api/version`, live pages and redirects.
4. Never submit real or fake production leads during QA. Use mocked local form tests.

## End-of-Session

1. Update `CONTEXT.md` — replace, don't append. Keep under 100 lines.
2. Update `CHANGELOG.md` — append new dated entry
3. `git add`, `git commit`, `git push`
4. Verify Vercel production deploy and live contracts
