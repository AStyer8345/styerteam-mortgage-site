Read /Users/adamstyer/Documents/GOALS.md before starting any session. Interactive sessions must serve current goals — if your task conflicts, log it to TODO.md under NEEDS ADAM and stop. Automated/scheduled tasks continue unless GOALS.md explicitly pauses them.

# styermortgage.com — Claude Code Instructions

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
- Hosting: Netlify — auto-deploy on GitHub push
- Domain: styermortgage.com
- Dev server: `.claude/site-server.js` → port 8766

## Key Rules

- Match existing HTML/CSS patterns exactly before writing new pages
- Use Netlify Forms for all form capture (`netlify` attribute + hidden `form-name` input)
- Never add CSS frameworks, JS libraries, or npm packages without Adam's approval
- Never modify GTM container snippet or form field names on landing pages
- Never use "The Styer Team" — always "Adam Styer | Mortgage Solutions LP"
- Never display raw loan application URL — use anchor text
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`
- New blog posts must be added to `blog.html` noscript block + CollectionPage schema
- **Never mark a briefing ticket "done" unless every file touched for that ticket is committed in the same session.** Marking tracking metadata as done while leaving the work product uncommitted creates silent drift between the ticket system and `main`. If a ticket's files aren't ready to commit, leave the ticket status untouched. Before marking anything done, run `git status` and confirm a clean tree (or that the relevant files are staged in the commit you're about to make).

## Deploy Workflow

1. Push to GitHub → Netlify auto-builds
2. Verify pages are live after every push

## End-of-Session

1. Update `CONTEXT.md` — replace, don't append. Keep under 100 lines.
2. Update `CHANGELOG.md` — append new dated entry
3. `git add`, `git commit`, `git push`
4. Verify Netlify deploy
