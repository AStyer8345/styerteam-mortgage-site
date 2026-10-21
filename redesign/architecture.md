# Styer Mortgage — Full-Site Architecture and SEO/AEO Preservation

This is the local-only implementation contract for the full-site buildout. It preserves the 173 established routes and their technical content while applying a consistent public-facing shell. It authorizes no deployment, production configuration change, email-recipient change, or n8n/Netlify workflow change.

## Evidence and scope

The supplied `styer-mortgage-migration-ledger-1.md` is byte-identical to the authoritative ledger read during the preceding orchestration. Its SHA-256 is `71b02eba8724e19b6bf1e224ba20f40194ffdad1d2c0f9965217c9ccbf938cc7`. `route-manifest.json` contains exactly 173 distinct routes and their exact parents, anchors, placements, roles and content actions.

The production-content source is the archived, GitHub-verified repository commit `3958d59ae496cb13dda0604191d5257d64f9bcb2`. The preceding local build passed a 170-file, 10,907-node substantive-content comparison. Those results are a baseline; the full-site build must pass its own checks after the global shell changes.

Preserving routes, useful content, links, canonicals and structured data protects existing discovery signals. It cannot guarantee future Google rankings, citations in generated answers, traffic or conversions. The 173-route inventory covers publicly discovered addresses; unknown historical URLs still require Search Console, analytics and access-log reconciliation before a whole-history guarantee.

## Six core clusters

| Cluster | Exact count | Primary entry | Required depth |
| --- | ---: | --- | --- |
| 1. Self-Employed & Business Owner Financing | 10 | `/self-employed-mortgage-austin.html` | Business-owner planning; bank statements; P&L; 1099; K-1; preparation checklist; deposit-review guide; tax-return/add-back/averaging guide; self-employed preparation guide |
| 2. Asset-Based & High-Net-Worth Lending | 3 | `/high-net-worth-mortgage.html` | `/asset-depletion-mortgage-texas.html` and `/reverse-mortgage-texas.html`; retained pledged-asset, trust, RSU, liquidity and private-bank distinctions; cross-links to cases/tools/partner guides |
| 3. Real Estate Investor Financing | 13 | `/investor-loans.html` | Statewide and local DSCR; conventional investment; dedicated DSCR cash-out; STR, no/low-ratio, qualification, BRRRR and comparison guides |
| 4. Conventional, Jumbo & Specialized Products | 28 | `/first-time-home-buyer.html` and `/loans/refinance.html` | Conventional, jumbo, FHA, VA, USDA, construction, one-time-close, buy-before-sell, home equity, Non-QM and all corresponding guides |
| 5. Case Study & Scenario Library | 9 | `/scenarios.html` | Eight full examples, including the former-CFO and veteran cases at their established blog URLs |
| 6. Standalone Calculators & Tools | 9 | `/calculators.html` | Eight standalone tools, preserving calculations, assumptions, inputs, explanations and related-page links |

Cluster 1 is ten routes: one hub plus nine other pages. The shorthand “hub + eight” must not remove the tenth ledger row. The six core clusters total 72 routes. Keep all 101 supplemental routes: 51 site/general/conversion routes, 32 local/service/offer-review routes, 12 partner/Realtor routes, and six legal/legacy/alias routes.

## Front door and deeper paths

Use Buy, Refinance, Invest and Resources as the main information groups, with team/contact and secure application clearly available. The homepage’s situation cards route business income, assets and rental income to their dedicated hubs. Keep a simple conventional/jumbo route available to buyers who do not identify with a specialty.

| Destination | Role in the experience | Contextual onward links |
| --- | --- | --- |
| `/self-employed-mortgage-austin.html` | Compare methods of documenting income | Bank statements, P&L, 1099, K-1, business-owner planning, complete tax-return analysis |
| `/high-net-worth-mortgage.html` | Preserve liquidity while reviewing eligible assets | Asset depletion, asset calculator, relevant cases, jumbo, financial-advisor guide |
| `/investor-loans.html` | Compare rental financing methods | Conventional vs DSCR, DSCR calculator, cash-out, STR and BRRRR guides |
| `/first-time-home-buyer.html` | Primary-home financing overview with retained first-time depth | Conventional, jumbo, FHA, VA, USDA, assistance, construction, buy-before-sell |
| `/loans/refinance.html` | Refinance and equity starting point | Break-even, closing-cost tool, home equity/HELOC, separate investor cash-out |
| `/resources/` | Complete discovery directory | All clusters, `/blog.html`, `/realtor-resources.html`, `/scenarios.html`, `/calculators.html`, local and partner directories |

The resource hub links directly to the Realtor archive so its primary ownership chain does not force five clicks. Contextual shortcuts may shorten a journey without changing which page is the primary parent.

## Progressive disclosure rules

1. The homepage gives orientation, an honest trade-off, proof with accurate status, team responsibilities and a next step. It does not become a directory of 173 cards.
2. Hubs explain how to choose among a small set of paths. Their child links remain ordinary HTML anchors with descriptive text. Every child assigned by the ledger must be present.
3. Specialty pages expose fit, non-fit, costs and the qualification method before the full technical explanation. Decision-changing limitations remain visible rather than being hidden with minor detail.
4. Long explanations may sit in native disclosures, but the full text is delivered in HTML and remains readable without fetching it after a click. Preserve existing section IDs where practical so deep links continue to work.
5. Guide/article bodies keep dated context, authors, calculations, sources and examples. A new visual shell does not turn a historical rate article into a current rate quote.
6. Scenario filters and resource searches enhance a complete initial HTML link list. They cannot be the sole way to discover a page.
7. All eight calculators retain their established URLs: payment, affordability, DSCR, asset depletion, refinance break-even, refinance closing costs, temporary buydown and wraparound mortgage. A new widget is an addition, not a replacement for an existing tool.

## Exact parent, child and breadcrumb contract

`route-manifest.json` is authoritative. For each row, the required parent contains an `<a href>` to the established canonical destination using the exact `anchor`. The child has a visible return link to `primary_parent`, and relevant contextual links to a guide, example or tool. Sitewide navigation alone is insufficient contextual discovery for an interior substantive page.

`expected-breadcrumbs.json` supplies the complete expected chain for all 173 route entries. Use these rules when implementing the global shell:

- Follow `primary_parent` repeatedly to Home, reverse that chain, and render it as a labelled breadcrumb navigation and ordered list. Only ancestors are links; the current page uses `aria-current="page"`.
- Use the same routes and ordering in a single BreadcrumbList graph with contiguous positions starting at 1. Replace the old graph rather than appending a contradictory second graph. A shorter visual label is acceptable when it clearly names the same page; URL ancestry must agree.
- The home page needs no breadcrumb trail. It may omit BreadcrumbList entirely.
- `/index.html` resolves as the homepage alias and canonicalizes to `/`; new links point to `/` using “Styer Mortgage home” where the exact ledger anchor is required.
- `/blog/2026-06-14-buy-before-you-sell-austin-tx` keeps its alias behavior; parent links and breadcrumb current-page URLs use the `.html` canonical article.
- `/apply-now/` is the stable application entry route, not a substantive guide. The local preview may resolve to its visible application gate. Do not claim that this verifies the live application destination.
- Root-level file names remain unchanged. A breadcrumb relationship is not a reason to move a page into a new folder or redirect it to a generic hub.

The previous build stores many exact ledger links inside `.migration-links` disclosures. If those blocks are replaced as part of the full visual redesign, every required link and exact anchor must be reintroduced in the appropriate page content; removing the old blocks without replacements reopens the earlier 60-parent-link gap.

## Metadata and structured-data contract

Preserve production titles, descriptions, canonical relationships, Open Graph/Twitter content, author identities, original publication dates and relevant schema. Existing H1 wording may change when the meaning remains accurate and the page purpose is retained; avoid multiple H1s introduced by a global shell.

Keep FinancialService, Person, MortgageLoan, Article, FAQPage, WebPage and BreadcrumbList types where they already accurately describe the page. Schema must match visible content. Do not fabricate ratings, loan outcomes, lender eligibility, response times, licensing or team affiliations. The prior homepage and bank-template removal of unverified former-affiliation fields is documented; any new full-site changes must likewise be explicit.

Update a FAQ answer in both delivered HTML and JSON-LD. FAQ content may remain in an accessible disclosure, but retaining FAQ schema does not establish eligibility for a search rich result. When an article is reorganized, do not assign a new publication date simply because its CSS changed.

For local review, preview noindex rules and disabled submissions remain intentional. Production-specific exceptions must survive in the source restoration plan: `/loans/usda.html` and `/ftb-dpa-guide.html` originally use `noindex, follow`; `/refinance-calculator.html` has separate crawl/header restrictions; the March-rate article has an existing canonical relationship that must not be silently rewritten. Production sitemap and robots configuration are separate from local-preview behavior.

## Historical routes and protected systems

The verified source contains 253 legacy redirect/rewrite entries covering 247 distinct path patterns and four production host aliases. The preceding build includes all 247 path patterns. Preserve this coverage during the local build, including both first-time-buyer-guide rewrite variants and application entry aliases. Host/domain redirects stay outside the local preview’s authority.

Do not edit n8n, Netlify settings, server-side email routing or recipients, production application targets, or live automation configuration as part of this architecture work. A local form completion state must not imply a real lead was saved. Keep the prior safe preview behavior unless the project lead supplies a separately authorized local testing arrangement.

## Final audit gates

| Gate | Required local evidence |
| --- | --- |
| Route coverage | All 173 ledger entries resolve to intended files, aliases or explicit route configuration |
| Link integrity | Zero missing required parents/anchors/backlinks, unreachable canonical content pages, broken internal targets or fragments |
| Full content | Compare all 170 distinct source HTML files; no unexplained missing substantive paragraphs, headings, lists, table cells, definitions or FAQ answers |
| Calculators | Preserve tool HTML and calculation sources; browser/runtime testing belongs to technical QA |
| Metadata | Per-route title/description/canonical/schema comparison with documented deviations only |
| Breadcrumbs | Visible parent chain and one matching BreadcrumbList per substantive interior route, with deliberate exceptions recorded |
| Archives | Initial HTML links expose all guides/cases/articles; JavaScript filters are optional enhancements |
| Legacy routes | Retain all 247 path patterns and documented application-gate behavior |
| Local-only boundary | No deployment, no real form submission, no backend/email/automation mutation |
| Honest outcome | Report actual preservation evidence and remaining limits; make no ranking or traffic guarantee |

## Complete 173-route mapping

The following table is generated from the supplied route manifest. Exact destinations and anchors are preserved; aliases use their canonical link destination as explained above. Full placement and content-action fields remain in `route-manifest.json`.

### Cluster 1: Self-Employed & Business Owner Financing

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/self-employed-mortgage-austin.html` | Hub | `/` | Self-employed mortgage options |
| `/mortgage-for-business-owners-austin.html` | Spoke | `/self-employed-mortgage-austin.html` | Mortgage planning for business owners |
| `/bank-statement-loans.html` | Spoke | `/self-employed-mortgage-austin.html` | Bank statement loans in Texas |
| `/p-and-l-mortgage-texas.html` | Spoke | `/self-employed-mortgage-austin.html` | P&L mortgage loans in Texas |
| `/1099-only-mortgage-texas.html` | Spoke | `/self-employed-mortgage-austin.html` | 1099-only mortgage loans in Texas |
| `/k1-income-mortgage-austin.html` | Spoke | `/self-employed-mortgage-austin.html` | Qualifying for a mortgage with K-1 income |
| `/resources/mortgage-options-for-business-owners.html` | Guide | `/mortgage-for-business-owners-austin.html` | Business-owner mortgage preparation checklist |
| `/blog/2026-06-30-bank-statement-loans-texas.html` | Guide | `/bank-statement-loans.html` | How lenders review bank statements |
| `/blog/2026-07-16-self-employed-income-calculation-underwriting-texas.html` | Guide | `/self-employed-mortgage-austin.html` | Self-employed tax-return income: add-backs and averaging |
| `/blog/2026-04-02-self-employed-mortgage-austin-tx.html` | Guide | `/self-employed-mortgage-austin.html` | Preparing for a self-employed mortgage |

### Cluster 2: Asset-Based & High-Net-Worth Lending

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/high-net-worth-mortgage.html` | Hub | `/` | Mortgages for asset-rich borrowers |
| `/asset-depletion-mortgage-texas.html` | Spoke | `/high-net-worth-mortgage.html` | Asset depletion mortgages in Texas |
| `/reverse-mortgage-texas.html` | Spoke | `/high-net-worth-mortgage.html` | Reverse mortgages in Texas |

### Cluster 3: Real Estate Investor Financing

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/investor-loans.html` | Hub | `/` | Investment property financing |
| `/dscr-loans-texas.html` | Spoke | `/investor-loans.html` | DSCR loans in Texas |
| `/dscr-loan-austin-tx.html` | Spoke | `/dscr-loans-texas.html` | DSCR loans in Austin |
| `/dscr-loans-fredericksburg-tx.html` | Spoke | `/dscr-loans-texas.html` | DSCR loans in Fredericksburg |
| `/dscr-loans-dripping-springs.html` | Spoke | `/dscr-loans-texas.html` | DSCR loans in Dripping Springs |
| `/dscr-cash-out-refinance-texas.html` | Spoke | `/investor-loans.html` | DSCR cash-out refinance in Texas |
| `/loans/investment.html` | Spoke | `/investor-loans.html` | Investment property loan requirements |
| `/blog/2026-06-14-dscr-vs-conventional-investment-property-loan-texas.html` | Guide | `/investor-loans.html` | DSCR vs conventional investment property loans |
| `/blog/2026-06-23-no-ratio-low-dscr-loans-texas.html` | Guide | `/dscr-loans-texas.html` | Low-DSCR and no-ratio rental loans |
| `/blog/2026-06-05-dscr-cash-out-refinance-texas-brrrr.html` | Guide | `/dscr-cash-out-refinance-texas.html` | DSCR cash-out refinance and BRRRR |
| `/blog/2026-06-05-dscr-airbnb-str-loan-texas.html` | Guide | `/dscr-loans-texas.html` | DSCR loans for Airbnb and short-term rentals |
| `/blog/2026-06-16-dscr-loan-requirements-texas.html` | Guide | `/dscr-loans-texas.html` | DSCR loan requirements in Texas |
| `/blog/2026-03-31-dscr-loans-austin-tx-2026.html` | Guide | `/dscr-loan-austin-tx.html` | How DSCR loans work in Austin |

### Cluster 4: Conventional, Jumbo & Specialized Products

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/first-time-home-buyer.html` | Hub | `/` | Buying a home |
| `/loans/refinance.html` | Hub | `/` | Refinancing and cash-out options |
| `/loans/conventional.html` | Spoke | `/first-time-home-buyer.html` | Conventional home loans |
| `/loans/jumbo.html` | Spoke | `/first-time-home-buyer.html` | Jumbo mortgage options |
| `/loans/fha.html` | Spoke | `/first-time-home-buyer.html` | FHA loans in Austin |
| `/loans/va.html` | Spoke | `/first-time-home-buyer.html` | VA home loans in Texas |
| `/loans/usda.html` | Spoke | `/first-time-home-buyer.html` | USDA home loans near Austin |
| `/loans/construction.html` | Hub | `/first-time-home-buyer.html` | Construction loan options |
| `/one-time-close-construction-loan-texas.html` | Spoke | `/loans/construction.html` | One-time-close construction loans in Texas |
| `/construction-loan-scenario-review.html` | Tool | `/loans/construction.html` | Review my construction project |
| `/buy-before-you-sell-austin.html` | Spoke | `/first-time-home-buyer.html` | Buy before you sell in Austin |
| `/home-equity-loans-texas.html` | Spoke | `/loans/refinance.html` | Texas home equity loans and HELOCs |
| `/non-qm-loans.html` | Hub | `/products.html` | Non-QM mortgage options |
| `/blog/2026-09-04-what-is-a-non-qm-loan-texas.html` | Guide | `/non-qm-loans.html` | What is a Non-QM loan? |
| `/blog/2026-09-09-buy-house-you-rent-from-landlord-texas.html` | Guide | `/first-time-home-buyer.html` | Buying the home you rent in Texas |
| `/blog/2026-08-18-jumbo-loan-requirements-texas-2026.html` | Guide | `/loans/jumbo.html` | Texas jumbo loan requirements |
| `/blog/2026-04-17-should-i-refinance-austin-tx-2026.html` | Guide | `/loans/refinance.html` | Should I refinance? Break-even and costs |
| `/blog/2026-03-29-va-loan-eligibility-texas.html` | Guide | `/loans/va.html` | VA loan eligibility in Texas |
| `/blog/2026-03-24-cash-out-refinance-austin-tx.html` | Guide | `/loans/refinance.html` | Cash-out refinance costs and trade-offs |
| `/blog/2026-03-28-how-long-does-mortgage-pre-approval-take.html` | Guide | `/mortgage-pre-approval-austin.html` | How long mortgage pre-approval takes |
| `/blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` | Guide | `/first-time-home-buyer.html` | FHA vs conventional loans |
| `/blog/2026-03-27-down-payment-assistance-texas-2026.html` | Guide | `/austin-down-payment-assistance.html` | Texas down payment assistance programs |
| `/blog/2026-06-14-buy-before-you-sell-austin-tx.html` | Guide | `/buy-before-you-sell-austin.html` | How to buy before selling your current home |
| `/blog/2026-05-30-physician-mortgage-texas.html` | Guide | `/first-time-home-buyer.html` | Physician mortgage options in Texas |
| `/blog/2026-07-21-itin-mortgage-loans-texas.html` | Guide | `/non-qm-loans.html` | ITIN mortgage qualification in Texas |
| `/blog/2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html` | Guide | `/austin-down-payment-assistance.html` | First-time homebuyer assistance in Austin |
| `/blog/2026-04-10-fha-loan-requirements-texas-2026.html` | Guide | `/loans/fha.html` | FHA loan requirements in Texas |
| `/blog/2026-04-03-condo-mortgage-austin-tx.html` | Guide | `/first-time-home-buyer.html` | Condo mortgage requirements in Austin |

### Cluster 5: Case Study & Scenario Library

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/scenarios.html` | Hub | `/resources/` | Mortgage scenarios and case studies |
| `/scenarios/oil-gas-royalty-asset-depletion.html` | Case Study | `/scenarios.html` | Asset depletion after two bank declines |
| `/scenarios/self-employed-refinance-deposit-review.html` | Case Study | `/scenarios.html` | 1099 bank-statement cash-out refinance scenario |
| `/scenarios/two-rental-properties-cash-out-review.html` | Case Study | `/scenarios.html` | Two-rental-property cash-out review |
| `/scenarios/buying-current-rental-gift-funds.html` | Case Study | `/scenarios.html` | Buying your rental home with gift funds |
| `/scenarios/build-on-owned-land-before-selling.html` | Case Study | `/scenarios.html` | Building on owned land before selling |
| `/scenarios/assets-limited-income-history.html` | Case Study | `/scenarios.html` | Asset-rich buyer with limited income history |
| `/blog/2026-08-06-asset-depletion-loan-case-study-former-cfo.html` | Case Study | `/scenarios.html` | Former CFO asset-depletion case study |
| `/blog/2026-08-21-veteran-asset-depletion-mortgage-case-study.html` | Case Study | `/scenarios.html` | Veteran retirement-asset qualification case study |

### Cluster 6: Standalone Calculators & Tools

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/calculators.html` | Hub | `/resources/` | Mortgage calculators |
| `/calculator-payment.html` | Tool | `/calculators.html` | Mortgage payment calculator |
| `/calculator-affordability.html` | Tool | `/calculators.html` | Home affordability calculator |
| `/dscr-calculator.html` | Tool | `/calculators.html` | DSCR rental property calculator |
| `/asset-depletion-calculator.html` | Tool | `/calculators.html` | Asset depletion income calculator |
| `/calculator-refinance-breakeven.html` | Tool | `/calculators.html` | Refinance break-even calculator |
| `/refinance-calculator.html` | Tool | `/calculators.html` | Refinance closing-cost calculator |
| `/rate-buydown-calculator.html` | Tool | `/calculators.html` | Temporary rate buydown calculator |
| `/wrap-mortgage-calculator.html` | Tool | `/calculators.html` | Wraparound mortgage calculator |

### Additional Coverage A: Site Hubs, Guides, Articles & Conversion Routes

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/` | Hub | Root | Styer Mortgage |
| `/products.html` | Hub | `/` | All mortgage options |
| `/resources/` | Hub | `/` | Mortgage resources and guides |
| `/blog.html` | Hub | `/resources/` | Mortgage articles and market updates |
| `/about.html` | Guide | `/` | About Adam and the team |
| `/testimonials.html` | Guide | `/about.html` | Client and partner reviews |
| `/contact.html` | Tool | `/` | Contact Adam Styer |
| `/scenario.html` | Tool | `/` | Review my mortgage scenario |
| `/get-preapproved.html` | Tool | `/first-time-home-buyer.html` | Request a mortgage pre-approval review |
| `/prequal.html` | Tool | `/first-time-home-buyer.html` | Mortgage pre-qualification |
| `/refinance-quote.html` | Tool | `/loans/refinance.html` | Review my refinance scenario |
| `/rate-check.html` | Tool | `/resources/` | Compare my mortgage offer |
| `/rate-alert.html` | Tool | `/austin-mortgage-rates.html` | Mortgage rate alerts |
| `/austin-mortgage-rates.html` | Guide | `/resources/` | Austin mortgage rates |
| `/austin-housing-market.html` | Guide | `/resources/` | Austin housing market |
| `/how-to-buy-a-house-in-austin-tx.html` | Guide | `/first-time-home-buyer.html` | How to buy a house in Austin |
| `/mortgage-pre-approval-austin.html` | Guide | `/first-time-home-buyer.html` | Mortgage pre-approval in Austin |
| `/how-much-house-can-i-afford-austin.html` | Guide | `/first-time-home-buyer.html` | How much house can I afford in Austin? |
| `/austin-down-payment-assistance.html` | Guide | `/first-time-home-buyer.html` | Austin down payment assistance programs |
| `/closing-costs-texas.html` | Guide | `/resources/` | Texas closing costs explained |
| `/fixed-vs-adjustable.html` | Guide | `/resources/` | Fixed vs adjustable-rate mortgages |
| `/improve-credit-score.html` | Guide | `/resources/` | Improve your credit score for a mortgage |
| `/mortgage-broker-vs-bank.html` | Guide | `/resources/` | Mortgage broker vs bank |
| `/mortgage-glossary.html` | Guide | `/resources/` | Mortgage terms explained |
| `/ftb-dpa-guide.html` | Guide | `/austin-down-payment-assistance.html` | First-time-buyer down payment help |
| `/resources/first-time-buyer-guide/` | Guide | `/first-time-home-buyer.html` | First-time homebuyer guide |
| `/blog/2026-10-01-why-mortgage-rates-are-rising.html` | Guide | `/austin-mortgage-rates.html` | Why mortgage rates are rising |
| `/blog/2026-03-10-when-you-cant-control-it-surrender-it.html` | Guide | `/blog.html` | When you can’t control it, surrender it |
| `/blog/2026-03-18-the-ai-trap-i-walked-right-into.html` | Guide | `/blog.html` | The AI trap I walked right into |
| `/blog/2026-03-06-oil-prices-jobs-report-rate-volatility.html` | Guide | `/austin-mortgage-rates.html` | Oil prices, jobs and mortgage rate volatility |
| `/blog/2026-06-15-mortgage-rates-inflation-iran-peace-deal.html` | Guide | `/austin-mortgage-rates.html` | Mortgage rates and inflation: June 2026 |
| `/blog/2026-04-27-why-home-prices-arent-crashing.html` | Guide | `/austin-housing-market.html` | Why home prices aren’t crashing |
| `/blog/can-i-switch-lenders-after-going-under-contract-texas.html` | Guide | `/rate-check.html` | Switching mortgage lenders under contract |
| `/blog/2026-03-30-why-rates-improved-today-bond-rally.html` | Guide | `/austin-mortgage-rates.html` | Why mortgage rates improved: March 30, 2026 |
| `/blog/2026-04-01-spring-market-update.html` | Guide | `/austin-housing-market.html` | Austin spring housing market update |
| `/blog/2026-04-01-how-to-choose-a-mortgage-lender-austin-tx.html` | Guide | `/rate-check.html` | How to choose a mortgage lender in Austin |
| `/blog/how-to-compare-two-mortgage-offers.html` | Guide | `/rate-check.html` | How to compare two mortgage offers |
| `/blog/2026-04-06-mortgage-document-checklist-austin-tx.html` | Guide | `/mortgage-pre-approval-austin.html` | Mortgage document checklist by income type |
| `/blog/apr-vs-interest-rate-what-actually-matters.html` | Guide | `/rate-check.html` | APR vs interest rate |
| `/blog/are-mortgage-lender-fees-negotiable.html` | Guide | `/rate-check.html` | Are mortgage lender fees negotiable? |
| `/blog/is-the-lowest-rate-the-cheapest-loan.html` | Guide | `/rate-check.html` | Is the lowest rate the cheapest loan? |
| `/blog/how-many-mortgage-quotes-should-i-get.html` | Guide | `/rate-check.html` | How many mortgage quotes should I get? |
| `/blog/how-to-read-a-loan-estimate.html` | Guide | `/rate-check.html` | How to read a Loan Estimate |
| `/blog/local-lender-vs-online-lender-austin-central-texas.html` | Guide | `/rate-check.html` | Local lender vs online lender |
| `/blog/what-delays-closing-when-you-switch-lenders.html` | Guide | `/rate-check.html` | What delays closing when switching lenders? |
| `/blog/what-to-compare-besides-mortgage-rate.html` | Guide | `/rate-check.html` | What to compare besides mortgage rate |
| `/blog/2026-09-10-the-conversation-behind-a-lower-mortgage-rate.html` | Guide | `/rate-check.html` | The financing goal behind a lower rate |
| `/blog/2026-03-20-austin-mortgage-rates-march-2026.html` | Guide | `/austin-mortgage-rates.html` | Austin mortgage rates: March 2026 archive |
| `/blog/2026-08-10-austin-housing-market-report-august-2026.html` | Guide | `/austin-housing-market.html` | Austin housing market report: August 2026 |
| `/blog/2026-04-04-austin-housing-market-report-april-2026.html` | Guide | `/austin-housing-market.html` | Austin housing market report: April 2026 |
| `/resources/blog/2026-03-04-wait-for-rates.html` | Guide | `/buy-before-you-sell-austin.html` | Should you wait for mortgage rates before moving? |

### Additional Coverage B: Local Service Pages & Local Offer Reviews

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/austin-area-mortgage-lender.html` | Hub | `/resources/` | Austin and Central Texas mortgage service areas |
| `/pflugerville-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Pflugerville mortgage options |
| `/leander-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Leander mortgage options |
| `/georgetown-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Georgetown mortgage options |
| `/round-rock-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Round Rock mortgage options |
| `/cedar-park-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Cedar Park mortgage options |
| `/liberty-hill-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Liberty Hill mortgage options |
| `/kyle-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Kyle mortgage options |
| `/bastrop-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Bastrop mortgage options |
| `/san-marcos-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | San Marcos mortgage options |
| `/buda-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Buda mortgage options |
| `/bee-cave-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Bee Cave mortgage options |
| `/hutto-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Hutto mortgage options |
| `/westlake-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Westlake Hills mortgage options |
| `/new-braunfels-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | New Braunfels mortgage options |
| `/lakeway-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Lakeway mortgage options |
| `/manor-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Manor mortgage options |
| `/dripping-springs-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Dripping Springs mortgage options |
| `/smithville-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Smithville mortgage options |
| `/jarrell-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Jarrell mortgage options |
| `/florence-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Florence mortgage options |
| `/spicewood-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Spicewood mortgage options |
| `/elgin-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Elgin mortgage options |
| `/marble-falls-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Marble Falls mortgage options |
| `/taylor-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Taylor mortgage options |
| `/dallas-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | Dallas mortgage options |
| `/san-antonio-mortgage-lender.html` | Guide | `/austin-area-mortgage-lender.html` | San Antonio mortgage options |
| `/rate-check-round-rock.html` | Tool | `/round-rock-mortgage-lender.html` | Compare a mortgage offer in Round Rock and Pflugerville |
| `/rate-check-cedar-park.html` | Tool | `/cedar-park-mortgage-lender.html` | Compare a mortgage offer in Cedar Park and Leander |
| `/rate-check-georgetown.html` | Tool | `/georgetown-mortgage-lender.html` | Compare a mortgage offer in Georgetown and Hutto |
| `/rate-check-buda-kyle.html` | Tool | `/buda-mortgage-lender.html` | Compare a mortgage offer in Buda, Kyle and San Marcos |
| `/rate-check-new-braunfels.html` | Tool | `/new-braunfels-mortgage-lender.html` | Compare a mortgage offer in New Braunfels |

### Additional Coverage C: Professional Partners & Realtor Updates

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/referral-partners-self-employed-clients.html` | Hub | `/resources/` | Mortgage resources for professional partners |
| `/realtors.html` | Hub | `/referral-partners-self-employed-clients.html` | Mortgage resources for Realtors |
| `/mortgage-resources-for-cpas-texas.html` | Spoke | `/referral-partners-self-employed-clients.html` | Mortgage resources for Texas CPAs |
| `/mortgage-strategies-financial-advisors-texas.html` | Spoke | `/referral-partners-self-employed-clients.html` | Mortgage strategies for financial advisors |
| `/mortgage-case-studies-for-advisors-cpas.html` | Hub | `/referral-partners-self-employed-clients.html` | Mortgage case studies for advisors and CPAs |
| `/reverse-mortgage-financial-advisors-texas.html` | Guide | `/mortgage-strategies-financial-advisors-texas.html` | Reverse mortgage planning for financial advisors |
| `/realtor-resources.html` | Hub | `/realtors.html` | Realtor tools and market updates |
| `/resources/blog/2026-03-04-wait-for-rates-realtor.html` | Guide | `/realtor-resources.html` | Helping buyers with the wait-for-rates objection |
| `/realtor-updates/2026-06-08-when-other-lenders-say-no.html` | Guide | `/realtor-resources.html` | Mortgage options when other lenders say no |
| `/realtor-updates/2026-02-27-ai-for-realtors-rates-drop-below-6.html` | Guide | `/realtor-resources.html` | AI tools and mortgage rate update: February 2026 |
| `/realtor-updates/2026-06-22-buyers-who-dont-fit-conventional-mortgage-austin.html` | Guide | `/realtor-resources.html` | Six financing scenarios for nontraditional buyers |
| `/realtor-updates/2026-04-27-the-crash-that-isnt-coming-data-for-your-buyers.html` | Guide | `/realtor-resources.html` | Housing market data for buyer conversations |

### Additional Coverage D: Legal Pages, Legacy Routes & Aliases

| Established route | Role | Primary parent | Exact anchor |
| --- | --- | --- | --- |
| `/privacy.html` | Guide | `/` | Privacy policy |
| `/terms.html` | Guide | `/` | Terms and conditions |
| `/texas-complaint-notice.html` | Guide | `/` | Texas consumer complaint notice |
| `/index.html` | Hub | `/` | Styer Mortgage home |
| `/apply-now/` | Tool | `/` | Start full mortgage application |
| `/blog/2026-06-14-buy-before-you-sell-austin-tx` | Guide | `/buy-before-you-sell-austin.html` | How to buy before selling your current home |
