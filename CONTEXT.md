# styerteam.com — Context

## Current State

Public site for Adam Styer, NMLS #513013. Static HTML/CSS/JS. Canonical origin is https://styerteam.com. This branch adds spam controls on top of `cursor/dscr-summary-and-email-form` (`426f8bc5`). Do not merge it and do not deploy it to production.

Lead forms post to `/` and `/.netlify/functions/lead-intake`. On Vercel both copies call LoanOS. A filled honeypot or a submit under 3 seconds returns success and does not call LoanOS. Turnstile runs only when configured. `generate_lead` still fires only after `captured: true`.

Do not submit a live form. Preview hosts do not send live leads unless ALLOW_PREVIEW_LIVE_LEADS=true.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Vercel project `styerteam-site`. Netlify config stays in the repo. |
| Publish | `.site-dist` |
| Domain | `https://styerteam.com` |
| This branch | `cursor/form-spam-turnstile` |
| PR base | `cursor/dscr-summary-and-email-form` |

## Turnstile

| Value | Where |
|-------|-------|
| Public site key | Vercel env `TURNSTILE_SITE_KEY`. The publish step writes it into `js/turnstile-config.js` and the same marker in `js/form-guard.js`. Git keeps both empty. |
| Secret | Vercel env `TURNSTILE_SECRET_KEY`, read only by lead-intake. Unset means skip verification. |
| Local test keys | Do not commit them. A local server may set `window.STYER_TURNSTILE_SITE_KEY` before the config script. |

Empty site key: no widget, forms submit as before. Real keys use an invisible, interaction-only widget.

## Last Worked On

Honeypot fields are off-screen (not `display:none`) on lead forms. Client and server both drop a filled honeypot or a sub-3-second submit without forwarding to LoanOS. Turnstile is env-gated. Not merged and not deployed to production.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Do not change approved marketing copy.
- Keep GTM container id, form field names, and the lead-intake path.
- Do not submit real forms against production or preview.
- Local builds need `CONTEXT=deploy-preview` so IndexNow does not submit.
