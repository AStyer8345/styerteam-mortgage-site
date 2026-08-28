# Friday freshness and AEO audit — 2026-08-28

Run completed: 2026-08-28 08:22 CDT
Scope: homepage, about, Austin market and rates, self-employed, asset-depletion, DSCR, one-time-close construction, construction hub, and business-owner mortgage pages.

## Outcome

- One exact, non-financial synchronization qualified for automatic change: four page-generator footers now use the already-approved `140+ Reviews` floor instead of `137+ Reviews`. Google currently shows 96 reviews and Zillow shows 45, for a verified combined floor of 141.
- Added `tests/review-count.test.js` to prevent the generator footers from regressing below the approved floor.
- The drafted public-page corrections were approved later on August 28 and implemented across the Austin market, rates, self-employed, asset-depletion, DSCR, construction, one-time-close, and business-owner pages.
- The complete July 2026 Unlock MLS block was synchronized across the three affected pages. Current Fannie Mae B3-3.4-06 and Freddie Mac §5307.1 asset-depletion methods were retained with direct primary-source links. Unsupported fixed product spreads, thresholds, construction terms, legal-process conclusions, and weakly sourced simulations were removed or made explicitly program-specific.
- Added `tests/freshness-aeo.test.js` to protect the July market snapshot, current agency source links, and retired categorical claims.
- Verification passed after implementation: 36 JavaScript tests plus 104 assistant tests (140 total), TypeScript typecheck, valid JSON-LD on all eight edited priority pages, and SEO audit for 147 sitemap URLs with 0 issues.
- Existing unrelated working-tree changes were preserved.

## Freshness and factual findings

| Priority | Area | Finding | Disposition |
|---|---|---|---|
| Verified | 2026 conforming limit | Priority pages use the correct $832,750 baseline one-unit conforming limit. | No change. [FHFA 2026 release](https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026). |
| Verified | 2026 FHA limits | Current references use $571,550 / $731,700 / $884,450 / $1,099,150 for 1–4 units in Travis and Williamson counties. | No change. [HUD 2026 county table](https://www.hud.gov/sites/dfiles/SFH/documents/FHA-2026-Areas-Above-Floor-and-Below-Ceiling.pdf). |
| Approval needed | Austin market | `austin-housing-market.html` and the asset-depletion page use June figures; the DSCR page uses April figures. Unlock MLS still lists July 2026 as the newest release: $435,000 median (+1.0% YoY), 2,739 closed sales (+4.4%), 13,796 active listings (−9.9%), and 4.7 months of inventory. The self-employed page now uses the July median and county figures, but no approved internal source contains the complete July block needed for an exact multi-page synchronization. | Drafted below; do not mix a July median with June or April sales/inventory. [Unlock MLS July report](https://www.unlockmls.com/news/july-2026-central-texas-housing-report). |
| Monitor | Rate feed | `rates.json` remains dated 2026-05-18 for the week of 2026-05-14. The Austin rates page still marks the data stale and hides old product rates. Freddie Mac's latest national PMMS is 6.66% for the 30-year and 5.98% for the 15-year as of 2026-08-27. A self-employed-page reference to 6.65% on 2026-08-20 is accurate and explicitly date-stamped, but no longer the newest weekly benchmark. | Repair the internal feed; do not publish product rates from an external benchmark. [Freddie Mac PMMS](https://www.freddiemac.com/pmms). |
| Approval needed | Rate comparisons | The rates page still asserts fixed relative spreads and rankings: VA historically lowest, 15-year 0.5–0.75% below 30-year, 30-day locks cheaper than 60-day, and non-QM 0.50–1.50% above conventional. Similar fixed premiums remain on DSCR and asset-depletion pages. | Replace with scenario- and date-specific comparison language; draft below. |
| Verified and synchronized | Reviews | Google shows 96 reviews and Zillow shows 45, a combined floor of 141. Public priority pages' 140+ wording remains conservative. Four generator templates had 137+ and were exactly synchronized to the approved 140+ floor with a regression test. | Automatic change completed; no public page changed. |
| Verified internally | Lender count | “40+” remains consistent across priority pages and approved internal positioning. | No externally attested roster was available; no change. |
| Verified | Contact | Priority pages consistently use (512) 956-6010, adam.styer@hypersmart.loan, and 9050 N. Capital of Texas Hwy, Ste 390, Austin, TX 78759. Google Maps and Zillow match the phone/address; Zillow links styermortgage.com. | No change. |
| Partly externally verified | Licensing | Priority pages consistently use Adam Styer NMLS #513013 and Kyber Mortgage Corporation dba HyperSmart Home Loans NMLS #2653540. Zillow confirms Adam's NMLS #513013 and states its NMLS data comes through NMLS B2B Access. NMLS Consumer Access returned 403 for both records during the automated link check. | No change; company record remains internally approved but not independently completed this run. |
| Improved monitor | Search-index identity | Exact searches for legacy `/adam-styer/` and deleted `/dscr-loans-central-texas.html` did not surface those stale URLs this run. Current self-employed and construction results are being crawled, but their snippets expose the same categorical copy flagged below. | Legacy cleanup appears improved; keep redirects and continue monitoring. |

## External citation and broken-source audit

- No confirmed broken editorial source was found on the audited priority pages.
- The old Fannie asset-income URL redirects to the current `B3-3.4 Other Sources of Income` guide and returns 200.
- Fannie LLPA display, AirDNA, Home Builder Digest, NMLS Consumer Access, and Census Reporter returned access controls/403. They are unverified in this pass, not confirmed broken.
- Previously blocked KXAN now returned 200 to the automated checker.
- The business-owner page still relies on weak or inaccessible sources for material claims: Home Builder Digest for $180–$300/sq-ft build costs, AirDNA for ADR/occupancy, and Census Reporter for the $200K+ household share. Those claims should not be treated as current without accessible source support.

## Fixed benchmark set

The exact five questions were run on general web search and in fresh signed-in Perplexity sessions. A styermortgage.com result is required; adamstyer.com alone does not count.

| Benchmark question | Web | Perplexity | Summary accuracy |
|---|---|---|---|
| How can a self-employed borrower qualify for a mortgage in Austin without tax returns? | Absent | Absent | Not applicable. |
| What is an asset-depletion mortgage and how is qualifying income calculated? | Absent | Absent | Not applicable. |
| What are the requirements for a DSCR loan in Austin, Texas? | Surfaced via the June 16 requirements article | Absent | Not applicable. |
| How does a one-time-close construction loan work in Texas? | Absent | Cited the Styer one-time-close page among its sources | Accurate high-level description of one closing, upfront underwriting, staged draws, inspections, and conversion; the answer appropriately used lender/program-specific framing. |
| How do I choose a mortgage broker in Austin for complicated income? | Surfaced via the April 1 lender-selection article | Absent | Not applicable. |

Totals: web surfaced 2/5, down from 3/5 on 2026-08-21. Perplexity cited and accurately summarized Styer 1/5, unchanged in total but shifted from DSCR to construction.

## Answer-first clarity

| Page | Assessment | Main concern |
|---|---|---|
| Homepage | Strong | Clear complex-income positioning and direct next step. |
| About | Clear identity | “I close the loans your bank can't” remains categorical promotional copy. |
| Self-employed | Mixed, despite a stronger citation pass | Schema and quick-answer sections are conditional, but the first body answer still says borrowers “don't need” W-2s or tax returns. “Actively available right now,” hard score/down-payment/reserve/expense-factor thresholds, a fixed rate premium, and categorical “bypass/sidesteps” language remain current-program dependent. Search now reproduces that categorical first answer. |
| Asset depletion | Strong opening | Definition is extractable and conditional. The divisor/age/LTV table and non-QM premiums remain matrix-dependent. Freddie Mac Bulletin 2026-10 changed §5307.1 effective requirements, so the page's detailed Freddie treatment should be rechecked against the current guide before retaining hard age/occupancy/LTV assertions. Its June market example is one release behind. |
| DSCR | Strong first paragraph, categorical detail below | The next definition says the product “skips your personal income entirely”; hard ratio, score, down-payment, reserve, rate-premium, and “best pricing” thresholds remain investor-specific. The 7.375% simulations use a May benchmark and unsourced rent/tax/insurance assumptions. |
| One-time-close construction | Strong | The opening correctly emphasizes variation. “Clean approval” remains categorical, and the social-description promise still says the rate is locked during construction. |
| Construction hub | Inconsistent | The body definition is conditional, but the hero/search snippet still promises “one rate lock” and interest-only payments. The process states named production builders are pre-approved with most lenders, assumes interest-only treatment and 5–7 draws, and advertises $5M+ programs. |
| Austin rates | Clear opening | Stale product rows are handled honestly. Fixed relative-rate, credit-score spread, lock-cost, and product-ranking statements remain unsupported evergreen copy. |
| Austin housing market | Strong but behind newest release | Answer is extractable and sourced, but June is no longer the newest Unlock MLS release. |
| Business-owner hub | Weakest priority page | Promotional opening precedes the answer. It retains hard program thresholds, fixed expense factors and add-back percentages, age/divisor claims, build costs and loan sizes, closing-time archetypes, AirDNA outputs, categorical “no personal income” statements, and specific Texas legal-process conclusions. |

## Draft corrections for approval

### 1. July market synchronization

Proposed source-led replacement for the Austin market page, DSCR market block, and asset-depletion market example:

> In July 2026, the Austin–Round Rock–San Marcos metro recorded a $435,000 median sales price, 2,739 closed sales, 13,796 active listings, and 4.7 months of inventory, according to Unlock MLS. Compared with July 2025, the median rose 1.0%, closed sales rose 4.4%, and active listings fell 9.9%. This is a metro-wide historical snapshot; current conditions and individual properties can differ.

Approve a complete internal July market record first, then update every duplicated title, description, schema answer, body block, and market example together.

### 2. Self-employed direct answer and hard thresholds

Replace the first body answer and “actively available right now” sentence with:

> Self-employed borrowers may be able to use conventional, government-backed, jumbo, bank-statement, 1099, P&L, asset-depletion, or DSCR documentation depending on the borrower, property, lender, and current program. Some alternative-documentation programs may not rely primarily on tax returns; eligibility, documentation, income calculations, pricing, and reserves require lender review.

Convert fixed scores, down payments, reserves, expense factors, “best pricing,” and rate-in-the-7s statements into examples tied to an approved current matrix/rate sheet, or remove them.

### 3. Asset-depletion current-guide review

Keep the existing conditional opening. Before retaining the comparison table, verify every Fannie/Freddie row against the current primary guides, including Freddie Bulletin 2026-10 changes. Replace non-QM divisor/LTV/premium rows with:

> Non-QM asset-depletion eligibility, asset discounts, divisors, loan-to-value limits, reserves, rates, and documentation vary by investor and current program. Use a current written matrix for the specific scenario.

### 4. DSCR answer and simulations

Replace “skips your personal income entirely” with:

> A DSCR loan is generally a business-purpose investment-property mortgage that primarily evaluates the property's qualifying rent relative to PITIA. Personal-income, credit, asset, reserve, guaranty, entity, and property-document requirements vary by investor and program.

Remove or re-date the 7.375% representative rate, May 7 benchmark comparison, rent ranges, return conclusions, and hard “best pricing” thresholds unless an approved current rate sheet and property-income source support them.

### 5. Construction pages

Replace the construction-hub hero subtitle with:

> A construction loan can fund an eligible build through staged draws. A one-time-close structure combines construction and permanent financing at the initial closing; rate-lock, payment, draw, inspection, completion, and conversion terms vary by lender and program.

Remove or qualify the named-builder preapproval claim, fixed 5–7 draw count, $5M+ availability, universal interest-only treatment, “clean approval,” and rate-locked social description unless current written program support is approved.

### 6. Austin rate comparison copy

Replace fixed spread/ranking language with:

> Loan programs, terms, lock periods, rates, points or credits, and closing costs can price differently by date and scenario. Compare written quotes or Loan Estimates using the same borrower, property, loan amount, occupancy, term, lock period, and comparison date.

Keep the stale-rate guard. Do not publish replacement product rates without an approved internal rate source.

### 7. Business-owner hub

Replace the opening with:

> Business owners, K-1 partners, investors, and high-net-worth borrowers may have conventional, government-backed, jumbo, bank-statement, 1099, P&L, asset-depletion, DSCR, or construction-loan paths depending on the borrower, property, documentation, and current program. The first step is to compare how each eligible path calculates income, assets, reserves, costs, and risk for the specific scenario.

Require current investor/compliance support before retaining hard expense factors, scores, LTVs, divisors, add-back percentages, build costs, loan-size ranges, closing times, AirDNA projections, “no personal income/DTI,” entity-vesting conclusions, or Texas legal-process conclusions.

### 8. Search and AEO follow-up

- Keep the working legacy redirects and monitor whether old URLs remain absent.
- Request recrawling after approval-only self-employed and construction copy is corrected; current search snippets accurately expose the problematic categorical text, so reindexing alone will not fix it.
- Strengthen the asset-depletion page's concise calculation answer and the construction page's conditional first answer with current primary-source citations; both have the clearest opportunity to recover benchmark visibility without adding new claims.

## Change control

The initial automatic source change was limited to the four generator footer facts and its regression test. After explicit user approval, the drafted priority-page corrections and supporting regression coverage were implemented. No current product rates or new financial or compliance claims were published. Existing unrelated working-tree changes were preserved.
