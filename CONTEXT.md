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

**2026-06-18 (styer-site-daily Thursday — rotation: Internal Linking + Funnel Flow): 3 files edited, verified live.** Sitemap/robots **200**; conversion **10/10**. Funnel trace on all 5 form-equipped suburb pages found a real **conversion-tracking break on 3 of them** — austin-area, buda, westlake quick-quote forms had `data-netlify` but **no `action`**, so submissions hit Netlify's default page (bypassing /thank-you → no `generate_lead`/`thank_you_page_view` fire; real leads saw a bare Netlify page). Fixed with `action="/thank-you"` to match known-good cedar-park/kyle. Commit `c519c4e`, deploy `ready`, all 5 verified routing to /thank-you live. Internal linking 3 pages ✅; blog fresh (06-16). Netlify Lighthouse (mobile home): Perf 81 / A11y 100 / BP 100 / SEO 100. NotebookLM script absent (77th). Learning: Netlify post-processing rewrites form attrs (double→single quote, alpha reorder) — verify quote-agnostic + via deploy permalink/API.

*(2026-06-17 Wed — Georgetown suburb deep-dive audit, on-page excellent 0 defects, 4 JSON-LD valid; surfaced 5/25 inline-form gap; 0 mutations — rolled up.)*

**2026-06-16 (styer-site-daily Tuesday — Title Tags + Meta Descriptions): 3 files edited, verified live.** Audited 20 money-page titles + metas; 3 deficient metas fixed (self-employed 131→158, dscr 137→156, loans/va removed "lowest rates" superlative ×4). Commit `7bafb4e`. fha.html "broker" vs correspondent-lender positioning flagged (Adam).

**2026-06-15 (styer-site-daily Monday — Schema + AEO entity audit): clean verification, 0 mutations.** Homepage 3/3 JSON-LD valid; Person consistent homepage↔about; entity-name hygiene clean; "complicated income" positioning pivot LIVE. **🟢 BLOG FRESHNESS RESOLVED** (06-14 posts live). Conversion 10/10.

*(2026-06-22 styer-competitive-weekly Wk 16 — research only: BROAD RECOVERY — Wk15 pullback was WebSearch noise, nearly all reverted. Asset-depl back **#1** (moat intact), self-emp **#1** blog, jumbo **#2**, 1099 **#3**; bank-stmt #8 lone decliner. ★ get-pre-approved DEBUTS #7 (first core top-10). Suburbs: Pflugerville **#1**, Kyle **#3**. **Re-Verify correction: "LendFriend no FAQPage" was FALSE (curl+grep) — both carry FAQPage; real gap = AggregateRating, symmetric.** Report `run-logs/competitive/2026-06-22.md`.)*

*(2026-06-15 styer-competitive-weekly Wk 15 — research only: Phase A cluster PULLBACK [SUPERSEDED by Wk16 — was composition noise]. Full report `run-logs/competitive/2026-06-15.md`.)*

*(2026-06-13/06-14 — clean verification days, 0 mutations, conversion 10/10 — rolled up.)*

*(2026-06-11/06-12 — Thu honeypot ship (commit `ed49bd8`, 7 inline forms, verified live) + Fri Content/AEO review (blog CTA 34/34, 2 complicated-income posts AEO-excellent) — rolled into CHANGELOG; all verified live.)*

*(2026-06-09/06-10 entries — interactive Phase 2/3 build + post-deploy verification — rolled into CHANGELOG; all work verified live.)*

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
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **75 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **32/32** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| Suburb inline-form coverage **5/25** — only austin-area/buda/cedar-park/kyle/westlake carry an inline quick-quote form; other 20 (incl. Georgetown, now ranking #7) lack the `/thank-you`-form pattern. Batch worth approving but it's a form change (Adam gate) + needs n8n alert mapping for 20 new form-names. Sister-task (styer-suburb-editor-daily) domain | MEDIUM (Adam) |
| products.html 7 in-card "Get Pre-Approved" route to raw 1003 (**51 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**30 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — **Wk 16 RECOVERY: 4 of 5 gained/recovered** (self-emp **#1** blog, asset-depl **#1** ★, jumbo **#2**, 1099 **#3** best; bank-stmt **#8** lone decliner). **✅ Asset-depletion moat INTACT — back at #1; the Wk15 "#6" was WebSearch composition noise, not a real drop. Manual-verify flag CLEARED.** Remaining outright gaps: `/non-qm-loans.html` (CMRE #1) + `/dscr-loan-austin-tx.html` (Newfi #1). | MEDIUM |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| ~~Suburb quick-form Ads conversions~~ **FULLY FIXED 2026-06-18** — austin-area/buda/westlake forms were silently missing `action="/thank-you"` (only cedar-park/kyle had it); all 5 now route to /thank-you where the Ads conversion fires (commit `c519c4e`, verified live). Adam: (a) confirm counts rise in Ads UI; (b) check Netlify Forms for past austin-area-quote/buda-quote/westlake-quote submissions that may have come in without a matching conversion | MEDIUM (Adam) |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**42 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| ~~Sitewide nav inconsistency~~ **CLOSED 2026-06-09 evening** — canonical header on 148 pages + 4 generator templates; bare-header sticky CSS bug fixed (blog scroll overlap) | — |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| ~~thank-you.html performance claims~~ **RESOLVED 2026-06-09** per Decision 2(a) — now "one business day" phrasing | — |

## What's Next

**Fri 2026-06-19 = next weekday — rotation: Content Planning + AEO Review.**

Priorities (in order):
1. **Steps 1–2 non-negotiables** (sitemap/robots 200, conversion 10/10 HTML-token, absolute tool paths). **Quote-agnostic** greps (Netlify rewrites attr quotes).
2. **Blog freshness** — /blog last-post date; if >7 days, flag weekly-content task.
3. **Blog CTA audit** — every post links to /get-preapproved or /refinance-quote.
4. **AEO** — pick 2 blog posts: FAQ answers lead with direct answer? H2s phrased as AI-style questions? Extractable summary near top?
5. **Re-verify yesterday's funnel fix held** — all 5 suburb forms (austin-area/buda/westlake/cedar-park/kyle) still route to /thank-you.
6. **Adam-gated carries:** suburb inline-form 5/25 batch · fha.html "broker" · AggregateRating policy · homepage title pipe · schema-type unification · gold hex SKILL.md sync.

**DONE 2026-06-18:** Steps 1–2 (sitemap/conversion 10/10); Thursday funnel trace — found + fixed conversion-tracking break on 3 of 5 form-equipped suburb pages (austin-area/buda/westlake missing `action="/thank-you"`), all 5 verified live; internal linking 3 pages ✅; blog fresh; SEO/SEM clean.

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
