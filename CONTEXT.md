# styermortgage.com — Context

## Current State

Public mortgage website for The Styer Team · Powered by GoRascal. Static HTML/CSS/JS on Netlify. Production deploys from GitHub `main`. The open preview is PR #42, from `preview/claims-docpaths-source-2026-10-28` into `design/private-wealth-editorial`. Do not merge it and do not push `main`.

Legal entity is Go Rascal Inc. Company NMLS 2072896. Adam Styer NMLS 513013. The only business phone is (512) 956-6010. Apply Now goes to `https://gorascal.my1003app.com/513013/register`. See My Options and the short form stay on `/contact.html`. `/apply-now` 301s to the application link.

Forms post to Netlify (`/`) and `/.netlify/functions/lead-intake`, which dispatches the n8n web-lead webhook. Mailchimp runs only when `marketing_opt_in` is on. Do not rename those fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Netlify, publish `.site-dist` |
| Domain | Preview origin `https://thestyerteam.com` (not live). Production host is still styermortgage.com until Compliance approves the cutover. |
| Production branch | `main` |

## Last Worked On

The NMLS licensed location is 185 Wythe Ave, Suite A2, Brooklyn, NY 11249. It is the footer and schema address, not a Texas office. areaServed stays Texas. Close-day, savings, and guarantee marketing lines are stripped. Rate pages are unchanged.

GoRascal’s approved files are in assets/brand/gorascal/. The header and homepage hero use the wordmark on a white chip. The footer uses the navy seal. The outline seal and the brownstone illustration are stored and not displayed. Do not merge this preview.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM, form field names, LoanOS capture, and the lead-intake webhook.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
