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

2026-04-25 PM (daily-opt) — Rate-shopper AEO continued: what-delays-closing-when-you-switch-lenders + how-to-read-a-loan-estimate. Both posts had the predicted `blog-post-intro` inside `<header>` anti-pattern. Added `<p><strong>` body answer paragraphs (56w + 66w) after `</header>` with distinct wording from intros. Converted one statement H2 per post → question form ("How Does a Broker Speed Up the Process?", "What Should You Do After You Read Your Loan Estimate?"). dateModified + sitemap lastmod bumped. **8/10 rate-shopper posts now AEO-clean.** NotebookLM Step 0 confirmed dead 4th consecutive run — Sunday's run will draft the SKILL.md retirement patch if not restored. Live verify: both URLs 200, body answer + question H2 + sitemap lastmod confirmed live. Commit de08af6 (rebased atop suburb-deepener Phase 1c flag commit).

2026-04-25 (styer-suburb-editor-daily) — Hutto page deepened: removed templated paragraph; removed USDA from LocalBusiness schema; refreshed median to $340K Feb 2026; 3 neighborhood spotlights; tax breakdown + employer list. Queue: Hutto ✅ → Next: Liberty Hill.

2026-04-25 AM (daily-opt) — Footer Awards sitewide standardization: 56 of 57 files standardized to `★ 5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas`. Two indent variants, two regex passes. about.html intentionally excluded (timeline-date span = different element type). Rate-shopper AEO: how-many-mortgage-quotes + local-lender-vs-online both fixed (6/10). NotebookLM Step 0 confirmed dead 3rd run.

2026-04-24 (styer-suburb-editor-daily) — Buda page deepened: USDA removed from 7 locations (schema/FAQ/tile/stat/process/CTA); 3 neighborhood spotlights added (Garlic Creek/Sunfield/Ruby Ranch, all 78610); Jack C. Hays HS 6/10 GreatSchools; employer list (US Foods, Deep Eddy/Heaven Hill, Cabela's, incoming H-E-B); closing cost breakdown at $370K with real HCISD+city tax rates (Community Impact sourced); median price updated $382K Feb 2026; rate-check-buda-kyle.html linked; WebPage schema added. Queue: Buda ✅ → Next: Hutto.

2026-04-24 (weekly-blog-editor) — DPA post refreshed: title/meta rewritten for Austin CTR (361 impressions, 0 clicks). USDA removed from TDHCA section. "broker" corrected to correspondent lender. Travis County income limit ($167,250, TSAHC cite) added. Austin median price ($450K, ACTRIS April 2026) added. dateModified bumped. Pushed to Netlify.

2026-04-24 PM (daily-opt) — apr-vs-interest-rate + are-mortgage-lender-fees-negotiable AEO-cleaned (4/10 rate-shopper posts). Statement-form H2 on fees-negotiable → question. NEW FINDING (resolved 2026-04-25): stale `91 Google + 45 Zillow` footer on 28 blog + 29 root pages.

2026-04-24 AM (daily-opt) — AEO body paragraphs added to can-i-switch + how-to-compare. about.html body CTAs → /get-preapproved.

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
| how-to-buy-a-house-in-austin-tx.html loan table includes USDA (`<a href="/loans/usda.html">USDA</a>`) — Adam does NOT do USDA. Needs removal. | HIGH |
| Smithville (26 hits), Elgin (24), Florence (17), Jarrell (16): body/schema/FAQ USDA — same review as Buda (now done). | HIGH |
| Liberty Hill (10 hits): USDA in LocalBusiness schema description + FAQ + pre-approval process text. | HIGH |
| about.html timeline-date span still has "91 Google + 45 Zillow Reviews" — different element from footer Awards, intentionally excluded from 2026-04-25 batch. Adam decision: update or leave as historical milestone. | MEDIUM |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| NotebookLM script path broken — notebook_advisor.py does NOT exist anywhere on disk; Step 0 must be retired or script restored | HIGH |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **AEO sweep — 2 rate-shopper posts remain** — what-to-compare-besides-mortgage-rate, is-the-lowest-rate-the-cheapest-loan. Same `blog-post-intro`-in-`<header>` anti-pattern; same fix. Sunday's run finishes the series.
2. **USDA cleanup (remaining)** — Smithville, Elgin, Florence, Jarrell body/schema/FAQ + Liberty Hill schema + how-to-buy loan table. Buda ✅ done 2026-04-24, Hutto schema ✅ done 2026-04-25. Voice guide confirms Adam does NOT do USDA — safe to remove from remaining pages.
3. **Retire NotebookLM Step 0** — notebook_advisor.py confirmed NOT on disk anywhere (3rd run confirming). Adam must either restore it or Sunday's run will propose a SKILL.md edit removing Step 0.
4. **about.html timeline-date** — Adam decision: update span to "136+ Google + Zillow Reviews" or leave as historical milestone (Pattern B = different element from footer Awards).
5. **Round Rock #2 → #1** — Add Teravista/Forest Creek/Old Town Round Rock neighborhoods + Round Rock ISD + "beat builder rates" line.
5. ~~Footer Awards standardized across all suburb pages~~ ✅ DONE 2026-04-23 — all 15 remaining pages fixed
6. ~~how-to-buy pillar page suburb links~~ ✅ DONE 2026-04-23 — all 24 suburb pages linked
7. ~~Liberty Hill page unique content~~ ✅ DONE 2026-04-22b
8. ~~Audit /mortgage-broker-vs-bank.html~~ ✅ DONE 2026-04-22
9. ~~Pre-approval AEO~~ ✅ DONE 2026-04-21
10. ~~Refinance FAQ schema~~ ✅ DONE 2026-04-21

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
