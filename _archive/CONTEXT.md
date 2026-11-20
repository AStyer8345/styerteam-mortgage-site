# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. `cleanUrls` is off, so extensionless URLs exist only as explicit 301s in `_redirects` (compiled into `vercel.json`). Production source and current identity are documented in `docs/domain-migration-plan.md`. Inspect the live Vercel commit/ref before release; prior branch-only deployment cautions are historical and do not describe the deployed build.

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
| Audit baseline ref | `cursor/blog-2026-11-02-refi-out-of-non-qm` |
| Audit baseline commit | `eeee418c64ece1d90ccf4bc6c4a046e932a13d30` |

## Last Worked On

November 3 migration audit: all 187 live sitemap URLs returned successfully with self-referencing styerteam.com canonicals and no retired identity. Verified both old-host redirects, company licensing source and Adam’s existing secure application. Corrected stale repository maintenance instructions and affiliation regression expectations. Preserve the already-deployed content, forms and analytics.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM container id, form field names, LoanOS capture, and the lead-intake webhook.
- Do not submit real forms against production or preview. They create real leads.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
