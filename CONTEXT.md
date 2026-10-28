# styermortgage.com — Context

## Current State

Public mortgage website for The Styer Team · Powered by GoRascal. Static HTML/CSS/JS on Netlify. Production deploys from GitHub `main`. This work is on the redesign pull request (PR #41) against `design/private-wealth-editorial`. Do not push `main`.

Legal entity is Go Rascal Inc. Company NMLS 2072896. Adam Styer NMLS 513013. The only business phone is (512) 956-6010. Apply Now goes to `https://gorascal.my1003app.com/513013/register`. See My Options and the short form stay on `/contact.html`. `/apply-now` 301s to the application link.

Forms post to Netlify (`/`) and `/.netlify/functions/lead-intake`, which dispatches the n8n web-lead webhook. Mailchimp runs only when `marketing_opt_in` is on. Do not rename those fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Netlify, publish `.site-dist` |
| Domain | `https://styermortgage.com` |
| Production branch | `main` |

## Last Worked On

**2026-10-28 — claims preview, not published.** Branch `preview/claims-docpaths-source-2026-10-28` is off `design/private-wealth-editorial` at f1369288. It is not merged and has no pull request. Homepage, Non-QM, bank-statement, and self-employed pages drop unsourced program percentages, 14–21 day close lines, and unsourced case results. The homepage keeps 24-hour pre-approval, 150+ wholesale lenders, and the $832,750 jumbo limit, and the short form has one optional `self_reported_source` select. The preserved Non-QM guide is a separate commit. Guides stay indexed. Company NMLS lines were not edited.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM, form field names, LoanOS capture, and the lead-intake webhook.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
