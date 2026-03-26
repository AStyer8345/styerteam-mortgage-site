# styermortgage.com — Site Context
# Source of truth for Claude Code and Cowork
# Store in repo root. Both tools read this before doing anything.
# Update this file whenever facts change. Do not edit the prompts for routine updates.

---

## LAST UPDATED
March 25, 2026 (daily run) — Built evergreen /austin-mortgage-rates page: Article + FAQPage + BreadcrumbList schema, 5 FAQ questions, rate factors grid, loan type comparison cards, calculator callout, broker advantage section. Added to sitemap.xml. Targets "Austin mortgage rates today", "Austin mortgage rates 2026", "mortgage rates Austin TX". This page should be refreshed monthly (update dateModified in Article schema).

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
| Tag management | Google Tag Manager — GTM-PQQ6PGLR — installed on all public pages (head + noscript + dataLayer init) as of 2026-03-20 |
| Pixels | Facebook Pixel (via GTM), Google Ads tag (via GTM) |
| Domain | styermortgage.com |

---

## CONVERSION TRACKING (GTM Events)

GTM Container ID: GTM-PQQ6PGLR
GTM Status: Installed on all 54 public pages — head snippet + noscript + dataLayer init (as of 2026-03-20)
GA4 Measurement ID: G-DDY0H0319S
GA4 Status: Firing via GTM (as of 2026-03-20)
Google Search Console: Verified via googlea3d746ce1ceb4bff.html (file was already present)

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

## GOOGLE ADS

**Account ID:** 758-138-2642 (Adam Styer | Mortgage Solutions LP)
**Optimization Score:** 87.9% (as of 2026-03-23) — working toward 100%

### Optimizer Setup
- **Google Ads Scripts** (Tools → Bulk actions → Scripts): "Daily Optimizer" script installed and scheduled daily. Applies safe recommendations automatically (extensions, match types, ad strength). Skips budget/bid changes for human review.
- **Claude Code scheduled task:** `google-ads-daily-optimize` — runs 8 AM daily, queries NotebookLM for best practices, then runs the optimizer.
- **Script file:** `/Users/adamstyer/loanos/scripts/google_ads_optimizer.py` (Python/API version — requires credentials)
- **Command:** `/Users/adamstyer/loanos/.claude/commands/google-ads-optimize.md`

### Campaigns

| Campaign | Status | Ad Destination | Goal |
|---|---|---|---|
| Search-1 (The Styer Mortgage Team) | Eligible — $100.36/day | /get-preapproved | Lead form submission |
| Refinance | In preparation | /refinance-quote | Lead form submission |

### Sitelinks (applied 2026-03-23)
| Sitelink | Destination | Status |
|---|---|---|
| First-Time Buyers | /first-time-buyer-guide | ✅ Fixed — was pointing to nonexistent /first-time-home-buyer |
| Callout assets | Various | ✅ Applied via Scripts |

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
| Purchase landing page | /get-preapproved | ✅ Live — verified 2026-03-20 |
| Refi landing page | /refinance-quote | ✅ Live — verified 2026-03-20 |
| Thank you / conversion | /thank-you | ✅ Live — verified 2026-03-20 |

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

### Rates & Market Pages
| Page | URL | Status |
|---|---|---|
| Austin mortgage rates (evergreen) | /austin-mortgage-rates | ✅ NEW 2026-03-25 — Article + FAQPage schema, 5 FAQs, rate factors, loan type comparison. Update dateModified monthly. |

### Resources & Tools
| Page | URL |
|---|---|
| Calculators hub | /calculators |
| Buydown calculator | /rate-buydown-calculator |
| WRAP mortgage calculator | /wrap-mortgage-calculator |
| Blog index | /blog |
| Realtor resources | /realtor-resources |
| Buyer guide (article) | /first-time-buyer-guide |
| First-time buyer landing page | /first-time-home-buyer ✅ NEW 2026-03-23 — conversion LP with form, FHA/USDA/Conv cards, FAQ schema |
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

### Internal (noindex, no nav/footer)
| Page | URL | Status |
|---|---|---|
| Ops Dashboard | /ops | ✅ Live — added 2026-03-20. Cowork updates OPS_DATA in ops.html every session. |

---

## SEO STATUS

### Schema Markup
| Schema Type | Page | Status |
|---|---|---|
| FAQPage | Homepage | ✅ Added 2026-03-24 — 5 questions (pre-approval speed, broker vs bank, loan programs, cost, refinance 2026) |
| MortgageBroker | Homepage | ✅ Present — @type updated from FinancialService; includes AggregateRating (136 reviews, 5.0) |
| AggregateRating | Homepage | ✅ Present in LocalBusiness schema |
| FAQPage | /dscr-loan-austin-tx | ✅ Present — 6 questions — verified 2026-03-19 |
| FAQPage | /loans/refinance | ✅ Present — 5 questions — verified 2026-03-19 |
| FAQPage | /round-rock-mortgage-lender | ✅ Present — 5 questions — verified 2026-03-21 |
| FAQPage | /cedar-park-mortgage-lender | ✅ Present — 5 questions — verified 2026-03-21 |
| FAQPage | Leander, Georgetown, Pflugerville, Kyle, San Marcos, Westlake, Buda | ✅ All verified present — 2026-03-22 |
| FAQPage | /loans/va | ✅ Present — 5 questions — verified 2026-03-21 |
| BreadcrumbList | Suburb + loan pages | ✅ FIXED 2026-03-23 — added to all 9 suburb pages + all 7 loan pages |
| noindex tag | /get-preapproved + /refinance-quote | ✅ FIXED 2026-03-22 — robots noindex,nofollow added to both ad landing pages |

### Known SEO Gaps (as of March 2026)
- Suburb pages need inline lead capture forms (currently just CTA buttons to /prequal)
- Blog posts need CTAs wired to /get-preapproved and /refinance-quote
- "Austin mortgage rates today" page — ✅ ADDRESSED: blog post published 2026-03-20 targeting "Austin mortgage rates March 2026"
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
| GTM not installed on live site | HIGH | ✅ DONE 2026-03-20 — GTM-PQQ6PGLR on all 54 public pages (head + noscript + dataLayer init) |
| GA4 not firing on live site | HIGH | ✅ DONE 2026-03-20 — fires via GTM (G-DDY0H0319S) |
| phone_click not wired | HIGH | ✅ DONE 2026-03-20 — global delegated handler in script.js |
| Google Ads conversion tag missing from GTM | HIGH | ✅ FIXED 2026-03-23 — gtag.js + conversion event on thank-you.html. GTM tag still optional (belt-and-suspenders now in place) |
| /get-preapproved page doesn't exist | HIGH | ✅ DONE — live, tracking verified 2026-03-19 |
| /refinance-quote page doesn't exist | HIGH | ✅ DONE — live, tracking verified 2026-03-19 |
| /thank-you page doesn't exist | HIGH | ✅ DONE — live, thank_you_page_view fires on load |
| AggregateRating schema missing from homepage | HIGH | ✅ DONE — present in LocalBusiness schema |
| FAQPage schema missing from DSCR page | HIGH | ✅ DONE — 6 FAQs present |
| FAQPage schema missing from /loans/refinance | HIGH | ✅ DONE — 5 FAQs present |
| FAQPage schema missing from suburb pages | MEDIUM | ✅ Round Rock + Cedar Park verified 2026-03-21 — 5 questions each, Rich Results Test passed. Remaining 7 unverified. |
| Homepage missing link to /get-preapproved in body | MEDIUM | ✅ FIXED 2026-03-19 — final CTA now links to /get-preapproved |
| /dscr-loan-austin-tx missing /calculators link | MEDIUM | ✅ FIXED 2026-03-19 — "Run the Numbers" button added to CTA |
| /loans/refinance missing /refinance-quote link | MEDIUM | ✅ FIXED 2026-03-19 — "Get a Refi Quote" button added to CTA |
| /dscr-loan-austin-tx linked to /mortgage-pre-approval-austin instead of /get-preapproved | LOW | ✅ FIXED 2026-03-19 — changed href to /get-preapproved |
| Mobile PageSpeed /get-preapproved | HIGH | ✅ FIXED 2026-03-21 — Google Fonts now async (was 1,940ms render-block). Re-run PageSpeed to verify score recovery. |
| Conversion tracking verified | ✅ DONE | generate_lead (purchase_prequal + refi_quote), thank_you_page_view, phone_click all confirmed firing — 2026-03-20 |
| Form below fold on mobile (both landing pages) | MEDIUM | ✅ FIXED 2026-03-22 — added `order: -1` to `.lp-form-card` in `@media (max-width: 900px)` on both /get-preapproved and /refinance-quote. Form now renders above headline on mobile. |
| /thank-you page missing phone number | LOW | ✅ FIXED 2026-03-22 — added "(512) 956-6010 — call or text me directly" below Calendly button. |
| Copyright year 2025 on 7 pages | LOW | ✅ FIXED 2026-03-22 — updated to 2026 on thank-you, dscr, leander, pflugerville, georgetown, buda, westlake. |
| Phone number not above fold on landing pages | MEDIUM | ✅ FIXED 2026-03-23 — phone chip added to trust bar on both /get-preapproved and /refinance-quote; visible without scroll at 390px |
| No 'What happens next' section below form (both landing pages) | MEDIUM | ✅ FIXED 2026-03-23 — 3-step section added to both pages (reviews info same day → reaches out → letter/quote in 24hrs) |
| /loans/va title tag missing NMLS# | LOW | ✅ FIXED 2026-03-23 — now "VA Loans Austin TX \| Adam Styer \| NMLS #513013" |
| PageSpeed mobile score unverified 2026-03-21 | LOW | API quota exhausted during scheduled run. Last confirmed score: 80 (2026-03-20). Check manually at pagespeed.web.dev when convenient. |
| Suburb pages have no inline lead capture forms | MEDIUM | ✅ CONFIRMED 2026-03-23 — all 9 suburb pages have inline forms |
| Blog CTAs not wired to ad landing pages | MEDIUM | ✅ CONFIRMED 2026-03-24 — all 3 blog posts (surrender, ai-trap, rates) + both placeholder posts have /get-preapproved CTAs. Rates post also has /refinance-quote. No older posts without CTAs found. |
| Loan page title tags missing NMLS# | LOW | ✅ FIXED 2026-03-23 (run 2) — all 6 remaining loan pages (conventional, fha, usda, jumbo, construction, investment) now include NMLS #513013. All 9 suburb pages also standardized (Westlake + Buda had NMLS missing entirely). |
| Title tags using "NMLS 513013" (no # symbol) | LOW | ✅ FIXED 2026-03-24 (run 2) — loans/refinance.html (also missing NMLS# entirely), products.html, about.html, calculators.html — all now use "NMLS #513013" format consistently. |
| manifest.json missing March 18 post | LOW | ✅ FIXED 2026-03-20 — ai-trap post added to manifest |
| FAQPage schema missing from surrender post + AI trap post | LOW | ✅ FIXED 2026-03-23 — 5 FAQs added to each post. Surrender post robots also changed to index,follow. |
| New blog post: Austin mortgage rates March 2026 | ✅ DONE | Published 2026-03-20: /blog/2026-03-20-austin-mortgage-rates-march-2026.html — Article + FAQPage schema, 5 FAQ questions, internal links to /get-preapproved, /refinance-quote, /calculators |
| "Austin mortgage rates today" page missing | MEDIUM | ✅ FIXED 2026-03-25 — dedicated evergreen /austin-mortgage-rates page built. Article + FAQPage + BreadcrumbList schema. Update dateModified monthly. |
| Homepage LCP critical | HIGH | ✅ FIXED 2026-03-21 — Root cause: adam-cutout.png (5 MB, fetchpriority=high) downloaded on mobile despite display:none. Fixed with <picture> + media query (mobile gets data URI, desktop gets 46 KB WebP). Also compressed hero-bg.jpg 1.7 MB→146 KB and added async fonts. Netlify deploying. |
| Mobile PageSpeed /refinance-quote | HIGH | ✅ FIXED 2026-03-21 — Google Fonts now async (same fix as /get-preapproved). Re-run PageSpeed to verify. |
| /mortgage-pre-approval-austin.html existence unverified | MEDIUM | ✅ CONFIRMED 2026-03-21 — file exists. Suburb pages (round-rock, cedar-park, kyle, san-marcos) link to it as an article, not a primary CTA. No broken links. |
| /austin-down-payment-assistance — existence unverified | LOW | ✅ CONFIRMED — file exists: austin-down-payment-assistance.html |
| contact.html form not wired to Netlify | HIGH | ✅ FIXED 2026-03-24 — form now has netlify attribute, form-name hidden input, action="/thank-you", generate_lead event, Calendly secondary CTA |
| TCPA compliance missing from landing pages | MEDIUM | ✅ FIXED 2026-03-24 — consent checkbox added to /get-preapproved and /refinance-quote forms |
| Homepage missing FAQPage schema | MEDIUM | ✅ FIXED 2026-03-24 — 5-question FAQPage JSON-LD added to head + accordion FAQ section added above final CTA |
| Homepage trust bar not verbatim standard | LOW | ✅ FIXED 2026-03-24 — was "#1 Austin Mortgage Team", now "Licensed in Texas \| NMLS #513013" |
| thank-you.html fonts sync (render-blocking) | MEDIUM | ✅ FIXED 2026-03-24 — converted to async preload pattern |
| thank-you.html missing 3-step what-happens-next | LOW | ✅ FIXED 2026-03-24 — 3-step inline section added to ty-card |
| loans/conventional.html + loans/fha.html CTA links to loan app URL not /get-preapproved | MEDIUM | ✅ FIXED 2026-03-24 — CTA now links to /get-preapproved for better conversion path |
