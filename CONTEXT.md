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

**2026-06-02 (styer-site-daily Tuesday rotation): Title Tags + Meta Descriptions.** 2 LOW_RISK within-page-consistency fixes shipped: `texas-complaint-notice.html` title aligned to `HyperSmart Home Loans | NMLS #2653540` (matches og:title body + privacy/terms legal-page convention); `rate-buydown-calculator.html` twitter:title aligned to existing og:title. Sitewide title-length distribution generated (67 ideal / 32 over-65 / 4 admin / 1 verification); meta-description distribution generated (77 ideal / 14 short / 0 long / 10 missing — 9/10 missing correctly noindex'd). 0 duplicate titles + 0 duplicate descriptions via Python set-dedup. **NEW LOW carry**: brand gold hex drift `#C9A84C` (SKILL.md spec) → `#8B6E24` (current style.css `--color-gold`) — Adam-deliberate Phase A pivot likely; SKILL.md doc-drift, not site-drift. **Carry refinement**: scenario.html title `Start Here | Adam Styer Mortgage` demoted from "should be fixed" to "Adam style decision" — `llms.txt:1` + `tests/aeo-structure-regression.test.js:38` both explicitly use+assert the phrase as valid colloquial brand identifier. Conversion tracking 10/10. Cache-buster `?v=20260531` stable sitewide. NotebookLM 61st dead run.

**2026-06-01 (styer-site-daily Monday rotation): Schema + AEO + Google Ads.** 3-line sitemap.xml lastmod bump (homepage `/` + scenarios.html + scenarios/oil-gas — 2026-05-18/2026-05-28 → 2026-05-31; surfaces Adam's `f3f8f07`+`15e8119`+`0e54435` homepage AEO/conversion rewrite to GSC). Re-Verify Gate clean: sitemap live=local=131, conversion tracking 10/10, legacy entity scrub 0/0/0, title pipe 35/37 (carry holds). Physician post AEO answer-first structure verified at correct date-prefixed URL. Cache-buster rolled `?v=20260530b` → `?v=20260531` sitewide. NEW LOW carry: homepage MortgageBroker vs about LocalBusiness schema type inconsistency.

## Active Blockers

| Item | Priority |
|------|----------|
| **NEW 2026-06-02: Brand gold hex drift** — SKILL.md design audit line says `#C9A84C`; style.css `--color-gold` ships `#8B6E24`. Confirm new gold + update SKILL.md, or revert. Likely intentional Phase A brand pivot — needs SKILL.md sync, not site revert | LOW (Adam) |
| **NEW 2026-06-01: Homepage MortgageBroker vs about LocalBusiness schema** — both schema.org-valid. MortgageBroker more specific. 2-file unification opportunity | LOW (Adam) |
| Homepage title pipe normalization (HIGH_RISK deferred) — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + 107-char title. Adam decision: simple pipe fix or "complicated income" rewrite | MEDIUM (Adam) |
| `/get-preapproved.html` title (MEDIUM_RISK paid LP) — missing pipe + `24-Hour Turnaround` performance claim. GOALS.md vs voice-guide tension | MEDIUM (Adam) |
| `/hutto-mortgage-lender.html` title — Same-Day Pre-Approval claim + missing NMLS tail. Hutto currently #2 ranking | LOW (Adam) |
| SKILL.md infrastructure question — should BLOCKERS.md live inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| Calculator P0-A 12× inflated PITI bug — `rate-buydown-calculator.html` lines 1032-1033, patch on disk, **45 carries** | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **61 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **27/27** consecutive periods — provision dedicated key or accept permanent UNVERIFIED | HIGH (Adam) |
| Homepage/mobile CTAs route to `#contact-form` quick form (Q10). Open: whether to ALSO surface direct `/get-preapproved` or `/refinance-quote` path | MEDIUM (Adam) |
| Homepage body-copy references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (lines 455/492/861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (**40 carries**; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander (**19 carries**) | HIGH (Adam) |
| Complicated-income SERP gap — 5/7 ranking. Remaining: `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` not in top 10. Audit vs CMRE/Capital Home/Stephanie Donnell + Newfi/Easy Street/TX Premier | HIGH |
| Hedged claims to verify (2026-05-17) — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure + missing FAQPage schema (**40 carries**, paused per GOALS.md no-content policy) | MEDIUM |
| Sitewide nav inconsistency (2026-05-17) — ~75 pages still have older nav vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity, suburb `/calculators` linking gap, suburb `About Adam` standalone | LOW (Adam) |
| 5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema | LOW |
| Scheduler reliability — Wed 5-20, Wed 5-27, Fri 5-29, Sat 5-30 full-rotation no-fires (4 weekend recovery fires in 14 days) | HIGH (Adam) |
| Complicated-income cluster 0 funnel CTAs to tracked LPs (5 carries) — 8 cluster pages route through 1003 / Calendly / contact / tel: only | MEDIUM (Adam) |
| `thank-you.html` lines 459/468/469 performance claims (5 carries) — GOALS.md vs voice-guide tension | MEDIUM (Adam) |

## What's Next

**Wed 2026-06-03 styer-site-daily = Suburb Page Deep Dive + AEO rotation** per SKILL.md.

Site-daily priorities:
1. **Wednesday rotation execution** — pick next suburb in rotation cycle (Round Rock → Cedar Park → Leander → Georgetown → Pflugerville → Kyle → San Marcos → Westlake → Buda). Check 2026-05-27/2026-05-28 Wednesday log for last city audited. Audit: inline lead capture form, FAQPage schema, BreadcrumbList, city-specific H1, internal links to /get-preapproved + /calculators, AEO answer-first paragraph.
2. **Verify today's compliance fixes propagate live** — after Netlify overnight deploy, 2-curl check on `texas-complaint-notice.html` title + `rate-buydown-calculator.html` twitter:title.
3. **NEW LOW carry — brand gold hex confirm** — Adam decision: update SKILL.md to `#8B6E24` or revert style.css to `#C9A84C`.
4. **Schema-type unification carry** — Monday's MortgageBroker vs LocalBusiness still pending Adam decision.
5. **Phase A complicated-income tail closure** — audit `/non-qm-loans.html` + `/dscr-loan-austin-tx.html` vs top-3 competitors. Compare word count, FAQPage schema, AggregateRating, inbound internal links from the 5 Phase A wins.
6. **Cedar Park "broker beats branch" framing** — lone suburb gap (CrossCountry owns 2 of top 10). Apply Hutto playbook if Wednesday rotation lands here.
7. **Leander + Kyle recovery** — both ↓2 in Wk 13. TODO carries page-deepening urgent.
8. **products.html 10 in-card 1003 routing (40-run carry)** — re-surface for Adam decision on unifying per-card CTAs.
9. **Cache-buster sweep** — if Adam rolls another `?v=...` overnight, run 5-sample sweep early.

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
