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

2026-04-21 (daily-opt) — Pre-approval AEO paragraph added (53 words, same-day hook, before first H2). Refinance FAQ expanded: added "How does a Texas cash-out refinance work in 2026?" to accordion + FAQPage schema (now 6 questions). dateModified updated on both pages. Sitemap lastmod updated.

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
| Smithville, Elgin, Florence, Jarrell: USDA removed from meta today. Body/schema/FAQ may still have USDA claims — same review as Buda needed. | HIGH |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell; manual Request Indexing needed | LOW |
| Next blog due ~April 24 (7-day cadence, last: April 17 refinance guide) | LOW |
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean | LOW |

## What's Next

1. **Next blog post (April 24)** — "How to Buy a House in Austin TX 2026 Step-by-Step" (pillar page, 3,000+ words). Interlinks all suburb pages.
2. **USDA cleanup (with Adam's confirmation)** — Buda + Smithville + Elgin + Florence + Jarrell body/schema/FAQ all have USDA claims. Once Adam confirms he does not do USDA, remove from those 5 pages.
3. **Liberty Hill page unique content** — Liberty Hill ISD, Williamson County tax, Orchard Ridge/Santa Rita Ranch.
4. **Audit /mortgage-broker-vs-bank.html** — comparison table + FAQPage schema; counter MortgageAustin.com.
5. ~~Pre-approval AEO~~ ✅ DONE 2026-04-21
6. ~~Refinance FAQ schema~~ ✅ DONE 2026-04-21
7. ~~CTR title rewrites~~ ✅ DONE — all 24 suburb pages complete as of 2026-04-20
8. ~~H2 audit~~ ✅ DONE — all 24 suburb pages in question format as of 2026-04-20

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
