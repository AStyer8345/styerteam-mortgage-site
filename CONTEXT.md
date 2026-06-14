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

**2026-06-14 (styer-site-daily Sunday — weekend recovery fire): clean verification day, 0 site-HTML mutations.** Per Sat TOMORROW_PRIORITY: Steps 1–2 non-negotiables + Step 5 design spot-check + blog-freshness re-check. Sitemap/robots **200**; conversion **10/10** (HTML-token, redirects followed). Homepage spot-check clean — navy + GTM `PQQ6PGLR` + HyperSmart (13×), personal NMLS 513013 (15×) + company 2653540 (3×), old company 2526130 = 0, zero legacy display names (`styerteam` ×6 = retained social URLs only). **Re-Verify Gate** on the lone "21-day" token → line 493 `Closed in 21 days` scenario-outcome card (real closed file), NOT the banned trust-strip claim — kept by Decision-2, no edit. **Blog now 9 days stale (PAST window)** — re-surfaced to `styer-content-weekly` (latest 2026-06-05; content task owns authoring, not a FLAG; 2nd consecutive surface). SEO/SEM backlog **0 site-eligible**; BLOCKERS clean; loanos-clone NOT mutated (paused-LoanOS deploy guard). NotebookLM script absent (73rd).

**2026-06-13 (styer-site-daily Saturday — weekend recovery fire): clean verification day, 0 site-HTML mutations.** Per Fri TOMORROW_PRIORITY: Steps 1–2 non-negotiables + Step 5 design spot-check + deferred blog-freshness hard-surface. Sitemap/robots **200**; conversion **10/10** (HTML-token, redirects followed — note form `action='/thank-you'` is single-quoted, use quote-agnostic grep). LP light compliance pass clean (TCPA + both NMLS present, zero legacy names, zero banned 21-day trust claims). **Blog now 8 days stale (PAST window)** — hard-surfaced to `styer-content-weekly` (latest 2026-06-05; content task owns it, not a FLAG). Design spot-check homepage clean — navy intact, HyperSmart branding, no legacy names. **NET-NEW LOW awareness:** one "Closed in 21 days" token = a real scenario-outcome card, NOT the banned sitewide "21-Day Avg. Close" trust claim — kept by Decision-2 precedent (real outcome facts retained), no edit. SEO/SEM backlog **0 site-eligible**; BLOCKERS clean; loanos-clone NOT mutated (paused-LoanOS deploy guard). NotebookLM script absent (72nd). Sister-task gbp-posts left unstaged.

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
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **72 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **32/32** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 7 in-card "Get Pre-Approved" route to raw 1003 (**51 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**30 carries**) | HIGH (Adam) |
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

**Mon 2026-06-15 = next weekday — full rotation: Schema + Google Ads QF + AEO Entity Audit.**

Priorities (in order):
1. **Restate weekly GSC sitemap-Success reminder** (Monday cadence) + **AEO entity check** (Person + LocalBusiness/MortgageBroker schema consistent on homepage + about; first 150 words answer "best mortgage broker in Austin TX?" extractably) + **Rich Results Test** (homepage AggregateRating, DSCR FAQPage, one suburb).
2. **Blog freshness — PAST window (9+ days)** unless `styer-content-weekly` shipped. Re-check latest blog date; if still 2026-06-05, re-surface (DON'T author here — content task owns it). Serve "complicated income" positioning.
3. **🎯 AggregateRating policy decision** (Adam) — highest-confidence competitive lever for self-employed #2→#1 + jumbo #2. Blocked only on Adam confirming a VERIFIED review count (will not fabricate).
4. **Homepage title pipe** (HIGH_RISK, Adam) + **schema-type unification** + **gold hex SKILL.md sync** — Adam-gated carries.
5. **GSC** (Adam UI): URL-inspect the 8 USDA-repositioned pages + 3 deleted satellites; confirm sitemap shows Success.

**DONE 2026-06-14:** Steps 1–2 (sitemap/conversion 10/10), homepage design spot-check clean; "21-day" token re-verified per Re-Verify Gate (scenario-outcome, kept per Decision-2); blog freshness re-surfaced to styer-content-weekly (9 days, 2nd consecutive). 0 site mutations.

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
