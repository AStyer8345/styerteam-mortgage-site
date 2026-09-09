# styermortgage.com — Context

## Current State

Public mortgage website for Adam Styer | HyperSmart Home Loans. Static HTML/CSS/JS on Netlify with automatic production deploys from GitHub `main`.

Website forms and the assistant use LoanOS durable inquiry/outbox capture. Netlify is an independent capture transport using the same inquiry ID. Follow-up questionnaires retain the parent inquiry ID; backup alerts are failure-only. Do not restore the old parallel raw-webhook/contact writers.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Primary local checkout | `/Users/adamstyer/Documents/styermortgage.com` |
| Hosting | Netlify |
| Domain | `https://styermortgage.com` |
| Production branch | `main` |

## Last Worked On

**2026-09-09 — coordinated situation journeys.** Five homepage choices now share `situation-journeys.css` and `situation-journeys.js`, with static Netlify forms, intent-specific questions, stable inquiry IDs, and existing attribution/capture. Standard actions are “Send Your Scenario” and “Start a Secure Application.” Refinance goes directly to `/refinance-quote.html`; investment goes to `/investor-loans.html`. The existing landlord-purchase article now covers the full direct-purchase checklist and 12 FAQs. No indexed URL was retired. Release details and primary sources: `run-logs/situation-journeys-2026-09-09.md`.

**2026-09-09 — tenant-to-owner article and recommended SEO changes released.** Published `/blog/2026-09-09-buy-house-you-rent-from-landlord-texas.html` from official TREC, Texas Property Code, CFPB, TDI, Fannie Mae, and HUD/FHA guidance. The page has answer-first copy, Article and FAQPage structured data, canonical/social metadata, internal links, sitemap/blog-manifest/blog-index/`llms.txt` registration, and source-labeled scenario CTAs. It explains that an unrepresented Texas buyer is allowed, while clearly separating the lender's financing role from agent or attorney representation.

Reworked `/new-braunfels-mortgage-lender.html` around the actual Search Console opportunity: New Braunfels/Comal County intent, conditional rate language, scenario-first CTA, self-employed/investor relevance, and synchronized visible/schema FAQs. Removed unsupported price, school, commute, lender-count, speed, credit-score, down-payment, and testimonial claims. Shortened `/k1-income-mortgage-austin.html` title and meta description for the observed impression/CTR opportunity.

Attribution was verified as already implemented rather than rewritten: `assets/utm.js`, the scenario form, and `netlify/functions/lead-intake.js` preserve first-touch page/source and CTA page/label into LoanOS. New CTAs add `source=tenant_purchase_article` or `source=new_braunfels` and use the proven `/get-preapproved.html?intent=scenario` path.

Commit `5df09ac` is live from GitHub `main`. Netlify production deploy `6aa18c13d8e80700080e3424` is ready and matches the full commit `5df09ac4bb809c2950c43cf8e95cdca4c01a6446`. Live verification returned 200 for the article, blog index/manifest, New Braunfels page, K-1 page, sitemap, and `llms.txt`. Netlify mobile Lighthouse summary: Performance 83, Accessibility 90, Best Practices 100, SEO 100.

Validation: 101 site tests + 115 assistant tests passed, TypeScript passed, build/form/knowledge checks passed, and the SEO audit reported 156 sitemap URLs with 0 issues.

## Working Rules

- Protect production and inspect current state before changing it.
- The primary checkout often contains unrelated work. Use an isolated worktree for releases and never deploy a dirty mixed checkout.
- Match existing HTML/CSS and preserve GTM, form fields, LoanOS capture, and Netlify configuration.
- Use the business name `Adam Styer | HyperSmart Home Loans`; legal entity `Kyber Mortgage Corporation dba HyperSmart Home Loans`; NMLS 2653540 / 513013.
- Adam is licensed to originate in Texas. Do not imply personal origination outside Texas.
- Keep eligibility, rate, cost, appraisal, credit, program, and closing statements conditional on current written terms and file review.
- No USDA promotion and no 21-day-close or invented performance claims.
- Use the secure application only behind descriptive anchor text; scenario/review CTAs use the proven short form.
- New blog posts must be registered in `blog/manifest.json`, `blog.html` CollectionPage schema and noscript list, `sitemap.xml`, and when appropriate `llms.txt`.
- Use an answer-first paragraph before the first H2 and keep visible FAQs synchronized with FAQPage JSON-LD.
- Run `npm test`, `npm run typecheck`, `npm run seo:audit`, and `npm run build`; verify the exact production commit and live HTTP content after release.

## Open Items

- Existing low-priority blog-index `ItemList` position values are non-sequential; this predates the 2026-09-09 article and does not block discovery.
- `prequal.html` analytics behavior, paid-page positioning, and several legal-copy consistency items remain separate Adam-gated work.
- Do not make live form submissions for testing; use source, test-suite, Netlify form-registration, and existing non-PII diagnostics.
