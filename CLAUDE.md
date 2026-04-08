Read /Users/adamstyer/Documents/GOALS.md before starting any session. Interactive sessions must serve current goals — if your task conflicts, log it to TODO.md under NEEDS ADAM and stop. Automated/scheduled tasks continue unless GOALS.md explicitly pauses them.

# styermortgage.com — Claude Code Instructions

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

## Deploy Workflow

1. Push to GitHub → Netlify auto-builds
2. Verify pages are live after every push

## End-of-Session

1. Update `CONTEXT.md` — replace, don't append. Keep under 100 lines.
2. Update `CHANGELOG.md` — append new dated entry
3. `git add`, `git commit`, `git push`
4. Verify Netlify deploy
