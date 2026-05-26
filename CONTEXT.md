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

**2026-05-25 PM (Monday — styer-site-daily, same-day SECOND fire):** Re-verify gate only per same-day second-fire discipline. **0 site files modified.** **TWO major auto-resolutions surfaced:** (1) Audit Issue #5 superlative sweep dropped **11→2** occurrences between AM and PM (sister task or Adam batch resolved 9/11); only homepage H1 hero + leander #276 remain — Phase A "superlatives cleanup" weekly priority per GOALS.md is **~95% complete**. (2) Tuesday's planned 6-suburb meta-trim batch already done by sister task `db7ab16 seo: trim 24 over-length meta descriptions to <=160 chars` — **23/24 suburb pages now ≤160 char compliant** (bee-cave 162-src/158-visible renders compliant via `&amp;` HTML entity decode). **Tooling gotcha caught:** post-`e24b973 seo: force flag on _redirects`, conversion verification MUST use `curl -L` (without it, all 3 LP routes return 301 + 11–12 bytes of plain text — looks like total tracking breakage). 12 sister-task seo-* commits between AM and PM. Sitemap count 135→134 (redirect/DSCR consolidation). All other AM claims hold live. NotebookLM 54th dead; PSI 20/20 drain.

**2026-05-25 AM (Monday — styer-site-daily, scheduled fire):** Full Monday rotation = Schema + AEO Entity Audit + cedar-park verification + SEO/SEM backlog action. Commit `e05f134` (4 files): suburb meta description trim batch — westlake 254→154, buda 235→143, hutto 234→158, round-rock 212→155. All ≤160 char SERP-truncation compliant; aligned with GOALS.md 40+ wholesale lenders positioning. **Auto-resolved 2026-04-27 about.html LocalBusiness address mismatch** — both schemas now use HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390`.

**2026-05-24 (Sunday — unscheduled weekend fire):** Re-verify gate only. 0 site files modified. All 11 prior claims hold live. Sister task `suburb-editor` shipped 3 commits before fire (cedar-park rebuild + HyperSmart asset sweep + IndexNow 403).

**2026-05-23 PM (Saturday — SECOND unscheduled fire):** Re-verify gate only. Auto-resolved 2026-05-17 audit Issue #6 (HNW "~30 states"). Surfaced Audit Issue #5 superlative sweep file:line table.

**2026-05-23 AM (Saturday — unscheduled fire):** Phase A entity coverage gap sweep. Commit `83ad1d4` (2 files): buda + ftb-dpa-guide footers now include "Kyber Mortgage Corporation dba HyperSmart Home Loans" + NMLS Consumer Access link.

**2026-05-22 (Friday):** Commit `a8d565c` (10 files): /investor-loans + /high-net-worth-mortgage title fixes + 8 complicated-income page meta trims to ≤160 chars.

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
| ~~Audit Issue #5 superlative sweep batch (11 occurrences, 8 files)~~ ✅ **AUTO-RESOLVED 9/11 on 2026-05-25 PM**. Only 2 occurrences remain: homepage H1 hero "bank can't match" + leander #276 "beat builder rates" framing. Phase A "superlatives cleanup" per GOALS.md ~95% complete. Both remaining require Adam pivot copy. | LOW (Adam) |
| ~~Tuesday TOMORROW_PRIORITY #1 — 6 suburb meta trims~~ ✅ **AUTO-RESOLVED 2026-05-25 PM** via sister task `db7ab16` (24 over-length metas trimmed sitewide). 23/24 suburb pages compliant; bee-cave 162-src/158-visible renders compliant. | DONE |
| **2026-04-27 about.html LocalBusiness address mismatch** ✅ AUTO-RESOLVED 2026-05-25 AM — homepage MortgageBroker + about LocalBusiness both now at HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390`. | DONE |

## What's Next

Tuesday 2026-05-26 rotation pivot needed — original meta-trim batch was AUTO-RESOLVED via sister task `db7ab16`. New best uses of Tuesday's slot: (a) **Pull forward Wednesday's Suburb Deep Dive** (Leander or Pflugerville — FAQPage + BreadcrumbList + city-specific H1 + inline lead form + AEO extractability), OR (b) **Sitewide title tag format audit** (sample 20 pages, confirm "[Loan/Page] in Austin TX | Adam Styer | NMLS #513013"). Continue carries: products.html 10 in-card 1003 (Adam decision); ops.html dashboard refresh; Calculator P0 patch (HIGH, 38 runs); homepage testimonial pivot copy (HIGH — Adam blocking); only **2 Audit Issue #5 occurrences left** (homepage H1 + leander #276 — both Adam pivot copy). **Tooling update:** Step 2 conversion verification must use `curl -L` going forward post-`e24b973` redirect-force; AM already correct. If Tue fires unscheduled before normal time: re-verify gate only.

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
