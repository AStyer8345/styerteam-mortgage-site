# styermortgage.com — Context

## Current State

Public mortgage website for The Styer Team · Powered by GoRascal. Static HTML/CSS/JS on Netlify with automatic production deploys from GitHub `main`.

Website forms and the assistant use LoanOS durable inquiry/outbox capture. Netlify is an independent capture transport using the same inquiry ID. Follow-up questionnaires retain the parent inquiry ID; backup alerts are failure-only. Do not restore the old parallel raw-webhook/contact writers.

## Administrative access and generated runtime assets

Administrative pages and task reports are served by `netlify/functions/admin.mts` after validating the existing Netlify `MCC_PASS`. `scripts/admin-paths.json` defines the exact private files; the public packager excludes them. The gateway issues an eight-hour secure HttpOnly cookie. Browser operator requests use that session; external automation retains the server bearer contract. Never embed either access secret in JavaScript or browser storage.

Build compiles private admin assets, the canonical shared footer and reviewed assistant knowledge into their function bundles. After changing `site-footer.html`, run the build or advisory-design sync so the compiled footer stays current. Preserve local command-center browser state and the existing `mcc-state` cloud store.

## Repository

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Primary local checkout | `/Users/adamstyer/Documents/styermortgage.com` |
| Hosting | Netlify |
| Domain | `https://styermortgage.com` |
| Production branch | `main` |

## Last Worked On

**2026-10-06 — assistant question routing and complete contact handoff.** Qualification questions embedded in an income answer now receive an answer before intake continues. The reported 1099/write-off scenario gets conditional alternative-documentation guidance and clarification of conflicting annual gross/monthly net figures. Contact review carries a server-redacted snapshot of the full browser conversation through consent into the established LoanOS inquiry/outbox endpoint; independent Netlify backup receives the same readable snapshot. Transcript storage runs separately and cannot delay capture. Retries reuse a snapshot-specific inquiry ID; additional facts get a new inquiry. Mobile review controls and capture/queued/backup receipts remain visible. Validation: 174 site tests, 133 assistant tests, TypeScript, 166-URL SEO audit and build passed. Browser QA was unavailable because the Chromium download failed; no live test leads were submitted. Production verification follows the release commit.

**2026-09-18 — bank-statement inquiry copy.** The bank-statement page now opens with the self-employed borrower's cash-flow question and explains Adam's personal scenario review. The inquiry introduction makes clear that financial documents are not needed to start. Search/social and Article/MortgageLoan descriptions use the same invitation. Existing headings, qualification content, FAQs, internal links, form identity, consent, attribution, capture code, shared design, and legal language remain intact. Local validation: 125 site tests, 119 assistant tests, TypeScript, the 162-URL SEO audit, build checks, and mocked browser form checks at 390/768/1440px passed. Borrower, realtor, and CPA campaign copy was prepared separately as unsent drafts.

**2026-09-09 — coordinated situation journeys.** Five homepage choices now share `situation-journeys.css` and `situation-journeys.js`, with static Netlify forms, intent-specific questions, stable inquiry IDs, and existing attribution/capture. Standard actions are “Send Your Scenario” and “Start a Secure Application.” Refinance goes directly to `/contact.html?goal=Refinance's financing role from agent or attorney representation.

Reworked `/new-braunfels-mortgage-lender.html` around the actual Search Console opportunity: New Braunfels/Comal County intent, conditional rate language, scenario-first CTA, self-employed/investor relevance, and synchronized visible/schema FAQs. Removed unsupported price, school, commute, lender-count, speed, credit-score, down-payment, and testimonial claims. Shortened `/k1-income-mortgage-austin.html` title and meta description for the observed impression/CTR opportunity.

Attribution was verified as already implemented rather than rewritten: `assets/utm.js`, the scenario form, and `netlify/functions/lead-intake.js` preserve first-touch page/source and CTA page/label into LoanOS. New CTAs add `source=tenant_purchase_article` or `source=new_braunfels` and use the proven `/contact.html?goal=Purchase's voice, with Romans 1:16-17 (ESV) by the About section. The only business phone on the site is (512) 956-6010. Public lender and review counts follow the About page: 40+ lenders, 144 published reviews. `/apply-now` uses `https://styermortgage.com/contact.html`. No production deploy from this branch.
