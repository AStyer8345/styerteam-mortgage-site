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

**2026-05-21 (Thursday — styer-site-daily):** Thursday rotation (Internal Linking + Funnel Flow) + Phase B entity-scrub residual. Site fully clean of legacy "Mortgage Solutions LP" / NMLS 2526130 / "Styer Team" wording after `276b894` scrubbed one stray "Styer Team" in `realtors.html:189` image alt text (was missed by Adam's three earlier name-swap commits 2a0c1e8 / c427b15 / efd26fe). HyperSmart + Kyber + NMLS #2653540 adoption now clean across homepage, /get-preapproved, /refinance-quote, /thank-you. Thursday rotation: 3 complicated-income pages (self-employed, DSCR, bank-statement) all route through /scenarios + /calculators + /contact — ≥2 high-intent CTAs each. New finding: homepage has 0 direct CTAs to /get-preapproved or /refinance-quote post-`71b8590` hero cleanup — funnel-direction question flagged for Adam.

**2026-05-19 (Tuesday — styer-site-daily):** Tuesday rotation (titles + meta descriptions) + extended Phase A AggregateRating cleanup. 24 files across `889496b` + `9631c86`. Site confirmed 0/0 AggregateRating sitewide.

**2026-05-18 EVENING (Monday — third pass):** Verification-only Re-Verify Gate. Calculator P0-A 12× inflated PITI bug escalated to HIGH. Validated `6e27eb5` (nav 8→5) + `53b4733` (scenario differentiation).

## Active Blockers

| Item | Priority |
|------|----------|
| **Calculator P0-A 12× inflated PITI bug** — `rate-buydown-calculator.html` lines 1032-1033, 29 days live, patch `patches/calculator-2026-04-20-P0.diff` on disk, sister task flagged 5 weeks running | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **47 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **14/14** consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| `/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer" — **15th run carry** — Phase B entity transition completed 2026-05-20, so this is now UNBLOCKED. Tomorrow's run will rewrite as ZERO_RISK unless Adam says hold. | MEDIUM |
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
| **Scheduler reliability** — Thu 5/14 no-fire (11th carry); Wed 2026-05-20 no-fire (1st carry, 1 day after entity transition) | HIGH (Adam) |

## What's Next

Friday 2026-05-22 rotation = Content Planning + AEO Review. Audit /blog last-post date; check 2 blog posts for FAQ answer-first + AI-extractable summary + CTA to /get-preapproved or /refinance-quote (extra important if homepage really has no direct CTA). Phase B title cleanup now UNBLOCKED — rewrite /investor-loans + /high-net-worth-mortgage titles to include "Adam Styer | NMLS #513013" (ZERO_RISK). Continue meta-description trim sweep on 8 remaining pages over 160 chars.

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
