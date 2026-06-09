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

**2026-06-09 (styer-site-daily Tuesday — Title Tags + Meta Descriptions): 2 LOW_RISK site mutations.** Sitemap/robots 200; **134 live = 134 local** (+1 vs 06-08 = physician post); conversion **10/10** (HTML-token). Title audit across 111 pages: **0 duplicate titles, 0 missing public-page titles**; `title!=og:title` confirmed by-design (social variant), not equalized. Meta-description audit: **0 duplicates**; the ~10 "SHORT" flags were all **regex artifacts** (pattern truncated at apostrophes in "Austin's"/"today's") — verified each live tag, **0 false fixes**. `thank-you.html` "missing desc" = correct (noindex). **2 genuine over-length descriptions trimmed:** `asset-depletion-calculator.html` 217→152, `loans/jumbo.html` 203→160 (now matches its own og/twitter). Commit `930da40`, both verified live HTTP 200. SEO/SEM backlog 0-eligible; BLOCKERS clean. **Adam batch-memo (2026-06-05) still unanswered** — 3 cluster carries stay paused. NotebookLM script absent (68th). PSI held 32/32 (non-Monday, no false increment).

**2026-06-08 (styer-site-daily Monday — Schema + Google Ads + AEO Entity Audit): clean run, 0 site-HTML mutations.** Sitemap/robots 200; **133 live = 133 local**; conversion 10/10 (HTML-token). **Monday schema audit: 17/17 JSON-LD blocks VALID** via python `json.loads` across home (MortgageBroker/FAQPage/Person) + about (Person/LocalBusiness/FAQPage) + round-rock (6 blocks) + the 2 DSCR posts (2026-06-05) — **DSCR posts upgraded present → VALID** (Article+FAQPage+BreadcrumbList all parse). **AEO entity consistency strong:** name (HyperSmart/Kyber), NMLS 513013+2653540, address, phone all consistent home↔about. **AEO extractability reframed, not flagged:** homepage first-150 deliberately answers the *specialist* query (self-employed/complex-income/DSCR/non-QM), NOT the generic "best broker" superlative — on-strategy per GOALS Phase A (superlatives are a cleanup target + compliance risk). PSI quota exceeded — **real Monday attempt, honest 31/31→32/32**. Google Ads score left Adam-owned/UNVERIFIED (Ads UI). SEO/SEM backlog 0-eligible; BLOCKERS clean. **Adam batch-memo (2026-06-05) still unanswered** — 3 cluster carries stay paused. NotebookLM advisor script absent (67th run). Schema-type carry (home MortgageBroker vs about LocalBusiness) + gold-hex drift (#C9A84C→#8B6E24) confirmed present, both Adam-gated.

**2026-06-08 (styer-competitive-weekly Wk 14): clean research run, 0 site mutations.** Phase A held **5/7 top-10 with 2 internal gains** — self-employed austin **#3→#2** (behind only LendFriend), bank statement **#6→#4**; jumbo #2 + asset-depletion #1+#5 + 1099 #7 held; non-QM + DSCR still the only 2 gaps. Core Austin head terms 0/6. Westlake **#6 ★ first-ever TX-disambiguated top-10**; Cedar Park NR. **LendFriend schema wedge held 3rd consecutive** (no FAQPage/AggregateRating JSON-LD) — binary lever to take self-employed #1, blocked only on the AggregateRating policy decision. Report: `run-logs/competitive/2026-06-08.md`.

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

**Wed 2026-06-10 = Suburb Page Deep Dive + AEO rotation** per SKILL.md.

Priorities (in order):
1. **AWAIT Adam's reply to `run-logs/adam-batch-memo-2026-06-05.md`** — 3 decisions (USDA / perf-claims / 0-tracked-LP). The moment he answers, execute the chosen sweeps. Unblocks weeks of carry. Recommended in memo: 1=b-or-a, 2=a (kill 24-hour, keep same-day), 3=a (scenarios canonical).
2. **Wednesday rotation** — suburb deep dive. Pick: **Cedar Park** (lone suburb gap, NR after 4 measures, physical-presence dominated) or **Kyle/Leander** (both dropped 2 spots, defensive). Audit inline lead form (Kyle still missing), FAQPage + BreadcrumbList schema, city-specific H1, AEO answer-first paragraph, internal links to /get-preapproved + /calculators.
3. **Blog freshness** — latest post 2026-05-30 (10 days, >7-day SKILL threshold). Surface to `styer-content-weekly` (not a styer-site-daily action).
4. **🎯 AggregateRating policy decision** — highest-confidence competitive lever: re-add `AggregateRating` w/ VERIFIED count to `/self-employed-mortgage-austin.html` (#2) + `/loans/jumbo.html` (#2). LendFriend (#1 both) has no FAQPage/AggregateRating — 3 weeks confirmed.
4. **Homepage + `/get-preapproved` title carries** — pipe-normalization + "24-Hour Turnaround" perf-claim; deferred to memo Decision 2 + Adam HIGH_RISK title call.
5. **Schema-type unification** (MortgageBroker vs LocalBusiness) + **gold hex** (#C9A84C→#8B6E24 SKILL.md sync) — both Adam-gated carries.
6. **GSC sitemap status** (Mon cadence carry) — confirm GSC picked up all 133 incl. 2 DSCR posts.

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
