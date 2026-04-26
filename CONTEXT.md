# styermortgage.com — Context

## What This Is

Public mortgage website for Adam Styer | Mortgage Solutions LP. Static HTML/CSS/JS on Netlify — no framework, no CMS. 70+ public pages live (homepage, 8 loan pages, 24 suburb SEO pages, 5 rate-check city pages, 10 rate-shopper blog posts, 12+ resource/guide pages, blog, calculators, realtor hub).

## Repo

| Item | Value |
|------|-------|
| Repo | `AStyer8345/styerteam-mortgage-site` |
| Local | `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site` |
| Hosting | Netlify — auto-deploy on GitHub push |
| Domain | styermortgage.com |
| Dev server | `.claude/site-server.js` → port 8766 |

## Last Worked On

2026-04-26 (daily-opt) — **Rate-shopper AEO series 10/10 COMPLETE.** Final 2 posts cleaned: what-to-compare-besides-mortgage-rate (60w body answer leading with practical Section A side-by-side method + identical-rate $4K spread example; "Origination Charges — The Biggest Variable" → "Are Origination Charges the Biggest Variable in Loan Cost?") and is-the-lowest-rate-the-cheapest-loan (64w body answer leading with "compare loans over the time you'll keep them" frame + 6.375%/$8,500 vs 6.5%/$3,000 example aligned with post's own Lender A/B numbers; "Why Buyers Fixate on the Rate" → "Why Do Buyers Fixate on the Rate?"). dateModified + sitemap lastmod bumped. Commit 23d00c7 → live within 60s. NotebookLM Step 0 dead 5th run — concrete unified-diff SKILL.md retirement patch drafted in run log FLAG_FOR_ADAM (replaces lines 57-72) for Adam to apply as one-shot edit.

2026-04-25 PM (daily-opt) — Rate-shopper AEO continued: what-delays-closing-when-you-switch-lenders + how-to-read-a-loan-estimate (8/10). Body `<p><strong>` paragraphs (56w + 66w) after `</header>`. Two statement→question H2 conversions. NotebookLM Step 0 dead 4th run. Commit de08af6.

2026-04-25 (styer-suburb-editor-daily) — Hutto page deepened: USDA removed from LocalBusiness schema; median $340K Feb 2026; 3 neighborhood spotlights; tax breakdown + employer list. Queue: Hutto ✅ → Next: Liberty Hill.

2026-04-25 AM (daily-opt) — Footer Awards sitewide standardization (56 of 57 files; about.html timeline-date span surfaced as separate Adam-decision element). Rate-shopper AEO: how-many-mortgage-quotes + local-lender-vs-online (6/10).

2026-04-24 (styer-suburb-editor-daily) — Buda page deepened: USDA removed from 7 locations; 3 neighborhood spotlights; HCISD tax rates; median $382K Feb 2026; rate-check-buda-kyle.html linked.

2026-04-24 PM (daily-opt) — apr-vs-interest-rate + are-mortgage-lender-fees-negotiable AEO-cleaned (4/10). Statement-form H2 on fees-negotiable → question.

2026-04-24 AM (daily-opt) — AEO body paragraphs added to can-i-switch + how-to-compare (2/10). about.html body CTAs → /get-preapproved.

## Rate Check Page Inventory

| Page | File | Source Field |
|------|------|-------------|
| Hub (Austin) | `rate-check.html` | (none — original) |
| Round Rock + Pflugerville | `rate-check-round-rock.html` | `rate-check-round-rock` |
| Cedar Park + Leander | `rate-check-cedar-park.html` | `rate-check-cedar-park` |
| Georgetown + Hutto | `rate-check-georgetown.html` | `rate-check-georgetown` |
| Buda + Kyle + San Marcos | `rate-check-buda-kyle.html` | `rate-check-buda-kyle` |
| New Braunfels | `rate-check-new-braunfels.html` | `rate-check-new-braunfels` |

## Rate Shopper Blog Posts

| Post | File |
|------|------|
| Can I Switch Lenders After Going Under Contract? | `blog/can-i-switch-lenders-after-going-under-contract-texas.html` |
| How to Compare Two Mortgage Offers | `blog/how-to-compare-two-mortgage-offers.html` |
| APR vs Interest Rate | `blog/apr-vs-interest-rate-what-actually-matters.html` |
| Are Lender Fees Negotiable? | `blog/are-mortgage-lender-fees-negotiable.html` |
| How Many Quotes Should I Get? | `blog/how-many-mortgage-quotes-should-i-get.html` |
| Local vs Online Lender | `blog/local-lender-vs-online-lender-austin-central-texas.html` |
| What Delays Closing When Switching? | `blog/what-delays-closing-when-you-switch-lenders.html` |
| How to Read a Loan Estimate | `blog/how-to-read-a-loan-estimate.html` |
| What to Compare Besides Rate | `blog/what-to-compare-besides-mortgage-rate.html` |
| Is the Lowest Rate the Cheapest? | `blog/is-the-lowest-rate-the-cheapest-loan.html` |

## Active Blockers

| Issue | Priority |
|-------|----------|
| NotebookLM Step 0 broken — concrete unified-diff SKILL.md retirement patch ready in 2026-04-26 run log FLAG_FOR_ADAM. One-shot edit. 5th-run escalation. | HIGH (ESCALATED) |
| how-to-buy-a-house-in-austin-tx.html loan table includes USDA (`<a href="/loans/usda.html">USDA</a>`) — Adam does NOT do USDA. Needs removal. | HIGH |
| Smithville (26 hits), Elgin (24), Florence (17), Jarrell (16): body/schema/FAQ USDA — same review as Buda (now done). | HIGH |
| Liberty Hill (10 hits): USDA in LocalBusiness schema description + FAQ + pre-approval process text. | HIGH |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| about.html timeline-date span still has "91 Google + 45 Zillow Reviews" — different element from footer Awards. Adam decision: update or leave as historical milestone. | MEDIUM |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| Monday 2026-04-27 — verify GSC sitemap.xml shows "Success" + discovered pages > 0 | LOW |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **Apply NotebookLM SKILL.md retirement patch** — concrete unified-style diff for `~/.claude/scheduled-tasks/styer-site-daily/SKILL.md` lines 57-72 in 2026-04-26 run-log FLAG_FOR_ADAM. One-shot edit removes broken Python script call and leans on carry-forward NOTEBOOK_INSIGHTS.
2. **Monday 2026-04-27 — GSC sitemap status verification** — Step 1 weekly cadence. Confirm Google Search Console shows sitemap.xml as "Success" with discovered pages > 0.
3. **USDA cleanup (remaining)** — Smithville, Elgin, Florence, Jarrell body/schema/FAQ + Liberty Hill schema + how-to-buy loan table. Voice guide confirms Adam does NOT do USDA — needs Adam confirmation on cleanup.
4. **about.html timeline-date** — Adam decision: update span to "136+ Google + Zillow Reviews" or leave as historical milestone.
5. **Next AEO target cluster** — rate-shopper series 10/10 complete. Identify next post cluster with `<header>`-trapped answers (refinance posts? FHA/VA loan pages? suburb pages without body `<p><strong>`?). Propose 2-per-week cadence on the largest open gap.
6. **Round Rock #2 → #1** — Add Teravista/Forest Creek/Old Town Round Rock neighborhoods + Round Rock ISD + "beat builder rates" line.
7. ~~Rate-shopper AEO series~~ ✅ **COMPLETE 2026-04-26 — 10/10 posts**
8. ~~Footer Awards sitewide~~ ✅ DONE 2026-04-25 — 56 of 57 files
9. ~~Footer Awards on all suburb pages~~ ✅ DONE 2026-04-23
10. ~~how-to-buy pillar page suburb links~~ ✅ DONE 2026-04-23

## Known Issues

- GTM (GTM-PQQ6PGLR) + GA4 (G-DDY0H0319S) installed on all public pages
- All conversion tracking verified: generate_lead, thank_you_page_view, phone_click, calendly_click
- Georgetown page added USDA to loan type dropdown (other city pages match original rate-check form)
- Georgetown page uses card grid layout for "Why" section (other city pages use paragraph format)

## Session Protocol

Read /Users/adamstyer/Documents/GOALS.md first.

END OF SESSION:
1. CONTEXT.md — replace Last Worked On, Active Blockers, What's Next only. Never append. Keep under 150 lines.
2. CHANGELOG.md — append dated bullet points
3. TODO.md — mark done, add new items
4. DECISIONS.md — only if a real decision was made
