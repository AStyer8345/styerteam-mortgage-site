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

**2026-06-08 (styer-competitive-weekly Wk 14): clean research run, 0 site mutations.** Phase A complicated-income held **5/7 top-10 with 2 internal gains** — self-employed austin **#3→#2** (now directly behind only LendFriend), bank statement **#6→#4**; jumbo #2 + asset-depletion #1+#5 + 1099 #7 held; non-QM + DSCR still the only 2 gaps. Core Austin head terms 0/6 (directory/physical-dominated; Barton Creek reclaimed lender #1 from ATFCU). Suburb rotation (Westlake + Cedar Park): **Westlake #6 ★ first-ever TX-disambiguated top-10**; Cedar Park NR (4th measure, physical-presence gap). **LendFriend schema wedge held 3rd consecutive** (no FAQPage/AggregateRating JSON-LD) — binary lever to take self-employed #1, blocked only on the AggregateRating policy decision. Re-verify caught a query-variant false-downgrade on jumbo (exact-query re-run confirmed #2). **NotebookLM 65th dead run** — advisor script ABSENT + binary auth expired; both paths dead. Report: `run-logs/competitive/2026-06-08.md`.

**2026-06-07 (styer-site-daily Sunday weekend re-verify): clean run, 0 site-HTML mutations.** Sitemap/robots 200; **133 live = 133 local**; conversion tracking 10/10 (HTML-token, identical to yesterday). Blog fresh (latest 2026-06-05, 2 days) + CTA sweep 24/24, 0 missing. SEO/SEM backlog 0-eligible (all P4 GSC-blocked or Adam-gated); BLOCKERS.md clean. **1 stale TODO carry auto-resolved:** the 4th-run NEEDS-ADAM "`styer-suburb-editor-daily` status under GOALS.md" — Adam already answered (b) on 2026-06-06 (freeze deleted, task → Keep-Running line 66). **Adam batch-memo (2026-06-05) still unanswered** — carries point to memo, not re-surfaced. NotebookLM advisor script absent (66th run). PSI not re-attempted (Sunday; Monday-rotation work — count held at 31/31, not falsely incremented).

**2026-06-06 (styer-suburb-editor — Cedar Park Round 3 + FREEZE LIFTED): Adam killed the GOALS.md content freeze mid-session** ("update goals, just delete them, proceed — especially cleaning up"). Removed the "no new content beyond repositioning + compliance" line from GOALS.md (DOS master), added `styer-suburb-editor-daily` to Keep-Running; LoanOS/Client Ops/ad-spend pauses retained. **Cedar Park Round 3 shipped** (19-day skip streak ended): median → $489,747 Apr 2026 Redfin (-8.6% YoY) cited; all 6 "24-hour" perf-claims → "same-day"; lone USDA surface removed; round-rock-shared opener de-templated; new cited Major Employers H3 (Firefly/Ascension Seton/Dell+Apple/LISD); 5 source URLs; 6 JSON-LD blocks valid. Committed page+sitemap+CHANGELOG+run-logs only — left the in-progress sitewide asset-depletion-calculator nav sweep (~105 files) + calculator patches untouched. **Sitewide cleanup now unblocked: "24-hour" lives on all 24 suburb pages + USDA on several — recommend a dedicated sweep, not 1/day rotation.**

**2026-06-06 (styer-site-daily Saturday weekend re-verify): clean run, 0 site-HTML mutations.** Sitemap/robots 200; **133 live = 133 local** (md5 identical — up from 131, +2 DSCR posts); conversion tracking 10/10 (HTML-token). **2 stale flags auto-resolved:** (1) "blog hits 7 days → flag weekly content" RESOLVED — 2 DSCR posts shipped 2026-06-05 (commit 50d1919), latest post now 1 day old; (2) sitemap count 131→133. **Audited both new DSCR posts (airbnb-str + cash-out-brrrr)** — clean: tracked-LP CTAs (3/5), FAQPage schema, NMLS 513013, blog.html wired (noscript+CollectionPage), 0 legacy-entity drift, title lint PASS. Full blog CTA sweep 24/24 date-prefixed, 0 missing. **Adam batch-memo (2026-06-05) still unanswered** — carries point to memo, not re-surfaced. SEO/SEM backlog 0 eligible. NotebookLM advisor script absent (65th run).

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

**Mon 2026-06-08 = full rotation: Schema + Google Ads Quality Factors + AEO Entity Audit** per SKILL.md.

Priorities (in order):
1. **AWAIT Adam's reply to `run-logs/adam-batch-memo-2026-06-05.md`** — 3 decisions (USDA / perf-claims / 0-tracked-LP). The moment he answers, execute the chosen sweeps. This unblocks weeks of carry. Recommended answers in memo: 1=b-or-a (USDA accuracy), 2=a (kill 24-hour, keep same-day), 3=a (scenarios is canonical).
2. **Monday rotation** — Python JSON-LD parse on homepage + about + 1 suburb; AEO entity check (Person/LocalBusiness consistency); PageSpeed (likely UNVERIFIED — PSI quota 31/31); Google Ads optimizer log. Include the 2 new DSCR posts in the JSON-LD validity parse (today confirmed schema presence, not full validity).
3. **GSC sitemap check (Mon weekly cadence)** — confirm GSC picks up the 2 new DSCR URLs (count now 133, was 131).
4. **Schema-type unification carry** (Mon) — MortgageBroker vs LocalBusiness still pending Adam.
5. **Brand gold hex confirm** (Tue carry) — update SKILL.md to `#8B6E24` or revert style.css.
6. **products.html 10 in-card 1003 routing (44-run carry)** — re-surface.
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
