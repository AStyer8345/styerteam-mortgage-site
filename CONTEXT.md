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

**2026-10-28 — homepage LCP and two copy fixes.** The hero skyline is an image in the HTML. Simulated mobile Lighthouse median moved from performance 62 and LCP 7.1 s to performance 70 and LCP 5.2 s. Unthrottled LCP on this machine is about 140–180 ms. The remaining simulated wait is the large stylesheet before first paint. Georgetown and Hutto rate notes open on a full sentence. Homepage jumbo copy uses $832,750, and that FAQ says 40+ wholesale lenders. No Netlify preview on PR #41.

## Working Rules

- Match existing HTML/CSS. Do not add a CSS framework or npm package without approval.
- Keep GTM, form field names, LoanOS capture, and the lead-intake webhook.
- New blog posts belong in `blog/manifest.json`, `blog.html`, and the sitemap. Realtor updates stay under `/realtor-updates/` and are also registered in the blog index.
- Do not mark a briefing ticket done unless every file for it is committed in the same session.
