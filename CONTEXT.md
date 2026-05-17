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

**2026-05-17 EVENING (Sunday — repositioning sweep + 21-day claim retired):** Adam announced new company move + new-employer compliance audit incoming. Pre-emptive cleanup. Homepage hero → "The loans your bank said no to. The pricing your bank can't match." about.html h1 → "I close the loans your bank can't." Stats slot 4: "21 Days" → "Non-QM Specialist". Sitewide "21-Day Avg. Close" → "1,000+ Loans Closed" across ~95 files (trust badges, footers, trust chips, inline spans, list items). Boilerplate body "an average 21-day close" rewritten on index + 9 suburb pages. Homepage schema/FAQ 21-day claim removed. san-marcos testimonial 21-day claim stripped. GOALS.md fully rewritten — LoanOS/Client Ops/portfolio paused, loan-officer pipeline first. 2026-05-17_compliance-audit delivered to workspace folder with 21-finding pre-audit review.

**2026-05-17 DAYTIME (Sunday — private-wealth / non-QM expansion):** Adam-approved SEO/AEO repositioning audit + multi-agent execution (ran earlier; Adam's EVENING sweep above overlaid hero copy but left schema/FAQ/nav/sitemap edits intact — clean merge). 6 new niche pages added in repo root: `mortgage-for-business-owners-austin` (pillar), `asset-depletion-mortgage-texas` (Fannie 360 / Freddie §5307.1 240 divisor comparison nobody else publishes), `k1-income-mortgage-austin` (Fannie B3-3.4-19 sub-25% framing, effective 2026-03-04), `1099-only-mortgage-texas`, `p-and-l-mortgage-texas`, `one-time-close-construction-loan-texas` (Texas §50(a)(5)). Homepage: title, meta, MortgageBroker schema description + Offer Catalog (12 programs, non-QM first), Person schema with knowsAbout + NMLS Consumer Access sameAs, FAQPage rewritten (5 niche citation-grade Q&As, schema + visible accordion synced verbatim, 21-day claim later stripped by EVENING sweep), bento FTB card → DSCR Investor wide card, nav header+footer reordered to lead with pillar. Sitemap 6 new URLs. Research bundles in `cowork/scratch/styer-research-{nonqm-mechanics,austin-market,competitor-aeo}.md` (~9,000 sourced words). Fact-check verdict YELLOW → fabricated 5-star testimonials deleted on all 6 pages → GREEN. `FLAG_FOR_ADAM.md` written to repo root with full pre-publication review + 11 hedged-claim items.

**Open after this session:** Working tree includes both this session's work AND Adam's EVENING sweep — committed together. Compliance remediation Phase A items still pending. Compliance remediation Phase A items pending (testimonial audit, rate widget APR fix, GLBA privacy policy, superlative cleanup, EHL coverage, NMLS Consumer Access link gaps). 3 acceptable 21-day mentions left as-is (generic blog advice, internal dashboard placeholder, historical dated post).

**Surfaced for Adam:** Uncommitted style.css change in working tree (22nd carry). `/investor-loans` + `/high-net-worth-mortgage` title brand-vs-length tradeoff. Suburb roster `/calculators` linking gap. Compliance audit Critical #1 (Reg Z rate widget) and Critical #2 (fabricated testimonials) — Adam decision needed before Phase A execution. 5 Rancho Moonrise scheduled tasks need pause approval (tool requires interactive confirm).

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
| Blog cadence: 19 days since last post (2026-04-27) — **deferred per GOALS.md "no new content this week"** | DEFERRED |
| products.html 10 in-card "Get Pre-Approved" buttons still route to raw 1003 (Adam decision; 21st carry) | MEDIUM |
| Site-wide footer `/prequal.html` link in 20 pages — parity gap | LOW |
| Uncommitted style.css change in working tree (Adam's nav-dropdown scrolled-state fix, 21st carry) | MEDIUM |
| Suburb roster `/calculators` linking gap (5th carry) | LOW (Adam) |
| Smithville/Elgin/Florence/Jarrell USDA cleanup pending | MEDIUM |
| about.html "91 Google + 45 Zillow" review breakdown (UNVERIFIED:2026-05-08; Adam GBP/Zillow access) | MEDIUM |
| 2026-04-27-why-home-prices-arent-crashing CTA structure (21st carry) + missing FAQPage schema (4th carry) | MEDIUM |
| NotebookLM SKILL.md retirement diff — drafted 2026-04-26, **39 consecutive dead runs** | HIGH (Adam) |
| PSI quota drained 8/8 consecutive periods — provision dedicated key OR accept permanent UNVERIFIED | HIGH (Adam) |
| `/investor-loans` (T=68) + `/high-net-worth-mortgage` (T=79) titles missing "Adam Styer" — 8th run carry | MEDIUM (Adam) |
| NotebookLM CLI auth expired (2026-05-11) — `notebooklm login` required | HIGH (Adam) |
| GSC URL Inspection sweep — Pflugerville + Kyle (new top-10s), Hutto, Round Rock, Bee Cave, Lakeway, Georgetown, Leander, products.html | HIGH (Adam) |
| Bulk suburb audit recommendation — replace 9-week rotation with weekly audit | MEDIUM |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config | HIGH (Adam) |
| Verify NAP fix across remaining LocalBusiness/Person schemas | HIGH |
| **Scheduler reliability HIGH FLAG** — Thu 5/14 no-fire + Fri 5/15 triple same-day (09:49/09:53/23:09) + **NEW: Sat 5/16 weekend fire @ 07:12** — 4 anomalies in 3 days, 3 distinct types | HIGH (Adam) |
| **NEEDS ADAM (NEW 2026-05-17) — Verify 8 hedged-claim items in `FLAG_FOR_ADAM.md`** against current wholesale rate sheets before quoting borrowers: Fannie 360-mo divisor (sourced via Truss not primary), Newrez SmartSelf 50% 1099 factor, A&D P&L parameters (660 FICO, $2.5M cap), Acra 1099 parameters (600 FICO), retirement haircut convention, non-QM rate premium bps, OTC contingency reserve %, Hill Country pricing tiers. All hedged on live pages. | HIGH (Adam) |
| **Sitewide nav inconsistency (NEW 2026-05-17)** — only `index.html` nav updated this session to lead with `mortgage-for-business-owners-austin` pillar. ~75 other pages still have older nav order. Bulk sweep deferred (surgical scope this session). | MEDIUM |
| **5 of 6 new pages missing NMLS Consumer Access `sameAs` in Article schema** — `mortgage-for-business-owners-austin` has it; the other 5 don't. AEO research flagged this as highest-value E-E-A-T entity signal. 5-min fix next session. | LOW |
| **OTC §50(a)(5) page lists 4 absolute requirements; research lists 5** — venue rule ("contract executed at lender/title/attorney office, not kitchen table") mentioned on page but as side note, not numbered. Cosmetic. | LOW |

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
