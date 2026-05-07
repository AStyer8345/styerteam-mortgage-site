# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus the 7-page non-QM cluster as of 2026-05-05).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-05-07 AM — daily-opt Thursday rotation (Internal Linking + Funnel Flow):** Closed the funnel-CTA gap on the loan programs hub (products.html) — same hero+bottom CTA swap pattern that was applied to 4 cluster pages on 2026-05-06 but missed on the parent hub. Hero CTA + bottom "Start Your Pre-Approval" now route to /get-preapproved (tracked landing page) instead of raw 1003 URL. `target="_blank"` and `rel="noopener"` removed on internal hero link per 2026-05-06 learning. Programmatic funnel trace via curl + grep verified end-to-end (homepage → /get-preapproved → /thank-you all firing correctly at HTTP level — replaces "Chrome unavailable" carry-forward). Re-Verify Gate auto-resolved a stale framing in the loanos-clone backlog: claim "/prequal.html is noindexed orphan" was true 2026-03-28 but no longer — Disallow entry was removed during AEO crawler allowlist expansion; /prequal.html is HTTP 200 and indexable. Backlog wording corrected within same run. Loanos-clone push needed one clean rebuild after Next.js pre-push hook hit a stale `.next/export/500.html` rename ENOENT.

**Surfaced for Adam (still):** Uncommitted style.css change in working tree (Adam's pending nav-dropdown scrolled-state fix from after the d031be5 nav-restructure). Left untouched.

## Site Structure (key categories)

| Category | Pages |
|----------|-------|
| Core | index, products, calculators, about, contact, blog, realtors |
| Loan programs | conventional, fha, va, jumbo, construction, investment, refinance, dscr-loan-austin-tx, self-employed-mortgage-austin, **non-qm-loans (hub)**, **bank-statement-loans**, **high-net-worth-mortgage**, **investor-loans** |
| DSCR cluster | dscr-loan-austin-tx, **dscr-loans-texas**, **dscr-loans-fredericksburg-tx**, **dscr-loans-dripping-springs** |
| Suburb SEO | 24 `*-mortgage-lender.html` pages |
| Rate check | hub + 5 city pages |
| Rate shopper blog | 10 posts |
| Resources | first-time-buyer-guide, glossary, how-to-buy, etc. |
| Deprioritized | usda (noindex, kept live) |

## Open Items

| Item | Priority |
|------|----------|
| Blog cadence: 10 days since last post (2026-04-27). Friday escalates HIGH at Day 11. | HIGH (Friday) |
| how-to-buy-a-house USDA loan-table cleanup (5 mentions, no drift since 2026-05-03) | HIGH (carry) |
| products.html 7 in-card "Get Pre-Approved" buttons still route to raw 1003 (Adam decision: unify or preserve) | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — corrected framing today: parity gap not orphan cleanup | LOW (revised) |
| Uncommitted style.css change in working tree (Adam's pending fix) | MEDIUM |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| about.html timeline-date span (91/45 stale) | MEDIUM |
| why-home-prices structural decision (6th recurrence) | MEDIUM |
| NotebookLM SKILL.md retirement diff (22nd dead run) — diff drafted 2026-04-26, awaiting Adam apply | HIGH (Adam queue) |
| GSC URL Inspection sweep (Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, Leander, + products.html today) | HIGH (Adam) |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Verify NAP fix across remaining LocalBusiness/Person schemas (audit for additional 5900 Balcones references) | HIGH |

## Session Rules

- Voice: short punchy sentences, conversational, raw, no fluff. HNW = warm conversational, not cold private-banking.
- Business name: "Adam Styer | Mortgage Solutions LP" — never "The Styer Team"
- Match existing HTML/CSS patterns exactly when adding pages
- TX-licensed only — never imply Adam originates outside Texas
- No USDA origination — keep removing from product surfaces as found
- Loan application link: https://mslp.my1003app.com/513013/register (anchor text only)
- Run blog title lint before publish: `grep "<title>" blog/*.html | grep -v "Adam Styer"`

## Session Protocol

Read `/Users/adamstyer/Documents/GOALS.md` first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Open Items only. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
