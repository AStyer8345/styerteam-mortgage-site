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

**2026-05-25 (Monday — styer-site-daily, scheduled fire):** Full Monday rotation = Schema + AEO Entity Audit + cedar-park verification + SEO/SEM backlog action. Commit `e05f134` (4 files): suburb meta description trim batch — westlake 254→154, buda 235→143, hutto 234→158, round-rock 212→155. All ≤160 char SERP-truncation compliant; aligned with GOALS.md 40+ wholesale lenders positioning. Cedar Park excluded (sister-task `1b4d028` rebuilt 2026-05-24 — verified clean, strong schema). All 4 live HTTP 200 post-Netlify. **Auto-resolved 1 audit finding:** 2026-04-27 AM about.html LocalBusiness address mismatch (Sam Houston Circle vs Balcones Drive) — both schemas now use HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390 / 78759` (post-2026-05-20 entity transition). Audit Issue #5 superlative sweep count drifted 12→11 (still gated on Adam). NotebookLM 53rd dead; PSI 19/19 drain.

**2026-05-24 (Sunday — styer-site-daily, 4th unscheduled weekend fire in 9 days):** Re-verify gate only per yesterday PM's TOMORROW_PRIORITY #1. 0 site files modified. All 11 prior claims hold live. Sister task `suburb-editor` shipped 3 commits before this run fired (cedar-park rebuild + HyperSmart asset sweep + IndexNow 403). Working tree pollution (7 untracked + 2 modified) is sister-task work — not staged.

**2026-05-23 PM (Saturday — SECOND unscheduled fire):** Re-verify gate only, 0 site files modified. Confirmed AM run's `83ad1d4` Kyber footer fix holds live. **Auto-resolved:** 2026-05-17 audit Issue #6 (HNW "~30 states"). **NEW FINDING:** Audit Issue #5 superlative sweep ready for batch approval — 9 files, 12 edits at file:line in `run-logs/2026-05-23-pm.md`.

**2026-05-23 AM (Saturday — unscheduled fire):** Phase A entity coverage gap sweep via `comm -23` audit. Commit `83ad1d4` (2 files): buda + ftb-dpa-guide footers now include "Kyber Mortgage Corporation dba HyperSmart Home Loans" legal entity + NMLS Consumer Access link.

**2026-05-22 (Friday):** Friday rotation completed yesterday's TOMORROW_PRIORITY. Commit `a8d565c` (10 files): /investor-loans + /high-net-worth-mortgage title fixes (resolves 15-run carry) + 8 complicated-income page meta trims to ≤160 chars.

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
| **Audit Issue #5 superlative sweep batch** — 8 files, 11 occurrences (drifted 12→11 self-resolved), brand positioning copy from 2026-05-17 audit ready for Adam approval. H1 hero "can't match" + hero subtitles + 5 suburb pages with "beat builder rates" framing. Full file:line table in `run-logs/2026-05-23-pm.md`. Will unblock Phase A "superlatives cleanup" priority from GOALS.md. | MEDIUM (Adam) |
| **2026-04-27 about.html LocalBusiness address mismatch** ✅ AUTO-RESOLVED 2026-05-25 — homepage MortgageBroker + about LocalBusiness both now at HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390`. Resolved by 2026-05-20 entity transition. | DONE |

## What's Next

Tuesday 2026-05-26 rotation = Title Tags + Meta Descriptions. Apply today's meta-trim batch pattern to the remaining 6 suburb pages with descriptions >160 chars: liberty-hill (200), manor (199), dripping-springs (194), leander (168), new-braunfels (163), bee-cave (162). Anchor on neighborhoods + 40+ wholesale lenders per GOALS.md positioning. **DO NOT** touch cedar-park (276) — suburb-editor rebuilt it 2026-05-24; cleanup is theirs. Wednesday Suburb Deep Dive = Leander or Pflugerville rotation. Continue carries: products.html 10 in-card 1003 (Adam decision); why-home-prices-arent-crashing FAQPage gap (paused); ops.html dashboard refresh; Calculator P0 patch (HIGH); homepage testimonial pivot copy (HIGH — Adam blocking trust-strip cleanup); Audit Issue #5 superlative sweep (8 files, 11 occurrences — Adam batch approval). If Tue fires unscheduled before normal time: re-verify gate only. **4 weekend fires in 9 days = expected cadence; weekend fires default to re-verify only.**

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
