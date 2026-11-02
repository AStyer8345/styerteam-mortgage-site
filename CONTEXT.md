# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. `cleanUrls` is off, so extensionless URLs exist only as explicit 301s in `_redirects` (compiled into `vercel.json`). Production is commit fc629a1e on `cursor/ga4-landing-and-leads-dfa1` (PR #47, not merged). Do not deploy to production.

Forms still post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. Do not rename fields or change that endpoint. Preview hosts do not send live leads unless ALLOW_PREVIEW_LIVE_LEADS=true.

GTM-PQQ6PGLR loads immediately on styerteam.com and www.styerteam.com only. Direct Google-tag events wait until `gtm.load`. `generate_lead` fires once after a confirmed capture, with form id and page path, and no contact fields.

Homepage CLS: the first paint now reserves the header, hero, and ledger. Mobile keeps a metric-matched Inter fallback until the deferred stylesheet loads. Desktop declares Inter and Source Serif up front so the nav and ledger do not jump.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Vercel project `styerteam-site`. Netlify config stays in the repo. |
| Publish | `.site-dist` |
| Domain | `https://styerteam.com` |
| This branch | `cursor/blog-aeo-fixpack-2026-11-01` |
| PR base | `preview/claims-docpaths-source-2026-10-28` |

## Last Worked On

Blog AEO fix pack, preview only. Thirty-one posts got the pack’s answer blocks, FAQ accordions, and FAQPage schema. The cash-out post’s schema is the five cash-out questions. The two personal essays were left without FAQs. Not merged and not deployed to production.

Homepage mobile CLS (PR #48). The hero and header were painted from critical CSS, then the deferred stylesheet restyled the kicker, buttons, wordmark, and nav. Desktop also showed the full menu in normal flow until that stylesheet arrived.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM container id, form field names, LoanOS capture, and the lead-intake webhook.
- Do not submit real forms against production or preview. They create real leads.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
