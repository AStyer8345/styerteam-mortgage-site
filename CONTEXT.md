# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. `cleanUrls` is off, so extensionless URLs exist only as explicit 301s in `_redirects` (compiled into `vercel.json`). This branch is the DSCR handoff compliance and email-form change on top of `cursor/release-2026-11-01-dscr-schema` (`1a31b63f`). Do not merge it and do not deploy it to production.

The calculator review still travels in `sessionStorage` (`styer:calculator-review`). The investor and refinance handoff summaries show the interest rate and payment rows again, with a 12px line that reads “Not a quote or offer.” The DSCR email form posts to `/.netlify/functions/lead-intake` and includes those rows plus the same line.

Forms still post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. Do not rename fields or change that endpoint. Preview hosts do not send live leads unless ALLOW_PREVIEW_LIVE_LEADS=true. Do not submit the DSCR email form or the review form against a live host.

GTM-PQQ6PGLR loads immediately on styerteam.com and www.styerteam.com only. Direct Google-tag events wait until `gtm.load`. `generate_lead` fires once after a confirmed capture, with form id and page path, and no contact fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Vercel project `styerteam-site`. Netlify config stays in the repo. |
| Publish | `.site-dist` |
| Domain | `https://styerteam.com` |
| This branch | `cursor/dscr-summary-and-email-form` |
| PR base | `cursor/release-2026-11-01-dscr-schema` |

## Last Worked On

Rate and payment rows are back on the calculator handoff summaries, with “Not a quote or offer.” under them and in the posted analysis. The DSCR “Email me this analysis” form stays on the lead-intake path. Not merged and not deployed to production.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM container id, form field names, LoanOS capture, and the lead-intake webhook.
- Do not submit real forms against production or preview. They create real leads.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
