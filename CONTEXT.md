# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. `cleanUrls` is off, so extensionless URLs exist only as explicit 301s in `_redirects` (compiled into `vercel.json`). This branch combines the schema preview and the DSCR calculator handoff on top of `463b22a7`. Do not merge it and do not deploy it to production.

The DSCR calculator stores a review in `sessionStorage` (`styer:calculator-review`) and opens `/investor-loans.html?goal=Invest&context=calculator#scenario-review`. The investor form loads `analysis.js` and shows the saved numbers. The refinance comparison passes `context=calculator` into the contact form. The investor review form is the light `calculator-review` panel.

Forms still post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. Do not rename fields or change that endpoint. Preview hosts do not send live leads unless ALLOW_PREVIEW_LIVE_LEADS=true.

GTM-PQQ6PGLR loads immediately on styerteam.com and www.styerteam.com only. Direct Google-tag events wait until `gtm.load`. `generate_lead` fires once after a confirmed capture, with form id and page path, and no contact fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Vercel project `styerteam-site`. Netlify config stays in the repo. |
| Publish | `.site-dist` |
| Domain | `https://styerteam.com` |
| This branch | `cursor/release-2026-11-01-dscr-schema` |
| PR base | `cursor/blog-aeo-fixpack-2026-11-01` |

## Last Worked On

Combined release branch, not deployed. Schema batch 2 keeps verified `sameAs`, stable `@id`s, and the 31 AEO blog FAQPages. FAQPage stays off the March 2026 rates post, the Austin buying guide, and the August 10 market update. The DSCR calculator review prefills the investor form, and the refinance comparison prefills contact. Visible copy from the schema batch is unchanged. Not merged and not deployed to production.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM container id, form field names, LoanOS capture, and the lead-intake webhook.
- Do not submit real forms against production or preview. They create real leads.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
