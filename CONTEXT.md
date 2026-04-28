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

2026-04-28 (daily-opt) — **Tuesday rotation: 10 meta descriptions rewritten + DSCR AEO closed.** Rewrote 10 under-spec/over-cap meta descriptions on key indexed pages to 150-160 char target with location + service/loan-type + CTA: calculator-affordability (119→157), rate-alert (124→150), how-to-buy-a-house (127→154), about (131→159), first-time-home-buyer (132→160, USDA removed for voice-guide compliance), calculator-payment (135→156), rate-check (135→152), calculators (137→155), fixed-vs-adjustable (139→150), manor-mortgage-lender (173→159, trim under cap). Aligns with GOALS.md "high impressions, low CTR" priority. Older-template AEO cluster: added body `<p><strong>` answer to DSCR (66w, mechanics/qualification math angle — DSCR formula, 1.0/1.25 thresholds, 680/740 credit, 20-25% down, no W-2/no tax returns, LLC title); re-verify gate auto-resolved how-to-choose-lender (already AEO-compliant at line 190). Cluster now 6/16 closed, 10 remaining. dateModified + sitemap lastmod bumped on all changed files (added missing `<lastmod>` to calc-affordability + calc-payment). NEW finding: rate-alert.html missing from sitemap (LOW). Re-verifies: thank-you.html still uncommitted (4th run — escalated to HIGH); about.html LocalBusiness mismatch unchanged (2nd run). NotebookLM Step 0 dead 9th run. Commit 6db2ebe; live ~0s after push; all 12 URLs HTTP 200 verified.

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
| thank-you.html uncommitted change in working tree — `ty-alt-paths` reveal logic for refi/preapproval thank-you-types. 4th-run escalation; left in limbo blocks any thank-you page work and risks accidental commit/revert. Adam decision: commit or revert. | HIGH (ESCALATED) |
| about.html LocalBusiness address (5900 Balcones Drive, Suite 100) ≠ homepage MortgageBroker address (5718 Sam Houston Circle). Both 78731. Adam decision: which is canonical? Then normalize. | MEDIUM |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| Monday 2026-04-27 — verify GSC sitemap.xml shows "Success" + discovered pages > 0 | LOW |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |
| rate-alert.html missing from sitemap.xml — public indexable page with full meta + canonical not listed. Add next run after verifying not noindex. | LOW |

## What's Next

1. **Apply NotebookLM SKILL.md retirement patch** — concrete unified-style diff in 2026-04-26 AM run-log FLAG_FOR_ADAM. One-shot edit. 6th-run escalation.
2. **Monday 2026-04-27 — GSC sitemap status verification** — Step 1 weekly cadence.
3. **USDA cleanup (remaining)** — Smithville, Elgin, Florence, Jarrell body/schema/FAQ + how-to-buy loan table. Liberty Hill done.
4. **about.html timeline-date** + **thank-you.html alt-paths** — both Adam decisions.
5. **Older-template AEO cluster — 6/16 closed; 10 remaining.** Pair cadence: ~~cash-out + fha-vs-conv~~ ✅ → ~~va + ftb-programs~~ ✅ → ~~dscr + how-to-choose-lender~~ ✅ (lender already AEO-compliant; auto-resolved) → self-employed + DPA (next) → how-long-pre-approval + market-report → rate-volatility / life-devotional posts (separate pass at end).
6. **Round Rock recovery** — Was #2 last week, dropped from top 10 (sandbox bounce). Submit GSC URL Inspection; don't over-rewrite. Add Teravista/Forest Creek/Old Town RR + Round Rock ISD only if not already present.
7. **Hutto recapture** — Demoted #1 → #2 by Big Life with no content updates on their side. Schema (136 reviews) + neighborhood content still superior. GSC re-indexing is the highest-leverage move.
8. **Refinance page upgrade vs Joel Richardson/FCM** — New #1 for cash-out refi. Audit `/loans/refinance.html` for FAQPage schema with cash-out specifics + Texas 80% LTV + 12-month wait + break-even math.
7. ~~`blog-post-header` template AEO cluster~~ ✅ **COMPLETE 2026-04-26 PM — 14/14 posts (10 rate-shopper + 4 dated)**
8. ~~Rate-shopper AEO series~~ ✅ DONE 2026-04-26 — 10/10
9. ~~Footer Awards sitewide~~ ✅ DONE 2026-04-25 — 56 of 57 files

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
