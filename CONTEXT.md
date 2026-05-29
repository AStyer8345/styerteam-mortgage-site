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

**2026-05-28 PM Q9 (continuation, autonomous): Blog→cluster contextual linking (Tier 2) — 2 indexable posts, 7 fresh-source links.** Added in-body contextual links from the two cluster-topic blog posts into the cluster spoke pages they describe but never linked. `blog/2026-04-02-self-employed-mortgage-austin-tx.html`: wrapped "a bank statement loan" → `/bank-statement-loans.html`, appended 1099-only guide link → `/1099-only-mortgage-texas.html`, wrapped "CPA-prepared profit & loss statement" → `/p-and-l-mortgage-texas.html` (matched the post's absolute-path style). `blog/2026-03-31-dscr-loans-austin-tx-2026.html`: extended the existing "see also" paragraph with 4 relative-path links → `dscr-loans-texas`, `dscr-loans-fredericksburg-tx`, `dscr-loans-dripping-springs`, `investor-loans` (skipped re-linking `dscr-loan-austin-tx` — already linked twice from this post, so a 3rd adds nothing under unique-source counting). In-body links carry more topical weight than list links. No CSS/JS/schema/nav changes; title lint passes; surgical additive diffs only. Verify links resolve on live Netlify after push.

**2026-05-28 PM Q8 (user-initiated, Adam): "Scenarios" rolled into the Resources dropdown sitewide.** Inserted `<li><a href="/scenarios.html">Scenarios</a></li>` immediately after the "Buyer Guide" item in every Resources dropdown — 101 pages updated (104 total link it now; the 3 scenario pages already had it). Anchored on the Buyer Guide link because it's the one item present in every dropdown variant; handled absolute + relative path templates and the 8 pages with two Resources dropdowns. Position is "after Buyer Guide" (between Buyer Guide and Blog on the main nav; last item on the older blog template). No CSS/JS/schema/top-level-nav changes. Verify dropdown render on live Netlify after push.

**2026-05-28 PM Q7 (user-initiated, Adam): Adam's direct phone number added to the header nav sitewide.** Inserted `(512) 956-6010` as a `tel:` text link immediately left of the Apply/CTA button on all 149 pages that have a standard nav — phone icon + number, navy/semibold, hover gold, flips white on the dark scrolled header (icon tracks via a `currentColor` SVG mask), hidden on mobile (`.nav-phone-li{display:none}` — mobile keeps its existing sticky tap-to-call). One `.nav-phone` CSS block appended to `style.css`; markup inserted via perl across two nav template families (134 standard in-list nav-cta pages + 15 blog pages with standalone CTAs where the link was placed inside `.nav-links` to inherit the shared CSS). Excluded 18 pages with no standard nav / no Apply button (landing pages, dashboards, internal tools, loanos-waitlist). Verified live (local server + chrome-devtools, real scroll): navy-on-white at top → white-on-navy scrolled, contrast 16.40 both states; positioned left of the CTA on standard + blog templates; hidden ≤768px. No JS/schema/nav-order changes.

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
| **Sitewide nav inconsistency (2026-05-17)** — ~75 pages still have older nav order vs index.html's pillar-first reorder | MEDIUM |
| Suburb/footer cosmetic carries (LOW) — footer `/prequal.html` parity (20 pages), suburb `/calculators` linking gap, suburb `About Adam` standalone vs Contact dropdown. Full detail in TODO.md | LOW (Adam) |
| **5 of 6 new HNW/non-QM pages missing NMLS Consumer Access `sameAs` in Article schema** | LOW |
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
