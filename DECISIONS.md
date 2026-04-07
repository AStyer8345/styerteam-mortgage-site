# styermortgage.com — Decisions

## [2026-03] — Static HTML, No Framework

**Chose:** Vanilla HTML/CSS/JS with no build step.
**Over:** React, Next.js, or any SPA framework.
**Why:** Zero runtime overhead, instant page loads, no framework lock-in. Netlify serves raw files. Content pages don't need client-side routing.

## [2026-03] — Netlify for Hosting + Functions

**Chose:** Netlify with serverless functions (Node.js + esbuild).
**Over:** Vercel, Cloudflare Pages, or self-hosted.
**Why:** Native form handling, edge redirects via `_redirects`, function bundling with zero config. Content generation functions (newsletter, rate updates, realtor content) run as serverless endpoints.

## [2026-03] — Google Ads Conversion on thank_you_page_view Only

**Chose:** Single conversion event fires on /thank-you page load.
**Over:** Counting `generate_lead` as a conversion (which fires on every form submit).
**Why:** Google Ads optimizes bidding around conversions. Counting every form submit (including suburb quick-forms that don't redirect to /thank-you) would inflate conversion numbers and degrade Smart Bidding.
**Context:** This means suburb quick-form submissions are tracked in GA4 but NOT counted as Google Ads conversions. Known trade-off.

## [2026-03] — Landing Pages: Stripped Nav (Logo Only)

**Chose:** /get-preapproved, /refinance-quote, /thank-you show logo only — no site navigation.
**Over:** Full nav on all pages.
**Why:** Conversion optimization — remove exit paths from ad-driven traffic. Once someone is on a lead capture page, the only actions should be: fill the form, call, or book Calendly.

## [2026-03] — AEO Answer-First Paragraphs

**Chose:** Bold `<strong>` answer-first paragraph before the first H2 on every content page.
**Over:** Standard intro paragraphs or jumping straight to H2 sections.
**Why:** AI search engines (Perplexity, Google AI Overview) extract the first definitive statement. A bolded 50-60 word paragraph that directly answers the page's target query gets pulled as a citation.

## [2026-04] — Content Distribution: Two-Tier Auto-Post

**Chose:** Every website content piece auto-distributes twice — Tier 1 (immediate social post via Publer) and Tier 2 (platform-native post 2-3 days later).
**Over:** Manual social posting or single-distribution.
**Why:** Maximizes content ROI. Tier 1 gets fast visibility. Tier 2 adapts format (carousels, Reels) for each platform's algorithm.
