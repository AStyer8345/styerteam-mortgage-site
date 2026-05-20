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

**2026-05-19 (Tuesday — styer-site-daily):** Tuesday rotation (titles + meta descriptions) + extended Phase A AggregateRating cleanup the prior pass missed. 24 files modified across 2 commits.
- Commit `889496b`: NMLS suffix added to 3 titles missing it (dscr-loans-central-texas, asset-depletion-mortgage-austin-tx, self-employed-mortgage-round-rock-tx). Trimmed 3 meta descriptions >190 chars (1099-only, p-and-l, asset-depletion-texas) to ≤159 chars.
- Commit `9631c86`: Phase A audit finding #4 — extended Adam's `0cc148a` AggregateRating cleanup pattern to 18 user-facing pages still carrying the fabricated `reviewCount: "136"` block (15 suburb pages + 2 DSCR geo + first-time-home-buyer). Three syntactic variants handled (short/long pattern, end/mid-object placement). JSON-LD validated parseable on every page post-edit. Sweep now confirms **0 AggregateRating + 0 reviewCount:"136" sitewide**.
- Conversion tracking 10/10 critical tokens hold pre + post deploy. Netlify deploy live; 10-page HTTP 200 spot-check confirms.
- Re-Verify Gate caught + corrected yesterday's stale metric claim ("0/8 user-facing pages" — was actually 18 still carrying the block).

**2026-05-18 EVENING (Monday — third pass):** Verification-only Re-Verify Gate. NEW HIGH escalation: Calculator P0-A 12× inflated PITI bug, sister task 4 weeks running. Validated Adam's same-day commits (`6e27eb5` nav 8→5; `53b4733` scenario differentiation).

**2026-05-17 (Sunday):** Sitewide "21-Day Avg. Close" → "1,000+ Loans Closed" across ~95 files. GOALS.md fully rewritten — LoanOS/Client Ops/portfolio paused, loan-officer pipeline first.

## Active Blockers

| Item | Priority |
|------|----------|
| **Calculator P0-A 12× inflated PITI bug** — `rate-buydown-calculator.html` lines 1032-1033, 29 days live, patch `patches/calculator-2026-04-20-P0.diff` on disk, sister task flagged 5 weeks running | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **45 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **13/13** consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| `/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer" — **14th run carry** deferred per Phase B name swap. Adam decision: rewrite now or wait? | MEDIUM (Adam) |
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
| **Scheduler reliability** — Thu 5/14 no-fire (10th carry); favorable streak Mon 5/18 ended scheduler-anomaly run | HIGH (Adam) |

## What's Next

Wednesday 2026-05-20 rotation = Suburb Page Deep Dive + AEO. Round Rock first in rotation (Round Rock → Cedar Park → Leander → Georgetown → Pflugerville → Kyle → San Marcos → Westlake → Buda). Also: continue meta description trim sweep on 8 remaining pages over 160 chars (bank-statement-loans 187, k1-income 193, mortgage-for-business-owners 203, one-time-close 185, etc.). Re-verify yesterday's 24 changes still hold live.

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
