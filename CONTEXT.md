# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 70+ public pages live (homepage, 8 loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, 12+ resource/guide pages, blog, calculators, realtor hub).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

2026-05-02 (styer-suburb-editor-daily) — **Round 2 begins. Round Rock deepened (Round 2 slot 1/13).** Median refreshed $388K Feb → **$367,500 Mar 2026 Redfin (-7.1% YoY)**; $191/sqft (-5.2%). LocalBusiness schema description rewritten with 78664/78665/78681 + 7 named neighborhoods + tax stack (RRISD $0.8931 + City $0.372 + WilCo $0.413776). FAQ schema "average" → "median" w/ Forest Creek $500K + Brushy Creek $578.5K integrated. WebPage dateModified bumped 04-29 → 05-02. **VA tile re-targeted** off Fort Cavazos overreach (Kyle analysis flag, 90+ min drive) → RRISD-relocating-military-families angle. **Loan tile #4 swapped DPA → Jumbo** (de-duplicates verbatim DPA tile copy with Kyle/Taylor). **3 new H3 sections (~50 lines):** Forest Creek 78664 spotlight (8 builders + 1,200 homes + $500K Mar 2026 Redfin median + Forest Creek Elementary); Brushy Creek + Sendero Springs 78681 combined spotlight (Brushy Creek $578.5K 12-mo median + Coventry/MileStone $800K-$1M+; Sendero Springs 632 homes + 42-acre greenbelt + Standard Pacific/Streetman); Major Employers (Dell global HQ + Emerson 1100 W. Louis Henna semiconductor software + TECO-Westinghouse 1,000+ + Amazon 149-acre 2025 + 60K+ STEM jobs ~7% annual growth); Property Tax & Closing Costs (cited tax stack + $367.5K closing-cost breakdown w/ 6 line items). At-a-glance updated w/ full tax stack + first internal link to `/rate-check-round-rock.html` (Kyle analysis flag). FAQ accordion home-price + loan-programs answers synced w/ new schema. All 4 JSON-LD blocks validated clean. Sitemap lastmod bumped. 14 inline source URLs. Next queue slot: Georgetown (Round 2 slot 2).

2026-05-02 (daily-opt) — **Saturday: Sitemap + Re-Verify Only.** SKILL.md defines no Saturday rotation; per yesterday's PM plan, Saturday = sitemap health + Re-Verify Gate. Sitemap 200 ✅. Gate run on 9 live claims: 5 STILL OK (2026-04-27 post canonical CTA + footer + HTTP 200 + single sitemap entry, homepage schema stack), 4 STILL OPEN (about.html address mismatch 9th run, how-to-buy USDA loan-table 6 live mentions, /loans/usda standalone 200, NotebookLM script 16th run dead). **Caught a near-false-positive auto-resolve on the how-to-buy USDA blocker:** initial `grep '/loans/usda.html'` against live HTML returned 0 because Netlify pretty-URL config strips `.html` from served links — widening to case-insensitive `usda` revealed 6 mentions still live. Lesson logged in learnings.md. No HTML/schema/sitemap mutations.

2026-05-01 PM (daily-opt) — **PM bookkeeping + Re-Verify Gate.** Re-verify gate confirmed AM commit e0a1d9f propagated to live: 2026-04-27 post canonical `/get-preapproved` CTA + canonical `136+ Reviews` footer. FHA blog refresh from commit 89b9de3 also verified live. NotebookLM dead 15th run. about.html address mismatch 8th run open.

2026-05-01 (styer-suburb-editor-daily) — **Westlake Hills page deepened — Round 1 closeout 13/13.** Final slot in priority queue. Median refreshed $1.2M+ → $1.6M Mar 2026 Redfin (+40.9% YoY). LocalBusiness schema description rewritten with 78746 + Rob Roy / Davenport Ranch / Lost Creek / Barton Creek + Eanes ISD $0.8322 + WLH $0.176783. FAQ schema home-prices Q renamed + tiered ranges (Davenport/Lost Creek $1.5M–$3M, Rob Roy/Barton Creek $4.5M–$15M+); body `(2025 conforming limit)` corrected to `(2026 FHFA conforming limit, all Texas counties)`. WebPage schema + dateModified 2026-05-01 added; all 4 JSON-LD blocks validated clean. **De-duped Portfolio loan card** (was verbatim w/ Spicewood). **4 new H3 sections (~75 lines):** Neighborhoods (Rob Roy 6 subdivisions / Davenport Ranch + Austin Country Club / Lost Creek 1,200 homes / Barton Creek 16 sub-neighborhoods + 8212 Barton Club Dr 78735), Schools (Westlake HS 9/10 + Hill Country MS 10/10 + Eanes Elementary 10/10, all GreatSchools cited; 5 elementary feeders disclosed), Major Employers (Eanes ISD ~7,700 students/9 schools + 3 country clubs + HEB Westlake; honest bedroom-community disclosure + Data USA), Property Tax & Closing Costs (Eanes ISD $0.8322 Community Impact + WLH $0.176783 city Notice + Travis County 1.65% Ownwell; closing-cost example at $1.6M/20% down: $20K–$28K itemized + 6–12mo PITI reserve callout for jumbo). **Footer standardized** — Westlake was the LAST suburb still on legacy `Top Producing Broker — Austin 2023 / 5-Star Zillow Reviews` block; replaced with canonical 136+ Reviews / 21-Day Close + 5718 Sam Houston Circle NAP + NMLS Consumer Access link. Script tag normalized `script.js` → `/script.js defer`. 18 inline source URLs. Sitemap lastmod bumped. **Round 1 complete (13/13). Round 2 begins next run at slot 1: Round Rock.**

2026-05-01 (daily-opt) — **Friday rotation: Content Planning + AEO Review.** Latest blog post 2026-04-27 (4 days ago, under 7-day flag). **CTA audit caught real conversion-funnel breakage:** `2026-04-27-why-home-prices-arent-crashing.html` was the only post of 21 dated 2026-* with **0 links** to `/get-preapproved` or `/refinance-quote` — its bottom CTA used legacy `../prequal.html` + `../contact.html` instead of the canonical `../get-preapproved` extensionless path used by 20 of 21 posts. Fixed: CTA href `../prequal.html` → `../get-preapproved` + button label "Get Pre-Qualified" → "Get Pre-Approved". **Also caught footer drift:** post was published 2 days after the 2026-04-25 footer Awards sweep (88/88), so it imported the legacy `91 Google + 45 Zillow Reviews` 2-line block. Standardized to canonical `136+ Reviews | 21-Day Avg. Close | Licensed in Texas`. Footer Awards consistency 88/88 → **89/89**. Blog CTA conversion-funnel coverage 20/21 → **21/21**. JSON-LD `dateModified` + sitemap `lastmod` bumped 2026-04-27 → 2026-05-01. AEO 2-post spot-check: `2026-04-17-should-i-refinance` PASS (6 question-form H2s + body `<p><strong>` + multiple CTAs); `2026-04-27-why-home-prices` voice-first essay format, no FAQ, H3-only sectioning — explicitly deferred per voice guide pending Adam structural decision (2nd recurrence). NotebookLM Step 0 dead 14th run.

2026-04-30 PM (daily-opt) — **PM run = bookkeeping + cluster correction.** AM run was thorough; PM run did not redo rotation. Re-verify gate auto-resolved 2 stale claims: (a) Friday TOMORROW_PRIORITY pair (DSCR + how-to-choose-lender) — both already shipped with leading `<p><strong>` from prior sessions (DSCR 2026-04-28; lender pre-cluster); (b) older-template AEO denominator — corrected from "9/16, 7 remaining" to **11/16 OK, 5 remaining**. Of the 5 remaining: 4 are explicitly deferred per voice-guide reasoning (rate-volatility/life-devotional cluster: oil-prices, surrender-it stolen-car, ai-trap, why-rates-improved-bond-rally), 1 is a structural judgment call (why-home-prices-arent-crashing has duplicate `<h2>` sub-title + meta-date `<p>` between author-bar and first content — AEO insertion would compete visually). Older-template AEO sweep is **effectively complete** pending Adam decision on why-home-prices structural insertion. NotebookLM Step 0 dead 13th run. about.html LocalBusiness address mismatch 6th run open. No HTML/code changes — bookkeeping commit only.

2026-04-30 (styer-suburb-editor-daily) — **Dripping Springs page deepened (Round 1 slot 12/13).** Median refreshed to $542,500 Mar 2026 Redfin (+4.7% YoY) replacing $500K-$900K range; LocalBusiness schema description rewritten w/ 78620 + named neighborhoods + DSISD tax rate; FAQ "average home price" → "median home price" w/ Redfin cite; FAQ "Hill Country land/acreage" Q swapped → "property tax rate" Q (DSISD $1.1052 + City $0.2267 + Hays effective 1.71% Ownwell, $9,275/yr example). Removed templated "A big bank will give you one product" para (verbatim w/ 5 other suburb pages). Removed USDA from VA loan tile (Adam doesn't originate USDA) — replaced w/ VA + well/septic requirements citing VA Circular 26-24-05. Body neighborhood spotlights w/ builders + 78620: Headwaters (David Weekley + Toll Brothers $500s-$1.5M+), Caliterra (Drees + David Weekley + Scott Felder $700K-$1.2M+ Onion Creek corridor), Reunion Ranch (acreage $1M+), Arrowhead Ranch (Fitzhugh Rd, 1+ acre); Belterra zip 78737 disclosure. Schools H3 — DSHS 7/10, DSMS 8/10, Sycamore Springs Middle 8/10, Sycamore Springs Elem 8/10, Walnut Springs Elem 6/10 (all GreatSchools linked). Major Employers H3 — DSISD ~1,100, Dripping Springs Distilling (19 states), Treaty Oak, Desert Door (only US sotol), H-E-B/US-290 corridor. Property Tax + Closing Costs H3 — $11K-$14K at $542K/20% down + $18K-$22K jumbo at $900K/10% down. Hill Country Construction H3 — Hays County OSSF septic permit + well/septic potability/distance callout. Internal link added to /rate-check.html. WebPage schema + dateModified 2026-04-30. All 4 JSON-LD blocks validated clean. Sitemap lastmod bumped. Next queue slot: Westlake (final Round 1 slot).

2026-04-30 (daily-opt) — **Thursday rotation: Internal Linking + Funnel Flow.** 3-page audit PASSED — DSCR (28+ links), Round Rock (30+ links), calculator-affordability (17+ links) all well above 2+ relevant threshold. contact.html form wiring verified clean (both forms netlify+honeypot+form-name+dataLayer generate_lead). thank-you.html audit verified clean (noindex, tel:, Calendly @ adamstyer/15minutes, 3-step what-happens-next, thank_you_page_view dataLayer). **TOMORROW_PRIORITY #5 closed:** added `<p><strong>` answer-first paragraph to 2026-03-28-how-long-does-mortgage-pre-approval-take.html (~67w, file-type breakdown distinct from existing range-based P1; W-2 same-day / self-employed same-day or next-day / missing docs or credit events three days; uses post's own framing). AEO older-template cluster 8/16 → 9/16. **Step 4B picked up:** calculator-affordability.html `/get-preapproved.html` → `/get-preapproved` normalization (matches site-wide pattern; Adam-decision-blocked items in backlog skipped). Sitemap lastmod bumped on both pages. Commit 5782c7d; live verified via curl + grep. NotebookLM Step 0 dead 12th run.

2026-04-27 (styer-suburb-editor-daily) — **Manor page deepened (Round 1 slot 9/13).** Removed all Manor-specific USDA copy from LocalBusiness schema description + FAQ schema Q + accordion + body line; swapped USDA FAQ → property-tax Q citing Manor ISD $1.0814/$100 (Prop A Nov 2024) + Ownwell 2.27% effective. Removed templated "As an independent broker / Adam works for you" paragraph (verbatim 4-page match) + templated DPA grants paragraph. Loan tile #4 rewritten as Manor-specific TSAHC/TDHCA tile. 4 verified neighborhood spotlights w/ builders+78653 zip: ShadowGlen (Terrata/Perry/Meritage/LGI top tier $499K-$555K), Whisper Valley (Pacesetter+Avi geothermal+solar Taurus), Carillon (D.R. Horton $299K-$417K 13407 Eppright Trace), Presidential Meadows (KB Home sold-out, PM Elementary 13252 George Bush St). Honest school disclosure: Manor HS 2/10 GreatSchools cited inline. Major Employers H3: Tesla 22,777+ workers ~15min SH-130 (Electrek), Plastic Omnium 350K-sqft Tesla supplier 800 jobs (Connect CRE), Samsung Taylor, MISD. Median refreshed to $355K Nov 2025 +6.6% YoY (Redfin). Closing cost breakdown at $355K w/ 5% down: $7,500-$9,500 itemized (title/lender/recording/prepaids/3-4 mo tax escrow at 2.27%). Added WebPage schema + dateModified 2026-04-27. Meta description rewritten. All 4 JSON-LD blocks validated clean. Next queue slot: Lakeway.

2026-04-27 PM (daily-opt) — **Older-template AEO cluster: 4/16 closed (next pair done).** Added body `<p><strong>` answer paragraphs to 2026-03-29-va-loan-eligibility-texas (79w, benefit/economics angle: zero down + no PMI + capped closing costs + $150–300/mo savings + 10%-disability Funding Fee waiver) + 2026-03-30-first-time-home-buyer-programs-austin-tx-2026 (81w, four-program stack inventory: TSAHC 3–5%, TDHCA 5% deferred, MCC $2,000/yr, Austin American Dream 10%/<80% AMI + Texas 3-year first-time rule). VA used `newsletter-author-bar` insertion pattern (after `</div>`, before existing first `<p>`). FTB used new `blog-article-body` insertion pattern (after `<div class="blog-article-body">`, before existing first `<p>`) — added to learnings.md. Both posts: distinct angle from existing first paragraph; numbers sourced from post body only. Sitemap lastmod + dateModified bumped on both. Commit 998c920; live in 75s; verified via curl. NotebookLM Step 0 dead 8th run. Next pair: DSCR + how-to-choose-lender.

2026-04-27 AM (daily-opt) — **Older `<header>`-template AEO cluster started: 2/16 closed.** Added body `<p><strong>` answer paragraphs to 2026-03-24-cash-out-refinance-austin-tx (69w, "three things line up" frame using post's own numbers) + 2026-03-28-fha-vs-conventional-loan-austin-tx (79w, decision-frame + MIP-vs-PMI life-of-loan distinction). Wrote second audit script (find first `<p>` after `<h1>` in `<article>` body, check leading `<strong>` and 40-80w body). Confirmed 14 older-template posts remaining. Insertion point pattern: after `</div>` of newsletter-author-bar, before first content `<p>`. Distinct angle from existing first paragraph required to avoid duplication. Schema audit: homepage MortgageBroker + Person ✅, DSCR FAQPage ✅, Hutto full stack ✅, about.html Person matches homepage. **NEW FINDING:** about.html LocalBusiness address (5900 Balcones Drive, Suite 100) ≠ homepage MortgageBroker address (5718 Sam Houston Circle) — Adam decision needed on canonical address. Commit 984d1b0; live in 75s. NotebookLM Step 0 dead 7th run.

2026-04-27 (styer-competitive-weekly) — **Week 8 competitive intel: SERP-wide snapback. styermortgage.com 2 → 1 keywords in top 10.** Hutto demoted #1 → #2 (Big Life reclaimed without content updates — algorithmic, not regression). Round Rock #2 → not found (sandbox bounce on newly-deepened page). Bee Cave still not indexed (24 days — overdue manual GSC). Last week's headline new threats both vanished: Nest Mortgaging (was 6+ keywords) and AsertaLoans (was new #1 cash-out) — content-velocity-without-authority is brittle. Old incumbents re-emerged: AustinHomeLoans.com #1 home loan (40-year tenure moat, 245+ reviews, 2,000+ closed), Vista #5 lender, Highlander #2 broker, Sente #10 home loan. Joel Richardson/FCM new #1 cash-out refi. CrossCountry has 2 Cedar Park branches (structural ceiling). Lone Star locked #1 Round Rock + #1 Lakeway (suburb leader). Re-Verify Gate caught record 9 prior claims. NotebookLM Step 0 dead 6th run — cached-learnings fallback working. Reports written to run-logs/competitive/2026-04-27.md + latest.md + master Styer_Growth_Log; both notebooks refreshed.

2026-04-26 PM (daily-opt) — **`blog-post-header` template AEO cluster 14/14 COMPLETE.** Closed last gap: 2026-04-17-should-i-refinance-austin-tx-2026 — body `<p><strong>` (56w) added after `</header>` with distinct angle from intro (intro: 3 conditions / body: run-the-formula + Austin median tenure ~6 yrs + 30/48-month examples). All 6 H2s already in question form. dateModified + sitemap lastmod bumped to 2026-04-26. Commit 0c60b27 → live within 75s. NotebookLM Step 0 dead 6th run — diff still pending Adam's apply. AEO loose-thread audit identified next cluster: ~16 older-template dated 2026-* posts that need a different audit method (find first `<p>` after `<h1>` in `<article>`/`<main>` body). Proposed cadence: 2 posts/AM run paired by topic (cash-out+fha-vs-conv → va+ftb → dscr+how-to-choose → self-employed+next).

2026-04-26 AM (daily-opt) — Rate-shopper AEO series 10/10 COMPLETE. Final 2 posts: what-to-compare-besides-mortgage-rate (60w) + is-the-lowest-rate-the-cheapest-loan (64w). Two statement→question H2 conversions. Commit 23d00c7. NotebookLM 5th-run concrete diff drafted.

2026-04-25 PM (daily-opt) — Rate-shopper AEO 8/10: what-delays-closing + how-to-read-a-loan-estimate (56w + 66w). Commit de08af6.

2026-04-25 (styer-suburb-editor-daily) — Hutto page deepened: USDA removed; median $340K; 3 neighborhood spotlights; tax breakdown + employers.

2026-04-25 AM (daily-opt) — Footer Awards sitewide standardization (56 files; about.html timeline-date surfaced as separate Adam-decision). Rate-shopper AEO 6/10.

2026-04-24 (styer-suburb-editor-daily) — Buda page deepened.

2026-04-24 PM (daily-opt) — apr-vs-interest-rate + are-mortgage-lender-fees-negotiable AEO-cleaned (4/10).

## Rate Check Page Inventory

| Page | File | Source Field |
|------|------|-------------|
| Hub (Austin) | `rate-check.html` | (none — original) |
| Round Rock + Pflugerville | `rate-check-round-rock.html` | `rate-check-round-rock` |
| Cedar Park + Leander | `rate-check-cedar-park.html` | `rate-check-cedar-park` |
| Georgetown + Hutto | `rate-check-georgetown.html` | `rate-check-georgetown` |
| Buda + Kyle + San Marcos | `rate-check-buda-kyle.html` | `rate-check-buda-kyle` |
| New Braunfels | `rate-check-new-braunfels.html` | `rate-check-new-braunfels` |

## Rate Shopper Blog Posts

| Post | File |
|------|------|
| Can I Switch Lenders After Going Under Contract? | `blog/can-i-switch-lenders-after-going-under-contract-texas.html` |
| How to Compare Two Mortgage Offers | `blog/how-to-compare-two-mortgage-offers.html` |
| APR vs Interest Rate | `blog/apr-vs-interest-rate-what-actually-matters.html` |
| Are Lender Fees Negotiable? | `blog/are-mortgage-lender-fees-negotiable.html` |
| How Many Quotes Should I Get? | `blog/how-many-mortgage-quotes-should-i-get.html` |
| Local vs Online Lender | `blog/local-lender-vs-online-lender-austin-central-texas.html` |
| What Delays Closing When Switching? | `blog/what-delays-closing-when-you-switch-lenders.html` |
| How to Read a Loan Estimate | `blog/how-to-read-a-loan-estimate.html` |
| What to Compare Besides Rate | `blog/what-to-compare-besides-mortgage-rate.html` |
| Is the Lowest Rate the Cheapest? | `blog/is-the-lowest-rate-the-cheapest-loan.html` |

## Active Blockers

| Issue | Priority |
|-------|----------|
| NotebookLM Step 0 broken — concrete unified-diff SKILL.md retirement patch ready in 2026-04-26 AM run log FLAG_FOR_ADAM. One-shot edit. 6th-run escalation. | HIGH (ESCALATED) |
| how-to-buy-a-house-in-austin-tx.html loan table includes USDA (`<a href="/loans/usda.html">USDA</a>`) — Adam does NOT do USDA. Needs removal. | HIGH |
| Smithville (26 hits), Elgin (24), Florence (17), Jarrell (16): body/schema/FAQ USDA — same review as Buda (now done). Liberty Hill done 2026-04-26 (commit cbddcc0, separate session). | HIGH |
| GSC URL Inspection sweep overdue — Hutto (recapture #1), Round Rock (recover from sandbox bounce), Bee Cave (24 days, never indexed), Lakeway (verify) | HIGH |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| about.html timeline-date span still has "91 Google + 45 Zillow Reviews" — different element from footer Awards. Adam decision: update or leave as historical milestone. | MEDIUM |
| Site-wide nav USDA dropdown — header + footer "Loan Programs" dropdown on every page links to `/loans/usda.html`. Adam doesn't originate USDA. Single decision unblocks ~88-page nav cleanup + decision on the standalone `/loans/usda.html` page (keep / 301 / delete). | HIGH |
| about.html LocalBusiness address (5900 Balcones Drive, Suite 100) ≠ homepage MortgageBroker address (5718 Sam Houston Circle). Both 78731. Adam decision: which is canonical? Then normalize. (9th run) | MEDIUM |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **Apply NotebookLM SKILL.md retirement patch** — concrete unified-style diff in 2026-04-26 AM run-log FLAG_FOR_ADAM. One-shot edit. 12th-run escalation.
2. **Adam decision on site-wide USDA cascade** — single decision unblocks (a) header + footer nav cleanup ~88 pages, (b) standalone `/loans/usda.html` page (keep/301/delete), (c) Smithville/Elgin/Florence/Jarrell body/schema/FAQ, (d) how-to-buy-a-house loan table. Round Rock body already cleaned; sets the pattern.
3. **Adam decision on canonical business address** — about.html LocalBusiness vs homepage MortgageBroker schema mismatch (9th run).
4. **Monday 2026-05-04 — Schema + Google Ads Quality + AEO Entity Audit rotation.** Rich Results Test on homepage AggregateRating, DSCR FAQPage, one suburb (rotate to Bee Cave or Lakeway given GSC overdue list). Person + LocalBusiness schema consistency check (homepage vs about.html). PageSpeed manual re-check. GSC URL Inspection sweep. about.html LocalBusiness address 8th-run carry forward.
5. **Older-template AEO cluster — 11/16 OK; 5 remaining; effectively complete.** Of the 5 remaining: 4 are deferred per voice-guide (rate-volatility/life-devotional: oil-prices, surrender-it, ai-trap, why-rates-improved-bond-rally — adding answer-first paragraphs would dilute voice for marginal AEO gain), 1 needs Adam's structural decision (why-home-prices-arent-crashing — duplicate sub-title + meta-date between author-bar and first content). No mechanical insertions left.
6. **Hutto recapture + Round Rock GSC URL Inspection** — both newly-deepened pages need re-indexing nudge.
7. **Refinance page upgrade vs Joel Richardson/FCM** — New #1 for cash-out refi. Audit `/loans/refinance.html` for FAQPage schema with cash-out specifics + Texas 80% LTV + 12-month wait + break-even math.

## Known Issues

- GTM (GTM-PQQ6PGLR) + GA4 (G-DDY0H0319S) installed on all public pages
- All conversion tracking verified: generate_lead, thank_you_page_view, phone_click, calendly_click
- Georgetown page added USDA to loan type dropdown (other city pages match original rate-check form)
- Georgetown page uses card grid layout for "Why" section (other city pages use paragraph format)

## Session Protocol

Read /Users/adamstyer/Documents/GOALS.md first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Never append. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
