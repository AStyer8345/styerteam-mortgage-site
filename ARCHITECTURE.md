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
| Name | Adam Styer \| Kyber Mortgage Corporation dba HyperSmart Home Loans |
| NMLS | 513013 (Adam) / 2653540 (Company) |
| Phone | (512) 956-6010 |
| Email | adam@thestyerteam.com |
| Address | 9050 N. Capital of Texas Hwy, Ste 390, Austin, Texas 78759 |
| Calendly | https://calendly.com/adamstyer/15minutes |
| Loan app | https://hypersmart.my1003app.com/513013/register?time=1779291829279 |
| GBP Place ID | ChIJYy5uEFPKRIYRmF-k_5gPk74 |

### Reviews
| Platform | Stars | Count |
|----------|-------|-------|
| Google | 5.0 | 91 |
| Zillow | 4.98 | 45 |
| Combined | 5.0 | 136+ |

**Homepage stats strip (verbatim, current):** `1,000+ Loans Closed | 5.0 ★ Google rating | 4.98 ★ Zillow rating | 40+ Wholesale Lenders Shopped`

> The legacy trust bar (`5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013`) is **retired.** The "21-Day Avg. Close" performance claim was removed sitewide 2026-05-17 per GOALS.md — do not reintroduce it. Verified 2026-08-19: zero occurrences in site HTML.

## Conversion Tracking (GTM Events)

Events are pushed to `dataLayer` from two shared bundles, never from the GTM container snippet. Page HTML carries only the `lead_type` value; the push itself lives in the bundle — so a "missing event" grep against page HTML is meaningless. Verified live 2026-08-19.

**`script.js` — form + phone**

| Event | Trigger | Parameters |
|-------|---------|------------|
| `generate_lead` | Any tracked form submit (`dispatchLeadSubmitted`) | `lead_type` (see below) |
| `scenario_submit` | Fires alongside `generate_lead` on the same submit | `page_path` |
| `phone_click` | Delegated click on any `tel:` link, sitewide | — |
| `thank_you_page_view` | Page load on /thank-you | — |

`lead_type` values in use: `purchase_prequal` (/get-preapproved) · `refi_quote` (/refinance-quote) · `quick_quote` (hero quick form) · `contact_form` (/contact) · `rate_check` · `rate_alert_signup` · `ftb_dpa_guide` · `lo_waitlist_signup`

**`analytics.js` — outbound + intent clicks**

| Event | Trigger |
|-------|---------|
| `book_call_click` | Click on `a[href*="calendly.com"]` |
| `qualification_started` | Calendly click **intercepted** — see Qualification Gate below |
| `secure_application_click` | Click on `a[href*="my1003app.com"]` |
| `apply_now_click` | Also fires on `a[href*="my1003app.com"]` |
| `send_scenario_click` | Click on `a[href*="scenario"]` |
| `email_click` | Click on `a[href^="mailto:"]` |

Any link may override its event name with a `data-track="<event>"` attribute.

Google Ads conversion fires on: `thank_you_page_view` only.

> **There is no `calendly_click` event.** It was documented here until 2026-08-19 but exists in no bundle and no page. The real event is `book_call_click`. Do not build a GTM trigger or Ads conversion on `calendly_click` — it will never fire.

### Qualification Gate

`analytics.js` intercepts clicks on `a[href*="calendly.com"]` and `preventDefault()`s them, redirecting to `/get-preapproved.html?intent=schedule&source=<path>` so the lead qualifies before booking. Links carrying `data-qualified-calendar` are exempt.

All ~100 pre-conversion pages are intercepted — that is intentional, not a bug. `/thank-you` is **not** intercepted because it embeds Calendly as an inline widget (`data-url`), not an `<a href>`; its on-page buttons are internal `#ty-calendly` jumps. Converted leads therefore book directly.

Known gap: because the thank-you booking is a widget rather than a link, `book_call_click` does not fire there. Capturing it would require listening to Calendly's `postMessage` events.

### Funnel Topology (verified end-to-end 2026-08-19)

Two entry paths converge on the same form. The suburb path is **two hops**, not one:

```
24 suburb pages + area hub ──(3–6 links each)──> /scenario.html ──> /get-preapproved?intent=scenario
homepage ──(4 CTAs)───────────────────────────────────────────────> /get-preapproved.html?intent=scenario
                                                                    │
                                          form submit → generate_lead(purchase_prequal)
                                                                    ↓
                                                    /thank-you → thank_you_page_view → Ads conversion
```

- Suburb pages link to `/get-preapproved` **0/25 — by design** (24 suburbs + `austin-area-mortgage-lender`). They route through `/scenario.html`, which is their sole main-body CTA target. Re-verified quote-agnostically and extensionless 2026-08-19; this is not a defect, do not "fix" it.
- `/scenario.html` is a routing hub: no form, no `generate_lead`. Its CTAs are the 1003 app (`secure_application_click`), mailto (`email_click`), and Calendly (intercepted). Correct for the page type.
- The `?intent=scenario` param **survives** the `/get-preapproved → /get-preapproved.html` 301 in `_redirects`, and `get-preapproved.html` reads `intent === 'scenario'`. Verified — do not assume the hop is lossy.

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
**Indexed (8, all in sitemap.xml):** calculators (hub), calculator-payment, calculator-affordability,
calculator-refinance-breakeven, rate-buydown-calculator, dscr-calculator, asset-depletion-calculator,
wrap-mortgage-calculator.

**Crawl-blocked (1):** `refinance-calculator.html` — "Refinance Cost Calculator", 45KB, the richest of the
refinance tools. It is live 200, self-canonical, has a title + 144-char meta description, and is linked from
`calculators.html` as a primary `calc-card--solid`, **but `robots.txt` carries `Disallow: /refinance-calculator.html`.**
Do not add it to sitemap.xml — see Sitemap Governance below. The internally-promoted-but-crawl-blocked
contradiction is a real open question flagged to Adam (2026-08-20); resolve the policy before changing either side.

### Internal (noindex)
ops, dashboard, marketing-command-center, marketing-content, loan-dashboard, loanos, task-dashboard, hero-test

## Sitemap Governance

`sitemap.xml` = **146 URLs, 146 `<lastmod>`, verified correct 2026-08-20.** 143 carry `.html`; the 3 that don't
are directory-style URLs (`/`, `/resources/`, `/resources/first-time-buyer-guide/`).

**Before adding any URL, all four guards must pass.** Guard 1 is the one that gets skipped:

1. **`robots.txt` has no `Disallow` for it.** ← checked *last* on 2026-08-20 and it was the only guard that
   caught a would-be regression. A sitemap entry for a Disallowed URL sends Google two contradicting
   signals and surfaces as a "Blocked by robots.txt" error in the GSC sitemap report.
2. **No `<meta name="robots" content="noindex">`.**
3. **Canonical points at itself.** A non-self-canonical URL must never be listed — it splits the signal.
4. **The peer set agrees.** Uniform absence across a category is a decision; a lone outlier is the defect.

### The 8 repo pages deliberately absent from sitemap.xml — all correct, do not "fix"

| Page | Why it is excluded |
|---|---|
| `refinance-calculator.html` | `robots.txt` Disallow (guard 1) |
| `loanos.html` | `robots.txt` Disallow + LoanOS marketing paused per GOALS.md |
| `rates/2026-03-24.html` | 0 of 10 dated `rates/` pages are listed — uniform, by design (guard 4) |
| `blog/2026-03-20-austin-mortgage-rates-march-2026.html` | canonical → `/austin-mortgage-rates.html` (guard 3) |
| `googlea3d746ce1ceb4bff.html` | GSC site-verification file |
| `index.html` | listed as `https://styermortgage.com/` (root form) |
| `resources/index.html` | listed as `/resources/` (trailing-slash form) |
| `resources/first-time-buyer-guide/index.html` | listed as `/resources/first-time-buyer-guide/` |

The last three are **path-normalization false positives**: any coverage sweep must compare against the
root and trailing-slash forms, or it will report the homepage as missing from its own sitemap.

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

## NMLS Legal Disclaimer

**Three variants are in use.** Company NMLS `2653540` coverage is **146/146 live URLs** — there is no
page without a disclaimer. Verified 2026-08-20 by fetching all 146 sitemap URLs.
**Match on `2653540` for coverage, never on prose.** A grep for the phrase
`Licensed Mortgage Broker in Texas` returns 40 false "missing disclaimer" hits.

| Variant | URLs | Contents |
|---|---|---|
| **A** — full block (quoted below) | 106 | *"is a Licensed Mortgage Broker in Texas"* · *"Equal Housing Opportunity"* |
| **B** — long-form footer | 33 | Kyber legal name · **principal address** · **Texas Consumer Complaint Notice** · *"Licensed in Texas"* · *"Equal Housing **Lender**"* · product-specific disclosure where one applies (e.g. "DSCR loans are for investment properties only"). Used on loan-product, DSCR, suburb, and lead-capture pages. |
| **C** — thin footer | 5 | Kyber legal name + both NMLS IDs only. **No address, no Consumer Complaint Notice.** |
| *(legal pages)* | 2 | `privacy.html`, `terms.html` — address present, no Consumer Complaint Notice. Different document type. |

**Variant C pages:** `calculator-payment`, `calculator-affordability`, `calculator-refinance-breakeven`,
`rate-buydown-calculator`, `first-time-home-buyer`. Note this splits the calculator set — the other four
calculators carry A or B. Whether C is thin-by-design or drift is **Adam-gated** (legal copy); flagged
2026-08-20, do not resolve unilaterally.

> ⚠️ **Open, Adam-gated (2026-08-20):** the two variants disagree on entity type — Variant A says
> *Licensed Mortgage **Broker***, Variant B says *Equal Housing **Lender***. Separately, 3 pages
> (`realtors.html`, `blog/local-lender-vs-online-lender-austin-central-texas.html`,
> `blog/2026-03-27-down-payment-assistance-texas-2026.html`) advertise Adam as a
> ***correspondent lender* who "funds in my own name"**, which contradicts the Licensed Mortgage Broker
> disclaimer in their own footers. Do not resolve either without Adam — license-type copy is his call.

### Variant A (verbatim)

```
© 2026 Kyber Mortgage Corporation dba HyperSmart Home Loans. All rights reserved.
NMLS# 2653540 (Company) | 513013 (Adam Styer) | NMLS Consumer Access: https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2653540
Kyber Mortgage Corporation dba HyperSmart Home Loans is a Licensed Mortgage Broker in Texas. This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates and programs are subject to change without notice. All products are subject to credit and property approval. The property must be appraised at a value sufficient to support the loan requested. Additional restrictions and limitations may apply. Equal Housing Opportunity.
```
