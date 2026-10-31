# styermortgage.com — Context

## Current State

Public mortgage website for The Styer Team · Powered by GoRascal. Static HTML/CSS/JS. Netlify config stays in the repo. `vercel.json` can publish the same `.site-dist` output. The open preview is PR #42, from `preview/claims-docpaths-source-2026-10-28` into `design/private-wealth-editorial`. Do not merge it and do not push `main`.

Legal entity is Go Rascal Inc. Company NMLS 2072896. Adam Styer NMLS 513013. The only business phone is (512) 956-6010. Apply Now goes to `https://gorascal.my1003app.com/513013/register`. See My Options and the short form stay on `/contact.html`. `/apply-now` 301s to the application link.

Forms still post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. A single `name` field is split into first and last name on each copy. Either accepted copy, including a duplicate, calls the n8n web-lead webhook. Mailchimp runs only when `marketing_opt_in` is on. Do not rename those fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Netlify today. Vercel config is ready; domains are not attached. |
| Publish | `.site-dist` |
| Domain | Canonical origin `https://styerteam.com`. Host redirects wait until the domains are connected. |
| Production branch | `main` |

## Last Worked On

WCAG 2.2 AA fixes are on a branch off `preview/claims-docpaths-source-2026-10-28`. Focus clearance, skip link, new-tab names, contrast, logo scaling, inline form errors, consent, the application confirmation link, and skip links on bank and DSCR pages. Do not merge this preview and do not deploy it to production.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM, form field names, LoanOS capture, and the lead-intake webhook.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
