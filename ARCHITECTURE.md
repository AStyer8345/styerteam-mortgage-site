# styermortgage.com — Architecture

## Tech Stack

| Item | Detail |
|------|--------|
| Stack | Custom HTML/CSS/JS — no framework, no CMS |
| Hosting | Netlify |
| Functions | Netlify Functions (Node.js + esbuild) |
| Dependencies | `@anthropic-ai/sdk`, `@mailchimp/mailchimp_marketing`, `@netlify/blobs` |
| Analytics | GA4 (G-DDY0H0319S) via GTM (GTM-PQQ6PGLR) |
| Ads | Google Ads (758-138-2642) |
| Domain | styermortgage.com |
| Repo | GitHub: AStyer8345/styerteam-mortgage-site |

## Design System

| Token | Value |
|-------|-------|
| Navy | `#0A1F3F` |
| Gold | `#C9A84C` |
| White | `#FFFFFF` |
| Body font | Inter (Google Fonts) |
| Header font | Playfair Display (Google Fonts) |
| Breakpoints | Mobile (<768px), Tablet (768–1024px), Desktop (1024px+) |

## Business Info

| Field | Value |
|-------|-------|
| Name | Adam Styer \| Mortgage Solutions LP |
| NMLS | 513013 (Adam) / 2526130 (Company) |
| Phone | (512) 956-6010 |
| Email | adam@thestyerteam.com |
| Address | 5718 Sam Houston Circle, Austin, TX 78731 |
| Calendly | https://calendly.com/adamstyer/15minutes |
| Loan app | https://mslp.my1003app.com/513013/register |
| GBP Place ID | ChIJYy5uEFPKRIYRmF-k_5gPk74 |

### Reviews
| Platform | Stars | Count |
|----------|-------|-------|
| Google | 5.0 | 91 |
| Zillow | 4.98 | 45 |
| Combined | 5.0 | 136+ |

**Trust bar (verbatim):** `5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013`

## Conversion Tracking (GTM Events)

| Event | Trigger | Parameters |
|-------|---------|------------|
| `generate_lead` | Form submit on /get-preapproved | `lead_type: "purchase_prequal"` |
| `generate_lead` | Form submit on /refinance-quote | `lead_type: "refi_quote"` |
| `generate_lead` | Quick Quote form submit (homepage + landing pages) | `lead_type: "quick_quote"` |
| `thank_you_page_view` | Page load on /thank-you | — |
| `phone_click` | Click on any `tel:` link | — |
| `calendly_click` | Click on any Calendly link | — |

Google Ads conversion fires on: `thank_you_page_view` only.

## Google Ads

**Account ID:** 758-138-2642

| Campaign | Status | Budget | Destination |
|----------|--------|--------|-------------|
| Search-1 (The Styer Mortgage Team) | PAUSED | — | /get-preapproved |
| Suburb — Purchase Intent | SPEC READY | $500/mo | Suburb landing pages |
| Refinance | In preparation | TBD | /refinance-quote |

**Suburb campaign spec:** `/Users/adamstyer/Documents/loanos-clone/tasks/seo-sem/specs/google-ads-suburb-campaigns.md`

**Negative keywords:** jobs, career, salary, license, school, class, training, free house, rent, apartment, commercial, business loan

## Page Inventory

### Core Pages
| Page | URL |
|------|-----|
| Homepage | / |
| About | /about |
| Loan Programs Hub | /products |
| Calculators Hub | /calculators |
| Blog Index | /blog |
| Testimonials | /testimonials |
| For Realtors | /realtors |
| Realtor Resources | /realtor-resources |
| Contact | /contact |
| Texas Consumer Notice | /texas-complaint-notice |

### Lead Capture (stripped nav)
| Page | URL |
|------|-----|
| Pre-Approval Form | /get-preapproved |
| Refinance Quote | /refinance-quote |
| Pre-Qualification (4-step) | /prequal |
| Rate Alert Signup | /rate-alert |
| Thank You / Conversion | /thank-you |

### Loan Product Pages (8)
conventional, fha, va, usda, jumbo, construction, refinance, investment — all under `/loans/`
Plus: `/dscr-loan-austin-tx`

### Suburb SEO Pages (24)
Round Rock, Cedar Park, Leander, Georgetown, Pflugerville, Kyle, San Marcos, Westlake, Buda, Dripping Springs, Lakeway, Hutto, Liberty Hill, Manor, New Braunfels, Bastrop, Bee Cave, Marble Falls, Elgin, Florence, Jarrell, Smithville, Spicewood, Taylor — all at `/[city]-mortgage-lender`

### Resource / Guide Pages
| Page | URL |
|------|-----|
| First-Time Buyer Guide | /first-time-buyer-guide |
| First-Time Buyer Programs | /first-time-home-buyer |
| Pre-Approval Process | /mortgage-pre-approval-austin |
| Affordability Guide | /how-much-house-can-i-afford-austin |
| DPA Programs | /austin-down-payment-assistance |
| Closing Costs Texas | /closing-costs-texas |
| Broker vs Bank | /mortgage-broker-vs-bank |
| Fixed vs ARM | /fixed-vs-adjustable |
| Credit Score Tips | /improve-credit-score |
| Self-Employed Mortgages | /self-employed-mortgage-austin |
| Austin Housing Market | /austin-housing-market-2025 |
| Austin Mortgage Rates | /austin-mortgage-rates |

### Calculators
payment, affordability, refinance-breakeven, rate-buydown, wrap-mortgage, refinance (internal)

### Internal (noindex)
ops, dashboard, marketing-command-center, marketing-content, loan-dashboard, loanos, task-dashboard, hero-test

## Netlify Functions

| Function | Purpose |
|----------|---------|
| `dispatch.js` | Unified webhook dispatcher — routes newsletter/realtor/rate requests |
| `generate-newsletter.js` | Weekly newsletter — Claude AI content → blog page → Mailchimp → social |
| `generate-rate-update.js` | Weekly rate update → rate page → Mailchimp |
| `generate-realtor-content.js` | Realtor-targeted content → page → Mailchimp → social |
| `subscribe-lead.js` | Lead capture → Mailchimp + LoanOS web-lead |
| `mcc-data.js` | Marketing Command Center cloud storage (Netlify Blobs) |

Shared libs in `netlify/functions/lib/`: prompt-builder, page-builder, blog-page-builder, rate-prompt/page-builder, realtor-prompt/page-builder, social-poster, shared utilities.

## Content Distribution

All website content auto-distributes to GBP + FB + IG + LI:
- **Tier 1 (immediate):** Social-media AM agent detects new files → n8n webhook → Publer posts
- **Tier 2 (2-3 days later):** Architect subagent creates native posts (carousels, Reels, long-form)
- GBP webhook: `POST https://styer.app.n8n.cloud/webhook/gbp-social-post`
- Tracker: `loanos-clone/tasks/social-media/gbp-content-tracker.md`

## SEO Schema Coverage

| Schema | Pages |
|--------|-------|
| MortgageBroker + AggregateRating | Homepage |
| Person (Adam Styer) | Homepage |
| FAQPage | Homepage, DSCR, loans/refinance, loans/va, all suburb pages, blog posts |
| BreadcrumbList | Suburb + loan pages |
| Article | Blog posts, austin-mortgage-rates |
| CollectionPage | blog.html |

## NMLS Legal Disclaimer (verbatim on all pages)

```
© 2026 Mortgage Solutions, LP. All rights reserved.
NMLS# 2526130 (Company) | 513013 (Adam Styer) | NMLS Consumer Access: https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2526130
Mortgage Solutions, LP is a Licensed Mortgage Broker in Texas. This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates and programs are subject to change without notice. All products are subject to credit and property approval. The property must be appraised at a value sufficient to support the loan requested. Additional restrictions and limitations may apply. Equal Housing Opportunity.
```
