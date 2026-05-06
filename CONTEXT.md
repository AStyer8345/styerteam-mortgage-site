# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 75+ public pages live (homepage, loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, resource/guide pages, blog, calculators, realtor hub, plus a new 7-page non-QM cluster as of 2026-05-05).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

**2026-05-06 — Wednesday daily-opt:** Closed funnel-tracking gap on the new non-QM cluster — swapped hero+bottom CTAs on 4 pages (non-qm-loans, investor-loans, dscr-loans-fredericksburg-tx, high-net-worth-mortgage) from external 1003 → `/get-preapproved` so leads route through the tracked landing page. Trimmed dscr-loans-dripping-springs title 90 → 65 chars (SERP-truncation fix; "Wedding Venue STR" wedge preserved). Leander Round 2 deepening: added Bryson / Caballo Ranch / Leander Springs neighborhoods + CapMetro Red Line Leander Station commute angle. 6 URLs added to GSC reindex queue.

**2026-05-05 — Non-QM SEO Expansion (Phases 1–5).** Built a hub-and-spoke non-QM cluster with deep, research-backed copy:

New pages (7):
- `non-qm-loans.html` (hub)
- `dscr-loans-texas.html`
- `dscr-loans-fredericksburg-tx.html`
- `dscr-loans-dripping-springs.html`
- `bank-statement-loans.html`
- `high-net-worth-mortgage.html`
- `investor-loans.html`

Site-wide changes:
- Nav restructured with **Loan Programs dropdown** across 66 files
- USDA noindexed (page kept; removed from nav and from `products.html` card grid)
- about.html NAP corrected (canonical: 5718 Sam Houston Circle)
- Internal hub-and-spoke linking wired into `index.html`, `products.html`, `dscr-loan-austin-tx.html`, `self-employed-mortgage-austin.html`, `austin-mortgage-rates.html`
- Sitemap updated with 7 new URLs (hub priority 0.9, spokes 0.8)

Key compliance/voice decisions:
- Skipped `dscr-loans-nationwide.html` — Adam is TX-licensed only; out-of-state investors land on `dscr-loans-texas.html`
- HNW page voice = warm conversational (consistent with site voice), not cold private-banking

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

## Open Items (Phase 5 follow-ups)

| Item | Priority |
|------|----------|
| Verify NAP fix across remaining LocalBusiness/Person schemas (audit for additional 5900 Balcones references) | HIGH |
| Submit 7 new non-QM URLs to GSC + request indexing | HIGH |
| Test "Loan Programs" nav dropdown on real mobile device | HIGH |
| Add FAQ content + FAQPage schema to about.html and calculator hub pages | MEDIUM |
| Add blog post(s) driving to new non-QM pages where contextual | MEDIUM |
| As Adam closes non-QM deals, add case-study/scenario blocks to spoke pages (EEAT) | LOW |
| Existing carry-forwards: Bee Cave indexing, Leander #6→top 4, Refinance page upgrade, NotebookLM SKILL.md retirement | (per prior CONTEXT) |

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
