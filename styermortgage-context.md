# styermortgage.com — Site Context
# Source of truth for Claude Code and Cowork
# Store in repo root. Both tools read this before doing anything.
# Update this file whenever facts change. Do not edit the prompts for routine updates.

---

## LAST UPDATED
March 19, 2026 — Code session: /thank-you nav fixed to logo-only; schema type corrected to MortgageBroker

---

## THE BUSINESS

**Name:** Adam Styer | Mortgage Solutions LP
**Never call it:** "The Styer Team" or "The Styer Mortgage Team"
**Type:** Independent mortgage broker, wholesale channel, Austin TX
**NMLS:** 513013 (Adam Styer) / 2526130 (Mortgage Solutions LP)
**Licensed in:** Texas
**In business since:** 2017
**Loans closed:** 1,000+ career
**Avg close time:** 21 days
**Lender access:** 40+ wholesale lenders

---

## ADAM STYER

**Role:** Senior Loan Officer, broker-owner
**Location:** Austin, TX (Northwest Hills area)
**Background:** Ohio native, Austin resident 16+ years, father of 3, husband to Britney Jo, 10+ years sober, faith-driven, active in Austin sober community
**Core values:** Dedication, Integrity, Ownership, Excellence, Compassion, Balanced Life, Gratitude
**Voice:** Personal, direct, faith-adjacent, short punchy sentences — never corporate

---

## CONTACT & KEY LINKS

| Asset | Value |
|---|---|
| Phone | (512) 956-6010 |
| Phone href | tel:+15129566010 |
| Email | adam@thestyerteam.com |
| Calendly | https://calendly.com/adamstyer/15minutes |
| Loan application | https://mslp.my1003app.com/513013/register?time=1767737197980 |
| Loan app anchor text | "loan application" or "Start Your Application" — never display raw URL |
| Address | 5718 Sam Houston Circle, Austin, TX 78731 |
| Google Business Place ID | ChIJYy5uEFPKRIYRmF-k_5gPk74 |

**Social:**
- Facebook: https://www.facebook.com/StyerTeam/
- Instagram: https://www.instagram.com/styerteam/
- LinkedIn: https://www.linkedin.com/in/adamstyerloans/
- Zillow: https://www.zillow.com/lender-profile/adamstyer/

---

## REVIEWS & TRUST SIGNALS

| Platform | Stars | Count |
|---|---|---|
| Google | 5.0 | 91 reviews |
| Zillow | 4.98 | 45 reviews |
| Combined used in copy | 5.0 ★ | 136+ reviews |

**Standard trust bar (use verbatim):**
`5.0 ★ (136+ Reviews) | 21-Day Avg. Close | Licensed in Texas | NMLS #513013`

**UPDATE THIS FILE** when review counts change significantly.

---

## SITE ASSETS

| Asset | Path |
|---|---|
| Logo SVG | /assets/logo.svg |
| Adam headshot cutout | /assets/adam-cutout.png |
| Adam + kids photo | /assets/ruthie-charlie.jpg |
| Team meeting photo | /assets/team-meeting.jpg |
| Headshot (external) | https://styermortgage.com/assets/headshot.jpg |

---

## TECH STACK & INFRASTRUCTURE

| Item | Detail |
|---|---|
| Stack | Custom HTML/CSS/JS — no frameworks, no CMS, no WordPress |
| Hosting | Netlify |
| Repo | GitHub: AStyer8345 |
| Deployment | Auto-deploy on GitHub push |
| Forms backend | Netlify Forms — `netlify` attribute on `<form>`, hidden `form-name` input required |
| Analytics | Google Analytics 4 — Measurement ID: G-DDY0H0319S |
| Tag management | Google Tag Manager — already installed in `<head>` of all pages |
| Pixels | Facebook Pixel (via GTM), Google Ads tag (via GTM) |
| Domain | styermortgage.com |

---

## CONVERSION TRACKING (GTM Events)

These dataLayer events are wired (or must be wired) via JavaScript on form/link interactions. GTM listens for these and fires the corresponding ad platform tags.

| Event Name | Trigger | Parameters |
|---|---|---|
| `generate_lead` | Form submit on /get-preapproved | `lead_type: "purchase_prequal"` |
| `generate_lead` | Form submit on /refinance-quote | `lead_type: "refi_quote"` |
| `generate_lead` | Quick Quote form submit (homepage + landing pages) | `lead_type: "quick_quote"` |
| `thank_you_page_view` | Page load on /thank-you | — |
| `phone_click` | Click on any `tel:` link | — |
| `calendly_click` | Click on any Calendly link | — |

Google Ads conversion fires on: `thank_you_page_view` (page load at /thank-you)

---

## GOOGLE ADS CAMPAIGNS

| Campaign | Status | Ad Destination | Goal |
|---|---|---|---|
| Purchase | In preparation | /get-preapproved | Lead form submission |
| Refinance | In preparation | /refinance-quote | Lead form submission |

**Target keywords — Purchase:**
- mortgage lender austin tx
- get pre-approved austin
- home loan austin tx
- first time home buyer austin
- mortgage broker austin tx
- austin mortgage broker

**Target keywords — Refinance:**
- refinance mortgage austin tx
- lower my mortgage rate austin
- cash out refinance austin tx
- austin mortgage refinance
- refinance home loan austin

---

## FULL PAGE INVENTORY

### Google Ads Landing Pages (stripped nav — logo only)
| Page | URL | Status |
|---|---|---|
| Purchase landing page | /get-preapproved | ✅ Live — verified 2026-03-19 |
| Refi landing page | /refinance-quote | ✅ Live — verified 2026-03-19 |
| Thank you / conversion | /thank-you | ✅ Live — verified 2026-03-19 |

### Primary Conversion Pages (full nav)
| Page | URL |
|---|---|
| Pre-qualification form (4-step) | /prequal |
| Homepage | / |

### Loan Program Pages
| Page | URL |
|---|---|
| All programs hub | /products |
| Conventional | /loans/conventional |
| FHA | /loans/fha |
| VA | /loans/va |
| USDA | /loans/usda |
| Jumbo | /loans/jumbo |
| Construction | /loans/construction |
| Refinance | /loans/refinance |
| Investment | /loans/investment |
| DSCR / Non-QM | /dscr-loan-austin-tx |

### Suburb / Service Area Pages
| City | URL |
|---|---|
| Round Rock | /round-rock-mortgage-lender |
| Cedar Park | /cedar-park-mortgage-lender |
| Leander | /leander-mortgage-lender |
| Georgetown | /georgetown-mortgage-lender |
| Pflugerville | /pflugerville-mortgage-lender |
| Kyle | /kyle-mortgage-lender |
| San Marcos | /san-marcos-mortgage-lender |
| Westlake | /westlake-mortgage-lender |
| Buda | /buda-mortgage-lender |

### Resources & Tools
| Page | URL |
|---|---|
| Calculators hub | /calculators |
| Buydown calculator | /rate-buydown-calculator |
| WRAP mortgage calculator | /wrap-mortgage-calculator |
| Blog index | /blog |
| Realtor resources | /realtor-resources |
| Buyer guide | /first-time-buyer-guide |
| Fixed vs adjustable article | /fixed-vs-adjustable |
| Improve credit score article | /improve-credit-score |

### Site Pages
| Page | URL |
|---|---|
| About Adam | /about |
| Testimonials | /testimonials |
| For Realtors | /realtors |
| Contact | /contact |
| Texas Consumer Notice | /texas-complaint-notice |

---

## SEO STATUS

### Schema Markup
| Schema Type | Page | Status |
|---|---|---|
| MortgageBroker | Homepage | ✅ Present — @type updated from FinancialService; includes AggregateRating (136 reviews, 5.0) |
| AggregateRating | Homepage | ✅ Present in LocalBusiness schema |
| FAQPage | /dscr-loan-austin-tx | ✅ Present — 6 questions — verified 2026-03-19 |
| FAQPage | /loans/refinance | ✅ Present — 5 questions — verified 2026-03-19 |
| FAQPage | All 9 suburb pages | ⚠️ Unverified — spot check needed |
| BreadcrumbList | Suburb + loan pages | ⚠️ Unverified — spot check needed |

### Known SEO Gaps (as of March 2026)
- Suburb pages need inline lead capture forms (currently just CTA buttons to /prequal)
- Blog posts need CTAs wired to /get-preapproved and /refinance-quote
- "Austin mortgage rates today" page doesn't exist — high-traffic keyword opportunity
- /austin-down-payment-assistance referenced in FHA page but may not exist — verify

---

## OPERATING RULES FOR CLAUDE CODE & COWORK

### Always
- Read this file before starting any session
- Match existing HTML/CSS patterns in the repo exactly before writing new pages
- Use Netlify Forms for all form capture (`netlify` attribute + hidden `form-name` input)
- Push to GitHub to deploy — Netlify auto-builds
- Verify pages are live after every push
- Use Adam's exact anchor text for loan app link — never display raw URL

### Never
- Add new CSS frameworks, JS libraries, or npm packages without Adam's approval
- Remove or modify the GTM container snippet
- Change visual design without Adam's approval
- Add third-party scripts without Adam's approval
- Modify form field names on /get-preapproved or /refinance-quote — they're wired to GTM
- Use "The Styer Team" or "The Styer Mortgage Team" — always "Adam Styer | Mortgage Solutions LP"
- Display the raw loan application URL — always use anchor text

### Navigation Rules
- Standard pages: full site nav
- Google Ads landing pages (/get-preapproved, /refinance-quote): logo only, no menu
- /thank-you: logo only, no menu — conversion done, only exit point is Calendly

### Footer Rules
- Standard pages: full footer with company links, service areas, contact, NMLS disclaimer
- Google Ads landing pages + /thank-you: NMLS legal disclaimer and Equal Housing only

---

## NMLS LEGAL DISCLAIMER (use verbatim on all pages)

```
© 2026 Mortgage Solutions, LP. All rights reserved.
NMLS# 2526130 (Company) | 513013 (Adam Styer) | NMLS Consumer Access: https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/2526130
Mortgage Solutions, LP is a Licensed Mortgage Broker in Texas. This is not an offer to enter into an agreement. Not all customers will qualify. Information, rates and programs are subject to change without notice. All products are subject to credit and property approval. The property must be appraised at a value sufficient to support the loan requested. Additional restrictions and limitations may apply. Equal Housing Opportunity.
```

---

## KNOWN ISSUES / IN PROGRESS

Update this section as work is completed or new issues are found.

| Issue | Priority | Status |
|---|---|---|
| /get-preapproved page doesn't exist | HIGH | ✅ DONE — live, tracking verified 2026-03-19 |
| /refinance-quote page doesn't exist | HIGH | ✅ DONE — live, tracking verified 2026-03-19 |
| /thank-you page doesn't exist | HIGH | ✅ DONE — live, thank_you_page_view fires on load |
| AggregateRating schema missing from homepage | HIGH | ✅ DONE — present in LocalBusiness schema |
| FAQPage schema missing from DSCR page | HIGH | ✅ DONE — 6 FAQs present |
| FAQPage schema missing from /loans/refinance | HIGH | ✅ DONE — 5 FAQs present |
| FAQPage schema missing from suburb pages | MEDIUM | ⚠️ Unverified — needs spot check |
| Homepage missing link to /get-preapproved in body | MEDIUM | ✅ FIXED 2026-03-19 — final CTA now links to /get-preapproved |
| /dscr-loan-austin-tx missing /calculators link | MEDIUM | ✅ FIXED 2026-03-19 — "Run the Numbers" button added to CTA |
| /loans/refinance missing /refinance-quote link | MEDIUM | ✅ FIXED 2026-03-19 — "Get a Refi Quote" button added to CTA |
| /dscr-loan-austin-tx linked to /mortgage-pre-approval-austin instead of /get-preapproved | LOW | ✅ FIXED 2026-03-19 — changed href to /get-preapproved |
| Mobile PageSpeed score on /get-preapproved: 79 | MEDIUM | Open — target 80+; LCP 4.6s, compress hero image, defer non-critical JS |
| Conversion tracking live test blocked (tab backgrounded) | LOW | Open — Adam to verify in GTM Preview mode with tab in focus |
| Form below fold on mobile (both landing pages) | MEDIUM | Open — form stacks below hero copy at <900px |
| Suburb pages have no inline lead capture forms | MEDIUM | Open |
| Blog CTAs not wired to ad landing pages | MEDIUM | Open |
| "Austin mortgage rates today" page missing | MEDIUM | Open — high-traffic keyword opportunity |
| /austin-down-payment-assistance — existence unverified | LOW | Unverified |
