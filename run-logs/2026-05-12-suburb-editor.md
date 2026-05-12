# Suburb Editor — 2026-05-12 (Round 2 #10 Lakeway)

## Target
`lakeway-mortgage-lender.html` — Round 2 of the 9-week rotation. Round 1 touched 2026-04-28.

## Round 1 Starting State (recap)
Already strong from Round 1: Feb 2026 Redfin median ($704K, cited), GreatSchools-cited schools (Lake Travis HS 9/10, Serene Hills Elem 9/10), Baylor Scott & White hospital, Hill Country Galleria, LTISD $1.0397 + City $0.16964 cited tax stack, itemized 6-line closing-cost example, 4 named subsections of Rough Hollow.

## Round 2 Additions / Corrections

### 1. Home Prices section — TWO data sources reconciled
- Round 1 had Feb 2026 Redfin only ($704K, -11.2% YoY).
- **Round 2 adds April 2026 ACTRIS MLS** via Neuhaus Realty Group: 15 SFH closings at $868K median, $1,005,867 average, **6.3 mo. supply, 94.9% close-to-list, 12-day median list-to-contract** — confirmed buyer's-market territory.
- Reconciled the gap: Redfin city-level includes condos / lower-tier resale; Neuhaus single-family-only 15-home sample skews to luxury.
- Source: https://neuhausre.com/lakeway-real-estate-market-update-may-2026/

### 2. Major Employers — City-cited ranking (not BSW self-citation)
- Round 1 cited only BSW's careers page ("one of the largest employers").
- **Round 2 cites the City of Lakeway's own About page** (lakeway-tx.gov/594/About-Lakeway): **LTISD #1, BSW Medical Center-Lakeway #2, Lakeway Resort & Spa #3**.
- Added Lakeway Resort detail: 168-room Lake Travis hotel, ~20 min west of downtown Austin (per lakewayresortandspa.com).
- Kept BSW Magnet® / 106-bed framing, Hill Country Galleria, Tesla Gigafactory / ABIA commute callouts.

### 3. NEW H3 — "Lakeway Neighborhoods Inside Lake Travis ISD"
Three paragraph block adding meaningful depth that Round 1 lacked:

- **Rough Hollow expanded** — Round 1 had 4 subsections + 5 builders. Round 2 adds: **Legend Communities** as MPC developer (per Livabl), **22 distinct neighborhoods**, three miles of Lake Travis shoreline, **Yacht Club & Marina back-to-back MAX awards for "Best Unique Feature in a Master-Planned Community"**, Highland Village waterpark with lazy river + splash pads, on-site Canyon Grille restaurant, The Point lock-and-leave detached condo regime by David Weekley (limited remaining new-build opportunities), The District 2,100–2,806 sqft modern floor plans as final new-construction phase.
- **NEW Serene Hills 78738 spotlight** — Round 1 didn't mention Serene Hills in the body at all (it was in GreatSchools schema only). Round 2 adds: 456-acre boutique MPC off SH-71, only 339 custom homesites with **342 acres (75%) preserved as permanent greenspace** (vs the 20-30% typical for master plans), builders **Weston Dean Custom Homes / Brohn Homes / Sitterle Homes**, 2,700-5,700 sqft Tuscan / modern / Mediterranean styles, **Serene Hills Elementary 9/10 GreatSchools sits INSIDE the community** (real LTISD-walking-distance differentiator), 10+ miles of internal nature trails.
- **Flintrock Falls / The Hills / Lakeway Highlands / Cardinal Hills** — consolidated paragraph with $800K-$1.5M, high $500s-mid-$900s, Cardinal Hills entry-tier 78734, lakefront $1M-$3M+ jumbo-only callout.

### 4. Process Step 4 — DE-TEMPLATED
Round 1: "Take your pre-approval letter to any Lakeway listing. In the luxury segment, a strong pre-approval from a known local lender signals to sellers that your offer is serious and your financing is reliable." — generic luxury boilerplate, appears in 10 of 12 suburb pages.

Round 2: Rewritten Lakeway-specific — listing-agent verification calls along Lake Travis Drive / Flintrock Trace / Rough Hollow gates, Adam takes those calls personally same-day and walks the listing agent through jumbo lender + reserves + conditional approval status, frames the call as the difference in the **12-day median list-to-contract window the April 2026 ACTRIS data is showing**.

### 5. FAQ home-prices answer (schema + accordion synced)
Both versions rewritten to reconcile Redfin + Neuhaus data with Serene Hills + Legend Communities + 22-neighborhoods detail integrated. Schema and accordion match verbatim except for HTML wrapping.

### 6. Mechanical hygiene
- WebPage `dateModified`: 2026-04-28 → 2026-05-12.
- Sitemap.xml `lastmod` for lakeway: 2026-04-28 → 2026-05-12.
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / WebPage / BreadcrumbList) validated clean via `python -c json.loads` of each block.
- Did NOT touch the working-tree style.css carry (per CONTEXT.md, that's Adam's pending nav-dropdown fix, 14th carry — still preserved).

## First-Party Elements Added (Round 2 ≥4 requirement)
1. **April 2026 ACTRIS MLS data point** — $868K median, 6.3 mo supply, 94.9% close-to-list, 12-day median list-to-contract (Neuhaus Realty cited).
2. **City of Lakeway's own employer ranking** — LTISD #1 / BSW #2 / Lakeway Resort & Spa #3 (lakeway-tx.gov About page).
3. **Lakeway Resort & Spa** — 168 rooms, ~20 min west of downtown Austin (lakewayresortandspa.com).
4. **Legend Communities + 22 distinct neighborhoods + MAX awards + The Point/The District new builds** (livabl + roughhollowlakeway.com + davidweekleyhomes.com cited).
5. **Serene Hills full spotlight** — 456-acre / 339 homesites / 342 preserved acres / Weston Dean / Brohn / Sitterle + 2,700-5,700 sqft + Serene Hills Elem in-community (westondeanhomes + seelyproperties cited).

## Templated Paragraph Removed (≥1 requirement)
Process Step 4 "Take your pre-approval letter to any [city] listing. In the luxury segment..." — grep-confirmed verbatim duplicate across 10 suburb pages. Rewrote Lakeway-specific (listing-agent gate-verification calls + 12-day ACTRIS market signal).

## Source URLs (6 new + ~14 retained from Round 1)
New this round:
- https://www.lakeway-tx.gov/594/About-Lakeway (employer ranking)
- https://neuhausre.com/lakeway-real-estate-market-update-may-2026/ (April 2026 ACTRIS data)
- https://www.lakewayresortandspa.com/ (Lakeway Resort & Spa)
- https://www.livabl.com/lakeway-tx/rough-hollow-lakeway1--mpc (Legend Communities MPC)
- https://www.davidweekleyhomes.com/new-homes/tx/austin/lakeway/the-point-at-rough-hollow (The Point limited remaining)
- https://www.westondeanhomes.com/communities/austin-area/lakeway/serene-hills (Serene Hills builder)
- https://seelyproperties.com/serene-hills-lakeway-tx-neighborhood-guide/ (Serene Hills 339 homesites, 342 preserved acres, builders)

## NEEDS ADAM
None this run. Lakeway page is now substantially deeper than the Round 1 baseline.

## Queue State After Run
- Round 2 complete on #10 (lakeway). Next up tomorrow: **#11 bee-cave-mortgage-lender.html** (Round 1 touched 2026-04-29).
- Remaining in Round 2: bee-cave (#11), dripping-springs (#12), westlake (#13).
