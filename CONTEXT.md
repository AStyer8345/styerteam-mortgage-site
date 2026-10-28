# styermortgage.com — Context

## Current State

Public mortgage website for The Styer Team · Powered by GoRascal. Static HTML/CSS/JS on Netlify. Production deploys from GitHub `main`. This work is on the redesign pull request (PR #41) against `design/private-wealth-editorial`. Do not push `main`.

Legal entity is Go Rascal Inc. Company NMLS 2072896. Adam Styer NMLS 513013. The only business phone is (512) 956-6010. Apply and intake CTAs go to `/contact.html`. `/apply-now` 301s to `https://styermortgage.com/contact.html`.

Forms post to Netlify (`/`) and `/.netlify/functions/lead-intake`, which dispatches the n8n web-lead webhook. Mailchimp runs only when `marketing_opt_in` is on. Do not rename those fields.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Hosting | Netlify, publish `.site-dist` |
| Domain | `https://styermortgage.com` |
| Production branch | `main` |

## Last Worked On

**2026-10-28 — intake, footer, and homepage speed on the redesign branch.** One short form at `/contact.html` (name, phone, email, purchase or refinance, timeline, optional loan type, call/text/book). Old intake URLs 301 to that form with `goal` or `loan` set. Program explanations moved onto the pre-approval guide, refinance page, rates page, and city lender pages. Footer columns are Loans, Guides, About & Contact, and Legal. `/guides.html` is indexable and lists the guides. Homepage styles are bundled, hero and card images are WebP/AVIF, fonts are self-hosted. `npm run build` passed. No Netlify preview on PR #41. Guide robots tags were not changed.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM, form field names, LoanOS capture, and the lead-intake webhook.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
