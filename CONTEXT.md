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

**2026-06-03 (styer-site-daily Wednesday rotation): Suburb Page Deep Dive + AEO — Kyle.** 0-mutation discipline run. Kyle audit: structural 7/9 (✅ FAQPage + BreadcrumbList + city H1 + answer-first AEO + 3 question-form H2s + 2 /calculators links; ❌ missing inline lead-capture form + 0 `/get-preapproved` links). 5 USDA voice-guide violations on Kyle (schema description + 2 FAQ schema entries + H4/paragraph + accordion FAQ) — refines existing carry: USDA cluster now 5 suburbs (Smithville/Elgin/Florence/Jarrell + **Kyle**); Round Rock 2026-04-29 playbook is precedent for batch cleanup. 3 GOALS.md performance-metric claims on Kyle (Same-day pre-approval / pre-approval in 24 hours × 2) confirm perf-claim pattern recurs across 24-suburb cluster — material scope expansion beyond the 3 headline-page carries. **Carry refinement**: complicated-income 0-CTAs grew 8 cluster → 32 pages (8 cluster + 24 suburb all route through `/scenario.html`, not tracked LPs) — material funnel-architecture decision for Adam, reframed as "does scenario.html absorb the funnel OR should tracked LPs run in parallel for Google Ads attribution?". T+15h propagation check: yesterday's 2 title fixes verified live. Conversion tracking 10/10. NotebookLM 62nd dead run.

**2026-06-02 (styer-site-daily Tuesday rotation): Title Tags + Meta Descriptions.** 2 LOW_RISK within-page-consistency fixes: `texas-complaint-notice.html` title aligned to `HyperSmart Home Loans | NMLS #2653540`; `rate-buydown-calculator.html` twitter:title aligned to og:title. Title/meta distributions generated. 0 duplicate titles/descs. NEW LOW carry: brand gold hex drift `#C9A84C` → `#8B6E24`. Conversion tracking 10/10. NotebookLM 61st dead run.

**2026-06-01 (styer-site-daily Monday rotation): Schema + AEO + Google Ads.** 3-line sitemap.xml lastmod bump. Re-Verify Gate clean. Cache-buster rolled to `?v=20260531`. NEW LOW carry: homepage MortgageBroker vs about LocalBusiness schema type inconsistency.

## Active Blockers

| Item | Priority |
|------|----------|
| **NEW 2026-06-03 (carry refinement): USDA cluster grew 4→5 suburbs.** Kyle joins Smithville/Elgin/Florence/Jarrell with 5 USDA surfaces (schema description + 2 FAQ entries + H4/paragraph + accordion FAQ). Round Rock 2026-04-29 cleared 3 surfaces via Decision Test (voice guide rules; reversible). Cluster scope ~25 edits. Recommend Adam batch-approve cleanup | MEDIUM (Adam) |
| **NEW 2026-06-03 (carry refinement): Complicated-income 0-CTAs scope grew 8→32 pages.** 8 cluster pages + 24 suburb pages all route through `/scenario.html` / `/contact.html` / Calendly / 1003-direct / `tel:` — none surface `/get-preapproved` or `/refinance-quote`. Decision Q: does scenario.html absorb the funnel cleanly post-2026-05-28 hub launch, OR should tracked LPs run in parallel for Google Ads attribution? | MEDIUM (Adam) |
| **NEW 2026-06-03: Kyle missing inline lead-capture form** — other top-ranked suburbs surface inline form per SKILL.md Wed checklist. Adam UX decision | MEDIUM (Adam) |
| **NEW 2026-06-02: Brand gold hex drift** — SKILL.md design audit line says `#C9A84C`; style.css `--color-gold` ships `#8B6E24`. Confirm new gold + update SKILL.md, or revert. Likely intentional Phase A brand pivot — needs SKILL.md sync, not site revert | LOW (Adam) |
| **NEW 2026-06-01: Homepage MortgageBroker vs about LocalBusiness schema** — both schema.org-valid. MortgageBroker more specific. 2-file unification opportunity | LOW (Adam) |
| Homepage title pipe normalization (HIGH_RISK deferred) — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + 107-char title. Adam decision: simple pipe fix or "complicated income" rewrite | MEDIUM (Adam) |
| `/get-preapproved.html` title (MEDIUM_RISK paid LP) — missing pipe + `24-Hour Turnaround` performance claim. GOALS.md vs voice-guide tension | MEDIUM (Adam) |
| `/hutto-mortgage-lender.html` title — Same-Day Pre-Approval claim + missing NMLS tail. Hutto currently #2 ranking | LOW (Adam) |
| SKILL.md infrastructure question — should BLOCKERS.md live inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| Calculator P0-A 12× inflated PITI bug — `rate-buydown-calculator.html` lines 1032-1033, patch on disk, **46 carries** | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **62 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **28/28** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (**41 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**20 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — 5/7 ranking. Remaining: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` not in top 10. Audit vs CMRE/Capital Home/Stephanie Donnell + Newfi/Easy Street/TX Premier | HIGH |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**41 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| Sitewide nav inconsistency (2026-05-17) — ~75 pages still have older nav vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| `thank-you.html` lines 459/468/469 performance claims (6 carries) — GOALS.md vs voice-guide tension | MEDIUM (Adam) |

## What's Next

**Thu 2026-06-04 styer-site-daily = Internal Linking + Funnel Flow rotation** per SKILL.md.

Site-daily priorities:
1. **Thursday rotation execution** — pick 3 pages, verify each links to 2+ relevant pages. Trace full funnel: homepage → landing page → form → thank-you. Special attention to **suburb-cluster funnel architecture** — quantify how many of 24 suburb pages surface tracked LPs (`/get-preapproved`/`/refinance-quote`) at all. Hypothesis from today's Kyle audit: very few.
2. **USDA cluster batch-edit scoping** — stage the exact diff that would clear all ~25 surfaces across 5 suburbs (Smithville/Elgin/Florence/Jarrell + Kyle). Save to FLAG_FOR_ADAM as ready-to-apply patch. Don't commit — just stage. Round Rock 2026-04-29 is the playbook.
3. **Performance-metric sitewide footprint scan** — spot-check across the 24 suburbs to quantify Same-day / 24-hour claim instances. Hypothesis: 15-20 of 24 suburbs.
4. **NEW LOW carry — brand gold hex confirm** — Adam decision: update SKILL.md to `#8B6E24` or revert style.css to `#C9A84C`.
5. **Schema-type unification carry** — Monday's MortgageBroker vs LocalBusiness still pending Adam decision.
6. **Phase A complicated-income tail closure** — audit `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` vs top-3 competitors.
7. **products.html 10 in-card 1003 routing (41-run carry)** — re-surface for Adam decision.
8. **Cache-buster sweep** — if Adam rolls another `?v=...` overnight, run 5-sample sweep early.

Audit roadmap (`SEO-AUDIT-2026-05.md`): 3.2 VA Austin · ~~3.3 Physician~~ ✅ · 3.4 ITIN TX · 3.5 Foreign National TX · Phase 2 external (`SEO-PHASE2-CHECKLIST.md`).

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors, scenario |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
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
