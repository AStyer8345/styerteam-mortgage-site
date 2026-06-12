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

**2026-06-12 (styer-site-daily Friday — Content Planning + AEO Review): clean verification day, 0 site-HTML mutations.** Sitemap/robots 200; conversion **10/10** (HTML-token, redirects followed). **Blog CTA coverage 34/34** — every post links to /get-preapproved or /refinance-quote. **AEO audit of 2 complicated-income posts** (`2026-06-05-dscr-cash-out-refinance-texas-brrrr` + `2026-04-02-self-employed-mortgage-austin-tx`) — both **AEO-excellent**: natural-language FAQ Qs, answer-first responses, extractable answer-first intros, FAQPage schema. No defect → no edit (surgical discipline). **Blog freshness at exact 7-day boundary** (latest 2026-06-05) — surfaced to `styer-content-weekly` as due-now (tips past window Sat 06-13). SEO/SEM backlog **0 site-eligible** (open items all done-elsewhere / Adam-awareness-only / Adam-gated); BLOCKERS clean; loanos-clone backlog NOT mutated (paused-LoanOS deploy guard). Design spot-check (homepage + about) clean — hero CTAs route to #contact-form by design (Decision Q10), brand intact, zero legacy entity names. NotebookLM script absent (71st). Sister-task gbp-posts left unstaged.

**2026-06-11 (styer-site-daily Thursday — Internal Linking + Funnel Flow): 1 commit, 7 files — honeypot ship.** Added `netlify-honeypot="bot-field"` + hidden `bot-field` input to all 7 inline quick-quote forms (kyle, cedar-park, dscr, bank-statement, self-employed, non-qm, hnw), matching the `/get-preapproved` spam pattern (commit `ed49bd8`). **Verified 7/7 live** — HTTP 200, bot-field served, form-name intact. Conversion **10/10**. **Funnel trace intact end-to-end:** all 7 forms `action="/thank-you"` → `thank_you_page_view` fires Ads conversion (Decision 3). **Re-Verify Gate re-characterized prequal "conversion parity" MEDIUM→LOW.** NotebookLM script absent (70th).

**2026-06-10 (styer-site-daily Wednesday — Suburb Deep Dive + AEO): clean verification run, 0 site-HTML mutations.** Sitemap/robots 200; **131 live = 131 local** (satellite consolidation deployed); conversion **10/10** (HTML-token, redirects followed). **Post-deploy verification of the 2026-06-09 6-commit batch — 100% GREEN:** (1) 7 new inline quick-quote forms all live HTTP 200, `data-netlify="true"` + matching `form-name` in source, functionally complete (name/email/phone/TCPA) — Netlify strips the attr from served HTML post-build (expected). (2) Buydown **P0-A 12× PITI bug FIXED & LIVE** (`taxFreq === 'yr'` confirmed live) + P0-E Chart.js render-block fixed live. (3) USDA repositioning HELD — 3/3 spot-checked (smithville/kyle/san-marcos: 0 USDA in headers, mentions −70%). (4) Decision-2a "24-hour" sweep held on LP pages (0 residual; same-day kept). **Cedar Park deep dive: on-page complete + AEO-excellent** (direct-answer hero, question H2s, answer-first 5-Q FAQ w/ local data, FAQPage+BreadcrumbList+Speakable, EEAT byline) — no defect; "NR" is an off-page citation gap (Adam-owned). **Re-Verify Gate cleared 5 stale carries** (memo answered+executed; P0-A fixed) via CONTEXT-vs-Tuesday-run-log reconciliation. SEO/SEM backlog 0-eligible; BLOCKERS clean. NotebookLM script absent (69th).

*(2026-06-09 entries — interactive Phase 2/3 build + Tuesday Title/Meta — rolled into CHANGELOG; all work verified live 2026-06-10.)*

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
| ~~Calculator P0-A 12× PITI bug~~ **FIXED 2026-06-09 + VERIFIED LIVE 2026-06-10** (`taxFreq === 'yr'` on served page) — RESOLVED | — |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **71 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **32/32** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 7 in-card "Get Pre-Approved" route to raw 1003 (**50 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**29 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — 5/7 ranking. Remaining: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` not in top 10. Audit vs CMRE/Capital Home/Stephanie Donnell + Newfi/Easy Street/TX Premier | HIGH |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| ~~Suburb quick-form Ads conversions~~ **FIXED IN CODE 2026-06-09** — all quick forms now land on /thank-you where the Ads conversion fires. Adam: confirm counts in Ads UI | MEDIUM (Adam) |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**42 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| ~~Sitewide nav inconsistency~~ **CLOSED 2026-06-09 evening** — canonical header on 148 pages + 4 generator templates; bare-header sticky CSS bug fixed (blog scroll overlap) | — |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| ~~thank-you.html performance claims~~ **RESOLVED 2026-06-09** per Decision 2(a) — now "one business day" phrasing | — |

## What's Next

**Sat 2026-06-13 = weekend** (scheduler may fire recovery). If it runs: Steps 1–2 non-negotiables (sitemap/conversion) + Step 5 design spot-check, then:

Priorities (in order):
1. **Blog freshness — PAST window (8 days Sat).** Hard-surface to `styer-content-weekly`: new post due. Latest = 2026-06-05; serve "complicated income" positioning (DSCR/self-employed/bank-statement/jumbo).
2. **prequal.html granular event (LOW, Adam-gated)** — optional analytics-granularity add only; conversion ALREADY fires via /thank-you. Do NOT auto-ship (touches conversion plumbing).
3. **🎯 AggregateRating policy decision** (Adam) — highest-confidence competitive lever for self-employed #2→#1 + jumbo #2. Blocked only on Adam confirming a VERIFIED review count (will not fabricate).
4. **Homepage title pipe** (HIGH_RISK, Adam) + **schema-type unification** + **gold hex SKILL.md sync** — Adam-gated carries.
5. **GSC** (Adam UI): URL-inspect the 8 USDA-repositioned pages + 3 deleted satellites (should show 301); confirm sitemap shows Success.
6. **Next weekday rotation: Mon = Schema + Google Ads QF + AEO Entity Audit.**

**DONE 2026-06-12:** Friday AEO audit (2 posts AEO-excellent, no defect); blog CTA 34/34; conversion 10/10; design spot-check clean.

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
