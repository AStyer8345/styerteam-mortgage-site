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

**2026-05-28 (Thursday — styer-site-daily, scheduled fire): Internal Linking + Funnel Flow rotation.** First scheduled fire since 2026-05-26 PM (Wed 2026-05-27 = no-fire; scheduler-anomaly carry bumps to 12+ instances). 1-line ZERO_RISK fix shipped: `sitemap.xml:45` lastmod `2026-05-18` → `2026-05-27` for `/non-qm-loans.html`, syncing with Adam's 2026-05-27 PM `dateModified` bump (commit `6b64ebf`). Funnel-flow audit: 3-page deep dive (non-qm-loans 45 internal links / bank-statement-loans-austin-tx 28 / 1099-only-mortgage-texas 41) — all satisfy SKILL.md 2+ links requirement; hub-spoke topology solid. Contact.html form wiring verified (Netlify + `lead_type:'contact_form'` dataLayer + all required fields). Thank-you.html verified (Calendly embed + 3-step "What Happens Next" + tel:). Re-Verify Gate auto-correction: leander Audit Issue #5 line number reverts to 276 (PM's 280 was wrong; AM was right — PM miscounted). NEW findings (Adam-decision): (a) complicated-income cluster 0 funnel CTAs to tracked LPs (8 pages route only to raw 1003 / Calendly / contact / tel — generalizes existing homepage CTA blocker), (b) `thank-you.html` lines 443+452-453 performance-metric claims ("Same-day" / "24 hrs" / "one business day") — same GOALS.md vs voice-guide tension as the existing /get-preapproved title blocker. NotebookLM 57th dead; PSI 23/23 drain.

**2026-05-27 PM (Wednesday — user-initiated, Adam): Phase 4.2 — Austin-anchor expansion on /non-qm-loans.html hub.** 4 commits, all live: `1486a01` SERP signals (title `Non-QM Loans Austin TX | 40+ Wholesale Lenders | Adam Styer | NMLS #513013` 74ch, meta 150ch leads Austin, OG/twitter mirror, H1 prefix `Austin TX —`, hero subtitle, LocalBusiness schema, opening paragraph). `e81269a` new H2 "Austin Sub-Markets & Tech-Corridor Borrowers" (~520 words, 5 sub-markets). `db10ccf` +3 Austin FAQs in BOTH JSON-LD schema (9→12) AND accordion (10→13); JSON-LD validates 6/6. `6b64ebf` Related links +4 + dateModified 2026-05-05→2026-05-27. Verified live post-Netlify. (Sitemap.xml lastmod missed in that session; caught by today's Thursday rotation.)

**2026-05-26 (Tuesday — styer-site-daily, scheduled fire):** Tuesday rotation pivot — sitewide title-tag pipe-format audit. Commit `64cf39b` 12 LOW_RISK title fixes. 2 files routed to FLAG_FOR_ADAM (index.html HIGH_RISK; get-preapproved.html MEDIUM_RISK with `24-Hour Turnaround` claim tension). Loanos-clone BLOCKERS.md write REVERTED — pre-push hook triggers paused LoanOS Vercel deploy.

**2026-05-25 PM (Monday — same-day SECOND fire):** Re-verify gate only. 0 site files modified. 2 major auto-resolutions: Audit Issue #5 11→2 occurrences; Tuesday meta-trim batch done by sister task `db7ab16`.

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
| ~~`/investor-loans` + `/high-net-worth-mortgage` titles missing "Adam Styer"~~ ✅ DONE 2026-05-22 commit `a8d565c` — both titles now match "Austin TX \| Adam Styer \| NMLS #513013" pattern, verified live | DONE |
| **NEW: Homepage 0 direct CTAs to `/get-preapproved` or `/refinance-quote`** post `71b8590` hero cleanup. Loan-app URL + tel: are the only conversion paths from homepage. Decision: keep direct-to-1003 OR restore in-house funnel CTA card? | MEDIUM (Adam) |
| Homepage body-copy still references "92 Google reviews" + "45 Zillow reviews" + "5.0 ★" (index.html lines 455, 492, 861) — awaiting Adam's "complicated income" trust-strip pivot copy | MEDIUM (Adam) |
| products.html 10 in-card "Get Pre-Approved" route to raw 1003 (27th carry; Adam decision) | MEDIUM |
| GSC URL Inspection sweep overdue — Round Rock, San Marcos, Hutto, Pflugerville, Leander, Bee Cave (7+ carries) | HIGH (Adam) |
| Complicated-income SERP gap — 0/5 ranking on self-employed / bank statement / non-QM / DSCR / 1099 Austin. Compliance-permitted fix this week = FAQPage + AggregateRating schema audit on 5 pages + /loans/jumbo | HIGH |
| **Hedged claims to verify (NEW 2026-05-17)** — 8 items in `FLAG_FOR_ADAM.md` against current wholesale rate sheets before quoting borrowers | HIGH (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (27th carry) + missing FAQPage schema (10th carry) | MEDIUM |
| ~~Phase A AggregateRating cleanup incomplete on 18 pages~~ ✅ COMPLETED 2026-05-19 commit `9631c86` — site now genuinely 0/0 | DONE |
| ~~ops.html internal dashboard "AggregateRating ✅" stale~~ — now technically correct sitewide after 2026-05-19 cleanup; phrasing audit pending | MEDIUM (Adam) |
| **Sitewide nav inconsistency (2026-05-17)** — ~75 pages still have older nav order vs index.html's pillar-first reorder | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap | LOW |
| Suburb roster `/calculators` linking gap (11th carry) | LOW (Adam) |
| Suburb pages render `About Adam` standalone vs Contact dropdown — `consolidate-nav.py` per-template gap | LOW (Adam) |
| **5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema** | LOW |
| Bulk suburb audit recommendation — replace 9-week rotation with weekly audit (3rd carry) | MEDIUM |
| **Scheduler reliability** — Thu 5/14 no-fire (12th carry); Wed 2026-05-20 + Wed 2026-05-27 no-fire; **3 unscheduled weekend fires in 2 weeks** — Sat 2026-05-22 PM, Sat 2026-05-23 AM, Sat 2026-05-23 PM. Document expected cadence in SKILL.md or tune scheduler. | HIGH (Adam) |
| **NEW 2026-05-28: Complicated-income cluster 0 funnel CTAs to tracked LPs** — 8 cluster pages (non-qm-loans, bank-statement-loans-austin-tx, 1099-only, self-employed, asset-depletion, high-net-worth-mortgage, investor-loans, dscr-loan-austin-tx) route conversion CTAs only through raw 1003 / Calendly / contact.html / tel:. Zero direct links to /get-preapproved or /refinance-quote. Generalizes the existing homepage 0-CTAs blocker to the cluster Adam is positioning around per GOALS.md. Decision: per-product 1003 direct, unified tracked LP, or Calendly-first | MEDIUM (Adam) |
| **NEW 2026-05-28: thank-you.html performance-metric claims** — lines 442-443 + 452-453 carry "Same-day review" / "Letter or quote in 24 hrs" / "one business day". GOALS.md "no performance-metric marketing" vs voice-guide "Same-day pre-approvals — real differentiator." Same tension class as /get-preapproved title blocker — suggested batch with that one | MEDIUM (Adam) |
| ~~Audit Issue #5 superlative sweep batch (11 occurrences, 8 files)~~ ✅ **AUTO-RESOLVED 9/11 on 2026-05-25 PM**. Only 2 occurrences remain: homepage H1 hero "bank can't match" + leander #276 "beat builder rates" framing. Phase A "superlatives cleanup" per GOALS.md ~95% complete. Both remaining require Adam pivot copy. | LOW (Adam) |
| ~~Tuesday TOMORROW_PRIORITY #1 — 6 suburb meta trims~~ ✅ **AUTO-RESOLVED 2026-05-25 PM** via sister task `db7ab16` (24 over-length metas trimmed sitewide). 23/24 suburb pages compliant; bee-cave 162-src/158-visible renders compliant. | DONE |
| **2026-04-27 about.html LocalBusiness address mismatch** ✅ AUTO-RESOLVED 2026-05-25 AM — homepage MortgageBroker + about LocalBusiness both now at HyperSmart corp `9050 N. Capital of Texas Hwy, Ste 390`. | DONE |

## What's Next

Audit roadmap remaining (from `/Users/adamstyer/Documents/SEO-AUDIT-2026-05.md`):
1. **Phase 3.2 — VA Loan Austin TX** new ~3,000-word landing page (FAQ + Breadcrumb + Article schema). Highest-traffic-ceiling open spoke.
2. **Phase 3.3 — Physician Mortgage Austin** new page.
3. **Phase 3.4 — ITIN Mortgage Texas** new page (compliance-sensitive).
4. **Phase 3.5 — Foreign National Mortgage Texas** new page.
5. **Phase 2 external manual work** — see `SEO-PHASE2-CHECKLIST.md` (LinkedIn employer, Facebook page name, Instagram bio, GSC URL Inspection sweep, GBP audit, PSI API key).

Scheduled task track:
- Friday 2026-05-29 AM = Content Planning + AEO Review rotation per SKILL.md. Blog last-post date check + CTA audit + AEO question-style H2 review on 2 posts.
- **Sitemap lastmod sweep (new Thursday-rotation byproduct):** grep all `*.html` for `"dateModified":` values from the last 14 days, cross-check against sitemap.xml `<lastmod>`. Any drift = ZERO_RISK fix. Today's run only fixed `/non-qm-loans.html` because that was the only page Adam touched 2026-05-27; broader sweep would catch any older drift from prior sessions.
- og:title pattern audit follow-up — 2026-05-26 title-tag audit covered `<title>` + `twitter:title` only; og:title tails vary across the 12 AM-edited files.

**Tooling rules (carried):**
- Step 2 conversion verification must use `curl -L` post-`e24b973`.
- PM gate (and any re-verify run) should always `grep -n` for line numbers — never eyeball counts (per 2026-05-26 PM mis-refinement of leander line 276 → 280; today verified back to 276).

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors, scenario |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, etc. |
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
