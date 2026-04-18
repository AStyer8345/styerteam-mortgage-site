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

2026-04-18 (mobile perf) — Compressed 3 huge images (family2.jpg 8.1MB, adam-cutout.png 5.0MB, headshot.jpg 2.0MB) to WebP — 15.1 MB → 240 KB total (98.4% savings). Wrapped 42 `<img>` tags across 48 pages in `<picture>` blocks with WebP + fallback. Targets the GSC desktop-vs-mobile ranking gap (9.25 vs 36.47). Originals backed up to `assets/originals/`. Diagnosis + top-5 mobile issues in `tasks/mobile-perf-2026-04-18.md`. Needs Adam review: calculator slider tap targets (20×20 px), calculator form labels, blog hero-bg preload. Earlier today (daily opt): schema audits (homepage, about, DSCR, Westlake), AEO paragraph on DSCR, H2 question conversion on 6 suburb pages, raw URL → /get-preapproved fixes.

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
| Hutto AEO review count in schema — confirm = 136 (not 91) | LOW |

## What's Next

1. **H2 audit** — Remaining pages: Taylor, Smithville, Spicewood, Florence, Jarrell, Marble Falls, Elgin, Lakeway, Bee Cave, Bastrop, New Braunfels, Austin-area hub
2. **Hutto** — Verify schema review count = 136 (not 91); check AEO paragraph quality
3. **GSC URL Inspection** — Submit Dripping Springs, Westlake, Hutto, Liberty Hill, Manor. Adam action: search.google.com/search-console → URL Inspection → Request Indexing
4. **Next blog post (April 24)** — "How to Buy a House in Austin TX 2026 Step-by-Step" (pillar page, 3,000+ words) or "Austin Mortgage Rates — April 2026 Update"
5. Test rate-check form end-to-end (submit test PDF, verify Supabase + Outlook email)
6. PageSpeed manual check — pagespeed.web.dev for /get-preapproved and /refinance-quote (quota blocks automated check)

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
