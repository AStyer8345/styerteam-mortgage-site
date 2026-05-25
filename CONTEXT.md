# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | HyperSmart Home Loans. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-05-24 (Sunday — styer-site-daily, 4th unscheduled weekend fire in 9 days):** Re-verify gate only per yesterday PM's TOMORROW_PRIORITY #1. 0 site files modified. All 11 prior claims hold live (sitemap + robots 200, conversion 10/10, legacy entity 0/0/0, 21-day claim 0, Audit Issue #5 sweep still actionable, Kyber footer fixes hold, HNW "~30 states" still resolved). Sister task `suburb-editor` shipped 3 commits before this run fired (cedar-park rebuild + HyperSmart asset sweep + IndexNow 403 → TODO.md NEEDS ADAM). Cedar Park live HTTP 200. Working tree pollution (7 untracked + 2 modified) is sister-task work — not staged. NotebookLM 52nd dead run; PSI 18/18 drain.

**2026-05-23 PM (Saturday — styer-site-daily, SECOND unscheduled fire):** Re-verify gate only, 0 site files modified. Confirmed AM run's `83ad1d4` Kyber footer fix holds live (buda + ftb-dpa-guide both 2× "Kyber Mortgage Corporation"). All re-verify claims hold; conversion 10/10. **Auto-resolved 1 audit finding:** 2026-05-17 audit Issue #6 (HNW "~30 states" reference) — 0 occurrences live, removed from any future surface. **NEW FINDING surfaced for Adam:** Audit Issue #5 "bank can't match" / "beat builder" superlative sweep is ready for batch approval — 9 files, 12 edits documented at file:line in `run-logs/2026-05-23-pm.md`. Not auto-fixed because H1 hero is brand positioning (Adam decision). NotebookLM 51st dead run; PSI 17/17 drain.

**2026-05-23 AM (Saturday — styer-site-daily, unscheduled fire):** Phase A entity coverage gap sweep via `comm -23` audit. Commit `83ad1d4` (2 files): buda-mortgage-lender.html + ftb-dpa-guide.html footers now include "Kyber Mortgage Corporation dba HyperSmart Home Loans" legal entity name + NMLS Consumer Access link, matching site-wide compliance pattern post-2026-05-20 entity transition. Live verified HTTP 200 + "Kyber" 2× on each page. 5 noindexed admin pages remain with HyperSmart-only footers — out of scope (not crawler-facing). Conversion tracking 10/10 holds.

**2026-05-22 (Friday — styer-site-daily):** Friday rotation (Content Planning + AEO Review) + completed yesterday's TOMORROW_PRIORITY in full. Single 10-file commit `a8d565c`: (1) Phase B title rewrites on /investor-loans + /high-net-worth-mortgage — both now include "Adam Styer | NMLS #513013" (resolves 15-run carry); (2) 8 meta description trims to ≤160 chars across complicated-income pages (bank-statement ×2, DSCR ×2, self-employed, k1-income, business-owners, OTC construction) — all aligned with GOALS.md repositioning. AEO audit: 2026-04-17 refinance post strong (FAQPage + 8 question H2s + 8 CTAs); 2026-04-27 home-prices post still missing FAQPage schema (10th-carry, gated on no-content policy).

## Active Blockers

| Item | Priority |
|------|----------|
| **Calculator P0-A 12× inflated PITI bug** — `rate-buydown-calculator.html` lines 1032-1033, 29 days live, patch `patches/calculator-2026-04-20-P0.diff` on disk, sister task flagged 5 weeks running | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **47 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **14/14** consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| ~~`/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer"~~ ✅ DONE 2026-05-22 commit `a8d565c` — both titles now match "Austin TX \| Adam Styer \| NMLS #513013" pattern, verified live | DONE |
| **NEW: Homepage 0 direct CTAs to `/get-preapproved` or `/refinance-quote`** post `71b8590` hero cleanup. Loan-app URL + tel: are the only conversion paths from homepage. Decision: keep direct-to-1003 OR restore in-house funnel CTA card? | MEDIUM (Adam) |
| Homepage body-copy still references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (index.html lines 455, 492, 861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (27th carry; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander, Bee Cave (7+ carries) | HIGH (Adam) |
| Complicated-income SERP gap — 0/5 ranking on self-employed / bank statement / non-QM / DSCR / 1099 Austin. Compliance-permitted fix this week = FAQPage + AggregateRating schema audit on 5 pages + /loans/jumbo | HIGH |
| **Hedged claims to verify (NEW 2026-05-17)** — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets before quoting borrowers | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (27th carry) + missing FAQPage schema (10th carry) | MEDIUM |
| ~~Phase A AggregateRating cleanup incomplete on 18 pages~~ ✅ COMPLETED 2026-05-19 commit `9631c86` — site now genuinely 0/0 | DONE |
| ~~ops.html internal dashboard "AggregateRating ✅" stale~~ — now technically correct sitewide after 2026-05-19 cleanup; phrasing audit pending | MEDIUM (Adam) |
| **Sitewide nav inconsistency (2026-05-17)** — ~75 pages still have older nav order vs index.html's pillar-first reorder | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap | LOW |
| Suburb roster `/calculators` linking gap (11th carry) | LOW (Adam) |
| Suburb pages render `About Adam` standalone vs Contact dropdown — `consolidate-nav.py` per-template gap | LOW (Adam) |
| **5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema** | LOW |
| Bulk suburb audit recommendation — replace 9-week rotation with weekly audit (3rd carry) | MEDIUM |
| **Scheduler reliability** — Thu 5/14 no-fire (11th carry); Wed 2026-05-20 no-fire (1st carry); **3 unscheduled weekend fires in 2 weeks** — Sat 2026-05-22 PM, Sat 2026-05-23 AM, Sat 2026-05-23 PM. Document expected cadence in SKILL.md or tune scheduler. | HIGH (Adam) |
| **NEW: Audit Issue #5 superlative sweep batch** — 9 files, 12 edits, brand positioning copy from 2026-05-17 audit ready for Adam approval. H1 hero "can't match" + hero subtitles + 5 suburb pages with "beat builder rates" framing. Full file:line table in `run-logs/2026-05-23-pm.md`. Will unblock Phase A "superlatives cleanup" priority from GOALS.md. | MEDIUM (Adam) |

## What's Next

Monday 2026-05-26 rotation = Schema + Google Ads Quality Factors + AEO Entity Audit. **Adam updates GOALS.md Monday AM — re-read before doing rotation work.** Monday should also include a quick verification pass on `cedar-park-mortgage-lender.html` (suburb-editor rebuilt it 2026-05-24 commit `1b4d028`) to catch any sister-task introduced schema/canonical/meta regressions — verification only, not a rewrite. Tuesday meta-tag rotation has reduced surface area; consider expanding to suburb-page meta sweep (24 pages, none audited). Continue carries: products.html 10 in-card 1003 (Adam decision); why-home-prices-arent-crashing FAQPage gap (paused per content policy); ops.html dashboard refresh; Calculator P0 patch (HIGH); homepage testimonial pivot copy (HIGH — Adam blocking trust-strip cleanup); Audit Issue #5 superlative sweep (9 files, 12 edits — Adam batch approval). If Monday fires unscheduled before normal time: re-verify gate only. **4 weekend fires in 9 days = scheduler cadence is undocumented but consistent; default behavior now is "weekend fire = re-verify only."**

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors, scenario |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, etc. |
| Deprioritized | usda (noindex, kept live) |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | HyperSmart Home Loans" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://hypersmart.my1003app.com/513013/register?time=1779291829279 (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Keep under 100 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
