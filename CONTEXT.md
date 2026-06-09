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

**2026-06-09 (interactive session w/ Adam — full audit + Phase 2/3 build): 6 commits, 3 batch-memo decisions ANSWERED.** Adam answered the 2026-06-05 memo live: **1=b (reposition off USDA), 2=a (kill 24-hour, keep same-day), satellites=consolidate, inline forms=go.** Shipped: (1) Calculator P0 patch applied — buydown annual tax/ins 12× PITI bug (P0-A), Chart.js render-block (P0-E), refinance label/ids (P0-D), slider aria-labels (P0-C). (2) Conversion plumbing — quick-contact (homepage/scenario), prequal, rate-check hub now redirect to /thank-you so the Ads conversion counts them; prequal gained Netlify Forms backup + form-name; ftb-dpa-guide + rate-alert no-JS fallback actions fixed. (3) Inline quick-quote forms deployed to DSCR, bank-statement, self-employed, non-QM, HNW + Kyle + Cedar Park (one data-netlify form per page, initHeroQuickForm fallback handles). (4) 5 thin satellites consolidated (asset-depletion-austin-tx, self-employed-round-rock, otc-hill-country 301→full pages + files deleted; bank-statement-austin-tx + non-qm-self-employed files deleted, redirects existed); sitemap 134→131. (5) 24-hour sweep: ~75 instances → same-day/business-day phrasing across 40 pages incl. get-preapproved title; testimonial quotes untouched; blog out of scope. (6) USDA repositioning executed on all 8 Class-A pages — honest "I don't originate USDA" FAQ kept for search value; FAQPage JSON-LD re-synced verbatim (fixed pre-existing schema drift on san-marcos/kyle/new-braunfels); 2 USDA testimonial quotes removed (couldn't be honestly rewritten). Hygiene: robots.txt Disallow for 6 internal pages, style.css.bak + orphan first-time-buyer-guide.html deleted. **POST-DEPLOY VERIFY: 7 new Netlify form names (kyle-quote, cedar-park-quote, dscr-quote, bank-statement-quote, self-employed-quote, non-qm-quote, hnw-quote) must appear in Netlify Forms dashboard; n8n lead alerts may need the new form names.**

**2026-06-09 (styer-site-daily Tuesday — Title Tags + Meta Descriptions): 2 LOW_RISK site mutations.** Sitemap/robots 200; **134 live = 134 local** (+1 vs 06-08 = physician post); conversion **10/10** (HTML-token). Title audit across 111 pages: **0 duplicate titles, 0 missing public-page titles**; `title!=og:title` confirmed by-design (social variant), not equalized. Meta-description audit: **0 duplicates**; the ~10 "SHORT" flags were all **regex artifacts** (pattern truncated at apostrophes in "Austin's"/"today's") — verified each live tag, **0 false fixes**. `thank-you.html` "missing desc" = correct (noindex). **2 genuine over-length descriptions trimmed:** `asset-depletion-calculator.html` 217→152, `loans/jumbo.html` 203→160 (now matches its own og/twitter). Commit `930da40`, both verified live HTTP 200. SEO/SEM backlog 0-eligible; BLOCKERS clean. **Adam batch-memo (2026-06-05) still unanswered** — 3 cluster carries stay paused. NotebookLM script absent (68th). PSI held 32/32 (non-Monday, no false increment).

**2026-06-08 (styer-site-daily Monday — Schema + Google Ads + AEO Entity Audit): clean run, 0 site-HTML mutations.** Sitemap/robots 200; **133 live = 133 local**; conversion 10/10 (HTML-token). **Monday schema audit: 17/17 JSON-LD blocks VALID** via python `json.loads` across home (MortgageBroker/FAQPage/Person) + about (Person/LocalBusiness/FAQPage) + round-rock (6 blocks) + the 2 DSCR posts (2026-06-05) — **DSCR posts upgraded present → VALID** (Article+FAQPage+BreadcrumbList all parse). **AEO entity consistency strong:** name (HyperSmart/Kyber), NMLS 513013+2653540, address, phone all consistent home↔about. **AEO extractability reframed, not flagged:** homepage first-150 deliberately answers the *specialist* query (self-employed/complex-income/DSCR/non-QM), NOT the generic "best broker" superlative — on-strategy per GOALS Phase A (superlatives are a cleanup target + compliance risk). PSI quota exceeded — **real Monday attempt, honest 31/31→32/32**. Google Ads score left Adam-owned/UNVERIFIED (Ads UI). SEO/SEM backlog 0-eligible; BLOCKERS clean. **Adam batch-memo (2026-06-05) still unanswered** — 3 cluster carries stay paused. NotebookLM advisor script absent (67th run). Schema-type carry (home MortgageBroker vs about LocalBusiness) + gold-hex drift (#C9A84C→#8B6E24) confirmed present, both Adam-gated.

**2026-06-08 (styer-competitive-weekly Wk 14): clean research run, 0 site mutations.** Phase A held **5/7 top-10 with 2 internal gains** — self-employed austin **#3→#2** (behind only LendFriend), bank statement **#6→#4**; jumbo #2 + asset-depletion #1+#5 + 1099 #7 held; non-QM + DSCR still the only 2 gaps. Core Austin head terms 0/6. Westlake **#6 ★ first-ever TX-disambiguated top-10**; Cedar Park NR. **LendFriend schema wedge held 3rd consecutive** (no FAQPage/AggregateRating JSON-LD) — binary lever to take self-employed #1, blocked only on the AggregateRating policy decision. Report: `run-logs/competitive/2026-06-08.md`.

## Active Blockers

| Item | Priority |
|------|----------|
| ~~USDA Decision 1~~ **ANSWERED 2026-06-09: 1=b — executed.** All 8 Class-A pages repositioned off USDA (conventional/FHA/VA/DPA + OTC construction lead). Class-B pages untouched. Residual: `/loans/usda.html` still on disk (noindexed, out of sitemap) — retire or keep as honest explainer, Adam's call | LOW (Adam) |
| ~~Performance claims Decision 2~~ **ANSWERED 2026-06-09: 2=a — executed.** "24-hour" variants swept (~75), "same-day" kept. Residual: 2 client testimonial quotes still contain speed claims (new-braunfels "pre-approved in 24 hours", first-time-home-buyer "under 24 hours") — quotes can't be honestly rewritten; swap for other real reviews if desired | LOW (Adam) |
| ~~0-tracked-LP Decision 3~~ **LARGELY MOOT 2026-06-09:** quick-contact/prequal/rate-check forms now land on /thank-you, so organic submissions count as Ads conversions without tracked-LP links. /scenarios stays the canonical organic LP. Adam should confirm conversion counts rise in the Ads UI over the next 2 weeks | MEDIUM (Adam) |
| ~~Kyle inline form~~ **DONE 2026-06-09** — Kyle + Cedar Park + 5 money pages all have inline quick-quote forms. POST-DEPLOY: verify 7 new form names in Netlify Forms dashboard + n8n alert coverage | HIGH (Adam) |
| **NEW 2026-06-02: Brand gold hex drift** — SKILL.md design audit line says `#C9A84C`; style.css `--color-gold` ships `#8B6E24`. Confirm new gold + update SKILL.md, or revert. Likely intentional Phase A brand pivot — needs SKILL.md sync, not site revert | LOW (Adam) |
| **NEW 2026-06-01: Homepage MortgageBroker vs about LocalBusiness schema** — both schema.org-valid. MortgageBroker more specific. 2-file unification opportunity | LOW (Adam) |
| Homepage title pipe normalization (HIGH_RISK deferred) — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + 107-char title. Adam decision: simple pipe fix or "complicated income" rewrite | MEDIUM (Adam) |
| ~~/get-preapproved title~~ **RESOLVED 2026-06-09** — now "Fast Pre-Approval", pipes normalized. Hutto title keeps "Same-Day" per Decision 2(a) | — |
| SKILL.md infrastructure question — should BLOCKERS.md live inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| ~~Calculator P0-A 12× PITI bug~~ **FIXED 2026-06-09** (commit f6c4080) along with P0-C/D/E from the same patch file | — |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **63 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **29/29** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (**42 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**21 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — 5/7 ranking. Remaining: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` not in top 10. Audit vs CMRE/Capital Home/Stephanie Donnell + Newfi/Easy Street/TX Premier | HIGH |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| ~~Suburb quick-form Ads conversions~~ **FIXED IN CODE 2026-06-09** — all quick forms now land on /thank-you where the Ads conversion fires. Adam: confirm counts in Ads UI | MEDIUM (Adam) |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**42 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| Sitewide nav inconsistency (2026-05-17) — ~75 pages still have older nav vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| ~~thank-you.html performance claims~~ **RESOLVED 2026-06-09** per Decision 2(a) — now "one business day" phrasing | — |

## What's Next

**Wed 2026-06-10 = Suburb Page Deep Dive + AEO rotation** per SKILL.md.

Priorities (in order):
1. **POST-DEPLOY VERIFICATION of 2026-06-09 batch** — confirm 7 new Netlify form names registered (Netlify Forms dashboard), live-test one quick-quote submission end-to-end (form → /thank-you → lead-intake → n8n alert), verify buydown calculator math with annual tax/ins input, spot-check 3 USDA-repositioned pages render correctly.
2. **GSC**: resubmit sitemap (now 131 URLs after satellite consolidation) + URL-inspect the 8 USDA-repositioned pages and 3 deleted satellites (should show 301).
3. **Wednesday rotation** — suburb deep dive: Cedar Park (now has inline form; still NR — content/citation gap remains).
4. **🎯 AggregateRating policy decision** (STILL OPEN — Adam) — highest-confidence competitive lever: re-add `AggregateRating` w/ VERIFIED count to `/self-employed-mortgage-austin.html` (#2) + `/loans/jumbo.html` (#2). LendFriend (#1 both) has no FAQPage/AggregateRating.
5. **Homepage title pipe normalization** (HIGH_RISK, Adam call) — still open.
6. **Schema-type unification** (MortgageBroker vs LocalBusiness) + **gold hex** SKILL.md sync — both Adam-gated carries.
7. **Blog freshness** — latest post 2026-05-30; surface to `styer-content-weekly`.

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
