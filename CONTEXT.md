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

2026-04-19 (daily opt) — H2 question-format audit on Spicewood (4 H2s), Florence (4 H2s), Jarrell (4 H2s). Blog title brand drift fixed. Suburb editor run 1: Round Rock deepened — removed 1 templated paragraph, added Teravista neighborhood spotlight (78626), Westwood HS 9/10 GreatSchools rating, sourced employer list (Dell/Emerson/Toppan/Amazon), closing cost breakdown at $390K, updated home price to $388K Feb 2026 (Redfin). Queue tracking started at run-logs/suburb-editor-queue.md.

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
| GTM malware flag still shows in version list — cosmetic only; new tag entity IDs are clean and will pass next scan | LOW |
| Next blog due ~April 24 (7-day cadence, last: April 17 refinance guide) | LOW |
| Suburb quick-form submissions not counted as Google Ads conversions — GTM dashboard config needed | HIGH |
| GSC URL Inspection needed — Taylor, Smithville, Elgin, Florence, Jarrell now in sitemap; need manual Request Indexing | LOW |
| PageSpeed manual check needed — quota blocks automated check | MEDIUM |

## What's Next

1. **H2 audit** — Remaining pages: Marble Falls, Elgin, Lakeway, Bee Cave, Bastrop, New Braunfels, Austin-area hub (Spicewood + Florence + Jarrell done 2026-04-19)
2. **GSC URL Inspection** — Submit Taylor, Smithville, Elgin, Florence, Jarrell (now in sitemap), plus Dripping Springs, Westlake, Hutto, Liberty Hill, Manor. Adam action: search.google.com/search-console → URL Inspection → Request Indexing
3. **Next blog post (April 24)** — "How to Buy a House in Austin TX 2026 Step-by-Step" (pillar page, 3,000+ words) or "Austin Mortgage Rates — April 2026 Update"
4. Test rate-check form end-to-end (submit test PDF, verify Supabase + Outlook email)
5. PageSpeed manual check — pagespeed.web.dev for /get-preapproved and /refinance-quote (quota blocks automated check)

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
