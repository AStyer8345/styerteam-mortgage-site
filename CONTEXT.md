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

2026-04-20 (competitive intel run 7) — Weekly SERP check. styermortgage.com UPGRADED to #1 for "hutto tx mortgage lender" (was #3) and NEW #2 for "round rock tx mortgage lender." Now 2 keywords in top 3. MortgageAustin.com surged to #1 for "get pre-approved austin tx." Nest Mortgaging (Erica Billé, Kyle TX) is a new content machine competitor ranking across 6+ keywords. Full report at run-logs/competitive/2026-04-20.md.

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
| Buda page claims USDA (meta, schema, FAQ) — Adam does NOT do USDA per voice guide. Verify + remove if wrong. | HIGH |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| Next blog due ~April 24 (7-day cadence, last: April 17 refinance guide) | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **Round Rock #2 → #1 push** — Add 3 neighborhoods (Teravista, Forest Creek, Old Town Round Rock) + Round Rock ISD + "beat builder rates" line. Same playbook that moved Hutto from #3 to #1.
2. **Bee Cave indexing + AEO** — Page in sitemap since 4/3, not ranking yet. GSC URL Inspection (Adam action). Add AEO paragraph + Eanes ISD + Rob Roy/Falconhead neighborhoods + jumbo angle.
3. **Pre-approval page AEO** — Audit `/mortgage-pre-approval-austin.html` vs MortgageAustin.com's new #1 guide. Add answer-first paragraph + "same-day response" hook.
4. **Next blog post (April 24)** — "How to Buy a House in Austin TX 2026 Step-by-Step" (pillar page, 3,000+ words). Interlinks all suburb pages.
5. **Refinance FAQ schema** — Add "How does a Texas cash-out refinance work in 2026?" FAQ block to `/loans/refinance.html` to compete with AsertaLoans' new #1.
6. **H2 audit remaining** — Lakeway, Bee Cave, Bastrop, New Braunfels body H2s, Austin-area hub

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
