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

**2026-08-19 SECOND RUN (styer-site-daily Thursday — Internal Linking + Funnel Flow): 1 LOW_RISK doc fix shipped + pushed.** Two runs fired on 08-19; this one ran the **Thursday** rotation rather than duplicate the AM Wednesday work, and left `run-logs/2026-08-19.md` intact (this run = `run-logs/2026-08-19-b.md`). Non-negotiables green (sitemap/robots/homepage + all 4 funnel pages **200**; sitemap **146**; conversion **10/10**). **Thursday rotation PASS, 0 site defects** — 10-page internal-link audit across the complicated-income cluster (9–22 main-body links each, vs a 2+ bar); `contact.html` wiring clean (Netlify + `form-name` + honeypot + `generate_lead`/`contact_form` + TCPA `required`); `thank-you.html` clean (Calendly widget, tel, 3-step). **Funnel traced end-to-end and documented:** the suburb path is **two hops** — 24 suburbs + area hub → `/scenario.html` → `/get-preapproved?intent=scenario` → form → `generate_lead` → `/thank-you`. Confirmed the `?intent=scenario` param **survives** the `_redirects:97` 301 and that `get-preapproved.html` reads it — the one place the two-hop funnel could have silently lost state. **Fixed 3 real defects in `ARCHITECTURE.md`** (commit `67f03c3`, docs only, no site files touched): removed a **phantom `calendly_click` event that exists in no bundle and no page** (real event is `book_call_click` — anything built on the phantom would never have fired); **retired the documented trust bar still containing "21-Day Avg. Close"**, a claim GOALS.md killed and that was swept from site HTML on 2026-05-17 (site clean, but the doc was the last thing still instructing agents to use it); documented the real 10-event / 8-`lead_type` inventory, the Calendly Qualification Gate, and the funnel topology so it stops being re-derived. **Three findings killed by the Re-Verify Gate** — a drafted HIGH ("dead CTA on `/scenario.html`") was my own quote-sensitive grep error (`href='...'` single-quoted, extensionless); the Calendly interceptor's alarming "0/100 exemptions" is correct because `/thank-you` embeds the widget and never matches the selector; and the AM run's suburb conclusion was right but its stated evidence was false (the homepage has **4** `/get-preapproved` CTAs, not 0). Stale-overlay hazard re-verified **HIGH and untouched** (52 entries, 12 deletions); commit isolation proven by dirty-count parity.

*(2026-08-19 AM — Wednesday Suburb Deep Dive + AEO): 1 LOW_RISK fix shipped + live-verified.* `self-employed-mortgage-austin.html` meta description was **181 chars** — truncating in SERPs on the page most central to the GOALS.md complicated-income positioning. Rewritten to **156** ("Self-employed in Austin TX? Qualify on bank statements, 1099, P&L, or asset depletion — not just tax returns. Compare 40+ lenders."), `dateModified` + sitemap `lastmod` → 2026-08-19. Commit `8833d36`, live-verified. Non-negotiables green (sitemap/robots/homepage **200**; sitemap **146** URLs; conversion **10/10** HTML-token — `phone_click` lives in `script.js`, not page bodies). **Westlake deep dive PASS, 0 defects** + batch survey of all 25 suburb pages (FAQPage 24/25, `MortgageBroker` entity 25/25, city H1 25/25, inline form 5/25). Missed **Tuesday title/meta rotation folded in**: 92 indexable pages, 0 duplicate titles, 0 duplicate metas, 1 real defect (fixed). New **sitemap↔canonical integrity check: 146/146 self-canonical, 0 gaps**. **Three findings killed by the Re-Verify Gate before surfacing, two of which would have shipped regressions** — the March-20 rates post is *correctly* absent from the sitemap (canonicalizes to the evergreen `/austin-mortgage-rates` hub); `loanos.html` is robots-Disallowed so its missing meta is not a defect; `LocalBusiness` "9/25" was a grep artifact (`MortgageBroker` is a LocalBusiness subtype, 25/25). 26 indexed titles exceed 65 chars — deliberately **not** touched (HIGH_RISK tier + live rank movement per the 08-17 competitive report). **Diagnosed the dirty working tree: it is a stale ~08-06 checkout overlay, not pending work** — see Active Blockers.

**2026-08-13 (interactive — universal mortgage intake form):** Simplified `/get-preapproved.html` from three problem-loan-oriented steps to two universal steps. Step 1 now asks only goal, property value, down payment/equity, area, and process stage; Step 2 captures contact details, optional context, and existing consent controls. The narrow form card now uses a uniform single-column field layout at every viewport width. Netlify, lead-intake, LoanOS/Mailchimp, UTM, GTM, validation, and thank-you routing remain connected. Full test suite passed (104 tests); browser checks passed at 1440×1000 and 390×844 with no horizontal overflow. Existing unrelated working-tree changes were left untouched.

**2026-07-22 (styer-site-daily Wednesday — Suburb Deep Dive + AEO): 1 ZERO_RISK fix shipped + verified live.** `sitemap.xml` was missing two indexable, 159-inbound-link calculators — `dscr-calculator.html` + `asset-depletion-calculator.html`, the two flagship *complicated-income* tools per GOALS.md. Added both (`lastmod` from real git dates) + backfilled `lastmod` on 3 entries lacking it. Sitemap **142 → 144 URLs**, XML valid, 0 dupes, commit `bba4de3`, live-verified. Audited all 18 sitemap absentees first — 16 correctly excluded (robots `Disallow` / `noindex` / dashboards / root-covered `index.html`). **San Marcos suburb deep dive PASS, 0 defects** (8 JSON-LD types valid, 5/5 answer-first FAQ, question-form H2s, city H1, NMLS ×8). Non-negotiables green (sitemap/robots/homepage/san-marcos **200**; conversion **10/10**). **Averted a HIGH false flag:** `/scenario.html` — the CTA target of all 25 suburb pages — shows 0 `generate_lead`/0 `/thank-you` in page HTML, but is tracked via `script.js:490` (`.js-quick-contact` → `lead_type: 'quick_contact'` → `/thank-you`). Funnel intact. Shipped through an isolated `git worktree` because a **concurrent session holds 9 dirty files + 9 unpushed commits**; shared tree left byte-identical.

**2026-07-18 (styer-site-daily Saturday — OFF-ROTATION): clean audit, 0 site mutations.** Saturday has no assigned Step 4 weekday rotation (Mon–Fri only) — ran non-negotiables + read-only backlog + design spot-check. Non-negotiables green (sitemap/robots/homepage **200** sandbox-disabled curl; conversion **10/10** HTML-token, matches 07-17 matrix; `action='/thank-you'` single-quote form still in effect). Design spot-check clean (about + dscr): GTM ×2, NMLS 513013 (about 11/dscr 15) + company 2653540 (about 6/dscr 7), 0 legacy entity, 0 "21-day"/"24-48". Backlog + BLOCKERS read-only (BLOCKERS clean); 3 open backlog items all content-creation (Adam-gated new-page / styer-content-weekly blog+PDF) — no un-gated site work remaining. `loanos-clone` untouched (paused-LoanOS guard). Scheduler fired today — 4th clean day in a row (07-15/16/17/18) after the 10-day outage.

*(2026-07-17 styer-site-daily Friday — Content Planning + AEO Review: clean audit, 0 mutations. Non-negotiables green; blog fresh (07-16, 1d); borrower blog CTA 40/40 (4 "missing" are realtor-updates w/ correct realtor CTA — not defects); 2 posts AEO-audited (07-16 new + 06-30), both excellent 0 defects; design spot-check clean (index + self-employed). Scheduler 3rd clean day.)*

*(2026-07-16 styer-site-daily Thursday — Internal Linking + Funnel Flow: clean audit, 0 mutations. Non-negotiables green; full funnel traced end-to-end, no leak; internal-link 2+ bar passed 3 pages. Competitive TOMORROW_PRIORITY (07-15) folded in — non-QM hub bidirectional + bank-statement AEO both already-satisfied → 0 manufactured edits.)*

*(2026-07-15 styer-site-daily Wednesday — Suburb Deep Dive → Kyle: 1 real fix shipped + verified live. Kyle FAQ "24 to 48 hours" pre-approval turnaround contradicted the page's own "same-day" meta/AEO/CTA — rewrote both JSON-LD + visible accordion to same-day; 3/3 JSON-LD valid, commit `0e5540e`, live HTTP 200. **⚠️ Scheduler 10-day outage: no runs 07-06 → 07-14, escalated — now recovered.**)*

*(2026-07-05 styer-site-daily Sunday — OFF-ROTATION, DOUBLE-FIRED 09:01 + 09:27: healthy funnel, clean audit, 0 mutations.)* Sunday has no assigned weekday rotation (Step 4 is Mon–Fri; Monday 07-06 owns Schema + AEO Entity). Ran non-negotiables + backlog + design spot-check. Sitemap/robots **200**; conversion **10/10** (HTML-token via `curl -L`). BLOCKERS clean; backlog's remaining open items are all Adam-gated new-page creation or sister-task-owned (no un-gated site work). `loanos-clone` untouched (writing backlog.md triggers a Vercel build of paused LoanOS). Design spot-check clean both fires (09:01 index + dscr; 09:27 about + products): GTM ×2, 0 legacy-entity drift, NMLS 513013, header nav, 0 "21-day" close claim, HyperSmart brand live. NotebookLM script absent (88th). **Scheduler: Wed 07-01 + Thu 07-02 + Fri 07-03 fired; Sat 07-04 no-fire; Sun 07-05 DOUBLE-fired (09:01 + 09:27) — second fire re-verified all non-negotiables green independently, changed nothing.** No commit/deploy (0 mutations).

*(2026-07-03 Fri — Content Planning + AEO Review: 1 real fix shipped + verified live. Blog CTA audit found 1 of 40 posts (06-23 no-ratio-DSCR) missing a `/get-preapproved`|`/refinance-quote` conversion CTA — added standardized `blog-dual-cta` block, commit `87fe207`, verified live, coverage 40/40. AEO on 2 newest posts excellent, 0 defects. 7 sitewide "21-day" matches verified benign. Scheduler fired 3 in a row.)*

*(2026-07-02 Thu — Internal Linking + Funnel Flow: clean audit, 0 mutations. Sitemap/robots 200; conversion 10/10. Full funnel traced end-to-end, all hops healthy, no leak (homepage quick form → /thank-you; Ads LPs → /thank-you; contact.html wiring healthy). Internal-link 2+ bar: contact 25+, conventional 35, va 33, non-qm 40 — all far exceed. Money-page `/get-preapproved`=0 by design (Decision 3). Design spot-check clean.)*

*(2026-07-01 Wed — Suburb Deep Dive + AEO → Pflugerville: clean audit, 0 mutations. `pflugerville-mortgage-lender.html` PASS, 4/4 JSON-LD valid, answer-first AEO + question-form H2s. Re-Verify Gate auto-resolved the queued 06-30 blog-freshness escalation.)*

*(2026-06-30 Tue — Title Tags + Meta Descriptions: clean audit, 0 mutations. 25 money/loan titles+metas — zero title superlatives, 23/25 metas in 150–160; va 148 + investor-loans 149 complete → padding=churn, left. Re-Verify cleared loans/va "Lowest rates" body label = benign factual comparative. Prior Tuesday fixes held. Blog then genuinely 06-23=7d → soft heads-up [now resolved 07-01].)*

*(2026-06-29 Mon — Schema + AEO Entity Audit: 1 LOW_RISK fix shipped + verified live. 16/16 JSON-LD valid (homepage/about/dscr/pflugerville); AEO entity consistency homepage↔about clean. about.html Person `sameAs` was missing NMLS Consumer Access (513013) + Yelp — added to E-E-A-T anchor page, commit `265cbb7`, verified live. Design spot-check clean; BLOCKERS clean.)*

*(2026-06-25 Thu — Internal Linking + Funnel Flow: clean audit, 0 mutations. Sitemap/robots 200; conversion 10/10. Full funnel traced end-to-end, all hops healthy (homepage quick form → /thank-you; Ads LPs → /thank-you; contact.html + 3 money pages inline form→/thank-you, each far exceed 2+ internal-link bar). No funnel leak. Money pages not linking /get-preapproved is BY DESIGN (Decision 3). Wed 06-24 Suburb Deep Dive scheduler no-fire.)*

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
| **NEW 2026-08-19 PM — SKILL.md drift, 3 confirmed items** (task file is Adam-owned, agent can't edit): (1) **Step 3's required trust bar still contains the retired "21-Day Avg. Close" claim** — the same defect just fixed in `ARCHITECTURE.md`; an agent following the checklist would re-add a claim GOALS.md killed, during the pre-audit compliance cleanup; (2) Step 8 says to update `styermortgage-context.md`, which is a 10-line **DEPRECATED** stub redirecting to the four-file system; (3) retired "Mortgage Solutions LP" HARD CONSTRAINT. Also the `#C9A84C` gold-hex row below | MEDIUM (Adam) |
| **Scheduler reliability — now failing in BOTH directions.** 08-19: **two runs fired on the same date** (AM Wednesday + PM Thursday rotation). Previously: this task logged ~2 runs in the 26 days since 07-24 (only `daily-opt` commit in that window was 08-16). Prior modes: 07-23 task-specific no-fire; 07-19/07-21 no-fire; 07-20 fired-but-unlogged (`c675929`); 07-06→07-14 outage. Cross-check `git log --since=<last-log-date>` against run-log filenames AND whether sister tasks fired before sizing any outage | HIGH (Adam) |
| **ESCALATED 2026-08-19 — the dirty working tree is a STALE ~08-06 CHECKOUT OVERLAY, not pending work.** Re-verified 08-19 PM: **52 dirty entries, 12 deletions**, unchanged in character. Proven by content hash: working-tree `index.html` is byte-identical to commit `3839302` (08-06); `get-preapproved.html`/`thank-you.html` → `8583fe4` (07-21); `script.js` → `ff30c31` (07-22); `analytics.js` → `ca05e1d` (07-11). The 11 "deletions" are August files that simply post-date the snapshot — all verified **live 200** (`blog/` + `updates/` August market report + its hero image, 3 `scripts/*.mjs`, 3 `seo-data/*`, 2 tests, `netlify/functions/lib/lead-qualification.js`). **A `git add -A` / `git commit -a` here would revert the homepage conversion simplification (`51c17ca`), the qualified-lead routing funnel (`758262a`), and the 08-13 intake-form rebuild, and delete the August report from the live site.** Only `about.html`, `contact.html`, `testimonials.html` are genuinely novel (07-24-era meta edits). Safe remediation: `git checkout -- <stale paths>`, keeping only those 3 for review. **`CONTEXT.md` + `CHANGELOG.md` were restored from HEAD on 08-19** (their stale copies would have deleted 6 August changelog entries); the 07-24 record they held is preserved in the now-committed `run-logs/2026-07-24.md` | HIGH (Adam) || ~~thank-you.html performance claims~~ **RESOLVED 2026-06-09** per Decision 2(a) — now "one business day" phrasing | — |

## What's Next

**Fri 2026-08-20 = next run — rotation: Content Planning + AEO Review.** (Thursday's rotation was completed early, on 08-19 PM.)

Priorities (in order):
1. **Steps 1–2 non-negotiables** (sitemap/robots 200, conversion 10/10 HTML-token, absolute `/usr/bin/*` binaries, `curl -L` **with sandbox disabled** — sandboxed Bash false-returns `000`). **Quote-agnostic + extensionless** greps (Netlify Pretty-URLs strips `.html` and rewrites attr quotes to single) — **this trap cost a near-miss HIGH on 08-19 PM despite already being in learnings.**
2. **Friday content work:** last blog post is `blog/2026-08-18-jumbo-loan-requirements-texas-2026.html` (freshness currently OK, <7d); audit blog CTAs for `/get-preapproved` | `/refinance-quote`; AEO answer-first review on 2 posts.
3. **Resolve JS-bound events through `script.js` + `analytics.js`** — do NOT judge `/scenario.html`, `/prequal.html`, `phone_click`, or any click event by page HTML alone. **`ARCHITECTURE.md` now carries the full verified event inventory — read it instead of re-deriving.**
4. **Do NOT re-flag these resolved-by-design findings:** suburb `/get-preapproved` 0/25 (two-hop routing via `/scenario.html`); `/scenario.html` having no form or `generate_lead` (routing hub); the Calendly interceptor's 0/100 exemptions (`/thank-you` embeds the widget, never matches the selector); the March-20 rates post's sitemap absence (non-self-canonical); `loanos.html`'s missing meta (robots-Disallowed); the `LocalBusiness` "9/25" gap (`MortgageBroker` is a subtype). All documented — re-verify before re-surfacing.
5. **Missed Monday-cadence items:** GSC sitemap-status reminder (expect **146** discovered URLs), weekly METRICS update, PSI re-attempt.
6. **Re-check the stale working-tree overlay.** Never `git add -A` / `git commit -a` in this repo — stage by explicit path only, and verify with `git show --stat HEAD` after every commit.
7. Suburb rotation cursor: next Wednesday = **Buda** (then wrap → restart at Round Rock).

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
