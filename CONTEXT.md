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

**2026-07-16 (styer-site-daily Thursday — Internal Linking + Funnel Flow): clean audit, 0 mutations.** Non-negotiables green (sitemap/robots **200** via sandbox-disabled curl — sandboxed Bash false-returns `000` on network; conversion **10/10** HTML-token). Full funnel traced end-to-end, no leak (homepage quick form → script.js:482-485 dataLayer(quick_contact) → /thank-you; Ads LPs → generate_lead+action=/thank-you; contact.html + thank-you.html healthy). Internal-link 2+ bar passed on 3 pages. **Competitive TOMORROW_PRIORITY (07-15) folded in — both un-gated asks already satisfied, no manufactured edits:** non-QM hub authority already bidirectional for all 4 named spokes (dateModified 06-26, not fake-bumped); bank-statement AEO already answer-first + 10-Q FAQPage w/ answer-lead text (its #7→#9 slide is competitive crowding, not a page defect). Design spot-check clean (non-qm + bank-statement). Concurrent-writer's uncommitted `round-rock-mortgage-lender.html` left untouched (explicit file-adds only). Scheduler fired today — recovery continuing (07-15 + 07-16 both fired after 10-day outage). `loanos-clone` untouched (paused-LoanOS guard).

*(2026-07-15 styer-site-daily Wednesday — Suburb Deep Dive → Kyle: 1 real fix shipped + verified live. Kyle FAQ "24 to 48 hours" pre-approval turnaround (retired Decision-2a speed variant) contradicted the page's own "same-day" meta/AEO/CTA — rewrote both JSON-LD + visible accordion to approved same-day framing; 3/3 JSON-LD valid, schema↔visible parity, commit `0e5540e`, live HTTP 200. Design spot-check (index+about) clean. Concurrent-writer conflict handled by stashing only the other session's `high-net-worth-mortgage.html`. **⚠️ Scheduler 10-day outage: no runs 07-06 → 07-14, escalated.**)*

*(2026-07-05 styer-site-daily Sunday — OFF-ROTATION, DOUBLE-FIRED 09:01 + 09:27: healthy funnel, clean audit, 0 mutations.)* Sunday has no assigned weekday rotation (Step 4 is Mon–Fri; Monday 07-06 owns Schema + AEO Entity). Ran non-negotiables + backlog + design spot-check. Sitemap/robots **200**; conversion **10/10** (HTML-token via `curl -L`). BLOCKERS clean; backlog's remaining open items are all Adam-gated new-page creation or sister-task-owned (no un-gated site work). `loanos-clone` untouched (writing backlog.md triggers a Vercel build of paused LoanOS). Design spot-check clean both fires (09:01 index + dscr; 09:27 about + products): GTM ×2, 0 legacy-entity drift, NMLS 513013, header nav, 0 "21-day" close claim, HyperSmart brand live. NotebookLM script absent (88th). **Scheduler: Wed 07-01 + Thu 07-02 + Fri 07-03 fired; Sat 07-04 no-fire; Sun 07-05 DOUBLE-fired (09:01 + 09:27) — second fire re-verified all non-negotiables green independently, changed nothing.** No commit/deploy (0 mutations).

*(2026-07-03 Fri — Content Planning + AEO Review: 1 real fix shipped + verified live. Blog CTA audit found 1 of 40 posts (06-23 no-ratio-DSCR) missing a `/get-preapproved`|`/refinance-quote` conversion CTA — added standardized `blog-dual-cta` block, commit `87fe207`, verified live, coverage 40/40. AEO on 2 newest posts excellent, 0 defects. 7 sitewide "21-day" matches verified benign. Scheduler fired 3 in a row.)*

*(2026-07-02 Thu — Internal Linking + Funnel Flow: clean audit, 0 mutations. Sitemap/robots 200; conversion 10/10. Full funnel traced end-to-end, all hops healthy, no leak (homepage quick form → /thank-you; Ads LPs → /thank-you; contact.html wiring healthy). Internal-link 2+ bar: contact 25+, conventional 35, va 33, non-qm 40 — all far exceed. Money-page `/get-preapproved`=0 by design (Decision 3). Design spot-check clean.)*

*(2026-07-01 Wed — Suburb Deep Dive + AEO → Pflugerville: clean audit, 0 mutations. `pflugerville-mortgage-lender.html` PASS, 4/4 JSON-LD valid, answer-first AEO + question-form H2s. Re-Verify Gate auto-resolved the queued 06-30 blog-freshness escalation.)*

*(2026-06-30 Tue — Title Tags + Meta Descriptions: clean audit, 0 mutations. 25 money/loan titles+metas — zero title superlatives, 23/25 metas in 150–160; va 148 + investor-loans 149 complete → padding=churn, left. Re-Verify cleared loans/va "Lowest rates" body label = benign factual comparative. Prior Tuesday fixes held. Blog then genuinely 06-23=7d → soft heads-up [now resolved 07-01].)*

*(2026-06-29 Mon — Schema + AEO Entity Audit: 1 LOW_RISK fix shipped + verified live. 16/16 JSON-LD valid (homepage/about/dscr/pflugerville); AEO entity consistency homepage↔about clean. about.html Person `sameAs` was missing NMLS Consumer Access (513013) + Yelp — added to E-E-A-T anchor page, commit `265cbb7`, verified live. Design spot-check clean; BLOCKERS clean.)*

*(2026-06-25 Thu — Internal Linking + Funnel Flow: clean audit, 0 mutations. Sitemap/robots 200; conversion 10/10. Full funnel traced end-to-end, all hops healthy (homepage quick form → /thank-you; Ads LPs → /thank-you; contact.html + 3 money pages inline form→/thank-you, each far exceed 2+ internal-link bar). No funnel leak. Money pages not linking /get-preapproved is BY DESIGN (Decision 3). Wed 06-24 Suburb Deep Dive scheduler no-fire.)*

*(2026-06-23 Tue — Title Tags + Meta Descriptions: 4 deficient metas fixed + deployed live, commit `b2241a6`; `mortgage-pre-approval-austin` dropped "24–48 hours" speed claim; entity hygiene held; last Tuesday fixes held.)*

*(2026-06-22 Mon — Schema + Google Ads Quality + AEO Entity Audit: clean audit, 0 mutations. 18/18 JSON-LD valid homepage/about/DSCR/round-rock; AEO entity hygiene clean post-transition; homepage extractable answer strong + on-positioning. New LOW: homepage MortgageBroker schema carries personal NMLS 513013 not company 2653540 (Adam-gated). Run-log files left uncommitted — picked up 06-23.)*

*(2026-06-18 Thu — Internal Linking + Funnel Flow: found + fixed real conversion-tracking break on 3 of 5 form suburb pages — austin-area/buda/westlake missing `action="/thank-you"`; commit `c519c4e`, all 5 verified live. Netlify Lighthouse mobile home: Perf 81/A11y 100/BP 100/SEO 100.)*

**2026-06-16 (styer-site-daily Tuesday — Title Tags + Meta Descriptions): 3 files edited, verified live.** Audited 20 money-page titles + metas; 3 deficient metas fixed (self-employed 131→158, dscr 137→156, loans/va removed "lowest rates" superlative ×4). Commit `7bafb4e`. fha.html "broker" vs correspondent-lender positioning flagged (Adam).

**2026-06-15 (styer-site-daily Monday — Schema + AEO entity audit): clean verification, 0 mutations.** Homepage 3/3 JSON-LD valid; Person consistent homepage↔about; entity-name hygiene clean; "complicated income" positioning pivot LIVE. **🟢 BLOG FRESHNESS RESOLVED** (06-14 posts live). Conversion 10/10.

*(2026-07-15 styer-competitive-weekly — FIRST run since Wk 16 (06-29/07-06/07-13 missed, scheduler outage): TWO structural WINS. **`non-qm loans austin tx` DEBUTS #1** (was NR every prior wk; out-ranks LendFriend #4; verified live HTTP 200 + FAQPage) — closes a persistent gap, validates wholesale-pricing leg. **Westlake #1** suburb rotation (San Marcos #10). Moat held: asset-depl **#1**, self-emp blog **#1**, jumbo **#2**. Tracked complicated-income top-10 **5→6 of 7**; #1s **2→3**; DSCR now sole gap. Lone decliner: bank-stmt **#8→#9** (3-run slide — site-daily content target). Head-term mean-reversion again (Barton Creek/Highlander/MortgageAustin all gave back Wk16 #1 reclaims). AggregateRating reconfirmed AEO-only → drop from blockers. Report `run-logs/competitive/2026-07-15.md`; TOMORROW_PRIORITY in run-logs/latest.md.)*

*(2026-06-22 styer-competitive-weekly Wk 16 — research only: BROAD RECOVERY — Wk15 pullback was WebSearch noise, nearly all reverted. Asset-depl back **#1** (moat intact), self-emp **#1** blog, jumbo **#2**, 1099 **#3**; bank-stmt #8 lone decliner. ★ get-pre-approved DEBUTS #7 (first core top-10). Suburbs: Pflugerville **#1**, Kyle **#3**. **Re-Verify correction: "LendFriend no FAQPage" was FALSE (curl+grep) — both carry FAQPage; real gap = AggregateRating, symmetric.** Report `run-logs/competitive/2026-06-22.md`.)*

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
| **NEW 2026-06-22: Homepage MortgageBroker JSON-LD carries personal NMLS 513013, not company NMLS 2653540** — displayed copy correct (both shown); decide whether business-entity schema should use company NMLS. Low confidence (broker entity named after originator may legitimately ref originator NMLS). Legal/NMLS identifier → Adam-gated | LOW (Adam) |
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
| **Scheduler reliability — 10-day outage 07-06 → 07-14 (last log 07-05); RECOVERY: fired 07-15 + 07-16.** Monitor for recurrence. Prior pattern was intermittent single-day no-fires; the 10-day gap was longest on record. If another multi-day gap appears, check scheduler/cron health directly | HIGH (Adam) |
| ~~thank-you.html performance claims~~ **RESOLVED 2026-06-09** per Decision 2(a) — now "one business day" phrasing | — |

## What's Next

**Fri 2026-07-17 = next weekday — rotation: Content Planning + AEO Review.**

Priorities (in order):
1. **Steps 1–2 non-negotiables** (sitemap/robots 200, conversion 10/10 HTML-token, absolute tool paths, `curl -L` **with sandbox disabled** — sandboxed Bash false-returns `000`). **Quote-agnostic + extensionless** greps (Netlify Pretty-URLs strips `.html` and rewrites attr quotes).
2. **Friday content/AEO:** `/blog` freshness (>7d → flag weekly-content task); blog CTA audit (last 40/40 — re-verify no new post missing `/get-preapproved`|`/refinance-quote`); AEO audit 2 blog posts (answer-first FAQ leads, question-form H2s, extractable summary near top).
3. **Suburb rotation cursor:** next Wednesday suburb = **San Marcos** (then Westlake → Buda → wrap). Kyle done 07-15.
4. **Adam-gated carries:** suburb inline-form 5/25 batch · fha.html "broker" · AggregateRating policy (DROP per competitive+memory) · homepage title pipe · schema-type unification · gold hex SKILL.md sync · homepage MortgageBroker NMLS (513013 vs 2653540) · task-file SKILL.md names retired "Mortgage Solutions LP" entity · scheduler reliability (monitor — recovering).

**DONE 2026-07-16 (Thu, Internal Linking + Funnel Flow):** Steps 1–2 green; full funnel traced no-leak; 2+ link bar passed 3 pages; competitive TOMORROW_PRIORITY folded in — non-QM hub bidirectional + bank-statement AEO both verified already-satisfied (0 manufactured edits); design spot-check clean; concurrent-writer round-rock untouched; loanos-clone untouched. Scheduler fired (recovery continuing).

**DONE 2026-07-03 (Fri):** Friday rotation — blog fresh (06-30); CTA audit fixed the lone gap (06-23 → dual-CTA block, commit `87fe207`, verified live, 40/40); AEO on 2 newest posts excellent; design spot-check clean (about+jumbo).

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
