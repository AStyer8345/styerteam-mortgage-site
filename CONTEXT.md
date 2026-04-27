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
| thank-you.html uncommitted change in working tree — `ty-alt-paths` reveal logic for refi/preapproval thank-you-types. Not from any current scheduled task. Adam decision: commit or revert. | MEDIUM |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| Monday 2026-04-27 — verify GSC sitemap.xml shows "Success" + discovered pages > 0 | LOW |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **Apply NotebookLM SKILL.md retirement patch** — concrete unified-style diff in 2026-04-26 AM run-log FLAG_FOR_ADAM. One-shot edit. 6th-run escalation.
2. **Monday 2026-04-27 — GSC sitemap status verification** — Step 1 weekly cadence.
3. **USDA cleanup (remaining)** — Smithville, Elgin, Florence, Jarrell body/schema/FAQ + how-to-buy loan table. Liberty Hill done.
4. **about.html timeline-date** + **thank-you.html alt-paths** — both Adam decisions.
5. **Next AEO target cluster — older `<header>` template, ~16 dated posts**: cash-out + fha-vs-conv → va + ftb-programs → dscr + how-to-choose-lender → self-employed + next loose thread. 2 posts per AM run, paired by topic. Audit method needs upgrade: find first body `<p>` after `<h1>` in `<article>`/`<main>`, check for `<strong>` answer-first.
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
