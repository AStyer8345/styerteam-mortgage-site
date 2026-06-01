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

**2026-05-31 (styer-site-daily Sunday gap-day recovery): 0 mutations, 2 in-window auto-resolutions, race condition with Adam.** Wed 5-27 + Fri 5-29 + Sat 5-30 full-rotation fires all missed (4th gap-day recovery in this task's history). Re-Verify Gate, 13 claims: (1) PM 2026-05-28 finding "homepage `#contact-form` no `generate_lead` dataLayer push" **AUTO-RESOLVED** via Adam's `14935a5` + `0a72ac8` (sitewide `dispatchLeadSubmitted()` JS bridge). (2) AM-detected live↔local sitemap.xml drift (live=131, local=137, 11 distinct URLs) **AUTO-RESOLVED IN-WINDOW** via Adam's race-condition push of `1d09cc7 Normalize canonical URLs and internal links` + `f3f8f07 Simplify homepage conversion and AEO routing` — both touched sitemap.xml. Post-pull verify: live=131 = local=131 parity. **Race condition:** Adam pushed **8 commits during this run** (`6a39c52` → `12293d8` → `1d09cc7` → `15e8119` → `6572642` → `f3f8f07` → `8c32fd4` → `0e54435`); initial push rejected; rebase pulled cleanly (no conflicts). New Adam files: `llms.txt`, `tests/aeo-structure-regression.test.js`, `tests/lead-flow-regression.test.js`. **Monday batch verify:** Adam's homepage AEO/conversion rewrite may have addressed multiple Adam-pivot carries (title pipe + 107-char, testimonials, complicated-income cluster CTAs). Gates green post-pull: sitemap/robots HTTP 200, conversion 10/10, legacy entity scrub 0/0/0, pipe-format title 35/37.

**2026-05-31 (subagent-driven build, supervised): styer-blog-writer-weekly task launched + first post published.** New scheduled SKILL task (`/Users/adamstyer/.claude/scheduled-tasks/styer-blog-writer-weekly/`, cron Tue 8am CT) that auto-publishes ONE net-new compliance-gated blog post/week. First run executed inline & supervised: published **"Physician Mortgage Loans in Texas: How Doctors Qualify in 2026"** (`blog/2026-05-30-physician-mortgage-texas.html`, 1,387 words, Tier B). 4 approved-source citations; all 7 compliance gates PASS; registered across all 4 surfaces. Commits: `4876d86` publish + `d850436` bookkeeping + `f7e14c5` BreadcrumbList JSON-LD. Live verified HTTP 200. **To undo:** `git revert d850436..f7e14c5`.

**2026-05-30 (user-initiated, Adam): Homepage restructure — hero lead form + section reorder + sitewide GA4 `generate_lead` dispatch.** Two-column hero (`index.html`, commit `40028bb`): left = pitch; right = compact 4-field lead form (`name="hero-quick-lead"`, Netlify Forms — Name/Phone/Email/Loan Goal + TCPA + "Get Started"). `script.js` `initFormValidation()` refactored to bind **all** `.js-quick-contact` forms via new `bindQuickContactForm()`. Section order: Hero → Loans Built for Every Situation → Deals Banks Said No To → full ~13-field quick-contact form. Sitewide `generate_lead` GA4 conversion event added — `dispatchLeadSubmitted()` in `script.js` pushes `{event:'generate_lead', lead_type, form_name}` to dataLayer at submit (commit `14935a5`); `0a72ac8` adds `waitForTags`/timeout for redirect timing. Cache-busters bumped to `?v=20260530b` sitewide (102 HTML files). **Still needed on GTM side:** trigger on the `generate_lead` event → Google Ads conversion tag.

## Active Blockers

| Item | Priority |
|------|----------|
| **NEW 2026-05-26: Homepage title pipe normalization (HIGH_RISK deferred)** — `index.html` line 6, `Adam Styer NMLS #513013` missing pipe + title is 107 chars (over 60-char SERP truncation). Adam decision: simple pipe fix OR fuller rewrite leading with "complicated income" positioning + "Mortgage Broker" vs "Correspondent Lender" copy choice | MEDIUM (Adam) |
| **NEW 2026-05-26: /get-preapproved.html title (MEDIUM_RISK paid LP)** — missing pipe + `24-Hour Turnaround` performance claim. GOALS.md "no performance-metric marketing" vs voice-guide "same-day PA is real differentiator" tension. Suggested replacement: `Mortgage Pre-Approval Letter Austin TX \| Complicated Income Welcome \| Adam Styer \| NMLS #513013` | MEDIUM (Adam) |
| **NEW 2026-05-26: /hutto-mortgage-lender.html title** — Same-Day Pre-Approval claim + missing NMLS tail. Hutto currently #6 ranking; title doing CTR work. Suggested: `Hutto TX Mortgage Lender \| 40+ Wholesale Lenders \| Adam Styer \| NMLS #513013` | LOW (Adam) |
| **NEW 2026-05-26: SKILL.md infrastructure question** — should styer-site-daily own BLOCKERS.md inside `styerteam-mortgage-site/` instead of `loanos-clone/tasks/seo-sem/`? Current path triggers Vercel deploy of paused LoanOS product | LOW (Adam) |
| **Calculator P0-A 12× inflated PITI bug** — `rate-buydown-calculator.html` lines 1032-1033, patch `patches/calculator-2026-04-20-P0.diff` on disk, sister task flagged 5+ weeks | HIGH (Adam) |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **47 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained **14/14** consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| **NEW: Homepage/mobile CTAs now route to `#contact-form` quick form (Q10).** Hero + mobile sticky both land on the on-site quick form (in-house funnel, not raw 1003). Open: whether to ALSO surface a direct `/get-preapproved` or `/refinance-quote` path. | MEDIUM (Adam) |
| Homepage body-copy still references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (index.html lines 455, 492, 861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (27th carry; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander, Bee Cave (7+ carries) | HIGH (Adam) |
| Complicated-income SERP gap — 0/5 ranking on self-employed / bank statement / non-QM / DSCR / 1099 Austin. Compliance-permitted fix this week = FAQPage + AggregateRating schema audit on 5 pages + /loans/jumbo | HIGH |
| **Hedged claims to verify (NEW 2026-05-17)** — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets before quoting borrowers | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (27th carry) + missing FAQPage schema (10th carry) | MEDIUM |
| **Sitewide nav inconsistency (2026-05-17)** — ~75 pages still have older nav order vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity (20 pages), suburb `/calculators` linking gap, suburb `About Adam` standalone vs Contact dropdown. Full detail in TODO.md | LOW (Adam) |
| **5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema** | LOW |
| **Scheduler reliability** — Thu 5/14 no-fire (12th carry); Wed 2026-05-20 + Wed 2026-05-27 no-fire; **3 unscheduled weekend fires in 2 weeks** — Sat 2026-05-22 PM, Sat 2026-05-23 AM, Sat 2026-05-23 PM. Document expected cadence in SKILL.md or tune scheduler. | HIGH (Adam) |
| **NEW 2026-05-28: Complicated-income cluster 0 funnel CTAs to tracked LPs** — 8 cluster pages (non-qm-loans, bank-statement-loans-austin-tx, 1099-only, self-employed, asset-depletion, high-net-worth-mortgage, investor-loans, dscr-loan-austin-tx) route conversion CTAs only through raw 1003 / Calendly / contact.html / tel:. Zero direct links to /get-preapproved or /refinance-quote. Generalizes the existing homepage 0-CTAs blocker to the cluster Adam is positioning around per GOALS.md. Decision: per-product 1003 direct, unified tracked LP, or Calendly-first | MEDIUM (Adam) |
| **NEW 2026-05-28: thank-you.html performance-metric claims** — lines 442-443 + 452-453 carry "Same-day review" / "Letter or quote in 24 hrs" / "one business day". GOALS.md "no performance-metric marketing" vs voice-guide "Same-day pre-approvals — real differentiator." Same tension class as /get-preapproved title blocker — suggested batch with that one | MEDIUM (Adam) |

## What's Next

**Monday 2026-06-01 styer-site-daily = Schema + Google Ads Quality + AEO Entity Audit rotation.** Per SKILL.md Monday default. Today's Sunday gap-day recovery cleared the PM 2026-05-28 conversion-tracking finding via auto-resolution and surfaced 1 NEW finding (live↔local sitemap drift). 0 mutations this run. Full detail in `run-logs/2026-05-31.md`.

Monday priorities:
1. **Verify Adam's 8 in-window commits (Sun 5-31) didn't introduce regressions:** `f3f8f07` homepage AEO routing + `8c32fd4` scenario flow + `15e8119` duplicate analytics fix + `0e54435` portal language. Re-run conversion gates (already 10/10 post-pull) + check `tests/aeo-structure-regression.test.js` + `tests/lead-flow-regression.test.js` if runner available.
2. **Validate `llms.txt`** (NEW file Adam added today) — verify content/structure follows the emerging spec, accessible at `/llms.txt`.
3. **Monday rotation per SKILL.md:** Rich Results Test (homepage AggregateRating, DSCR FAQPage, rotate suburb), PSI on both LPs (26th likely UNVERIFIED), Google Ads Optimizer log, NotebookLM query (60th likely dead).
4. **AEO entity check on Adam's homepage rewrite (`f3f8f07`):** Person + LocalBusiness schema present and consistent after AEO routing changes.
5. **Re-audit Adam-pivot carries** that may have been addressed in Adam's Sun 5-31 sweep: homepage title pipe + 107-char overlength, homepage testimonials, complicated-income cluster CTA architecture, /get-preapproved title `24-Hour Turnaround` claim.
6. **AEO content audit on physician post** (1-day-old, fresh before Google's first-crawl decisions).
7. **Cache-buster `?v=20260530b` propagation check** across 5 sample pages.

Audit roadmap remaining (from `/Users/adamstyer/Documents/SEO-AUDIT-2026-05.md`):
1. **Phase 3.2 — VA Loan Austin TX** new ~3,000-word landing page.
2. ~~Phase 3.3 — Physician Mortgage Austin~~ ✅ DONE 2026-05-30 (`blog/2026-05-30-physician-mortgage-texas.html`).
3. **Phase 3.4 — ITIN Mortgage Texas** new page (compliance-sensitive).
4. **Phase 3.5 — Foreign National Mortgage Texas** new page.
5. **Phase 2 external manual work** — see `SEO-PHASE2-CHECKLIST.md`.

Scheduled task track:
- **Scenario #2 candidates** — next scenarios should cover Self-Employed/Bank-Statement and DSCR/Investor to light up filter chips. Adam to surface anonymized files when ready.

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
- Business name: "Adam Styer | HyperSmart Home Loans" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://hypersmart.my1003app.com/513013/register?time=1779291829279 (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Keep under 100 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
