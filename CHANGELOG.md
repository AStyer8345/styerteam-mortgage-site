## 2026-04-26 — Liberty Hill suburb deepened (styer-suburb-editor-daily)

- liberty-hill-mortgage-lender.html — Removed USDA from 5 locations: LocalBusiness schema description, FAQ schema Q (replaced with "What is the property tax rate in Liberty Hill TX?"), FAQ accordion (matching), loan-options card (swapped to Jumbo Loans card with SH-29/FM-1869 acreage hook), and Step 3 pre-approval text (swapped "USDA or DPA" → "Texas DPA or VA"). Adam doesn't originate USDA.
- Removed templated `<p>As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders…</p>` paragraph — verbatim duplicate across 5 pages (bastrop, dripping-springs, austin-mortgage-rates, taylor, liberty-hill).
- Added WebPage schema with `dateModified: 2026-04-26` after the BreadcrumbList JSON-LD block.
- Replaced generic "$350K–$600K" home price lede with sourced February 2026 median $485K (53 closings, down 6.3% YoY from $517,500) — [Neuhaus Realty Group/Unlock MLS](https://neuhausre.com/liberty-hill-real-estate-market-update-march-2026/). Trimmed at-a-glance line by removing redundant neighborhood price ranges (now broken out into spotlight H3s).
- Added 3 verified neighborhood spotlight paragraphs: **Santa Rita Ranch (78642)** — Pulte primary + Perry/Highland sections, 112 Leon Loop ([Pulte](https://www.pulte.com/homes/texas/austin/liberty-hill/santa-rita-ranch-209566)); **Northgate Ranch (78642)** — Drees/Giddens/Hill Country Artisan/Monticello, 508 Bizzell Cove ([Northgate Ranch](https://northgateranch.com/) | [NewHomeSource](https://www.newhomesource.com/community/tx/liberty-hill/northgate-ranch-by-drees-custom-homes/186201)); **Orchard Ridge (78642)** — Pacesetter primary + Lennar/Ashton Woods/Dream Finders/Buffington, Freehold Communities masterplan, 105 Orchard Park Drive ([Pacesetter](https://www.pacesetterhomestexas.com/new-homes-for-sale-austin/liberty-hill-tx/orchard-ridge) | [Freehold Communities](https://freeholdcommunities.com/orchard-ridge-masterplan-in-liberty-hill-texas-announces-two-new-builders/)).
- Added Liberty Hill Schools H3 — Liberty Hill HS [7/10 GreatSchools](https://www.greatschools.org/texas/liberty-hill/4341-Liberty-Hill-High-School/), 98% graduation rate vs. 90% TX average; Prop A passed Nov 2025 raising M&O to $0.7389 ([Community Impact, Nov 2025](https://communityimpact.com/austin/leander-liberty-hill/election/2025/11/04/liberty-hill-isds-tax-rate-election-passes-unofficial-voting-results-show/)); combined LHISD school rate $1.2389/$100; $23M HS upgrade + planned new Legacy Ranch HS.
- Added Major Employers & Local Economy H3 — LHISD ~600 staff (largest single employer per [Liberty Hill EDC](https://www.libertyhilledc.com/workforce/major-employers/)); $75M Costco + $22M Target under construction; Platform 183 x 29 industrial mixed-use 1M+ sqft along US-183/SH-29 corridor ([Liberty Hill Digest, Aug 2025](https://issuu.com/fidelispublish/docs/liberty_hill_digest_august_2025)); ~42 mi to ABIA; Samsung Taylor/Tesla/Apple/Dell within commute.
- Added Closing Cost Example H3 — $485K, 5% down ($460,750 loan); typical Texas closing costs $10,500–$13,000 (excl. down payment) broken down (TX promulgated title ~$2,500, lender fees ~$1,400, appraisal ~$650, survey ~$500, prepaids ~$5,200+); annual property taxes $9,700–$11,600 at 2.0%–2.4% combined ([Community Impact, Aug 2025 — city rate $0.469407](https://communityimpact.com/austin/leander-liberty-hill/government/2025/08/28/liberty-hill-adopts-741m-fy-2025-26-budget-sets-property-tax-rate/)).
- Internal link added: `/loans/jumbo.html` (replaces former USDA-tile dead end with relevant high-end-acreage upsell path).
- run-logs/suburb-editor-queue.md — Liberty Hill marked Done; next: Manor.
- 4+ unique first-party elements per task spec: 3 named neighborhoods with zip+builder+address, school w/ rating+source, employer list with sources, closing-cost example with TX numbers + sources. ✅
- Templated paragraph removed: "As an independent mortgage broker…" — pre-removal grep confirmed verbatim 5-page match. ✅

## 2026-04-26 — Rate-shopper AEO series 10/10 COMPLETE + NotebookLM 5th-run patch (styer-site-daily)

- blog/what-to-compare-besides-mortgage-rate.html — added body `<p><strong>` AEO answer paragraph (60w) after `</header>`, distinct from blog-post-intro (intro lists 6 factors; body leads with practical Section A side-by-side method + identical-rate $4,000+ spread example + rate=monthly/fees=upfront frame). Statement H2 "Origination Charges — The Biggest Variable" → question "Are Origination Charges the Biggest Variable in Loan Cost?". dateModified 2026-04-12 → 2026-04-26.
- blog/is-the-lowest-rate-the-cheapest-loan.html — added body `<p><strong>` AEO answer paragraph (64w) after `</header>`, distinct from blog-post-intro (intro: total-cost frame; body leads with "compare loans over the time you'll keep them" + 6.375%/$8,500 vs 6.5%/$3,000 example aligned with post's existing Lender A/B numbers). Statement H2 "Why Buyers Fixate on the Rate" → question "Why Do Buyers Fixate on the Rate?". dateModified 2026-04-12 → 2026-04-26.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-26 for both posts.
- Self-review PASS: GTM=2/2 on both, NMLS=4/4 each, no Styer-Team, distinct-wording rule satisfied, illustrative rates aligned with post's own Lender A/B example (no new compliance risk).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- **Rate-shopper AEO series 10/10 COMPLETE** — full anti-pattern (`blog-post-intro` inside `<header>` only) closed across all 10 posts after 4 days, ~20 min/run, 2-per-run cadence (commits de08af6, c6df081 PM, then today's 23d00c7).
- NotebookLM Step 0 dead 5th consecutive run — concrete unified-style SKILL.md retirement diff drafted in run-log FLAG_FOR_ADAM (replaces lines 57-72 of `~/.claude/scheduled-tasks/styer-site-daily/SKILL.md`). One-shot edit Adam can apply.
- Monday 2026-04-27 GSC sitemap status reminder logged in FLAG_FOR_ADAM (Step 1 weekly cadence).
- Commit: 23d00c7. learnings.md appended with rate-shopper series complete pattern + 5th-run concrete-patch rule.

## 2026-04-25 PM — Rate-shopper AEO 8/10 reached (styer-site-daily)

- blog/what-delays-closing-when-you-switch-lenders.html — added body `<p><strong>` AEO answer paragraph (56w) after `</header>`, distinct from blog-post-intro inside header. Statement H2 "How a Broker Speeds Up the Process" → question "How Does a Broker Speed Up the Process?". dateModified 2026-04-12 → 2026-04-25.
- blog/how-to-read-a-loan-estimate.html — added body `<p><strong>` AEO answer paragraph (66w) after `</header>`. Statement H2 "What to Do After You Read Your Loan Estimate" → question "What Should You Do After You Read Your Loan Estimate?". dateModified 2026-04-12 → 2026-04-25.
- sitemap.xml — lastmod 2026-04-12 → 2026-04-25 for both posts.
- Self-review PASS: GTM=2/2, NMLS intact, no Styer-Team, distinct-wording rule satisfied (both intros and body answers cover same question from different angles).
- Live verify after Netlify deploy: both posts 200, body answers + question H2s + sitemap lastmod confirmed live.
- Rate-shopper AEO coverage: 8/10 (was 6/10). Remaining: what-to-compare-besides-mortgage-rate, is-the-lowest-rate-the-cheapest-loan. Sunday finishes the series.
- NotebookLM Step 0 dead 4th consecutive run — Sunday will draft the SKILL.md retirement patch.

## 2026-04-25 — Hutto suburb page deepened (styer-suburb-editor-daily)

- Removed templated paragraph "As an independent mortgage broker, Adam Styer shops your loan across 40+ wholesale lenders..." — confirmed verbatim on 6 pages via grep (austin-mortgage-rates, bastrop, dripping-springs, hutto, liberty-hill, taylor).
- Removed USDA from LocalBusiness schema description — Adam does not originate USDA loans.
- Added WebPage schema with datePublished 2025-08-01 / dateModified 2026-04-25, isPartOf WebSite, about City+AdministrativeArea (Williamson County).
- Refreshed FAQ Q1 + body home-price anchors to $340,000 median (Feb 2026, [Redfin](https://www.redfin.com/city/9075/TX/Hutto/housing-market) — down 9.3% YoY).
- New H3 "Hutto Neighborhoods Where I Close Loans" — Star Ranch (78634, Clark Wilson Builder, sold-out, golf-course community off W Highfield), Emory Crossing (78634, 304 Stinchcomb Rd, Taylor Morrison + David Weekley townhomes, currently selling, [Jome](https://jome.com/community/tx/1029-emory-crossing-50s-by-taylor-morrison-304-stinchcomb-road-hutto-tx-78634)), Riverwalk (78634, established south-of-US-79).
- New H3 "Top Hutto-Area Employers" — Samsung Austin Semiconductor in Taylor (~10 min via SH-130, 1,800 direct jobs targeted, [Community Impact Oct 2025](https://communityimpact.com/austin/georgetown/development/2025/10/08/samsung-employees-to-move-into-office-building-on-taylor-campus-this-november/)), Tesla Hutto 35,000 sq ft service/distribution facility ([FOX 7 Austin](https://www.fox7austin.com/news/tesla-hutto-austin-expansion)), Hutto ISD.
- New H3 "Closing Cost Example — $340K Hutto Home" — typical $8,500–$10,500 closing costs at 5% down with breakdown: TX-promulgated title (~$2,200), lender fees ($1,500–$2,500), survey ($500), appraisal ($600–$700), property-tax escrow against ~1.93% combined rate (HISD $1.2052 + City of Hutto $0.385928 + Wilco). Both rates Community Impact sourced.
- Added Hutto HS 6/10 [GreatSchools](https://www.greatschools.org/texas/hutto/3723-Hutto-High-School/) rating with direct URL.
- Added internal link to /rate-check-georgetown.html (the rate-check page that covers Hutto).
- Rewrote AEO opener with FHA + conventional + new-construction wedge (no DPA-grant-covers-everything overclaim).

## 2026-04-25 — Footer Awards sitewide standardization + AEO sweep continued (styer-site-daily)

- 56 of 57 site files (28 root + 28 blog) standardized: footer Awards `<p>` updated from `★ 5.0 Stars · 91 Google Reviews / ★ 4.98 Stars · 45 Zillow Reviews` → `★ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas`. Two indent variants (multi-line and single-line) handled in two regex passes. Indentation preserved via `\g<lead>` capture group. Final `136+ Reviews` count across site: 88 pages (some pages have it in both hero trust badge and footer).
- about.html intentionally excluded — its stale review-count instance is a `<span class="timeline-date">` inside a milestone timeline, not the footer `<p>` Awards block. Surfaced as MEDIUM Adam-decision flag (update vs. leave as historical milestone).
- blog/how-many-mortgage-quotes-should-i-get.html: added 60-word `<p><strong>` AEO body paragraph after `</header>` (distinct from existing `blog-post-intro` in header). H2 "Why Most Buyers Only Get One Quote" → "Why Do Most Buyers Only Get One Quote?". dateModified 2026-04-12 → 2026-04-25.
- blog/local-lender-vs-online-lender-austin-central-texas.html: added 54-word `<p><strong>` AEO body paragraph after `</header>`. H2 "How to Decide" → "How Do You Decide Between an Online, Local, or Broker Lender?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-25 for both rate-shopper posts.
- Rate-shopper AEO progress: 6/10 posts now have machine-extractable answer-first paragraphs in article body.
- NotebookLM Step 0 confirmed dead for the 3rd run — escalated to ESCALATED in FLAG_FOR_ADAM.
- Commit b0f1dc6.

## 2026-04-24 PM — Rate-shopper AEO sweep continued (styer-site-daily)

- blog/apr-vs-interest-rate-what-actually-matters.html: added 57-word `<p><strong>` AEO answer-first paragraph after `</header>` (existing `blog-post-intro` inside `<header>` was not machine-extractable). dateModified 2026-04-12 → 2026-04-24.
- blog/are-mortgage-lender-fees-negotiable.html: added 55-word `<p><strong>` AEO answer-first paragraph after `</header>`. Converted statement-form H2 "Why a Mortgage Broker Already Has Lower Fees" → question form "Why Does a Mortgage Broker Already Have Lower Fees?". dateModified bumped.
- sitemap.xml: lastmod bumped to 2026-04-24 for both posts.
- Re-Verify Gate cleared Buda USDA flag (suburb-editor closed it earlier today via commit 4755b70).
- New finding logged: stale "91 Google + 45 Zillow" footer Awards on 28 blog posts + 29 root pages — suburb pages were standardized 2026-04-23 but the batch missed everything else. Queued ZERO_RISK fix for next run.
- NotebookLM Step 0 confirmed dead for the 2nd run; recommended retirement.
- Commit 748ba68 (rebased onto incoming rate-update commits 1858bfa + 9fe6008).

## 2026-04-24 — Buda suburb page deepened (styer-suburb-editor-daily)

- buda-mortgage-lender.html: USDA removed from 7 locations (LocalBusiness schema description, FAQPage schema USDA FAQ replaced with schools FAQ, loan tile swapped USDA→DPA, stat card "$0 Down USDA"→"$0 Down VA eligible", process step 1 USDA check removed, CTA USDA mention removed, down payment FAQ USDA removed)
- Removed templated USDA loan tile paragraph confirmed verbatim in jarrell + florence pages
- Added neighborhood spotlights: Garlic Creek (78610, Centex/Mercedes 2007–15, $310K–$390K), Sunfield (78610, 2700ac, Taylor Morrison/Pulte/Chesmar/David Weekley/Brightland, lazy river, $350K–$470K), Ruby Ranch (78610, larger lots, $375K–$550K+)
- Added schools H3: Jack C. Hays HS 6/10 GreatSchools, 2,191 students, 89–91% grad rate, sources inline
- Added employers H3: US Foods, Heaven Hill/Deep Eddy Vodka ($12.5M+ investment), Cabela's, Texas Lehigh Cement, incoming H-E-B (City of Buda March 2026 + Buda EDC sourced)
- Added closing cost breakdown at $370K: HCISD $1.1546/$100 + City of Buda $0.3576/$100 (both Community Impact sourced), ~$9K–$12K total
- Updated median price stat to $382K (Feb 2026, Houzeo)
- Updated at-a-glance with real tax rates, school name, employer list, median price
- Added rate-check-buda-kyle.html internal link in Why section
- Added WebPage schema with dateModified 2026-04-24
- Meta description updated with school/employer specifics
- Queue: Buda → Done; Next: Hutto

## 2026-04-24 — DPA post refresh: title/meta CTR fix + accuracy corrections (weekly-blog-editor)

- blog/2026-03-27-down-payment-assistance-texas-2026.html: title rewritten to include "Austin TX" + benefit-driven headline (was "What Still Works" — vague, not geo-targeted)
- Meta description rewritten: leads with $40K / $160K income angle instead of acronym list
- H1 + hero subtitle updated to match new angle
- USDA removed from TDHCA eligibility list (Adam does not do USDA)
- "broker" corrected to "correspondent lender" in FAQ
- Travis County TSAHC income limit added with inline cite ($167,250, TSAHC PDF)
- City of Austin DPA details updated: $40K, 10-year forgivable, 80% AMI limit
- Austin median home price ($450K, April 2026) added with inline ACTRIS cite
- Income limit paragraph updated: removed fabricated "$90K–$120K" range, replaced with verified $167,250 figure
- dateModified bumped to 2026-04-24
- Blog title lint: pass (all titles include "Adam Styer")

## 2026-04-24 — AEO body paragraphs + about.html CTAs (daily-opt)

- blog/can-i-switch-lenders: AEO body paragraph added (blog-post-intro inside header is not machine-extractable); H2 question format
- blog/how-to-compare-two-mortgage-offers: AEO body paragraph added; H2 question format
- about.html: 2 body CTAs changed from raw app URL to /get-preapproved
- sitemap.xml: lastmod updated for about.html + 2 blog posts to 2026-04-24
- NotebookLM script confirmed missing on disk — escalated to HIGH blocker

## 2026-04-23 — Footer Awards standardized + how-to-buy suburb links (daily-opt)

- Footer Awards updated to standard "136+ Reviews / 21-Day Avg. Close / Licensed in Texas" across 12 suburb pages (standard template variant)
- Trust strip review count updated to "136+ Reviews · 5.0 Stars" on 3 pages (florence, jarrell, marble-falls — older template variant)
- how-to-buy-a-house-in-austin-tx.html: added internal links to all 24 Austin suburb mortgage pages between Step 4 and Step 5
- sitemap.xml: how-to-buy lastmod updated 2026-04-03 → 2026-04-23
- Liberty Hill 2026-04-22b changes confirmed live on Netlify

# styermortgage.com — Changelog

## 2026-04-22 — Leander page deepened (suburb-editor-daily round 1, #4)

- `leander-mortgage-lender.html` — 10 targeted changes:
  - Added Travisso neighborhood spotlight (78641, off TX-1431, Taylor Morrison/Toll Brothers/Highland/Drees, $600s–$2M+, Olimpico Way — travisso.com + taylormorrison.com sources)
  - Added school ratings with GreatSchools links: Glenn HS 6/10, Leander HS 6/10, Vista Ridge HS 8/10
  - Added employer section: LISD 6,000+ (leanderisd.org/careers), National Aero Stands 2024 (leandertx.gov), Austin tech corridor commute context
  - Added closing cost breakdown at $440K median: title ~$1,837, escrow ~$600, recording ~$125, tax proration ~$3,278 (LISD source)
  - Updated median price throughout to $438K Feb 2026 (Redfin) with citation; replaced vague "$380K–$450K"
  - Added LISD + Williamson County tax rate citations ($1.0869 + $0.3999 per $100) in intro and body
  - Removed USDA Loans feature-item (Adam does not do USDA per voice guide)
  - Removed templated DPA paragraph (confirmed verbatim duplicate with pflugerville page); replaced with Leander-specific DPA card
  - Fixed LocalBusiness schema description to remove USDA
  - Added WebPage schema + dateModified 2026-04-22

## 2026-04-22b — Liberty Hill content enrichment + footer audit (daily-opt)

- `liberty-hill-mortgage-lender.html` — H2 "Loan Options for Liberty Hill Buyers" → question format for AEO
- `liberty-hill-mortgage-lender.html` — At-a-glance: added Orchard Ridge to neighborhood list; added Williamson County property tax context (1.9–2.4% vs Travis County 2.2–2.7%)
- `liberty-hill-mortgage-lender.html` — Footer Awards updated from old 91 Google/45 Zillow split to standard 136+ / 21-Day Avg. Close
- `sitemap.xml` — liberty-hill lastmod updated to 2026-04-22

## 2026-04-22 — Bee Cave AEO audit + broker-vs-bank AEO/SEO pass (daily-opt)

- `bee-cave-mortgage-lender.html` — Fixed OG description "near Eanes ISD" → "Lake Travis ISD" (factual error); added Lakes Edge neighborhood + inline /calculators.html link; footer Awards updated to 136+ standard
- `mortgage-broker-vs-bank.html` — Added "Adam Styer |" to title; converted 4 statement H2s to question format for AEO; fixed CTAs /prequal.html → /get-preapproved (3 places); updated Article schema dateModified; footer Awards updated
- `sitemap.xml` — lastmod updated for both changed pages to 2026-04-22

## 2026-04-21b — Title tag audit + sitemap dedup (daily-opt second run)

- `dscr-loan-austin-tx.html` — title trimmed 68→48 chars (removed redundant "| Investor Mortgage"), OG title updated
- `loans/refinance.html` — title reordered/trimmed 67→56 chars ("Cash-Out Refinance Austin TX" now leads keyword), OG title updated
- `sitemap.xml` — removed duplicate mortgage-pre-approval-austin.html entry (kept priority 0.9, removed 0.8 duplicate)

## 2026-04-21 — Cedar Park page deepened (suburb-editor-daily round 1, #3)

- `cedar-park-mortgage-lender.html` — 9 targeted changes:
  - Rewrote AEO opener: FHA + jumbo program hooks tied to Leander ISD buyers and Twin Creeks/Ranch at Brushy Creek price range
  - Replaced 2 generic body paragraphs with employer section: Cedar Park Regional Medical Center (Ascension), ETS-Lindgren, National Oilwell Varco, Firefly Aerospace ($1.1B NOC contract 2024) — Cedar Park EDC source
  - Updated at-a-glance: real tax rate 1.86% nominal / 1.52% effective with WilCo + LISD source URLs; removed unverified IBM reference; corrected Apple distance
  - Updated home prices H3: $492K March 2026 Redfin median replacing vague $400-500K range; added Block House Creek low end + Twin Creeks upper end
  - Added school ratings H3: Cedar Park HS 8/10 + Vista Ridge HS 8/10 (GreatSchools links + physical addresses)
  - Added 3 neighborhood spotlights: Buttercup Creek ($420K-$650K, 78613), Ranch at Brushy Creek ($500K-$850K, 78613), Twin Creeks ($700K-$1.1M+, Toll Brothers Crestline 2026)
  - Added closing cost breakdown at $492K: lender title ~$2,100, escrow $650, recording $125, tax proration at 1.86% combined rate (~$4,575 mid-year), prepaids $3,500-$4,500
  - Removed generic "Why Should Cedar Park Homebuyers Use an Independent Mortgage Broker?" H3 (templated boilerplate, confirmed pattern across Leander + Round Rock pages)
  - Added internal link to rate-check-cedar-park.html; added WebPage schema; updated FAQ schema home price answer with Redfin $492K + LISD school ratings
- `run-logs/suburb-editor-queue.md` updated: Cedar Park marked done, Leander is next

## 2026-04-20 — Georgetown page deepened (suburb-editor-daily round 1, #2)

- `georgetown-mortgage-lender.html` — 6 targeted changes:
  - Updated FAQ schema + accordion: $395K median Feb 2026 with Redfin source (was vague ranges)
  - Added WebPage schema with dateModified 2026-04-20
  - "Georgetown at a glance" paragraph: added Redfin median price citation + named employers (AirBorn, St. David's, Loram Technologies, Southwestern University, SportClips HQ) with Chamber of Commerce source
  - Added Wolf Ranch Neighborhood Spotlight: 129 Canyon View Road, 78628, Hillwood Communities, Highland Homes builder, with source link
  - Replaced sourceless "Schools" paragraph with Georgetown ISD school ratings: Georgetown High 7/10 GreatSchools + East View 5/10 GreatSchools, both with source URLs
  - Added closing cost breakdown: $1,762 title insurance, $600 escrow, $125 recording, ~$7,200/yr taxes (GISD $1.0506 + Georgetown city $0.3532 per $100, Community Impact + Hello Georgetown sources)
- `run-logs/suburb-editor-queue.md` updated: Georgetown marked done, Cedar Park is next

## 2026-04-20 — CTR titles complete: all 24 suburb pages + H2 audit done (daily-opt run 2)

- CTR-hook titles + neighborhood-specific meta descriptions: Buda, Westlake, Manor, Marble Falls, Spicewood, Smithville, Elgin, Florence, Jarrell, Taylor
- USDA removed from meta descriptions: Smithville, Elgin, Florence, Jarrell (voice guide: Adam does not do USDA)
- Manor H2s fixed to question format (2 remaining label-format H2s)
- H2 format audit confirmed: ALL 24 suburb pages now in question format ✅
- CTR-hook titles: ALL 24 suburb pages complete ✅ (milestone)
- sitemap.xml lastmod updated for all 10 pages to 2026-04-20
- Self-review: PASS — 10 HTML files + sitemap, GTM=2, no USDA in metas, no Styer Team

## 2026-04-20 — H2 question format + CTR titles, 5 suburb pages (daily-opt run 1)

- 20 content H2s converted to question format: Lakeway, Bee Cave, Bastrop, New Braunfels, Austin-area hub
- CTR-hook titles + neighborhood-specific meta descriptions: Lakeway (jumbo/luxury), Bee Cave (luxury/jumbo), Bastrop (acreage/rural)
- sitemap.xml lastmod updated for all 5 pages to 2026-04-20
- Schema Monday audit: all clean — AggregateRating, FAQPage, Person all ✅
- Hutto reviewCount verified at 136 ✅; blog title lint clean ✅
- 11 of ~24 suburb pages now have CTR-optimized titles (up from 8 after yesterday's run)

## 2026-04-20 — Weekly competitive intel run 7 (Monday)

- SERP check: 10 keywords tracked (7 core Austin + 2 suburb + 1 revisit)
- styermortgage.com upgraded to #1 for "hutto tx mortgage lender" (was #3)
- styermortgage.com new #2 for "round rock tx mortgage lender" (first appearance in top 3)
- Two new competitive threats identified: MortgageAustin.com (#1 for pre-approval) + Nest Mortgaging (6+ keyword positions)
- AsertaLoans new entrant at #1 for "cash out refinance austin tx"
- Report written to run-logs/competitive/2026-04-20.md + latest.md updated
- NotebookLM SEO notebook updated with Week 7 report + master growth log refreshed
- Re-verify gate: 5 prior claims cleared/upgraded (Vista dropped, Lone Star #1 pre-approval cleared, MortgageAustin.com broker claim updated, Hutto #3→#1 upgraded)
- No site changes this run (research only)

## 2026-04-19 — H2 audit (Marble Falls + Elgin) + CTR title/meta rewrites (run 2)

- marble-falls-mortgage-lender.html — 4 H2s → question format for AEO extraction
- elgin-mortgage-lender.html — 4 H2s → question format for AEO extraction
- 8 suburb pages — generic titles → specific intent-matching hooks (per GOALS.md CTR priority)
- 8 suburb pages — generic meta descriptions → first-person, neighborhood-specific copy
- 8 suburb pages — og:title updated to match new titles
- sitemap.xml — lastmod updated for all 10 changed pages to 2026-04-19
- commit d4c2705 — 11 files, 42 insertions, 42 deletions

## 2026-04-19 — GBP weekly post: Rate Commentary — Week 16 (styer-gbp-weekly agent)

- GBP post (184 words, Rate Commentary theme) auto-published to Publer, job ID: 69e4e36dfa57756880b5ecae
- FB, Instagram, LinkedIn platform-adapted drafts inserted into social_drafts (status: draft, awaiting Adam approval)
- 4 activity log entries created in social_activity table
- Post saved to run-logs/gbp-posts/2026-04-19.md
- Master growth log updated; NotebookLM source refreshed

## 2026-04-19 — Suburb editor run 1: Round Rock deepened (suburb-editor-daily agent)

- round-rock-mortgage-lender.html — removed templated "As an independent mortgage broker" paragraph (confirmed on 5 pages); updated home price to $388K Feb 2026 median (Redfin, cited); updated property tax rate to specific ~1.68% combined (Texas Property Calculator, cited); added employer list with sources (Dell HQ, Emerson HQ, Toppan Photomasks HQ, Amazon 149-acre campus — Round Rock Chamber); added Teravista neighborhood spotlight with zip 78626, University Blvd/Westinghouse Rd location, builders, price range, City-Data source; added Westwood High School 9/10 GreatSchools + A+ Niche + 99% grad rate with source links; added closing cost breakdown ($390K example: title ~$1,741, escrow ~$600, recording ~$125, property tax proration ~$3,276 mid-year); updated FAQ schema + accordion answer with real 2026 data; added WebPage schema with dateModified 2026-04-19
- run-logs/suburb-editor-queue.md — created, Round 1 queue initialized

## 2026-04-19 — AEO H2 audit (Spicewood + Florence + Jarrell) + blog title fix

- spicewood-mortgage-lender.html — 4 H2s → question format for AEO extraction (preserved lakefront angle)
- florence-mortgage-lender.html — 4 H2s → question format for AEO extraction
- jarrell-mortgage-lender.html — 4 H2s → question format for AEO extraction
- blog/2026-04-04-austin-housing-market-report-april-2026.html — title + og:title brand fix (added "Adam Styer | NMLS #513013")

## 2026-04-18e — AEO H2 audit (Taylor + Smithville) + sitemap gap fix

- taylor-mortgage-lender.html — 4 H2s → question format for AEO extraction
- smithville-mortgage-lender.html — 4 H2s → question format for AEO extraction
- sitemap.xml — added 5 suburb pages missing since March 2026: taylor, smithville, elgin, florence, jarrell
- Hutto verified: AEO ✅, reviewCount = 136 ✅, H2s ✅

## 2026-04-18d — SEO: rewrite titles + metas on 8 page-1-0-click pages

Adam-approved title and meta description rewrites pushed to 8 high-impression / low-CTR pages flagged by GSC. Body content already supports each claim.

- 3 blog posts: `blog/2026-04-04-austin-housing-market-report-april-2026.html`, `blog/2026-03-27-down-payment-assistance-texas-2026.html`, `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` — title + meta description + og:title + og:description + twitter:title + twitter:description + Article JSON-LD `headline` + `description` all updated to match
- 3 city pages: `round-rock-mortgage-lender.html`, `georgetown-mortgage-lender.html`, `cedar-park-mortgage-lender.html` — title + meta description + og:title + og:description updated. Added missing `twitter:card` + `twitter:title` + `twitter:description` tags (city pages previously had only `twitter:image`)
- 2 loan pages: `loans/fha.html`, `loans/jumbo.html` — all 6 title/description tag pairs updated
- New angles: Round Rock = "beat builder rates"; Cedar Park = FHA in Leander ISD; Georgetown = Sun City + asset-depletion; FHA = "broker not a call center" w/ 2026 Travis limit $524,225; Jumbo = 10% down to $1.5M w/ bank-statement
- Blog title lint passed (`grep "<title>" blog/*.html | grep -v "Adam Styer"` → 0 lines)
- Body content, H1s, canonicals, GTM, analytics, and all other head tags untouched

## 2026-04-18c — Mobile perf fix: compress + picture-wrap 3 huge images

Fix for the GSC desktop-vs-mobile ranking gap (desktop avg 9.25 vs mobile 36.47). Huge unoptimized hero images were the prime CWV suspect on all non-homepage pages.

- Compressed 3 images to WebP (cwebp 1.6.0, q=80, 1200–1600 px long edge):
  - `assets/family2.jpg`: 8.1 MB → 108 KB WebP (+ 332 KB JPG fallback)
  - `assets/adam-cutout.png`: 5.0 MB → 64 KB WebP (+ 1.1 MB PNG fallback; PNG with alpha at 1200 px is inherently large without pngquant)
  - `assets/headshot.jpg`: 2.0 MB → 68 KB WebP (+ 264 KB JPG fallback)
  - Total primary-path savings: 15.1 MB → 240 KB (98.4%)
  - Originals moved to `assets/originals/` for rollback
- Wrapped 42 `<img>` tags across 48 HTML files in `<picture>` elements with WebP source + JPG/PNG fallback. Preserved alt, class, width/height, fetchpriority, decoding, loading, and inline style attributes. Skipped already-wrapped index.html and austin-mortgage-rates.html. Structured-data JSON references to headshot.jpg left as-is.
- Mobile Lighthouse audit + perf diagnosis written to `tasks/mobile-perf-2026-04-18.md`. Top non-auto-fix issues flagged for Adam: calculator slider tap targets 20×20 px (need ≥44), calculator form inputs missing labels, blog hero-bg.webp missing preload (1.1 s load delay).

## 2026-04-18b — Dead file cleanup + sitemap suburb prune

- Deleted `blog/_template.html` (dev-only template; referenced only in run-logs — historical, no code dependency)
- Deleted `blog/2026-04-01-test.html` (test file, publicly reachable per robots disallow, never linked)
- Deleted `hero-test.html` (glassmorphism hero prototype, not linked)
- Deleted `updates/2026-03-18-the-ai-trap-i-walked-right-into.html` (duplicate of `/blog/` canonical version — duplicate content risk)
- Deleted `blog/2026-03-30-temp-placeholder.html` (meta-refresh redirect stub, noindexed — dead weight)
- sitemap.xml: removed 5 low-volume suburb URLs (jarrell, florence, smithville, taylor, elgin) — pages remain in repo pending cut/defer decision
- No references found in blog.html noscript or CollectionPage schema for any deleted file; no sitemap changes beyond the 5 suburb removals



- New post: `blog/2026-04-17-should-i-refinance-austin-tx-2026.html` — ~1,350 words, FAQPage + Article + BreadcrumbList schema, targets "refinance mortgage Austin" (Moderate/High-opportunity keyword from SEO audit)
- Break-even math framing with real-client anecdote (radical transparency voice); internal links to /refinance-quote, /loans/refinance.html, /blog/2026-03-24-cash-out-refinance-austin-tx.html
- Updated blog.html noscript block + CollectionPage JSON-LD schema, blog/manifest.json, sitemap.xml
- Queued 3 platform-tailored social drafts (LinkedIn/Facebook/Instagram) to `social_drafts` for Adam's dashboard approval; logged `social_activity` entries

## 2026-04-18 — Monday rotation: Schema audits + AEO + H2 question format (6 pages)

- dscr-loan-austin-tx.html: AEO answer-first paragraph added; 7 H2s converted to question format; hero + body CTAs → /get-preapproved (missed in prior loan page sweep)
- westlake-mortgage-lender.html: 3 content H2s → question format; body + footer CTAs → /get-preapproved
- dripping-springs-mortgage-lender.html: 3 content H2s → question format (AEO was already present)
- hutto/liberty-hill/manor -mortgage-lender.html: 2 H2s each → question format (prior session, committed today)
- Schema audit: homepage ✅ MortgageBroker+Person+FAQPage+AggregateRating(136); about ✅ LocalBusiness+Person; DSCR ✅ FAQPage(6)+BreadcrumbList; Westlake ✅ all schemas
- about.html sameAs CID: confirmed real (ChIJYy5uEFPKRIYRmF-k_5gPk74), stale flag auto-resolved
- sitemap.xml: lastmod updated for all 6 changed pages → 2026-04-18

## 2026-04-17 — Friday AEO rotation: Buda footer, doc-checklist H2s, San Marcos H2s

- buda-mortgage-lender.html: footer Awards & Recognition updated — removed stale "1,000+ Loans Closed" / "Top Producing Broker 2023" → current "5.0 ★ Google Rating · 136+ Reviews | 21-Day Avg. Close | Licensed in Texas · NMLS #513013"
- blog/2026-04-06-mortgage-document-checklist-austin-tx.html: 4 H2s converted from label format ("Additional Documents — X") to AEO question format
- san-marcos-mortgage-lender.html: 2 content H2s converted to question format
- sitemap.xml: lastmod updated for buda (→ 04-17), san-marcos (03-06 → 04-17), doc-checklist (04-10 → 04-17)

## 2026-04-17 — GTM tracking fix (Version 5) + Buda trust bar

- GTM container GTM-PQQ6PGLR published as Version 5 "Version 5 - Tracking Fix"
- Deleted malware-paused tags: `GA4 Configuration` (tag 3, paused Feb 24) and `Google Ads - Thank You Page Conversion` (tag 9, paused Mar 21)
- Added replacement `GA4 Configuration` (tag 12, Google Tag G-DDY0H0319S, Initialization - All Pages)
- Added replacement `Google Ads - Thank You Page Conversion` (tag 13, Conversion ID 18028490942, Label XYcDCMqh64wcEL7h05RD, fires on thank_you_page_view)
- Added `Google Tag AW-18028490942` (tag 11, base Google Ads tag, Initialization - All Pages) via Fix banner
- Added **new** `GA4 Event - generate_lead` (tag 14, GA4 Event, event name: generate_lead, fires on CE - generate_lead) — fixes suburb quick-form conversion tracking gap (existing since form launch)
- Added **new** `Conversion Linker` (tag 15, Conversion Linker, All Pages) — resolves container quality "Missing conversion linker" warning
- buda-mortgage-lender.html: trust bar updated from old template "⭐ 5.0 Google Rating | 1,000+ Loans Closed | NMLS #513013" to standard "5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013"

## 2026-04-16c — Homepage Lighthouse perf fix (72 → 90+ target)

- index.html: GTM loader wrapped in a deferred invoker. Container snippet itself is preserved verbatim (GTM-PQQ6PGLR, same body, same function); only the *timing* of invocation changes. Fires on first user interaction (scroll / mousemove / touchstart / keydown / click) OR after `requestIdleCallback` with a 3.5s timeout fallback. Removes GTM download + parse from the critical path.
- index.html: inline critical CSS — removed now-useless `background-size:200% 200%` on `.hero-gradient-text` (no animation to run against).
- style.css: removed `animation: gradient-shimmer 4s ease-in-out 1` from `.hero-gradient-text`. Was animating `background-position` (non-composited) during LCP measurement window. Static gold gradient kept — same look, no paint churn.
- style.css: removed `animation: hero-cta-glow 1.5s ease-in-out infinite` from `.hero-cta-primary:hover`. Was animating `box-shadow` (non-composited) on hover. Static enhanced hover shadow kept.
- style.css: removed unused `@keyframes gradient-shimmer` and `@keyframes hero-cta-glow` and the stale `will-change:box-shadow` / `will-change:background-position` declarations. Size: 65295 → 64814 bytes.
- Root cause of the 72 score: GTM on the critical path (long tasks + 202 KiB unused JS) + two non-composited keyframe animations on hero elements. Both now addressed.
- Files touched: `index.html`, `style.css`. Other working-tree changes (blog posts, loanos-waitlist, _redirects, etc.) left untouched — not part of this perf pass.

## 2026-04-16b — Rate-check form fix (end-to-end pipeline restored)

- rate-check.html: submit handler rewritten — reads PDF via FileReader, base64-encodes it, POSTs as `application/json` instead of multipart/form-data. No UX change (still upload PDF + submit).
- n8n workflow `Pf1zWuKAnD4SznSR` (LoanOS — Rate Check Form Submission):
  - Webhook upgraded to typeVersion 2.1; removed `binaryData: true`; now receives JSON body with all 11 form fields intact.
  - Added "Decode PDF" Code node between Set Fields and downstream nodes — rehydrates `loan_estimate_base64` into a proper `application/pdf` binary attachment.
  - Insert Contact body: added `user_id` and `organization_id` (tenancy fields required by NOT NULL constraint).
  - Log Activity body: added `organization_id`.
  - Both Supabase HTTP nodes: flipped `neverError` from true → false so future failures surface in execution history instead of silently reporting success.
- Root cause: three stacked bugs. (1) n8n webhook v2 + multipart was dropping fields 4–10 and mashing the PDF into a corrupt binary blob. (2) Missing tenancy fields caused silent `23502` NOT NULL violations on every insert. (3) `neverError: true` masked both so the workflow reported success while nothing landed.
- Verified end-to-end on exec 5213: contact row in `contacts`, activity row in `activity_log`, Outlook notification with PDF attached received at adam@thestyerteam.com. 5 synthetic test rows cleaned from Supabase.

## 2026-04-16 — Daily optimization (TOMORROW_PRIORITY: Kyle + Buda H2 audit + homepage hero CTA fix)

- kyle-mortgage-lender.html: 3 H2s converted to question format; at-a-glance block added (Hays County, Kyle ISD, Amazon + Tesla corridor, Plum Creek/6 Creeks/Anthem/Crosswinds/Steeplechase, $280K–$380K)
- buda-mortgage-lender.html: 3 H2s converted to question format; at-a-glance block added (Hays County, Hays CISD + Hays HS, Tesla corridor, Garlic Creek/Sunfield/Ruby Ranch, $300K–$440K); /calculators body link added; body CTA + footer Apply Now fixed raw app URL → /get-preapproved
- index.html: Homepage hero "Apply Now" CTA fixed from raw app URL → /get-preapproved (LOW blocker resolved — closes active CONTEXT.md blocker)
- sitemap.xml: Kyle lastmod 2026-04-12 → 2026-04-16; Buda lastmod 2026-03-27 → 2026-04-16
- Thursday funnel audit: contact.html ✅, thank-you.html ✅, 3 pages internal links ✅
- Self-review: PASS — 4 files, 0 issues. Deploy verified: kyle 200 ✅, buda 200 ✅

## 2026-04-15b — Daily optimization (Wednesday rotation: Georgetown + Pflugerville suburb AEO)

- georgetown-mortgage-lender.html: 5 H2s converted to question format ("Why Work With?", "Why Should...Use?", "What Loan Programs?", "What Should...Know?", "How Does the Process Work?")
- georgetown-mortgage-lender.html: Added /calculators body link in New Construction paragraph
- pflugerville-mortgage-lender.html: 4 H2s converted to question format (5th "How to Get a Mortgage" already correct)
- pflugerville-mortgage-lender.html: Added Pflugerville at-a-glance block (Travis/Williamson split, PISD, Amazon+Samsung+NE Austin employers, 6 neighborhoods, commutes, $320K–$420K)
- pflugerville-mortgage-lender.html: Added /calculators body link in Price Range paragraph
- sitemap.xml: Georgetown + Pflugerville lastmods 2026-04-12 → 2026-04-15
- Deploy verified: both pages 200 ✅. Self-review: PASS — 3 files, 0 issues.

## 2026-04-15 — Daily optimization (Wednesday rotation: Cedar Park + Leander suburb AEO)

- cedar-park-mortgage-lender.html: 3 H2s + 2 H3s converted to AEO question format
- cedar-park-mortgage-lender.html: Added Cedar Park at-a-glance block (Williamson/Travis split, Leander ISD A-rated, Apple/Dell/IBM employers, 183A, neighborhoods: Buttercup Creek, Twin Creeks, Anderson Mill, Riviera Ridge, Carriage Hills)
- cedar-park-mortgage-lender.html: Corrected TEA rating language from outdated "Exemplary" → "A-rated"
- leander-mortgage-lender.html: 5 H2s converted to AEO question format (at-a-glance block already present)
- sitemap.xml: cedar-park lastmod 2026-03-27 → 2026-04-15; leander lastmod 2026-04-12 → 2026-04-15
- Full Cedar Park audit: all core checks PASS — form, FAQPage, BreadcrumbList, H1, /get-preapproved links, AEO paragraph
- Self-review: PASS — 4 files, 0 issues

## 2026-04-14 — Daily optimization (Wednesday rotation: Round Rock suburb deep dive)

- round-rock-mortgage-lender.html: H2s/H3 converted to question format for AEO ("Why Should...?", "What Loan Programs...?", "What Are Home Prices...?")
- round-rock-mortgage-lender.html: Added "Round Rock at a glance" city enrichment (RRISD schools, Williamson County tax context, employer list, neighborhoods)
- sitemap.xml: round-rock-mortgage-lender.html lastmod updated 2026-03-27 → 2026-04-14
- Round Rock full audit: all core checks PASS — form, FAQPage, BreadcrumbList, H1, /get-preapproved links, AEO paragraph, answer-first FAQs
- Self-review: PASS — 2 files, 0 issues

## 2026-04-14 — Daily optimization (Tuesday title/meta audit)

- Title tag audit: 6 loan/resource pages standardized to "[Loan Type] in Austin TX | Adam Styer | NMLS #513013"
- Fixed: first-time-home-buyer.html (NMLS added), austin-down-payment-assistance.html (Adam Styer added), fixed-vs-adjustable.html (Adam Styer added), how-to-buy-a-house-in-austin-tx.html (Adam Styer added + meta updated), closing-costs-texas.html (Adam Styer added), improve-credit-score.html (NMLS + format corrected)
- mortgage-broker-vs-bank.html: Article schema dateModified updated 2026-02-26 → 2026-04-14
- Sitemap: 200 ✅ | Self-review: PASS — 7 files, 0 issues

## 2026-04-14 — Homepage form wiring to subscribe-lead.js

- Quick Quote form (hero): now calls `/.netlify/functions/subscribe-lead` in parallel with Netlify POST → Mailchimp tag `quick-quote-lead` + LoanOS contact creation on submit
- Quick Contact form (bottom): same pattern → Mailchimp tag `quick-contact-lead` + LoanOS contact creation
- Netlify backup POST preserved on both forms; UTM params forwarded; error handling non-blocking
- Commit `1bb1ef1` deployed to Netlify

## 2026-04-13 — Daily optimization (Monday schema + Hutto Kingmaker)

- Schema audit: homepage, about, Hutto, DSCR all clean; AggregateRating 136 confirmed
- hutto-mortgage-lender.html: added Cottonwood Creek + Brushy Creek trail mentions — hyper-local depth vs Big Life template
- mortgage-broker-vs-bank.html: added BreadcrumbList JSON-LD schema (was missing despite visual breadcrumb)
- sitemap.xml: fixed pre-existing domain typo on hutto entry (styremortgage→styermortgage); hutto lastmod updated
- Commit 9559a14 — 3 files, both pages verified 200 post-deploy
- Blog title lint: CLEAN

## 2026-04-13 — Week 6 competitive intelligence run

- SERP check: 9 keywords (7 core Austin + Hutto + Liberty Hill)
- **FIRST TOP-10 RANKING: styermortgage.com #3 for "hutto tx mortgage lender"** — suburb page indexing confirmed working
- Confirmed Big Life's Hutto page is weak (25 reviews schema, no local neighborhoods) — beatable
- Liberty Hill: Guild Mortgage holds #1 + #2 with physical branch at 13563 Hwy 29 W — organic-only target
- New threat: MortgageAustin.com ranking #3 for "mortgage broker austin tx" with "broker vs bank" blog content
- Sente Mortgage dropped from #1 "mortgage lender austin tx" (Vista Lending new #1)
- Lone Star Financing now #1 for "get pre-approved austin tx"
- Full report: `run-logs/competitive/2026-04-13.md`
- Updated learnings.md with suburb ranking + review schema patterns
- Updated TODO.md with Hutto page strengthening + Liberty Hill content priorities

## 2026-04-12 — Rate Check SEO expansion: 5 city pages + 10 blog posts

### City rate-check landing pages (Phase 2)
- `/rate-check-round-rock.html` — Round Rock + Pflugerville (I-35 corridor, new construction, tech relocations)
- `/rate-check-cedar-park.html` — Cedar Park + Leander (183A corridor, LISD, Apple campus proximity)
- `/rate-check-georgetown.html` — Georgetown + Hutto (Sun City, USDA-eligible areas, GISD)
- `/rate-check-buda-kyle.html` — Buda + Kyle + San Marcos (south corridor, affordability, first-time buyers)
- `/rate-check-new-braunfels.html` — New Braunfels (Comal County growth, flood zones, Vintage Oaks)
- Each page: same upload form + n8n webhook, hidden `source` field for attribution, unique content, MortgageLender + FAQPage + BreadcrumbList JSON-LD, dataLayer events with city-specific lead_source

### Rate shopper blog content cluster (Phase 3)
- `blog/can-i-switch-lenders-after-going-under-contract-texas.html`
- `blog/how-to-compare-two-mortgage-offers.html`
- `blog/apr-vs-interest-rate-what-actually-matters.html`
- `blog/are-mortgage-lender-fees-negotiable.html`
- `blog/how-many-mortgage-quotes-should-i-get.html`
- `blog/local-lender-vs-online-lender-austin-central-texas.html`
- `blog/what-delays-closing-when-you-switch-lenders.html`
- `blog/how-to-read-a-loan-estimate.html`
- `blog/what-to-compare-besides-mortgage-rate.html`
- `blog/is-the-lowest-rate-the-cheapest-loan.html`
- Each post: Article + FAQPage + BreadcrumbList schema, AEO intro, CTAs to rate-check hub/city pages, 600-1400 words

### Internal linking (Phase 4)
- Added "Serving All of Central Texas" section to rate-check.html with links to all 5 city pages
- Added "Rate Shopping Resources" section to rate-check.html with links to 4 key blog posts
- Updated blog.html CollectionPage schema with 10 new posts
- Updated blog.html noscript block with 10 new posts
- All blog posts cross-link to rate-check hub + adjacent posts
- All city pages link back to rate-check hub

### Sitemap + infrastructure
- Added 5 city pages + 10 blog posts to sitemap.xml (15 new URLs)

## 2026-04-12 — Rate Check page + n8n workflow

- Created `/rate-check.html` — "Get a Second Opinion on Your Mortgage Rate" landing page
- Full SEO: MortgageLender, FAQPage (5 Qs), BreadcrumbList JSON-LD schemas
- OG tags, Twitter cards, canonical, meta description
- Upload form (7 fields + PDF upload + optional notes) → n8n webhook via `fetch()` + `FormData`
- Client-side validation with inline error messages, `generate_lead` GTM event on success
- Hero with dual CTAs (Calendly + form anchor), How It Works 3-step section, FAQ section, trust bar
- Added "Rate Check" nav link to 102 pages (between "About Adam" and "For Realtors")
- n8n workflow `Pf1zWuKAnD4SznSR` created and activated:
  - Webhook (POST, binary data) → Set Fields → Insert Contact (Supabase) + Log Activity (Supabase) + Send Notification Email (Outlook) → Respond to Webhook (200 JSON)
  - Supabase nodes: `neverError: true` for continue-on-error behavior
  - Webhook URL: `https://styer.app.n8n.cloud/webhook/rate-check-submission`

## 2026-04-12 (scheduled) — GBP Weekly: Client Story (Week 15)

- GBP post published to Publer (GBP only, job 69dba83df50f031661e715a0) — 199 words, Client Story theme, Week 15
- FB/IG/LI platform adaptations inserted as status:draft in social_drafts (awaiting Adam's approval)
- 4 activity entries logged in social_activity
- Master growth log appended + NotebookLM source refreshed (source 1b4db2f3)
- Saved to run-logs/gbp-posts/2026-04-12.md
- Schema note: social_drafts platform check constraint does not include google/gbp — GBP recorded via activity log only

## 2026-04-12 (scheduled) — Monday rotation: AEO body paragraphs + DSCR BreadcrumbList

- dscr-loan-austin-tx.html — Added BreadcrumbList JSON-LD schema (Home → Investment Loans → DSCR Loans Austin TX)
- blog/2026-04-01-how-to-choose-a-mortgage-lender-austin-tx.html — Added AEO answer-first paragraph (was missing entirely)
- blog/2026-04-03-condo-mortgage-austin-tx.html — Added AEO answer-first paragraph to article-body (styled header paragraph didn't qualify)
- sitemap.xml — Updated lastmod to 2026-04-12 for all 3 changed files
- Commit 7b8906e — all 3 pages verified 200 ✅ post-deploy

## 2026-04-11b (scheduled) — Construction page AEO + builder process walkthrough

- loans/construction.html — Added AEO answer-first paragraph (one-time close, down payment summary, interest-only payments during build)
- loans/construction.html — Added "The Build Process: What to Expect" section (6-step walkthrough from pre-approval through CO + loan conversion, Austin builder examples)
- loans/construction.html — Updated schema dateModified: 2026-02-25 → 2026-04-11
- sitemap.xml — Added lastmod 2026-04-11 to construction.html entry
- Commit 811028f — verified 200 ✅ post-deploy
- Blog QA: 2026-04-10-fha-loan-requirements-texas-2026.html — PASS (title 60 chars, meta ~153 chars, canonical ✅, body AEO ✅, synced to sitemap/manifest/blog.html)

## 2026-04-11 (scheduled) — City enrichment: Marble Falls at a glance

- marble-falls-mortgage-lender.html — Added "Marble Falls at a glance" paragraph: Marble Falls ISD (3 campuses), commute times via US-281, neighborhood price ranges ($280K–$1.2M+ lakefront)
- sitemap.xml — lastmod updated for marble-falls-mortgage-lender.html (2026-03-27 → 2026-04-11)
- Florence confirmed already had "at a glance" section — no changes needed
- All 25 suburb pages now complete with city enrichment ✅
- Commit fbb0dd6 — marble-falls page verified 200 ✅ post-deploy

## 2026-04-10c (scheduled) — City enrichment: Liberty Hill + Elgin

- liberty-hill-mortgage-lender.html — "Liberty Hill at a glance" paragraph: Liberty Hill ISD campuses, SH-183A/US-183 commutes, 4 community price ranges
- elgin-mortgage-lender.html — "Elgin at a glance" section: Elgin ISD campuses, US-290/SH-130 commutes, 4 neighborhood price ranges
- sitemap.xml — lastmod updated for both pages
- Commit 9c4ef30 — both pages 200 ✅ post-deploy

## 2026-04-10b (scheduled) — Weekly content: FHA Loan Requirements

- New blog post: `blog/2026-04-10-fha-loan-requirements-texas-2026.html` — 1,050 words, 6-question FAQPage schema, AEO answer-first paragraph, question-format H2s, blog title lint PASS
- Updated blog/manifest.json, blog.html noscript + CollectionPage schema (position 1), sitemap.xml
- Queued 3 social drafts to LoanOS Marketing Dashboard (LinkedIn, Facebook, Instagram) — status: draft, pending Adam's review
- Commit dae4128 — Netlify deploy triggered

## 2026-04-10 (scheduled) — Friday AEO audit + city enrichment

- Doc checklist blog post: added answer-first `<p><strong>` body paragraph (blog-post-intro class is AEO anti-pattern — fixed)
- Doc checklist: converted 2 statement H2s to question format ("What Documents Do W-2 Employees Need?" + "What Are the 5 Things That Slow Down a Mortgage Closing?")
- New Braunfels: added "at a glance" paragraph (dual ISD campuses, commute times, neighborhood prices)
- Lakeway: added "at a glance" paragraph (Lake Travis ISD campuses, commute times, neighborhood prices)
- sitemap.xml: lastmod updated for all 3 files to 2026-04-10
- Commit c098541 — all 3 pages verified 200 post-deploy ✅

## 2026-04-09b (scheduled) — AEO completion + Thursday funnel audit

- Added AEO answer-first paragraph to buda-mortgage-lender.html (Hays County affordability + FHA/conventional angle)
- Added AEO answer-first paragraph to westlake-mortgage-lender.html (jumbo + portfolio lenders angle)
- AEO coverage: 25/25 suburb pages complete ✅
- Added /calculators.html link to first-time-home-buyer.html pillar section (was 1 body link → now 2)
- Funnel audit: homepage → /get-preapproved → /thank-you all clean; contact.html dataLayer event ✅; thank-you 3-step section ✅
- Commit 7e3b2fa — all 3 pages verified 200 post-deploy ✅

## 2026-04-09 (scheduled) — AEO: San Marcos + Wednesday suburb audit

- Audited Round Rock: all clean — H1, FAQPage, BreadcrumbList, hero quick-form, trust badge, AEO ✅
- AEO grep across all 25 suburb pages: confirmed 13/25 have answer-first paragraph
- Added AEO answer-first paragraph to san-marcos-mortgage-lender.html (USDA + investment angle)
- Identified Buda + Westlake as remaining AEO gaps — deferred to Thursday run
- Blog title lint: CLEAN (only temp-placeholder + template show up)
- Sitemap: 200 ✅ — Commit 55d6797, San Marcos 200 post-deploy ✅

## 2026-04-09 AM — City enrichment at-a-glance paragraphs

- Added at-a-glance paragraph to spicewood-mortgage-lender.html (Lake Travis ISD, SH-71 commutes, price ranges $400K–$3M+)
- Added at-a-glance paragraph to florence-mortgage-lender.html (Florence ISD, FM 487/I-35 commutes, acreage $260K–$460K)
- Added at-a-glance paragraph to jarrell-mortgage-lender.html (Jarrell ISD, I-35 commutes, new construction $280K–$430K)
- Fixed pre-existing Spicewood meta description (156→155 chars — trailing period removed)
- Commit 06fbfad — 3 pages updated, QA clean ✅

## 2026-04-08 (morning) — AEO answer-first paragraphs + funnel audit

- Added AEO answer-first paragraphs to Elgin, Florence, Jarrell, Marble Falls (new content-narrow section between hero and feature grid on each)
- Funnel audit clean: homepage→/get-preapproved→/thank-you, contact.html form + dataLayer verified
- Internal linking audit: about.html, dscr, austin-mortgage-rates all have 20+ internal links ✅
- AEO coverage now 11/25+ suburb pages confirmed
- Commit c3967c4, all 4 pages 200 post-deploy ✅

## 2026-04-08 — Conversion tracking fix + blog slug cleanup

- Fixed suburb quick-form conversion tracking: broadened analytics.js form selector to catch all `data-netlify="true"` forms, moved `thank_you_page_view` dataLayer push into script.js success handler (fires after confirmed Netlify submission, before redirect)
- Added fallback form detection in script.js `initHeroQuickForm()` for suburb pages without `#hero-quick-form`
- Converted `blog/2026-03-30-temp-placeholder.html` to meta-refresh redirect → canonical URL (noindex, nofollow)
- Google Ads conversion tracking now fires correctly: `generate_lead` on submit → `thank_you_page_view` on success

## 2026-04-08 PM — AEO answer-first paragraphs (Cedar Park, New Braunfels, Bastrop, Bee Cave)

- Added AEO answer-first `<strong>` paragraph to cedar-park-mortgage-lender.html (before first H2)
- Added AEO answer-first `<strong>` paragraph to new-braunfels-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bastrop-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bee-cave-mortgage-lender.html
- Tuesday title/meta audit: all 8 loan pages + homepage clean, no regressions
- Blog title lint: clean — no posts missing brand
- Commit f8ca0f3 — 4 files, 8 insertions, deploy verified ✅

## 2026-04-08 AM — Glossary nav + loan page links + city enrichment

- Added mortgage-glossary.html to Resources nav dropdown across 64 pages (batch Python replace)
- Added glossary internal link to "Helpful articles" on conventional.html, fha.html, va.html
- Added glossary link to DSCR page investment section ("Unfamiliar with terms like DSCR, LTV...")
- City enrichment "at a glance" paragraphs: Bee Cave (Lake Travis ISD, commutes, neighborhood ranges), Manor (Manor ISD, Tesla/Samsung commutes, ShadowGlen/Presidential prices), Smithville (Smithville ISD, commutes, in-town vs acreage prices)
- Commit e4ee80b — 65 files, 83 insertions

## 2026-04-07 (Monday run) — Schema audit + Round Rock AEO

- Added LocalBusiness schema block to about.html (was missing; Person-only was the gap)
- Added AEO answer-first paragraph to round-rock-mortgage-lender.html
- Homepage Person schema confirmed present (learnings.md entry was stale)
- Sitemap 200 ✅, blog lint clean ✅
- NotebookLM returned Google Ads optimization advice (RSA assets, negative keywords, radius targeting)

## 2026-04-07 — Meta description fixes + suburb AEO paragraphs

- Fixed 6 loan page meta descriptions (va LONG 181→153, conventional/fha/refinance/usda/products all expanded to 150-160 range)
- Added AEO paragraphs to Taylor, Smithville, Spicewood suburb pages

## 2026-04-06 — Homepage AEO + Person schema + suburb AEO batch

- Added 54-word answer-first paragraph to homepage before "Why Choose" section
- Added Person schema JSON-LD (Adam Styer, NMLS, sameAs links)
- Added AEO paragraphs to Manor, Dripping Springs suburb pages
- Liberty Hill AEO body paragraph added (hero-subtitle alone doesn't satisfy AEO)

## 2026-04-05 — Suburb hero CTA batch fix + AEO additions

- Patched 17 suburb hero-cta-primary buttons to /get-preapproved (prior fix missed hero CTAs)
- Added AEO paragraph + /calculators link to Lakeway
- Added AEO paragraph + /calculators link to Hutto
- Fixed blog title tags: self-employed, housing market, spring market posts

## 2026-04-04 — Suburb H1 audit complete

- Verified all 24 suburb pages: zero have "Serving" H1 anti-pattern

## 2026-04-03 — Sitemap submitted to GSC

- sitemap.xml submitted to Google Search Console, status: Success

## 2026-04-02 — CTA audit + resource page fixes

- first-time-buyer-guide final CTA → /get-preapproved (was raw app URL)
- Cedar Park hero "Apply Now" → /get-preapproved
- austin-down-payment-assistance: 2 body CTAs fixed

## 2026-04-01 — Major CTA + schema + content distribution overhaul

- All 8 loan page hero + bottom CTAs routed to /get-preapproved (/refinance for refinance page)
- All 24 suburb body + footer CTAs routed to /get-preapproved
- thank-you.html: 3-step "What Happens Next" section added
- Confirmed TCPA checkboxes present on all 24 suburb pages
- Content distribution system activated (Tier 1 + Tier 2 auto-posting)
- Suburb page inventory in context updated from 9 → 24

## 2026-03-30 — Blog manifest + title fixes

- Blog manifest updated with March 30 FTB post
- Title tag fixes: refinance-quote pipe, FTB post brand name
- Westlake title trimmed 99→61 chars, Buda title trimmed 104→51 chars

## 2026-03-29 — VA loan eligibility blog post

- Published: VA Loan Eligibility Texas 2026 with Article + FAQPage schema

## 2026-03-26 — Homepage H1 + trust bar standardization

- H1 changed from "Your Austin Home Loan Simplified" → keyword-rich NMLS title
- Trust bar standardized to "Licensed in Texas | NMLS #513013" across 39 pages

## 2026-03-25 — Austin mortgage rates evergreen page

- New /austin-mortgage-rates page with Article + FAQPage + BreadcrumbList schema

## 2026-03-24 — Contact form + homepage FAQ + conversion tracking

- Contact form wired to Netlify Forms with generate_lead event
- Homepage FAQPage schema (5 questions) + accordion section
- TCPA consent checkbox on /get-preapproved and /refinance-quote
- Thank-you fonts converted to async preload
- NMLS# standardized across title tags (# symbol, consistent format)

## 2026-03-23 — Google Ads sitelinks + schema batch

- Sitelinks applied to Search-1 campaign
- BreadcrumbList schema added to 9 suburb + 7 loan pages
- FAQPage schema added to surrender + AI trap blog posts
- Phone chip added to trust bar on landing pages
- "What happens next" 3-step section on both landing pages
- Loan page title tags: NMLS# added to all 6 remaining + 9 suburb pages

## 2026-03-22 — Mobile optimization + compliance

- Landing page forms: `order: -1` on mobile (form above headline)
- noindex added to /get-preapproved + /refinance-quote
- Copyright year updated 2025→2026 on 7 pages
- Thank-you page: phone number added

## 2026-03-21 — Performance + schema verification

- Homepage LCP fix: adam-cutout.png 5MB → picture element with media query (mobile data URI, desktop 46KB WebP)
- hero-bg.jpg compressed 1.7MB → 146KB
- Google Fonts async on landing pages
- FAQPage schema verified on Round Rock + Cedar Park (Rich Results Test passed)
- /mortgage-pre-approval-austin confirmed exists

## 2026-03-20 — GTM + GA4 + conversion tracking rollout

- GTM-PQQ6PGLR installed on all 54 public pages
- GA4 (G-DDY0H0319S) firing via GTM
- Conversion events verified: generate_lead, thank_you_page_view, phone_click
- /get-preapproved, /refinance-quote, /thank-you pages live
- Homepage final CTA linked to /get-preapproved
- DSCR page: calculators link added, CTA fixed
- Refinance page: "Get a Refi Quote" button added
- Blog manifest: ai-trap post added

## 2026-03-19 — Lead capture pages + initial tracking

- /get-preapproved and /refinance-quote pages built and verified
- /thank-you page with thank_you_page_view event
- phone_click global handler wired in script.js

## 2026-04-12 (run 2) — AEO answer-first paragraphs: 5 suburb pages

- `kyle-mortgage-lender.html` — Added AEO answer-first section (new dedicated section before WHY KYLE)
- `leander-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `pflugerville-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `georgetown-mortgage-lender.html` — Added AEO answer-first paragraph before H2 in intro section
- `austin-area-mortgage-lender.html` — Added AEO answer-first paragraph before intro paragraph
- `sitemap.xml` — Updated lastmod to 2026-04-12 for all 5 changed pages
- Commit 32c2ae3 — all 5 pages verified 200 ✅

## 2026-04-21 — Pre-approval AEO + Refinance Texas cash-out FAQ (daily-opt)

- `mortgage-pre-approval-austin.html` — added 53-word AEO answer-first paragraph before first H2 with same-day pre-approval hook; dateModified 2026-04-21
- `loans/refinance.html` — added "How does a Texas cash-out refinance work in 2026?" to FAQ accordion + FAQPage schema (6 questions total); dateModified 2026-04-21
- `sitemap.xml` — lastmod updated to 2026-04-21 for both pages
- Blog title lint: CLEAN; self-review: PASS

## 2026-04-23 — Pflugerville suburb editor (daily-opt, queue #5)

- `pflugerville-mortgage-lender.html` — Blackhawk neighborhood spotlight (78660, GFO/Chesmar/Coventry builders, $465K+ new construction, sourced Homes.com); school ratings H3 (Hendrickson HS 8/10, Pflugerville HS 6/10, GreatSchools linked); employer list H3 (Amazon 1,000 jobs PCDC cited, Costco, Baylor Scott & White, Samsung Taylor via US-130); closing cost breakdown at $355K median (Travis County recording ~$150, PISD $1.1069/$100 cited, ~2.0–2.1% combined rate); updated median price to $355K Mar 2026 (Redfin, cited in intro + market context + FAQ); removed "Down Payment Assistance" loan card (verbatim match Georgetown + Smithville — confirmed via grep); fixed USDA from LocalBusiness schema description; added WebPage schema + dateModified 2026-04-23
