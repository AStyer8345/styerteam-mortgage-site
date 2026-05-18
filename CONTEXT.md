# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster as of 2026-05-05).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-05-18 AM (Monday — styer-site-daily rotation, Phase A residual sweep):** Monday rotation fire restored (scheduler-anomaly 4-day streak appears ended). Sitemap 200 ✅, conversion 10/10 ✅, GTM single-container hex-verified, AEO entity coverage clean on homepage + about. Retired residual "Close in 21 Days" H3 performance claim on 6 suburb pages (smithville, marble-falls, elgin, jarrell, florence, buda) that Adam's Sunday EVENING trust-bar sweep missed — replaced with "Coordinated Close" matching existing body copy ("I manage the timeline proactively"). Commit `a317f1b` deployed, all 6 URLs live-verified HTTP 200. Two carries auto-resolved this run: (1) style.css working-tree change (23 prior runs) — now clean tree, (2) homepage AggregateRating + 136+ Reviews badge — confirmed removed at schema level by Adam's Sunday sweep. PSI quota STILL drained on Monday refresh — 10-of-10 consecutive (carry now reframed as "Monday refresh does NOT restore quota"). NotebookLM 42nd consecutive dead run.

**2026-05-17 EVENING (Sunday — repositioning sweep + 21-day claim retired):** Sitewide "21-Day Avg. Close" → "1,000+ Loans Closed" across ~95 files (trust badges, footers, trust chips, inline spans, list items). Homepage schema/FAQ 21-day claim removed. AggregateRating + 136+ Reviews badge removed from homepage schema. GOALS.md fully rewritten — LoanOS/Client Ops/portfolio paused, loan-officer pipeline first. 2026-05-17_compliance-audit delivered with 21-finding pre-audit review.

**2026-05-17 DAYTIME (Sunday — private-wealth / non-QM expansion):** 6 new niche pages added in repo root. Homepage schema, FAQ, nav reordered to lead with pillar. Fact-check verdict GREEN after fabricated testimonials deleted. `FLAG_FOR_ADAM.md` written to repo root with 11 hedged-claim items.

**Surfaced for Adam:** `/investor-loans` + `/high-net-worth-mortgage` title brand-vs-length tradeoff (11th carry — Tuesday rotation will self-execute MEDIUM_RISK rewrite per Decision Test). Suburb roster `/calculators` linking gap (8th carry). Audit finding #4 body-copy level review counts ("45 Zillow" still appears on homepage body 2×) — schema-level cleared, body-copy still open. PSI quota provision needed (HIGH escalation).

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, etc. |
| Deprioritized | usda (noindex, kept live) |

## Open Items

| Item | Priority |
|------|----------|
| Blog cadence: 19 days since last post (2026-04-27) — **deferred per GOALS.md "no new content this week"** | DEFERRED |
| products.html 10 in-card "Get Pre-Approved" buttons still route to raw 1003 (Adam decision; 24th carry) | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap | LOW |
| ~~Uncommitted style.css change in working tree~~ ✅ AUTO-RESOLVED 2026-05-18 — clean tree | DONE |
| Suburb roster `/calculators` linking gap (5th carry) | LOW (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| about.html "91 Google + 45 Zillow" review breakdown (UNVERIFIED:2026-05-08; Adam GBP/Zillow access) | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (21st carry) + missing FAQPage schema (4th carry) | MEDIUM |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **42 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained 10/10 consecutive periods — Monday refresh confirmed NOT effective — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| `/investor-loans` (T=68) + `/high-net-worth-mortgage` (T=79) titles missing "Adam Styer" — 11th run carry; Tuesday 5/19 rotation will self-execute MEDIUM_RISK rewrite | MEDIUM (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| GSC URL Inspection sweep — Pflugerville + Kyle (new top-10s), Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, Leander, products.html | HIGH (Adam) |
| Bulk suburb audit recommendation — replace 9-week rotation with weekly audit | MEDIUM |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Verify NAP fix across remaining LocalBusiness/Person schemas | HIGH |
| **Scheduler reliability HIGH FLAG** — Thu 5/14 no-fire + Fri 5/15 triple same-day (09:49/09:53/23:09) + **NEW: Sat 5/16 weekend fire @ 07:12** — 4 anomalies in 3 days, 3 distinct types | HIGH (Adam) |
| **NEEDS ADAM (NEW 2026-05-17) — Verify 8 hedged-claim items in `FLAG_FOR_ADAM.md`** against current wholesale rate sheets before quoting borrowers: Fannie 360-mo divisor (sourced via Truss not primary), Newrez SmartSelf 50% 1099 factor, A&D P&L parameters (660 FICO, $2.5M cap), Acra 1099 parameters (600 FICO), retirement haircut convention, non-QM rate premium bps, OTC contingency reserve %, Hill Country pricing tiers. All hedged on live pages. | HIGH (Adam) |
| **Sitewide nav inconsistency (NEW 2026-05-17)** — only `index.html` nav updated this session to lead with `mortgage-for-business-owners-austin` pillar. ~75 other pages still have older nav order. Bulk sweep deferred (surgical scope this session). | MEDIUM |
| **5 of 6 new pages missing NMLS Consumer Access `sameAs` in Article schema** — `mortgage-for-business-owners-austin` has it; the other 5 don't. AEO research flagged this as highest-value E-E-A-T entity signal. 5-min fix next session. | LOW |
| **OTC §50(a)(5) page lists 4 absolute requirements; research lists 5** — venue rule ("contract executed at lender/title/attorney office, not kitchen table") mentioned on page but as side note, not numbered. Cosmetic. | LOW |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | Mortgage Solutions LP" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://mslp.my1003app.com/513013/register (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Open Items only. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
