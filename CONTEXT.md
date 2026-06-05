# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | HyperSmart Home Loans. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 25 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-06-05 (styer-site-daily Friday rotation): Content Planning + AEO Review.** Blog: 32/32 posts carry a tracked-LP CTA; latest post 2026-05-30 (6 days, within window). AEO healthy — physician post has question-form H2s + FAQPage schema + 5 CTAs. **Headline finding — USDA carry REFRAMED:** the 143-mention "cleanup" was the wrong frame. Mentions split into 2 classes: **8 pages PROMOTE USDA as the lead product** (smithville/elgin/florence/jarrell/bastrop/san-marcos/kyle/new-braunfels — hero + section headers + FAQ), advertising a product Adam says he doesn't originate; 4 pages STEER AWAY (round-rock/austin-area/taylor/cedar-park — honest "ineligible" context, keep). Round Rock's 9 mentions are legit class-B, not cleanup misses. This is an accuracy/compliance question, not a tidy-up. **Consolidated all 3 suburb-cluster carries into `run-logs/adam-batch-memo-2026-06-05.md`** (USDA / perf-claims / 0-tracked-LP) with exact file lists + one decision each. Perf-claims root cause named: GOALS.md "no perf marketing" vs voice-guide "same-day is a differentiator" — Adam must reconcile. 2 doc edits shipped: suburb count 24→25, USDA carry reframed. SEO/SEM backlog 0 eligible. Conversion 10/10. Sitemap 131=131. NotebookLM 64th dead run.

**2026-06-03 (styer-site-daily Wednesday rotation): Suburb Page Deep Dive + AEO — Kyle.** 0-mutation. Kyle structural 7/9, 5 USDA surfaces, 3 perf-metric surfaces. Refined USDA cluster 4→5 suburbs; 0-CTA cluster 8→32 pages. Conversion 10/10.

**2026-06-02 (styer-site-daily Tuesday rotation): Title Tags + Meta Descriptions.** 2 LOW_RISK within-page-consistency fixes. NEW LOW carry: brand gold hex drift `#C9A84C` → `#8B6E24`. Conversion 10/10.

## Active Blockers

| Item | Priority |
|------|----------|
| **REFRAMED 2026-06-05: USDA is an accuracy question, not mechanical cleanup → see `run-logs/adam-batch-memo-2026-06-05.md` Decision 1.** The 143 mentions split into 2 classes: (A) **8 pages PROMOTE USDA zero-down as the LEAD product** in hero + `<h3>`/`<h4>` + FAQ (smithville 23, elgin 21, florence 15, jarrell 14, bastrop 15, san-marcos 12, kyle 10, new-braunfels 7) — these advertise a product CONTEXT/voice-guide say Adam does NOT originate; (B) 4 pages STEER AWAY (round-rock 9, austin-area 11, taylor 5, cedar-park 1 — honest "no longer eligible" context, recommend keep). Round Rock's 9 are class-B legit, NOT cleanup misses. Decision: does Adam broker USDA rurally (close) or reposition 8 pages off USDA (content rewrite, GOALS-gated)? | MEDIUM (Adam) |
| **Performance-metric claims — root cause is GOALS.md vs voice-guide conflict → see memo Decision 2.** GOALS.md says "no performance-metric marketing"; voice guide line 48 calls same-day pre-approval "a real differentiator." ~89 instances (25/25 suburbs) + 3 headline titles + thank-you 459/468/469. NOTE: "21-day close" already 0 sitewide (win met); remainder = "same-day"/"24-hour" speed claims. Recommend: kill "24-hour" (~53), keep "same-day." Needs Adam to reconcile his two docs | MEDIUM (Adam) |
| **0-tracked-LP cluster 34 surfaces (8 loan-type + 25 suburb + homepage) → see memo Decision 3.** All organic routes via `/scenarios.html` + `/contact.html` (by design, 2026-05-28 architecture). Question: is `/scenarios.html` the canonical organic LP (keep), or add tracked-LP links for Ads attribution coverage (~34-page mechanical add)? | MEDIUM (Adam) |
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

**Sat/Sun 2026-06-06/07 = weekend fire (if any) → re-verify gate only.** Next full rotation: **Mon 2026-06-08 = Schema + Google Ads Quality + AEO Entity Audit** per SKILL.md.

Priorities (in order):
1. **AWAIT Adam's reply to `run-logs/adam-batch-memo-2026-06-05.md`** — 3 decisions (USDA / perf-claims / 0-tracked-LP). The moment he answers, execute the chosen sweeps. This unblocks weeks of carry. Recommended answers in memo: 1=b-or-a (USDA accuracy), 2=a (kill 24-hour, keep same-day), 3=a (scenarios is canonical).
2. **Monday rotation** — Python JSON-LD parse on homepage + about + 1 suburb; AEO entity check (Person/LocalBusiness consistency); PageSpeed (likely UNVERIFIED — PSI quota 30/30); Google Ads optimizer log.
3. **If blog post hits 7 days (Sat 2026-06-06)** — flag weekly content task (last post 2026-05-30).
4. **Schema-type unification carry** (Mon) — MortgageBroker vs LocalBusiness still pending Adam.
5. **Brand gold hex confirm** (Tue carry) — update SKILL.md to `#8B6E24` or revert style.css.
6. **products.html 10 in-card 1003 routing (43-run carry)** — re-surface.
7. **Cache-buster sweep** — if Adam rolls another `?v=...` overnight, run 5-sample sweep early.

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
