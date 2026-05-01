# Suburb Editor — 2026-05-01 — Westlake Hills

## Slot
Round 1 slot **13/13 (final)** — `westlake-mortgage-lender.html`. Round 1 complete after this run.

## Summary
Page already had the right angle (jumbo + Eanes ISD), but was thin on first-party fact density. The biggest wins this run were swapping the vague `$1.2M+` median for the cited `$1.6M Redfin Mar 2026` figure, normalizing the legacy footer (last suburb still on "Top Producing Broker — Austin 2023" / "5-Star Zillow Reviews"), and adding ~75 new lines of cited body content (neighborhoods + schools + employers + property tax + closing-cost example). One templated paragraph removed (Portfolio loan card was verbatim with Spicewood — now Westlake-specific).

## Edits

**Schema**
- LocalBusiness `description` rewritten with 78746 + Rob Roy / Davenport Ranch / Lost Creek / Barton Creek + Eanes ISD $0.8322 + WLH $0.176783 + Travis Co 1.65% effective.
- FAQ schema "What is the jumbo loan limit" — corrected `$832,750 (2026)` framing + cited West Lake Hills median; `(2025 conforming limit)` body line corrected to `(2026 FHFA conforming limit, all Texas counties)`.
- FAQ schema "What are home prices like" → "What is the median home price" — refreshed with $1.6M Redfin Mar 2026 + tiered range (Davenport/Lost Creek $1.5M–$3M; Rob Roy/Barton Creek $4.5M–$15M+).
- New WebPage schema added (`@type: WebPage`, `dateModified: 2026-05-01`, `about: Place containedInPlace Travis County`).
- All 4 JSON-LD blocks (LocalBusiness / FAQPage / BreadcrumbList / WebPage) parse clean — verified via Python json.loads.

**Body deepening (4 new H3 sections, ~75 new lines)**
1. **Westlake Hills Neighborhoods (78746)** — 4 spotlights with builders / streets / clubs / price tiers / feeder schools:
   - Rob Roy 78746 (six subdivisions including Rob Roy West, $3M–$15M+, off Bee Cave Rd / Loop 360, austinluxurygroup.com cite)
   - Davenport Ranch 78746/78733 (~500 homes, Loop 360 + Westlake Drive, Austin Country Club inside, Pete Dye course, moreland.com cite)
   - Lost Creek 78746 (~1,200 homes, Lost Creek Boulevard, Lost Creek Country Club, Forest Trail Elementary feeder, lostcreekld.org cite)
   - Barton Creek 78735/78746 (16 sub-neighborhoods each gated, Barton Creek Country Club at 8212 Barton Club Drive 78735, four golf courses incl. Crenshaw/Coore, austinrealestatehomesblog.com cite)
2. **Eanes ISD Schools** — Westlake HS 9/10, Hill Country MS 10/10, Eanes Elementary 10/10 (all GreatSchools links). Honest disclosure: 5 elementary feeders (Forest Trail, Barton Creek, Bridge Point, Cedar Creek, Valley View) all feed Westlake HS.
3. **Major Employers** — Eanes ISD ~7,700 students at 9 schools (Wikipedia + Westlake Chamber); 3 country clubs (Austin CC inside Davenport, Lost Creek CC, Barton Creek CC at 8212 Barton Club Dr 78735); HEB Westlake (Westlake Chamber listing); honest disclosure that 78746 is bedroom community for downtown Austin (10 mi); Data USA cite for Professional/Scientific/Technical Services as #1 industry.
4. **Property Tax & Closing Costs** — Eanes ISD $0.8322/$100 ($0.7122 M&O + $0.12 I&S, Aug 19 2025 adoption per Community Impact Aug 27 2025); City of West Lake Hills $0.176783/$100 (down 1.02% per the city's Notice of Tax Rates document); Travis County effective 1.65% per Ownwell. Closing-cost example at $1.6M w/ 20% down ($320K → $1.28M loan): $20K–$28K itemized (title/escrow/lender fees/survey/HOI/3-4mo escrow at 1.65%) + 6–12mo PITI reserve callout for jumbo at 10% down. Internal links to /rate-check.html and /loans/jumbo.html.

**Stat card refresh**
- `$1.2M+` Median → `$1.6M Median (Redfin Mar 2026)` — `+40.9% YoY` per Redfin city/19594.

**Templated paragraph removed**
- Portfolio loan card description (`Held by the lender on their books — more flexible underwriting. Ideal for self-employed borrowers...`) was verbatim w/ Spicewood. Rewrote Westlake-specific: business owners + HNW buyers in Rob Roy / Davenport Ranch / Barton Creek; bank-statement (12–24 mo) and asset-depletion programs.

**Accordion FAQ refresh**
- Jumbo limit body — `(2025 conforming limit)` corrected to `(2026 FHFA conforming limit, all Texas counties)`; cited $1.6M Redfin Mar 2026.
- Home prices Q renamed "What is the median home price" + refreshed with tiered ranges (Davenport/Lost Creek $1.5M–$3M; Rob Roy/Barton Creek $4.5M–$15M+) + Westlake HS 9/10 + Hill Country MS 10/10.

**Footer standardized to canonical pattern** (this page was the **last** suburb still on the legacy footer)
- Replaced `Top Producing Broker — Austin 2023 / 5-Star Zillow Reviews / Google Rating: 5.0 ⭐ / 1,000+ Loans Closed` with `⭐ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas`.
- Added 5718 Sam Houston Circle / Austin TX 78731 NAP block.
- Added NMLS Consumer Access link + Mortgage Solutions, LP licensing disclaimer.
- Wrapped grid in `.container` (matches Lakeway / Bee Cave / Dripping Springs canonical structure).
- Fixed `<script src="script.js">` → `<script src="/script.js" defer>` (leading slash + defer attribute).

**Sitemap**
- `westlake-mortgage-lender.html` lastmod 2026-04-20 → 2026-05-01.

## Sources Cited (Inline in Page)
1. Redfin West Lake Hills market — `https://www.redfin.com/city/19594/TX/West-Lake-Hills/housing-market` (median $1.6M Mar 2026, +40.9% YoY)
2. FHFA 2026 conforming limit ($832,750, all Texas counties standard)
3. Eanes ISD Wikipedia — `https://en.wikipedia.org/wiki/Eanes_Independent_School_District` (~7,700 students, 9 schools)
4. Westlake HS GreatSchools — `https://www.greatschools.org/texas/austin/2204-Westlake-High-School/` (9/10)
5. Hill Country MS GreatSchools — `https://www.greatschools.org/texas/austin/2203-Hill-Country-Middle-School/` (10/10)
6. Eanes Elementary GreatSchools — `https://www.greatschools.org/texas/west-lake-hills/2202-Eanes-Elementary-School/` (10/10)
7. Eanes ISD FY 2025-26 tax rate — `https://communityimpact.com/austin/lake-travis-westlake/education/2025/08/27/eanes-isd-adopts-lower-tax-rate-for-fy-2025-26/` ($0.8322 = $0.7122 M&O + $0.12 I&S)
8. City of West Lake Hills FY 2025-26 Notice of Tax Rates — `https://westlakehills.org/DocumentCenter/View/4309/50-212---Notice-of-Tax-Rates--COMPLETED-72825` ($0.176783, -1.02% YoY)
9. Travis County effective tax rate — `https://www.ownwell.com/trends/texas/travis-county` (1.65% median)
10. Rob Roy guide — `https://austinluxurygroup.com/neighborhoods/rob-roy`
11. Davenport Ranch guide — `https://moreland.com/neighborhoods/davenport-ranch`
12. Lost Creek Limited District — `https://lostcreekld.org/`
13. Barton Creek guide — `https://www.austinrealestatehomesblog.com/west-austin/barton-creek/`
14. Austin Country Club — `https://www.austincountryclub.com/`
15. Lost Creek Country Club — `https://www.lostcreekcc.com/`
16. Barton Creek Country Club — `https://www.bartoncreekmembers.com/`
17. Westlake Chamber — HEB Westlake listing — `https://www.westlakechamber.com/list/member/heb-westlake-240`
18. Data USA — West Lake Hills — `https://datausa.io/profile/geo/west-lake-hills-tx`

## Voice Check
- Removed: "luxury financing for high-net-worth buyers" generic LO copy in stats area was already absent; portfolio card rewrite avoids "complex asset structures" bank-speak.
- Kept: `As an independent broker, I have access to 40+ investors` — this is the page's primary differentiator and is unique to Westlake (not duplicated on other pages).
- All numbers are sourced (no fabricated employer counts, school ratings, or median prices).

## Round 1 Closeout
- All 13 priority-queue suburbs touched with first-party deepening between 2026-04-19 and 2026-05-01.
- Round 2 will start at the top of the queue (round-rock-mortgage-lender.html) with whatever GSC + competitive intel surfaces between now and the next eligible run.
- Suggested Round 2 cadence: same daily rotation, but with an emphasis on (a) re-checking median prices against Redfin month-over-month, (b) testing whether each page's first paragraph passes the Jessica test, (c) auditing for newly-emerged duplicates as Round 1 templates evolved.

## Hard Stops Hit
None. Research returned verifiable data on every claim. Conforming limit 2026 ($832,750) confirmed via FHFA / JVM Lending. Median refreshed cleanly. Tax rates sourced to two Community Impact / city documents. Schools all on GreatSchools.

## Next Suburb in Queue
Round 1 complete. Round 2 begins at slot 1: `round-rock-mortgage-lender.html`.
