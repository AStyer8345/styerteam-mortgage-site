# 2026-05-04 — styer-suburb-editor-daily — Cedar Park (Round 2 slot 3/13)

## What changed

- **Median refresh:** $492K (Feb 2026 figure used in Round 1) → **$496K Mar 2026 Redfin (-8.0% YoY)**, $228/sqft. Source: Redfin city page.
- **Schema USDA removed from LocalBusiness description.** Adam doesn't originate USDA. New description includes 78613 + named neighborhoods (Buttercup Creek, Ranch at Brushy Creek, Twin Creeks, Block House Creek, Crestline at Brushy Creek RRISD-zoned) + cited tax stack.
- **Crestline at Brushy Creek = Round Rock ISD correction surfaced** — biggest school-zoning fix on this page. Round 1 placed Crestline inside the Twin Creeks paragraph (implying LISD by association) and quoted "$1.2M+" pricing. Per Toll Brothers' community page and the GlobeNewswire grand-opening release dated March 19, 2026: Crestline is zoned to RRISD (Sommer Elementary, Cedar Valley Middle, Round Rock High), pricing starts in the **mid-$900,000s** (not $1.2M+), and the community has 12 home designs across Cypress Collection (60ft homesites) and Juniper Collection (70ft homesites). Same Georgetown-MorningStar pattern: mailing address ≠ school district.
- **VA tile de-templated.** Removed: "Cedar Park's veteran community has excellent access to VA financing — zero down, no PMI, and the lowest rates of any program. If you or your spouse served in the military, this is almost always the best loan available." Replaced with Cedar Park-specific framing tied to LISD 8/10 schools + RRISD attendance zone along Brushy Creek + Joint Base San Antonio relocation pipeline.

## New H3 sections (broken out from Round 1 inline copy)

1. **Cedar Park Major Employers** — Cedar Park EDC anchor list (Cedar Park Regional Medical Center / ETS-Lindgren / NOV / Firefly Aerospace) + **Firefly Blue Ghost lunar landing March 2025 update** (first commercial company to fully soft-land on the Moon — verifiable, dated, separate from prior page's $1.1B Northrop Grumman 2024 framing) + Apple Parmer 5,000 phase-1 → 15,000 full-buildout cited via KVUE + Dell HQ ~15 mi east.
2. **Property Tax & Closing Costs in Cedar Park** — broken out from inline closing-cost paragraph. Cited tax stack with 3 inline sources (WilCo CivicAlerts FY 2025-26, Community Impact City of Cedar Park Sept 2025, LISD tax information) + Ownwell effective rate + refreshed closing-cost example at $496K w/ 10% down ($446,400 loan): 6 itemized line items including new origination/processing tier; jumbo 6-12mo PITI reserve callout for Twin Creeks / Ranch at Brushy Creek / Crestline Juniper Collection.

## New neighborhood spotlights

- **Crestline at Brushy Creek (78613)** — Toll Brothers, RRISD-zoned. 907 Walsh Glen Dr sales center opened March 19, 2026. Cypress Collection (60ft) vs Juniper Collection (70ft). Mid-$900Ks+ pricing. Brushy Creek Trail System + Champions Park access.
- **Block House Creek (78613)** — established western-edge MPC. 12-mo median $340,500, $290K-$450K range, 44 DOM (Homes.com). Strong FHA territory framing: 3.5% down on $375K = $13,125. Feeds Block House Creek Elementary + Cedar Park HS (LISD).

## FAQ + accordion sync

- FAQ schema home-prices Q rewritten with Mar 2026 Redfin -8.0% YoY median + per-neighborhood price ranges + Crestline mid-$900Ks reference.
- FAQ schema loan-programs Q de-templated to remove generic TSAHC/TDHCA boilerplate (replaced with FHA/VA/jumbo/DSCR matched to specific Cedar Park price tiers).
- FAQ accordion home-prices + loan-programs answers synced verbatim with new schema (Round 1 had vague $400K-$500K range; out-of-sync since Round 1).

## Other changes

- **At-a-glance** updated with full tax stack (3 inline cited sources) + RRISD-zoned Crestline flag in named-neighborhoods list + 1.86% nominal / 1.52% effective.
- **Schools H3** expanded with RRISD's Round Rock HS for Crestline + linked RRISD boundary tool alongside LISD's.
- **AEO opener** refreshed: program-specific (FHA in Block House Creek + jumbo for Crestline mid-$900Ks+) and now references school-attendance zone awareness.
- **WebPage dateModified** bumped 2026-04-21 → 2026-05-04.
- **Meta description** rewritten with Mar 2026 median + named neighborhoods (Twin Creeks / Ranch at Brushy Creek / Crestline).
- **Sitemap lastmod** bumped 2026-04-15 → 2026-05-04.

## Validation

- All 4 JSON-LD blocks parse-validated clean via python json.loads (LocalBusiness, FAQPage, WebPage, BreadcrumbList).
- 15 inline source URLs (Redfin Cedar Park, WilCo CivicAlerts FY2025-26, Community Impact City Cedar Park Sept 2025, LISD tax info, GreatSchools Cedar Park HS, GreatSchools Vista Ridge HS, LISD attendance zones, RRISD school boundaries, Toll Brothers Crestline community, GlobeNewswire Crestline grand-opening, Homes.com Block House Creek, Cedar Park EDC, Firefly Aerospace Blue Ghost release, KVUE Apple Parmer, Ownwell WilCo Cedar Park).

## Queue position

- **Round 2 status:** 3/13 done (Round Rock ✅ 05-02, Georgetown ✅ 05-03, Cedar Park ✅ 05-04).
- **Next run (2026-05-05):** Leander (Round 2 slot 4).
