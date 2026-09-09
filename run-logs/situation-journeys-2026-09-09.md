# Coordinated homepage situation journeys — September 9, 2026

## Release scope

The five homepage choices now open a shared scenario-intake pattern with the exact actions **Send Your Scenario** and **Start a Secure Application**. The first action opens an in-page, two-step review with no documents or credit pull. The second opens the established secure My1003 registration. Call and text remain smaller alternatives.

- Purchase: purchase is preselected; a scenario review is clearly distinguished from formal preapproval.
- Refinance/equity: homepage links directly to `/refinance-quote.html`; goal, estimated value, balance, and optional current rate are captured. Refinance and equity education remains below.
- Business owner: income structure, time in business, goal, and estimated property value are visible at the top, above the program content.
- Investment: homepage links to the broader `/investor-loans.html` journey, with purpose, property type/value, monthly rent, and strategy. Conventional, DSCR, bank-statement, asset-based, bridge, and portfolio paths remain available; DSCR calculator and guides remain downstream.
- Move-up: readable white headline on navy; new purchase, current value/balance, listing status, timing, and constraint precede bridge, HELOC, carry-both, contingency, leaseback, and recast education.

The shared handler uses existing `StyerInquiryId`, `StyerFetchWithTimeout`, first-touch attribution, Netlify capture, and `lead-intake`. Both transports carry the same inquiry ID; retries keep it. Situation-specific answers are also summarized in the existing backend `situation` field. No backend contract or notification workflow changed. Only accepted capture fires the lead event. The event contains fixed form/intent identifiers and page path, without contact or financial answers. The success message describes saved review, not approval or confirmed notification delivery.

## Existing article expanded, not duplicated

`/blog/2026-09-09-buy-house-you-rent-from-landlord-texas.html` had already been published in the production baseline. This release expands it with price negotiation, representation boundaries, earnest money/option periods, survey, closing costs, concessions, lease/deposit handling, seller financing, benefits/risks, a practical checklist, and 12 synchronized FAQs. It uses the purchase journey and secure application paths. Its existing canonical, authorship, sitemap, blog listing, manifest entry, and llms entry remain intact; the manifest description is updated.

Primary research checked September 9, 2026:

- [TREC: buyer representation changes effective in 2026](https://www.trec.texas.gov/node/2997)
- [TREC: current resale contract, form 20-19](https://www.trec.texas.gov/forms/one-four-family-residential-contract-resale), including paragraph 5 delivery and option deadlines
- [Texas Property Code §5.008](https://statutes.capitol.texas.gov/Docs/PR/htm/PR.5.htm#5.008)
- [TDI: title insurance FAQ](https://www.tdi.texas.gov/title/titlefaqs.html) and [title insurance explanation](https://www.tdi.texas.gov/tips/title-insurance.html)
- [CFPB: inspection versus appraisal](https://www.consumerfinance.gov/owning-a-home/close/schedule-a-home-inspection/), [Loan Estimate](https://www.consumerfinance.gov/owning-a-home/loan-estimate/), and [Closing Disclosure](https://www.consumerfinance.gov/owning-a-home/closing-disclosure/)
- [Fannie Mae: rent-related credits](https://selling-guide.fanniemae.com/sel/b3-4.3-12/rent-related-credits) and [interested-party contributions](https://selling-guide.fanniemae.com/sel/b3-4.1-02/interested-party-contributions-ipcs)
- [HUD: current Handbook 4000.1](https://www.hud.gov/hud-partners/single-family-handbook-4000-1), August 12, 2026 update; tenant-landlord rule and documented tenancy exception checked on printed pages 180–181
- [CFPB: Regulation Z §1026.36](https://www.consumerfinance.gov/rules-policy/regulations/1026/36/) and [Texas SML: seller/wrap-financing FAQs](https://www.sml.texas.gov/mortgage-origination/faqs/)

Investor content also checked against [Fannie Mae financed-property rules](https://selling-guide.fanniemae.com/sel/b2-2-03/multiple-financed-properties-same-borrower), [rental-income guidance](https://selling-guide.fanniemae.com/sel/b3-3.1-08/rental-income), and [Regulation Z exemptions](https://www.consumerfinance.gov/rules-policy/regulations/1026/3/). Universal eligibility, rate, reserve, lender-count, and speed claims in the rewritten investor/refinance passages were replaced with file-specific guidance. Educational sections, the illustrative BRRRR calculation, authorship, internal resources, and canonical paths remain.

## Validation

- 220 automated tests passed (105 site tests, 115 assistant tests), including new capture acceptance, failure, stable-ID, routing, and intent-answer tests.
- TypeScript, build, knowledge validation, and form audit passed; 47 contact forms audited.
- SEO audit: 156 sitemap URLs, zero issues. All schema types on changed pages exist in current Schema.org vocabulary.
- Browser checks: all five journeys at 1440, 768, 390, and 360px; no horizontal overflow or JavaScript errors. Both hero actions, five actual homepage choice navigations, form validation, consent, retries, retained answers, attribution, and non-PII analytics checked.
- Article checked on desktop/mobile; all 12 FAQ controls and article-to-purchase attribution verified. Keyboard step navigation and no-JavaScript form visibility checked.
- Secure My1003 destination opened successfully as “Easy and secure online loan application.” No application was submitted.
- All synthetic submissions were intercepted locally. No fake leads were sent to Netlify, LoanOS, Mailchimp, or other live services. Actual downstream delivery was deliberately not triggered for testing.
- The user attachment contained only the written request, not screenshots. Current live layouts were inspected and captured before edits.

## Isolation and deployment

Production baseline: Git commit `072f8cc2ade9e68f8814f61222c59159457f70db`, Netlify ready deploy `6aa18cef4bb23c000886a7e8`. Raw HTML differences were Netlify form processing and the existing injected Google tag; shared JS, attribution JS, and sitemap matched Git byte-for-byte.

Work was isolated in `/Users/adamstyer/Documents/styermortgage-journeys-20260909`, branch `codex/situation-journeys-20260909`. Original checkout verification: 645 files byte-identical; original Git status identical. No unrelated checkout files, redirects, backend functions, or shared site script were included.

Preview: [Netlify preview](https://6aa1c6184b5bfc89cef9322e--shiny-paprenjak-c7e741.netlify.app). Production uses the established push-to-main Netlify workflow; final production identity and HTTP verification are recorded in the task completion report.

## Files

Visitor-facing files: `index.html`, `get-preapproved.html`, `refinance-quote.html`, `mortgage-for-business-owners-austin.html`, `investor-loans.html`, `buy-before-you-sell-austin.html`, `situation-journeys.css`, `situation-journeys.js`, the existing landlord article, `blog/manifest.json`, and `sitemap.xml`.

Verification: `scripts/audit-form-notifications.mjs`, `tests/situation-journeys.test.js`, `tests/fixtures/situation-journeys.json`, and three updated routing/attribution/layout tests. Release notes: this report, `CONTEXT.md`, and `CHANGELOG.md`.
