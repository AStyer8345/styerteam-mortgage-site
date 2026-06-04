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

**2026-06-04 (styer-site-daily Thursday rotation): Internal Linking + Funnel Flow.** 0-mutation discipline run. Mechanical Thursday work (3-page link audit + full funnel trace) found ZERO blockers — internal linking density healthy (25+ links/page on non-qm-loans / georgetown / self-employed), full funnel instrumentation works (form→thank-you wired, dataLayer firing). Real value of run: **cluster-wide grep refined 3 Adam-pivot carries with hard counts that materially upgrade their scope**: (1) USDA cluster 5 suburbs/~25 surfaces → **12 suburbs/143 mentions** (Bastrop/San Marcos/Austin Area/New Braunfels/Taylor are NEW; Round Rock 2026-04-29 cleanup was partial — 9 mentions remain); (2) Perf-metric ban hypothesis "15-20 of 24 suburbs" → **25/25 suburbs / ~89 surface instances**; (3) 0-tracked-LP cluster 32 → **34 surfaces** (homepage now confirmed: 0 links to `/get-preapproved` or `/refinance-quote`). Suburb count drift corrected (24 → 25 — `austin-area-mortgage-lender.html` was missed). SEO/SEM backlog: 0 eligible items (P3 remainder = content-add paused by GOALS.md). Conversion 10/10. NotebookLM 63rd dead run.

**2026-06-03 (styer-site-daily Wednesday rotation): Suburb Page Deep Dive + AEO — Kyle.** 0-mutation. Kyle structural 7/9, 5 USDA surfaces, 3 perf-metric surfaces. Refined USDA cluster 4→5 suburbs; 0-CTA cluster 8→32 pages. Conversion 10/10.

**2026-06-02 (styer-site-daily Tuesday rotation): Title Tags + Meta Descriptions.** 2 LOW_RISK within-page-consistency fixes. NEW LOW carry: brand gold hex drift `#C9A84C` → `#8B6E24`. Conversion 10/10.

## Active Blockers

| Item | Priority |
|------|----------|
| **REFINED 2026-06-04: USDA cluster scope 5 → 12 suburbs / 143 mentions.** Bastrop=15, San Marcos=12, Austin Area=11, New Braunfels=7, Taylor=5 are NEW additions; Round Rock 2026-04-29 cleanup was a partial pass (9 mentions remain). 5–6× larger than prior framing. Round Rock playbook still precedent | MEDIUM (Adam) |
| **REFINED 2026-06-04: Performance-metric ban cluster — 25/25 suburbs / ~89 surface instances.** Yesterday's hypothesis "15-20 of 24" was under. Plus 3 headline-page title carries + thank-you 7-carry. Material Adam-batch | MEDIUM (Adam) |
| **REFINED 2026-06-04: 0-tracked-LP cluster 32 → 34 surfaces.** Homepage now confirmed: 0 links to `/get-preapproved` or `/refinance-quote`. Decision frame upgraded — site-wide organic funnel architecture, not just suburbs | MEDIUM (Adam) |
| **NEW 2026-06-03: Kyle missing inline lead-capture form** — other top-ranked suburbs surface inline form. Adam UX decision | MEDIUM (Adam) |
| **NEW 2026-06-02: Brand gold hex drift** — SKILL.md design audit line says `#C9A84C`; style.css `--color-gold` ships `#8B6E24`. Confirm new gold + update SKILL.md, or revert. Likely intentional Phase A brand pivot — needs SKILL.md sync, not site revert | LOW (Adam) |
| **NEW 2026-06-01: Homepage MortgageBroker vs about LocalBusiness schema** — both schema.org-valid. MortgageBroker more specific. 2-file unification opportunity | LOW (Adam) |
| Homepage title pipe normalization (HIGH_RISK deferred) — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + 107-char title. Adam decision: simple pipe fix or "complicated income" rewrite | MEDIUM (Adam) |
| `/get-preapproved.html` title (MEDIUM_RISK paid LP) — missing pipe + `24-Hour Turnaround` performance claim. GOALS.md vs voice-guide tension | MEDIUM (Adam) |
| `/hutto-mortgage-lender.html` title — Same-Day Pre-Approval claim + missing NMLS tail. Hutto currently #2 ranking | LOW (Adam) |
| SKILL.md infrastructure question — should BLOCKERS.md live inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| Calculator P0-A 12× inflated PITI bug — `rate-buydown-calculator.html` lines 1032-1033, patch on disk, **47 carries** | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **63 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **29/29** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (**42 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**21 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — 5/7 ranking. Remaining: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` not in top 10. Audit vs CMRE/Capital Home/Stephanie Donnell + Newfi/Easy Street/TX Premier | HIGH |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**42 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| Sitewide nav inconsistency (2026-05-17) — ~75 pages still have older nav vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| `thank-you.html` lines 459/468/469 performance claims (7 carries) — GOALS.md vs voice-guide tension | MEDIUM (Adam) |

## What's Next

**Fri 2026-06-05 styer-site-daily = Content Planning + AEO Review rotation** per SKILL.md.

Site-daily priorities:
1. **Friday rotation execution** — check `/blog`: last post 2026-05-30 (6 days, within 7-day window — but Fri-of-check will hit 7); audit blog CTAs (all should link to `/get-preapproved` or `/refinance-quote`); AEO review on 2 posts (answer-first, question-form H2s, extractable summary). GOALS.md "no new content" still gates edits — cluster-note only.
2. **Round Rock USDA partial-pass audit** — 9 USDA mentions remain after the 2026-04-29 cleanup. Spot-read content to determine which are legitimate context vs cleanup misses. Refines USDA cluster batch scope.
3. **Cluster batch-scope memo for Adam** — consolidate today's 3 refined carries (USDA 143 mentions / perf-claims 89 surfaces / 0-CTAs 34 surfaces) into a single batch-decision memo with per-file lists. Don't write the diffs — just stage the decision Adam needs to make.
4. **Suburb count correction** — CONTEXT.md says "24 suburb SEO pages"; actual is 25. 1-line fix.
5. **Brand gold hex confirm** (Tue carry) — Adam decision: update SKILL.md to `#8B6E24` or revert style.css.
6. **Schema-type unification carry** (Mon) — MortgageBroker vs LocalBusiness still pending Adam.
7. **products.html 10 in-card 1003 routing (42-run carry)** — re-surface.
8. **Cache-buster sweep** — if Adam rolls another `?v=...` overnight, run 5-sample sweep early.

Audit roadmap (`SEO-AUDIT-2026-05.md`): 3.2 VA Austin · ~~3.3 Physician~~ ✅ · 3.4 ITIN TX · 3.5 Foreign National TX · Phase 2 external (`SEO-PHASE2-CHECKLIST.md`).

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors, scenario |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 25 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, **scenarios (hub + template + 1 live)**, etc. |
| Deprioritized | usda (noindex, kept live) |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | HyperSmart Home Loans" — never "The Styer Team" or "Mortgage Solutions LP". "Adam Styer Mortgage" is an INTENTIONAL colloquial alt-brand (per llms.txt + regression test) — not legacy drift.
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://hypersmart.my1003app.com/513013/register?time=1779291829279 (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION: CONTEXT.md (replace 3 fields, <100 lines); CHANGELOG.md (append dated); TODO.md (mark done, add new); DECISIONS.md (only if real decision).
