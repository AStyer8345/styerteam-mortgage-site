# SEO/AEO Implementation and Deploy Plan

Date: 2026-05-17
Site: styermortgage.com
Owner: Adam Styer | Mortgage Solutions LP

## Positioning Guardrails

- Primary SEO/AEO niche: self-employed, complex income, investor, bank statement, DSCR, K-1, 1099, P&L, asset depletion, and one-time-close construction lending.
- Supporting message: Adam can still handle conventional, FHA, VA, jumbo, refinance, and standard purchase loans well, but those are not the main growth wedge.
- Geography: start with Austin and Central Texas authority, then expand into Texas suburbs and statewide Texas pages. Do not imply Adam originates outside Texas unless licensing changes.
- Compliance posture: avoid stale speed claims, unverified review counts, guaranteed approvals, named investor promises, exact matrices without verification, USDA origination, or out-of-state licensing language.

## Phase 1: Foundation Cleanup

Status: completed in commit `199f025`.

Tasks:
- Replace remaining "Apply Now" and "Quick Quote" CTAs on priority pages with scenario-review language.
- Remove or soften 21-day/performance timeline claims.
- Remove unverified aggregate review schema and exact review-count claims unless refreshed from source.
- Soften program-specific Non-QM claims so they read as guideline-dependent options, not promises.
- Add NMLS/entity schema to the core complex-income cluster.

Deploy gate:
- No priority page should show "Apply Now" as the primary CTA.
- No public priority page should use 21-day close claims as proof.
- JSON-LD must parse.
- NMLS links and Texas-only licensing language must be present on core pages.

## Phase 2: Conversion Layer

Status: completed in commit `4986d64`.

Tasks:
- Rename all lead forms from "Scenario Review" only where the form title fits the page intent:
  - Self-employed: "Review My Income"
  - Bank statement: "Review My Bank Statements"
  - DSCR: "Run the DSCR Math"
  - High net worth / asset depletion: "Model Asset-Based Options"
  - Construction: "Talk Through the Build"
- Add a short "What happens after you submit" block near core forms:
  - Adam reviews the income/property scenario.
  - Adam identifies likely program paths.
  - Adam tells the borrower what is realistic before a full application.
- Add anxiety-reducing microcopy:
  - "No pressure."
  - "No judgment if a bank already said no."
  - "You do not need a perfect tax return to start the conversation."
- Add a partner CTA path for CPAs, financial advisors, and Realtors.

Deploy gate:
- Each core page has one primary CTA, one secondary phone/schedule CTA, and no competing "apply/rate quote" language above the fold.

## Phase 3: Product + Location Landing Pages

Status: completed in this Phase 3 work session.

Build these after Phase 2 so added traffic lands on stronger conversion surfaces.

Implementation note:
- Built six missing product + location pages and reused the existing Austin DSCR and K-1 income pages rather than duplicating near-identical URLs.
- Added sitemap entries and inbound related links from the closest core hub pages.

Priority pages:
- Bank Statement Loans Austin TX
  - H1: Bank Statement Loans in Austin TX
  - Primary keyword: bank statement loans Austin TX
  - Meta: Bank statement loans for Austin self-employed borrowers. Qualify using 12 or 24 months of deposits when tax returns do not show the full story. Adam Styer, NMLS #513013.
- Self-Employed Mortgage Round Rock TX
  - H1: Self-Employed Mortgage Options in Round Rock TX
  - Primary keyword: self-employed mortgage Round Rock TX
  - Meta: Mortgage options for Round Rock business owners, 1099 earners, and investors with complex income. Bank statement, 1099, P&L, and asset-based paths.
- DSCR Loans Austin TX
  - H1: DSCR Loans for Austin Investment Properties
  - Primary keyword: DSCR loans Austin TX
  - Meta: DSCR loans for Austin rental properties, STRs, and investor purchases. Qualify primarily on property cash flow instead of personal tax-return income.
- DSCR Loans Central Texas
  - H1: DSCR Loans for Central Texas Real Estate Investors
  - Primary keyword: DSCR loans Central Texas
  - Meta: DSCR loan options for Austin, Round Rock, Georgetown, Buda, Kyle, San Marcos, and Hill Country rental properties.
- Non-QM Loans for Self-Employed Austin
  - H1: Non-QM Loans for Self-Employed Borrowers in Austin
  - Primary keyword: non-QM loans self-employed Austin
  - Meta: Non-QM mortgage options for Austin borrowers with bank statement income, 1099 income, K-1 income, P&L documentation, or significant assets.
- Asset Depletion Mortgage Austin TX
  - H1: Asset Depletion Mortgages in Austin TX
  - Primary keyword: asset depletion mortgage Austin TX
  - Meta: Asset depletion mortgage options for Austin retirees, founders, executives, and high-net-worth borrowers whose assets tell the real story.
- K-1 Income Mortgage Austin TX
  - H1: K-1 Income Mortgages in Austin TX
  - Primary keyword: K-1 income mortgage Austin TX
  - Meta: Mortgage guidance for Austin partners, S-corp owners, and LLC members with K-1 income, retained earnings, distributions, and complex tax returns.
- One-Time-Close Construction Loan Texas Hill Country
  - H1: One-Time-Close Construction Loans in the Texas Hill Country
  - Primary keyword: one-time-close construction loan Texas Hill Country
  - Meta: Construction-to-permanent loan options for custom home builds in Dripping Springs, Wimberley, Fredericksburg, Marble Falls, and the Texas Hill Country.

Deploy gate:
- Each new page must link back to the relevant core page.
- Each new page must include FAQPage schema and Adam/NMLS entity schema.
- Each new page must include a page-specific scenario-review CTA.

## Phase 4: Referral Partner Page

Status: completed in this Phase 4 work session.

Build one high-quality page before broad content expansion.

Page:
- URL: /referral-partners-self-employed-clients.html
- H1: Mortgage Strategy for CPAs, Advisors, and Agents With Self-Employed Clients
- Audience: CPAs, financial advisors, wealth managers, Realtors, builders, and attorneys.
- Positioning: Adam is a strategic partner for clients whose cash flow is strong but taxable income is low.
- CTA: "Talk Through a Client Scenario"

Required sections:
- Why strong clients get declined by banks.
- How Adam reviews complex income without disrupting the advisor relationship.
- Programs that may fit: bank statement, 1099, P&L, asset depletion, DSCR, construction.
- What Adam will and will not do: no tax advice, no investment advice, no promises before underwriting.
- Referral workflow and communication expectations.

Deploy gate:
- Page must avoid sounding like a referral bounty page.
- Page must speak to advisor risk: discretion, clarity, and protecting the client relationship.

## Phase 5: Internal Links and AEO Blocks

Status: completed in this Phase 5 work session.

Tasks:
- Add "Related complex-income pages" blocks to every core page.
- Add 4-6 concise Q&A blocks per core page written in extractable answer format.
- Add comparison tables where useful:
  - Bank statement vs 1099 vs P&L.
  - DSCR vs conventional investor loan.
  - Asset depletion vs no-ratio jumbo vs conventional jumbo.
- Add author/reviewer blocks to core pages with Adam's NMLS and Texas license context.
- Update sitemap and internal nav only after page set is stable.

Deploy gate:
- Each target query should have a clear answer block that can stand alone in Google AI Overviews, Perplexity, and ChatGPT-style summaries.

## Phase 6: Technical QA and Deploy

Pre-deploy checks:
- `git diff --check`
- Parse every JSON-LD block in changed HTML files.
- `rg` checks for:
  - stale "Apply Now" primary CTAs on priority pages
  - "21-day" and "21 days" performance claims
  - "USDA" product language
  - out-of-state licensing implications
  - unverified review-count schema
  - absolute claims like "no tax returns required" or "guaranteed"
- Local browser spot-check:
  - homepage
  - about
  - products
  - self-employed mortgage
  - bank statement loans
  - DSCR Austin
  - Non-QM
  - testimonials

Deploy sequence:
1. Review local diff for compliance and voice.
2. Commit foundation cleanup separately from new landing pages.
3. Deploy foundation cleanup.
4. Wait for production smoke test.
5. Build and deploy product + location pages in batches of 2-3 pages.
6. Submit updated sitemap after each batch.

Post-deploy checks:
- Confirm production pages load.
- Confirm forms still submit.
- Confirm NMLS/footer disclosures render.
- Run Rich Results/Schema validation on core pages.
- Update GBP and internal tracking notes with changed positioning.
