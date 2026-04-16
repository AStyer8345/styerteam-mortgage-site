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

2026-04-16 (scheduled) — TOMORROW_PRIORITY: Kyle + Buda H2 audit. Kyle: 3 H2s → question format; at-a-glance block added (Hays County, Kyle ISD, Amazon + Tesla corridor, Plum Creek/6 Creeks/Anthem/Crosswinds/Steeplechase, $280K–$380K). Buda: 3 H2s → question format; at-a-glance block added; /calculators body link added; body CTA + footer Apply Now fixed from raw app URL → /get-preapproved. Homepage hero "Apply Now" fixed from raw app URL → /get-preapproved (LOW blocker closed). Both sitemap lastmods 2026-04-16. Thursday funnel audit PASS. Deploy verified 200. Self-review PASS.

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
| Blog title brand drift — recurring issue, pre-publish lint required | HIGH |
| Buda trust bar text differs from standard (old template) — needs update | LOW |

## What's Next

1. **Friday rotation** — Content planning + AEO review: check last blog post date, audit 2 posts for AEO quality (answer-first FAQ, H2 question format, extractable summary)
2. **Buda trust bar fix** — Update old template hero text to match standard: "5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013" (LOW, quick)
3. **Hutto push** — AggregateRating schema correct at 136 ✅. AEO paragraph present. No action needed unless GSC shows slippage.
4. **Liberty Hill unique content** — Liberty Hill ISD, Williamson County tax, Orchard Ridge/Santa Rita Ranch new construction, MUD districts
5. **GSC URL Inspection** — Submit Kyle + Buda (updated today); Georgetown + Pflugerville (updated 2026-04-15); Cedar Park + Leander (updated 2026-04-15 AM). Adam action required.
6. Test rate-check form end-to-end (submit test PDF, verify Supabase + Outlook email)

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
