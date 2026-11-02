# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. `cleanUrls` is off, so extensionless URLs exist only as explicit 301s in `vercel.json`. This branch is `cursor/dscr-review-handoff-form`, stacked on `cursor/blog-aeo-fixpack-2026-11-01` (commit 463b22a7, open PR #50). Do not merge and do not deploy to production.

The DSCR calculator stores a review in `sessionStorage` (`styer:calculator-review`) and opens `/investor-loans.html?goal=Invest&context=calculator#scenario-review`. That page was not loading `analysis.js`, so the journey showed “could not be restored” even though the numbers were saved. The refinance comparison did the same handoff without `context=calculator`. Both destinations now load `analysis.js` before the journey script. The investor review form is the light `calculator-review` panel.

Forms still post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. Do not rename fields or change that endpoint. Preview hosts do not send live leads unless ALLOW_PREVIEW_LIVE_LEADS=true.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Vercel project `styerteam-site`. Netlify config stays in the repo. |
| Publish | `.site-dist` |
| Domain | `https://styerteam.com` |
| This branch | `cursor/dscr-review-handoff-form` |
| PR base | `cursor/blog-aeo-fixpack-2026-11-01` |

## Last Worked On

DSCR calculator review handoff, preview only. Calculator values prefill the investor review form. The refinance comparison uses the same storage key and now passes `context=calculator` into the contact form. The investor intake is a light card with sentence-case labels, a visible step, and a Continue button. Not merged and not deployed to production.

Blog AEO fix pack remains on the parent branch. Homepage mobile CLS and GA4 landing work are on earlier branches.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM container id, form field names, LoanOS capture, and the lead-intake webhook.
- Do not submit real forms against production or preview. They create real leads.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
