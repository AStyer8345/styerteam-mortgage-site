# Dallas and San Antonio search expansion — local preview

Requested October 5, 2026. No deployment, indexing request, Google Business Profile change or live analytics change is authorized in this phase.

## Evidence and scope

The inspected worktree has broad Texas program pages and incidental Dallas/San Antonio coverage, but no dedicated canonical city routes or competing redirects for these two cities. Create one useful service guide per city, retaining the statewide program pages as program authorities rather than generating every city/program keyword combination.

The saved Search Console file `seo-data/gsc/2026-08-07.json` covers June 13–August 7, 2026. Its query table shows “asset depletion mortgage lender in dallas texas”: 56 impressions, zero clicks, average position 14.41; “bank statement loan lender in dallas texas”: 9 impressions, zero clicks, position 50.78. These are historical site-level query signals, not current rankings, search-volume forecasts or proof that a new page will rank. The snapshot did not show San Antonio queries in the checked query table; that is not evidence of no demand. No fresh authenticated Search Console retrieval was made.

## Implemented content map

| Route | Search intent and useful content | Existing authorities retained |
| --- | --- | --- |
| `/dallas-mortgage-lender.html` | Dallas mortgage broker/home loans; address-specific county/tax lookup; cost comparison; business income and assets; rental purchase/refinance preparation | Bank statements, asset depletion, high net worth, jumbo, statewide DSCR, existing calculators and inquiry flow |
| `/san-antonio-mortgage-lender.html` | San Antonio mortgage broker/home loans; relocation timing; VA COE versus underwriting; Bexar records; self-employment; separate rental-use and financing checks | VA, statewide DSCR, bank statements, asset depletion, calculators and inquiry flow |

Both have distinct titles/descriptions, self-canonicals, Open Graph/Twitter metadata, a single H1, HTML answers, matching FAQPage data, BreadcrumbList and Service areaServed data. They refer to the existing homepage business entity and describe Adam as Austin-based. No invented city office, local address, map pin, local telephone, client story, affiliation or review. FAQ markup is descriptive structure, not a promise of a Google rich result or AI citation.

Added crawlable inbound links in the homepage service section and the existing bank-statement, asset-depletion and Texas DSCR guides. Original paragraphs, metadata, schema, header/footer and forms on these established pages remain unchanged. Two sitemap entries are added locally; existing entries and redirects are retained. New pages link to the existing scenario intake and keep established tracking scripts. The guarded preview prevents production analytics and inquiry transmission.

## Primary sources inspected

- [Dallas CAD tax resources](https://www.dallascad.org/payingtaxes.aspx): property-tax estimator, taxing-unit and exemption resources.
- [Dallas CAD neighboring appraisal districts](https://www.dallascad.org/links.aspx): directs a wider North Texas search to the correct county records.
- [Bexar Central Appraisal District](https://bcad.org/): official property search, tax resources and exemptions; BCAD is not the tax-payment collector.
- [VA purchase-loan guidance](https://www.va.gov/housing-assistance/home-loans/loan-types/purchase-loan/): COE, lender standards and occupancy are distinct requirements.
- [JBSA relocation readiness](https://www.jbsa.mil/Resources/Family-Support/Military-Family-Readiness-Centers/Relocation-Readiness/): official relocation support; no affiliation claimed.
- [San Antonio STR guidance](https://docsonline.sanantonio.gov/DSDUploads/STRApplicationPermitsEnforcement.pdf): official permit and enforcement resource. Link users to current city rules rather than promising a property can operate.
- [CFPB Loan Estimate explainer](https://www.consumerfinance.gov/owning-a-home/loan-estimate/): compare payment, fees and cash to close on consistent assumptions.
- [Google doorway-page guidance](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages): useful differentiated city content rather than interchangeable funnels.

## Next-stage measurement and review

These changes cannot affect live search until separately approved and deployed. After an approved release, verify real canonical/status/indexability and sitemap inclusion, then inspect Dallas and San Antonio query/page impressions, clicks and inquiry attribution separately. Keep Austin and statewide program performance as comparison groups. Do not equate impressions, rankings or calculator visits with funded loans.

Include both new routes in the final overnight visual and search re-audit. Recheck primary-source links and any time-sensitive city rules before release. The existing Texas DSCR page contains numerical pricing/market assertions already flagged in Mortgage-Calculator-Review.md; this change preserves that source but does not repeat those assertions on either new city page.

## Local verification

- At 320, 390, 768 and 1440 pixels, both pages loaded without horizontal overflow or broken fragment links; portraits loaded, canonical links matched, four visible FAQs were present on each, and the preview-only noindex guard was active.
- Desktop/mobile screenshots saved as dallas-1440.jpg, dallas-390.jpg, san-antonio-1440.jpg and san-antonio-390.jpg; measurements in city-guides-checks.json. Repaired inherited breadcrumb spacing and a partially visible unfocused skip link during visual review.
- Existing shared contact script opens the scenario-review modal on both pages, with the guarded get-preapproved.html?intent=scenario&embed=1 form. Confirmed real form controls loaded and the modal closed normally. No inquiry submitted. Native FAQ disclosure opened with the matching answer.
- Ten focused tests passed: four city discoverability/FAQ/schema/link checks and six existing homepage/interior preservation checks. Navigation and schema audits passed; SEO audit: 165 sitemap URLs, zero issues. Initial anchor check caught a copied homepage CTA target, which was corrected to the established intake before rechecking.

- The full regression suite also enforces a historical restriction that only blog/scenario routes can be added to the sitemap. Updated that allowlist for exactly the two user-authorized city routes, retaining all baseline entry, canonical and robots assertions. No broad city-pattern exception was introduced. Safe deploy-preview build passed with IndexNow explicitly suppressed.

- Final full suite: 265 tests passed (138 site + 127 assistant), zero failures. Production remains unchanged.
