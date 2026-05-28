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

**2026-05-28 PM Q3 (user-initiated, Adam): Scenario #1 shipped LIVE.** Filled the DRAFT placeholder with Adam's real (anonymized) borrower story — oil/gas royalty income, two prior bank declines, asset-depletion solution. File renamed via `git mv` to `/scenarios/oil-gas-royalty-asset-depletion.html` (correct slug for the actual content — original DRAFT was named for the wrong category). Categories: `jumbo-hnw declined` (asset depletion is the HNW playbook; two prior declines hit the denied-elsewhere intent). Noindex removed. Added to sitemap.xml. Hub updated: empty-state placeholder removed, live card rendered, filter chips lit up for All + Jumbo/HNW + Denied Elsewhere (Self-Employed and DSCR chips stay commented-out per "no empty doorways" rule). Compliance applied: no specific loan amount, no specific city, no specific FICO/LTV, no asset-depletion divisor stated as a universal rule, no performance-metric claims. Pricing described as "competitive" not superlative. Scenario at-a-Glance values stay categorical. 5 FAQs mirrored in FAQPage schema. Article + FAQPage + BreadcrumbList + Person JSON-LD all present.

**2026-05-28 PM Q2 (user-initiated, Adam): Internal-linking audit + Tier-1 product-page cluster fix.** Delivered full link-graph audit of 147 indexable pages — 24 true orphans, 36 weakly linked, cluster-connectivity matrix per vertical. Headline finding: hub-spoke asymmetry in 4 verticals where `/loans/*` product pages hoard inbound equity (jumbo 72in / investment 61in / construction 45in) but link 0–1 times in-cluster, starving Phase 3/4 niche pages. Applied 10 surgical edits across 3 files: `loans/jumbo.html` (3 body-copy contextual links + new Specialty Jumbo Programs section linking HNW / asset-dep-Austin / bank-statement / non-qm), `loans/investment.html` (2 feature-card linkouts + new Specialty Investor Programs section linking investor-loans / dscr-Austin / dscr-Texas / non-qm), `loans/construction.html` (1 body-copy link + 1 feature-card link + new Specialty Construction Programs section linking OTC-Texas / OTC-Hill-Country / jumbo / investment). Cluster in-cluster outbound: jumbo 0→3, investment 1→3, construction 0→2. ~175 equity points redistributed; 11 niche/cluster pages gained inbound sources (HNW +4, bank-statement +5, non-qm +5, investor-loans +4). Audit roadmap published with Tier 1–4 prioritization (in this session memory; not committed as doc). Tiers 2–4 still pending: suburb→niche surfacing (8 pages), blog→cluster contextual linking (~28 posts), `/rates/index.html` archive rescue (10 orphans), realtor-updates manifest wiring, FAQPage+AggregateRating schema audit, anchor-genericity audit.

**2026-05-28 PM (user-initiated, Adam): Narrative scenario system shipped.** New content type distinct from pillar/product pages. 3 new files: (a) `/scenarios.html` hub — CollectionPage + BreadcrumbList + Person JSON-LD, filter-chip markup commented out until ≥1 live scenario per category exists (no empty-chip doorways), card stub commented out, placeholder "Scenarios coming soon" state shown until first card ships. (b) `/scenarios/_TEMPLATE.html` — full Article + FAQPage + BreadcrumbList + Person JSON-LD, Direct Answer block, hedged At-A-Glance table, byline matching scenario.html, mandatory privacy/outcomes-vary line baked into footer, noindex safety-net meta, `[SQUARE BRACKET]` placeholders throughout, compliance checklist as top comment. (c) `/scenarios/self-employed-writeoffs-bank-statement.html` — DRAFT, noindex, NOT in sitemap, awaiting Adam's real (anonymized) borrower facts. Sitemap.xml gained `/scenarios.html` only. robots.txt now Disallow `/scenarios/_TEMPLATE.html`. Resources dropdown gained "Scenarios" link on the new pages only — no sitewide nav change. All scenario CTAs route to `/scenario.html` (tracked LP), not raw 1003. Compliance enforced at template level: no hard FICO/LTV/expense %, no performance-metric claims, no fabricated testimonials, Texas scope only, hedged At-A-Glance values only.

**2026-05-28 AM (Thursday — styer-site-daily, scheduled fire): Internal Linking + Funnel Flow rotation.** First scheduled fire since 2026-05-26 PM (Wed 2026-05-27 = no-fire; scheduler-anomaly carry bumps to 12+ instances). 1-line ZERO_RISK fix shipped: `sitemap.xml:45` lastmod `2026-05-18` → `2026-05-27` for `/non-qm-loans.html`, syncing with Adam's 2026-05-27 PM `dateModified` bump (commit `6b64ebf`). Funnel-flow audit: 3-page deep dive (non-qm-loans 45 internal links / bank-statement-loans-austin-tx 28 / 1099-only-mortgage-texas 41) — all satisfy SKILL.md 2+ links requirement; hub-spoke topology solid. Contact.html form wiring verified (Netlify + `lead_type:'contact_form'` dataLayer + all required fields). Thank-you.html verified (Calendly embed + 3-step "What Happens Next" + tel:). Re-Verify Gate auto-correction: leander Audit Issue #5 line number reverts to 276 (PM's 280 was wrong; AM was right — PM miscounted). NEW findings (Adam-decision): (a) complicated-income cluster 0 funnel CTAs to tracked LPs (8 pages route only to raw 1003 / Calendly / contact / tel — generalizes existing homepage CTA blocker), (b) `thank-you.html` lines 443+452-453 performance-metric claims ("Same-day" / "24 hrs" / "one business day") — same GOALS.md vs voice-guide tension as the existing /get-preapproved title blocker. NotebookLM 57th dead; PSI 23/23 drain.

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

## What's Next

Audit roadmap remaining (from `/Users/adamstyer/Documents/SEO-AUDIT-2026-05.md`):
1. **Phase 3.2 — VA Loan Austin TX** new ~3,000-word landing page (FAQ + Breadcrumb + Article schema). Highest-traffic-ceiling open spoke.
2. **Phase 3.3 — Physician Mortgage Austin** new page.
3. **Phase 3.4 — ITIN Mortgage Texas** new page (compliance-sensitive).
4. **Phase 3.5 — Foreign National Mortgage Texas** new page.
5. **Phase 2 external manual work** — see `SEO-PHASE2-CHECKLIST.md` (LinkedIn employer, Facebook page name, Instagram bio, GSC URL Inspection sweep, GBP audit, PSI API key).

Scheduled task track:
- Friday 2026-05-29 AM = Content Planning + AEO Review rotation per SKILL.md. Blog last-post date check + CTA audit + AEO question-style H2 review on 2 posts.
- **Sitemap lastmod sweep (Thursday-rotation byproduct):** grep all `*.html` for `"dateModified":` from the last 14 days, cross-check vs sitemap.xml `<lastmod>`. Any drift = ZERO_RISK fix.
- og:title pattern audit follow-up — 2026-05-26 title-tag audit covered `<title>` + `twitter:title` only; og:title tails vary across the 12 AM-edited files.
- **Scenario #2 candidates** — next scenarios should ideally cover Self-Employed/Bank-Statement and DSCR/Investor to light up those filter chips. Adam to surface anonymized files when ready.

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
