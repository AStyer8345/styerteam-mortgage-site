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

2026-04-13 — Weekly competitive intelligence run (Week 6). **MAJOR: styermortgage.com ranks #3 for "hutto tx mortgage lender"** — first ever top-10 ranking. Suburb pages are indexing. Confirmed Big Life's Hutto page is weak (25 reviews in schema, no local neighborhood content). Liberty Hill dominated by Guild Mortgage (physical branch). MortgageAustin.com rising competitor for "mortgage broker austin tx" keyword. Full report in run-logs/competitive/2026-04-13.md.

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
| Homepage hero "Apply Now" links to raw 1003 app (bypasses tracked funnel) | LOW |
| `2026-03-06-temp-placeholder.html` — "Oil Prices" post still at temp URL | MEDIUM |
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |

## What's Next

1. **Strengthen Hutto page** — AEO paragraph, schema review count to 91+, neighborhood names (Star Ranch, Brushy Creek, Cottonwood Creek), internal link from rate-check-georgetown.html
2. **Liberty Hill unique content** — Liberty Hill ISD, Williamson County tax, Orchard Ridge/Santa Rita Ranch new construction, MUD districts
3. **Audit /mortgage-broker-vs-bank.html** — Add comparison table, FAQPage schema; counter MortgageAustin.com's rising blog post
4. **GSC URL Inspection** — Submit Dripping Springs, Round Rock, Cedar Park, Leander, Georgetown for manual indexing
5. **Publish /self-employed-mortgage-austin.html** — Still unchallenged content gap
6. Test rate-check form end-to-end (submit test PDF, verify Supabase + Outlook email)
7. Rename temp placeholder blog posts to permanent slugs

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
