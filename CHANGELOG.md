# styermortgage.com — Changelog

## 2026-04-08 (morning) — AEO answer-first paragraphs + funnel audit

- Added AEO answer-first paragraphs to Elgin, Florence, Jarrell, Marble Falls (new content-narrow section between hero and feature grid on each)
- Funnel audit clean: homepage→/get-preapproved→/thank-you, contact.html form + dataLayer verified
- Internal linking audit: about.html, dscr, austin-mortgage-rates all have 20+ internal links ✅
- AEO coverage now 11/25+ suburb pages confirmed
- Commit c3967c4, all 4 pages 200 post-deploy ✅

## 2026-04-08 — Conversion tracking fix + blog slug cleanup

- Fixed suburb quick-form conversion tracking: broadened analytics.js form selector to catch all `data-netlify="true"` forms, moved `thank_you_page_view` dataLayer push into script.js success handler (fires after confirmed Netlify submission, before redirect)
- Added fallback form detection in script.js `initHeroQuickForm()` for suburb pages without `#hero-quick-form`
- Converted `blog/2026-03-30-temp-placeholder.html` to meta-refresh redirect → canonical URL (noindex, nofollow)
- Google Ads conversion tracking now fires correctly: `generate_lead` on submit → `thank_you_page_view` on success

## 2026-04-08 PM — AEO answer-first paragraphs (Cedar Park, New Braunfels, Bastrop, Bee Cave)

- Added AEO answer-first `<strong>` paragraph to cedar-park-mortgage-lender.html (before first H2)
- Added AEO answer-first `<strong>` paragraph to new-braunfels-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bastrop-mortgage-lender.html
- Added AEO answer-first `<strong>` paragraph to bee-cave-mortgage-lender.html
- Tuesday title/meta audit: all 8 loan pages + homepage clean, no regressions
- Blog title lint: clean — no posts missing brand
- Commit f8ca0f3 — 4 files, 8 insertions, deploy verified ✅

## 2026-04-08 AM — Glossary nav + loan page links + city enrichment

- Added mortgage-glossary.html to Resources nav dropdown across 64 pages (batch Python replace)
- Added glossary internal link to "Helpful articles" on conventional.html, fha.html, va.html
- Added glossary link to DSCR page investment section ("Unfamiliar with terms like DSCR, LTV...")
- City enrichment "at a glance" paragraphs: Bee Cave (Lake Travis ISD, commutes, neighborhood ranges), Manor (Manor ISD, Tesla/Samsung commutes, ShadowGlen/Presidential prices), Smithville (Smithville ISD, commutes, in-town vs acreage prices)
- Commit e4ee80b — 65 files, 83 insertions

## 2026-04-07 (Monday run) — Schema audit + Round Rock AEO

- Added LocalBusiness schema block to about.html (was missing; Person-only was the gap)
- Added AEO answer-first paragraph to round-rock-mortgage-lender.html
- Homepage Person schema confirmed present (learnings.md entry was stale)
- Sitemap 200 ✅, blog lint clean ✅
- NotebookLM returned Google Ads optimization advice (RSA assets, negative keywords, radius targeting)

## 2026-04-07 — Meta description fixes + suburb AEO paragraphs

- Fixed 6 loan page meta descriptions (va LONG 181→153, conventional/fha/refinance/usda/products all expanded to 150-160 range)
- Added AEO paragraphs to Taylor, Smithville, Spicewood suburb pages

## 2026-04-06 — Homepage AEO + Person schema + suburb AEO batch

- Added 54-word answer-first paragraph to homepage before "Why Choose" section
- Added Person schema JSON-LD (Adam Styer, NMLS, sameAs links)
- Added AEO paragraphs to Manor, Dripping Springs suburb pages
- Liberty Hill AEO body paragraph added (hero-subtitle alone doesn't satisfy AEO)

## 2026-04-05 — Suburb hero CTA batch fix + AEO additions

- Patched 17 suburb hero-cta-primary buttons to /get-preapproved (prior fix missed hero CTAs)
- Added AEO paragraph + /calculators link to Lakeway
- Added AEO paragraph + /calculators link to Hutto
- Fixed blog title tags: self-employed, housing market, spring market posts

## 2026-04-04 — Suburb H1 audit complete

- Verified all 24 suburb pages: zero have "Serving" H1 anti-pattern

## 2026-04-03 — Sitemap submitted to GSC

- sitemap.xml submitted to Google Search Console, status: Success

## 2026-04-02 — CTA audit + resource page fixes

- first-time-buyer-guide final CTA → /get-preapproved (was raw app URL)
- Cedar Park hero "Apply Now" → /get-preapproved
- austin-down-payment-assistance: 2 body CTAs fixed

## 2026-04-01 — Major CTA + schema + content distribution overhaul

- All 8 loan page hero + bottom CTAs routed to /get-preapproved (/refinance for refinance page)
- All 24 suburb body + footer CTAs routed to /get-preapproved
- thank-you.html: 3-step "What Happens Next" section added
- Confirmed TCPA checkboxes present on all 24 suburb pages
- Content distribution system activated (Tier 1 + Tier 2 auto-posting)
- Suburb page inventory in context updated from 9 → 24

## 2026-03-30 — Blog manifest + title fixes

- Blog manifest updated with March 30 FTB post
- Title tag fixes: refinance-quote pipe, FTB post brand name
- Westlake title trimmed 99→61 chars, Buda title trimmed 104→51 chars

## 2026-03-29 — VA loan eligibility blog post

- Published: VA Loan Eligibility Texas 2026 with Article + FAQPage schema

## 2026-03-26 — Homepage H1 + trust bar standardization

- H1 changed from "Your Austin Home Loan Simplified" → keyword-rich NMLS title
- Trust bar standardized to "Licensed in Texas | NMLS #513013" across 39 pages

## 2026-03-25 — Austin mortgage rates evergreen page

- New /austin-mortgage-rates page with Article + FAQPage + BreadcrumbList schema

## 2026-03-24 — Contact form + homepage FAQ + conversion tracking

- Contact form wired to Netlify Forms with generate_lead event
- Homepage FAQPage schema (5 questions) + accordion section
- TCPA consent checkbox on /get-preapproved and /refinance-quote
- Thank-you fonts converted to async preload
- NMLS# standardized across title tags (# symbol, consistent format)

## 2026-03-23 — Google Ads sitelinks + schema batch

- Sitelinks applied to Search-1 campaign
- BreadcrumbList schema added to 9 suburb + 7 loan pages
- FAQPage schema added to surrender + AI trap blog posts
- Phone chip added to trust bar on landing pages
- "What happens next" 3-step section on both landing pages
- Loan page title tags: NMLS# added to all 6 remaining + 9 suburb pages

## 2026-03-22 — Mobile optimization + compliance

- Landing page forms: `order: -1` on mobile (form above headline)
- noindex added to /get-preapproved + /refinance-quote
- Copyright year updated 2025→2026 on 7 pages
- Thank-you page: phone number added

## 2026-03-21 — Performance + schema verification

- Homepage LCP fix: adam-cutout.png 5MB → picture element with media query (mobile data URI, desktop 46KB WebP)
- hero-bg.jpg compressed 1.7MB → 146KB
- Google Fonts async on landing pages
- FAQPage schema verified on Round Rock + Cedar Park (Rich Results Test passed)
- /mortgage-pre-approval-austin confirmed exists

## 2026-03-20 — GTM + GA4 + conversion tracking rollout

- GTM-PQQ6PGLR installed on all 54 public pages
- GA4 (G-DDY0H0319S) firing via GTM
- Conversion events verified: generate_lead, thank_you_page_view, phone_click
- /get-preapproved, /refinance-quote, /thank-you pages live
- Homepage final CTA linked to /get-preapproved
- DSCR page: calculators link added, CTA fixed
- Refinance page: "Get a Refi Quote" button added
- Blog manifest: ai-trap post added

## 2026-03-19 — Lead capture pages + initial tracking

- /get-preapproved and /refinance-quote pages built and verified
- /thank-you page with thank_you_page_view event
- phone_click global handler wired in script.js
