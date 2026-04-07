# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. Netlify Functions handle content generation, email automation, and lead capture.

## Repo & Deploy

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Current Status

- 54+ public pages live (homepage, 8 loan pages, 24 suburb SEO pages, 12+ resource/guide pages, blog, calculators, realtor hub)
- GTM (GTM-PQQ6PGLR) + GA4 (G-DDY0H0319S) installed on all public pages
- Google Ads: Search-1 paused, Suburb campaign spec ready (needs manual setup)
- Content distribution: blog/rates/newsletters auto-post to GBP + FB + IG + LI via n8n + Publer
- SEO: FAQPage + BreadcrumbList schema on all suburb + loan pages, AEO paragraphs on most pages
- All conversion tracking verified: generate_lead, thank_you_page_view, phone_click, calendly_click

## Active Blockers

| Issue | Priority |
|-------|----------|
| Suburb quick-forms fire `generate_lead` but not `thank_you_page_view` — Google Ads only counts the latter | MEDIUM |
| Homepage hero "Apply Now" links to raw 1003 app (bypasses tracked funnel) | LOW |
| `2026-03-06-temp-placeholder.html` — "Oil Prices" post still at temp URL, needs rename decision | MEDIUM |
| `2026-03-30-temp-placeholder.html` — rates post at temp slug, noindexed | LOW |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |

## Key Files

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | Tech stack, page inventory, tracking config, Google Ads, legal |
| `CHANGELOG.md` | Append-only history |
| `DECISIONS.md` | Architecture decisions (Chose/Over/Why) |
| `TODO.md` | Now / Next / Backlog work items |
| `MAP.md` | Full file-by-file site map |
| `.claude/CLAUDE.md` | Claude Code project instructions |
| `netlify.toml` | Build config, headers, redirects |

## Rules for AI Sessions

### Always
- Read this file before starting any session
- Match existing HTML/CSS patterns exactly before writing new pages
- Use Netlify Forms for all form capture (`netlify` attribute + hidden `form-name` input)
- Push to GitHub to deploy — Netlify auto-builds
- Verify pages are live after every push
- Use Adam's exact anchor text for loan app link — never display raw URL
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`
- New blog posts must also be added to `blog.html` noscript block + CollectionPage schema

### Never
- Add CSS frameworks, JS libraries, or npm packages without Adam's approval
- Remove or modify the GTM container snippet
- Change visual design without Adam's approval
- Modify form field names on /get-preapproved or /refinance-quote (wired to GTM)
- Use "The Styer Team" — always "Adam Styer | Mortgage Solutions LP"
- Display the raw loan application URL — always use anchor text

### Navigation Rules
- Standard pages: full site nav
- Google Ads landing pages (/get-preapproved, /refinance-quote): logo only, no menu
- /thank-you: logo only, no menu

### End-of-Session
1. Update `CONTEXT.md` — replace, don't append. Keep under 100 lines.
2. Update `CHANGELOG.md` — append new dated entry
3. `git add`, `git commit`, `git push`
4. Verify Netlify deploy is live
