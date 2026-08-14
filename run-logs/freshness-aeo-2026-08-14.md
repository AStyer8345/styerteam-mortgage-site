# Friday freshness and AEO audit — 2026-08-14

Run completed: 2026-08-14 11:54 CDT
Scope: priority pages covering the homepage, about, Austin market and rates, self-employed, asset-depletion, DSCR, construction, and business-owner mortgages.

## Outcome

- One displayed fact block qualified for automatic correction: the April 2026 Austin metro figures on `dscr-loan-austin-tx.html` were synchronized exactly from the already-approved internal April market report. The obsolete Unlock MLS URL was replaced with its current stats page.
- Follow-up approval received on 2026-08-14: the confirmed $832,750 conforming limit, current Austin-metro FHA figures, review-count refresh, and the remaining clarity corrections below were implemented for validation and push.
- Validation after the one eligible edit: 104 tests passed; typecheck passed; production build passed; SEO audit passed for 145 URLs with 0 issues.

## Freshness and factual findings

| Priority | Area | Finding | Disposition |
|---|---|---|---|
| Fixed | 2026 conforming limit | `how-to-buy-a-house-in-austin-tx.html` said $766,550 and `mortgage-glossary.html` said $806,500. The official 2026 baseline is $832,750. | Corrected after approval and linked to FHFA. |
| Fixed | 2026 FHA limits | `loans/fha.html` and the April FHA article said Travis/Williamson one-unit limit was $524,225 and repeated old multi-unit figures. Current Austin metro figures are $571,550 / $731,700 / $884,450 / $1,099,150 for 1–4 units. | Corrected after approval across live FHA comparison, metadata, schema, body, and FAQ content. |
| Fixed | April market block | The DSCR page showed $445,000 and roughly 16,000 active listings and linked to a 404. The approved internal report says $440,000 median, 11,592 active, 2,648 closed, 4.7 months, +2.0% closed sales and −1.9% median. | Corrected automatically from the approved internal source. |
| Fixed | Evergreen market page | `austin-housing-market.html` was opinion-first, lacked an inline primary market citation, predicted 2–5% growth, said Austin would not see dramatic declines, and embedded an early-2026 rate range. | Replaced after approval with a June 2026 source-led Unlock MLS snapshot and forecast-neutral answers. |
| Medium | Rate feed | `rates.json` is dated 2026-05-18 and its national week is 2026-05-14. The page correctly treats the data as stale, labels it historical, and hides Adam's old product rates. | Repair/update the feed job; no misleading live display was found and no rate claim was published. |
| Fixed | Reviews | Live profiles show 95 Google reviews and 45 Zillow reviews, a minimum combined count of 140. The site said 137+, which remained true but was behind the live count. | Updated to 140+ after approval across live HTML. |
| Verified | Licensing/contact | Priority pages consistently show Adam Styer NMLS #513013, Kyber Mortgage Corporation dba HyperSmart Home Loans NMLS #2653540, (512) 956-6010, adam.styer@hypersmart.loan, and 9050 N. Capital of Texas Hwy, Suite 390, Austin, TX 78759. Google confirms business name/address/phone; Zillow confirms personal NMLS/address/phone. | No change. Company NMLS remained internally approved; the external NMLS record was not fetchable by the audit client. |
| Mitigated | Search-index identity | A web result for the about page still exposed legacy Mortgage Solutions LP details, an old email/address, company NMLS #2526130, and 91 reviews even though the live page is clean. | Canonical and forced `/about` redirect verified; sitemap lastmod refreshed to prompt recrawl. Search-engine refresh timing remains external. |
| Verified | Lender count | “40+” is consistent across priority pages and is an approved internal positioning statement. | No change; externally attested roster was not available. |

Authoritative checks: [FHFA 2026 conforming limits](https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026), [HUD 2026 FHA announcement](https://www.hud.gov/news/hud-no-25-134), [Unlock MLS statistics](https://www.unlockmls.com/stats), [Freddie Mac PMMS](https://www.freddiemac.com/pmms), [Google business profile](https://www.google.com/maps/search/?api=1&query=Adam%20Styer%20Mortgage&query_place_id=ChIJYy5uEFPKRIYRmF-k_5gPk74), and [Zillow lender profile](https://www.zillow.com/lender-profile/adamstyer/).

## External citation audit

- One confirmed broken source was found: the old Unlock MLS `/about-us/abor-statistics` URL on the DSCR page returned 404. It was replaced while synchronizing the approved fact block.
- No confirmed broken sources remain among the audited priority-page links.
- Census Reporter, Fannie Mae's LLPA PDF, AirDNA, and Home Builder Digest blocked the command-line checker but opened or otherwise resolved in browser checks. KXAN blocked automated access and remains unverified rather than confirmed broken.

## Fixed AEO benchmark

The following exact questions form the fixed set for subsequent Friday comparisons. “Web” records whether styermortgage.com surfaced in the general web result set observed during this run; it is not a localized Google rank report. “Answer engine” records a live signed-in Perplexity result.

| Benchmark question | Web | Answer engine | Summary accuracy |
|---|---|---|---|
| How can a self-employed borrower qualify for a mortgage in Austin without tax returns? | Surfaced | Cited the Styer self-employed article | Accurate, conditional overview; Styer was used for the P&L route. |
| What is an asset-depletion mortgage and how is qualifying income calculated? | Absent | Absent | Not applicable. |
| What are the requirements for a DSCR loan in Austin, Texas? | Surfaced | Absent | Not applicable. |
| How does a one-time-close construction loan work in Texas? | Surfaced | Absent | Not applicable. |
| How do I choose a mortgage broker in Austin for complicated income? | Surfaced | Absent | Not applicable. |

Baseline totals: web surfaced 4/5 and was absent 1/5; answer engine cited 1/5, accurately summarized 1/5, and was absent 4/5.

## Answer-first clarity

| Page | Assessment | Main concern |
|---|---|---|
| Homepage | Strong | Direct paths and extractable answers; review count can be refreshed after approval. |
| About | Clear identity | “Best rate/program” and retail-closing-time comparisons deserve compliance review. |
| Self-employed | Strong structure, unsafe certainty | Title says “No Tax Returns Required”; FAQ says borrowers do not need W-2s or tax returns. Eligibility is conditional. |
| Asset depletion | Strong answer-first structure | “You never have to actually withdraw” is categorical; program treatment varies. |
| DSCR | Strong | April market support is now accurate and sourced. |
| One-time-close construction | Strong structure, unsafe certainty | Automatic conversion, fixed-rate, no re-underwriting, $500K–$5M+, quarterly-closing, and legal/process claims require program/compliance support. |
| Construction hub | Clear | Hard numerical “typical” requirements should be sourced or softened. |
| Austin rates | Clear, but promotional | “Lowest available,” bank-rate savings, no-credit-impact, and broker-superiority statements are unsupported or categorical. |
| Austin housing market | Weak | Forecast-led rather than a current, sourced answer. |
| Business-owner hub | Strong | Keep product eligibility conditional and program-specific. |

## Approved correction set

### 1. Conforming-limit correction

Replace the three stale figures with: “For 2026, the baseline conforming loan limit for a one-unit property is $832,750. Loans above the applicable county/property limit may be treated as jumbo.” Link the first statement to FHFA.

### 2. Austin-area FHA-limit correction

Replace the stale Travis/Williamson figures in `loans/fha.html` and the April FHA article, including metadata, schema, body copy, and FAQs, with: “For 2026, the FHA limits for Travis and Williamson counties are $571,550 for one unit, $731,700 for two units, $884,450 for three units, and $1,099,150 for four units. Limits vary by county and property type.” Add an official HUD limit lookup/announcement citation.

### 3. Self-employed answer

Proposed title: “Self-Employed Mortgage Austin TX | Alternative Documentation Options | Adam Styer | NMLS #513013”

Proposed direct answer: “Self-employed borrowers may be able to use conventional, government-backed, jumbo, bank-statement, 1099, P&L, asset-depletion, or DSCR documentation depending on the borrower, property, and current program. Some alternative-documentation programs may not rely primarily on tax returns; eligibility and calculations require lender review.”

### 4. Asset-depletion qualifier

Replace “You never have to actually withdraw the money” with: “The qualifying-income calculation does not necessarily require withdrawals on the depletion schedule; treatment varies by program.”

### 5. One-time-close construction answer

Replace the categorical opening with: “A one-time-close construction-to-permanent loan combines construction and permanent financing in one closing. Builder approval, plans, budget, draws, inspections, contingency funds, land equity, completion, rate and conversion terms, and borrower qualification vary by program and require review.” Remove or substantiate the fixed-rate, no-re-underwriting, range, closing-frequency, and legal conclusions.

### 6. Austin rates positioning

Replace “lowest/best available,” expected bank savings, and “no credit impact” language with: “Adam can compare available lender options and explain rate, points or credits, and closing-cost tradeoffs for a specific scenario.” Keep all rates date-stamped and sourced.

### 7. Austin market opening

Use a dated source-led answer instead of the forecast. A verified June draft is: “In June 2026, the Austin–Round Rock–San Marcos metro recorded a $450,000 median home price, 2,961 closed sales, 13,245 active listings, and 4.4 months of inventory, according to Unlock MLS.” Label it historical once a newer monthly release is used and remove categorical price predictions.

### 8. Reviews and re-indexing

After approval, change 137+ to 140+ where used. Separately request re-crawling for the live canonical about page so search systems stop repeating legacy company and contact details.

## Change control

The initial audit did not publish, commit, or push anything. After follow-up approval, the full correction set was prepared for commit and push following validation. Existing unrelated working-tree changes remained outside the correction commit.
