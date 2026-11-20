# MAP.md — styermortgage.com Site Map

## Tech Stack

Static HTML/CSS/JS site hosted on **Netlify**. No framework, no build step — raw files served directly. Serverless functions (Netlify Functions, Node.js + esbuild) handle content generation, email automation, and lead capture. AI content generated via **Anthropic Claude API**, emails sent via **Mailchimp**, files committed to GitHub via API (which triggers Netlify redeploy). Social posts published via direct LinkedIn/Facebook APIs.

**Dependencies:** `@anthropic-ai/sdk`, `@mailchimp/mailchimp_marketing`, `@netlify/blobs`

---

## Core

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero section, quick quote form, social proof, CTAs |
| `style.css` | Global design system — CSS custom properties, typography, layout, components |
| `script.js` | Global JS — utilities, mobile nav, form handling, toast notifications |
| `analytics.js` | GTM/Google Ads conversion tracking — form submits, phone clicks, CTA events |
| `calculator-suite.js` | Shared calculator helper library (formatting, math, chart integration) |
| `calculator-suite.css` | Shared calculator styles matching site color scheme |
| `dashboard.js` | Internal dashboard JS — newsletter, rate update, and realtor content automation |
| `dashboard.css` | Internal dashboard styles |
| `server.js` | Local dev server (zero-dependency Node.js, port 8099) |
| `package.json` | NPM config — declares Anthropic, Mailchimp, and Netlify Blobs dependencies |
| `netlify.toml` | Netlify config — build settings, function directory, headers (noindex on internal pages), 301 redirects from old WordPress URLs |
| `_redirects` | Netlify redirects file — extensionless URL canonicalization and legacy WordPress path redirects |
| `robots.txt` | Crawl rules — blocks dashboard, internal pages, temp placeholders; points to sitemap |
| `sitemap.xml` | XML sitemap for search engines |
| `favicon.ico` | Site favicon (ICO format) |
| `favicon-32.png` | Site favicon (32x32 PNG) |
| `favicon-180.png` | Apple touch icon (180x180 PNG) |
| `googlea3d746ce1ceb4bff.html` | Google Search Console domain verification file |
| `deno.lock` | Deno lockfile (vestigial) |

---

## Main Pages

| File | Purpose |
|------|---------|
| `about.html` | About Adam Styer — bio, credentials, philosophy |
| `products.html` | Loan programs overview — links to individual loan type pages |
| `contact.html` | Contact page — phone, email, Calendly scheduling |
| `testimonials.html` | Client reviews and testimonials (136+ five-star) |
| `blog.html` | Blog index — dynamically loads posts from `blog/manifest.json` |
| `calculators.html` | Calculator hub — links to payment, affordability, refinance, buydown calculators |
| `realtors.html` | Realtor partner landing page — why partner with Adam |
| `realtor-resources.html` | Realtor resource hub — market intel, co-marketing, articles |
| `thank-you.html` | Post-form-submission confirmation page (noindex) |
| `texas-complaint-notice.html` | Required Texas DSML consumer complaint notice |

---

## Lead Capture / Conversion Pages

| File | Purpose |
|------|---------|
| `get-preapproved.html` | Pre-approval lead capture form (noindex) — feeds subscribe-lead function |
| `refinance-quote.html` | Refinance quote lead capture form (noindex) — feeds subscribe-lead function |
| `prequal.html` | Pre-qualification landing page with intake form |
| `rate-alert.html` | Rate alert signup — weekly rate email opt-in via Mailchimp |

---

## Loan Product Pages (`loans/`)

| File | Purpose |
|------|---------|
| `loans/conventional.html` | Conventional loan program details |
| `loans/fha.html` | FHA loan program details |
| `loans/va.html` | VA loan program details |
| `loans/usda.html` | USDA loan program details |
| `loans/jumbo.html` | Jumbo loan program details |
| `loans/construction.html` | Construction loan program details |
| `loans/investment.html` | Investment property loan program details |
| `loans/refinance.html` | Refinance options and details |

---

## City/Location Pages (SEO)

| File | Purpose |
|------|---------|
| `austin-mortgage-rates.html` | Austin mortgage rates — evergreen SEO landing page |
| `round-rock-mortgage-lender.html` | Round Rock local SEO landing page |
| `cedar-park-mortgage-lender.html` | Cedar Park local SEO landing page |
| `leander-mortgage-lender.html` | Leander local SEO landing page |
| `georgetown-mortgage-lender.html` | Georgetown local SEO landing page |
| `pflugerville-mortgage-lender.html` | Pflugerville local SEO landing page |
| `kyle-mortgage-lender.html` | Kyle local SEO landing page |
| `san-marcos-mortgage-lender.html` | San Marcos local SEO landing page |
| `buda-mortgage-lender.html` | Buda local SEO landing page |
| `bastrop-mortgage-lender.html` | Bastrop local SEO landing page |
| `bee-cave-mortgage-lender.html` | Bee Cave local SEO landing page |
| `dripping-springs-mortgage-lender.html` | Dripping Springs local SEO landing page |
| `westlake-mortgage-lender.html` | Westlake local SEO landing page |
| `lakeway-mortgage-lender.html` | Lakeway local SEO landing page |
| `hutto-mortgage-lender.html` | Hutto local SEO landing page |
| `manor-mortgage-lender.html` | Manor local SEO landing page |
| `elgin-mortgage-lender.html` | Elgin local SEO landing page |
| `taylor-mortgage-lender.html` | Taylor local SEO landing page |
| `liberty-hill-mortgage-lender.html` | Liberty Hill local SEO landing page |
| `jarrell-mortgage-lender.html` | Jarrell local SEO landing page |
| `florence-mortgage-lender.html` | Florence local SEO landing page |
| `marble-falls-mortgage-lender.html` | Marble Falls local SEO landing page |
| `spicewood-mortgage-lender.html` | Spicewood local SEO landing page |
| `new-braunfels-mortgage-lender.html` | New Braunfels local SEO landing page |
| `smithville-mortgage-lender.html` | Smithville local SEO landing page |

---

## Resources / Guides (SEO Content Pages)

| File | Purpose |
|------|---------|
| `first-time-buyer-guide.html` | First-time buyer guide — step-by-step walkthrough |
| `first-time-home-buyer.html` | First-time buyer programs — FHA, USDA, low down payment options |
| `mortgage-pre-approval-austin.html` | Pre-approval process explained — documents, timeline |
| `how-much-house-can-i-afford-austin.html` | Affordability guide — DTI rules, income requirements |
| `austin-down-payment-assistance.html` | Austin/Travis County DPA programs and grants |
| `closing-costs-texas.html` | Texas closing costs breakdown — who pays, how to reduce |
| `mortgage-broker-vs-bank.html` | Broker vs. bank comparison — honest pros/cons |
| `fixed-vs-adjustable.html` | Fixed vs. ARM comparison guide |
| `improve-credit-score.html` | Credit score improvement tips for mortgage qualification |
| `self-employed-mortgage-austin.html` | Self-employed/bank statement loan options |
| `dscr-loan-austin-tx.html` | DSCR investor loan landing page |
| `austin-housing-market-2025.html` | Austin housing market overview and buyer outlook |
| `resources/index.html` | Resources hub — links to guides and tools |
| `resources/first-time-buyer-guide/index.html` | Multi-page first-time buyer guide (standalone version) |

---

## Calculators

| File | Purpose |
|------|---------|
| `calculator-payment.html` | Monthly mortgage payment calculator |
| `calculator-affordability.html` | Home affordability calculator (income-based) |
| `calculator-refinance-breakeven.html` | Refinance breakeven analysis calculator |
| `rate-buydown-calculator.html` | 2/1 and 3/2/1 temporary rate buydown calculator |
| `wrap-mortgage-calculator.html` | Wraparound/seller financing mortgage calculator |
| `refinance-calculator.html` | Internal refinance calculator (noindex) |

---

## Blog Posts (`blog/`)

| File | Purpose |
|------|---------|
| `blog/manifest.json` | Blog post index — JSON feed consumed by blog.html for dynamic listing |
| `blog/2026-03-31-dscr-loans-austin-tx-2026.html` | DSCR loans investor guide |
| `blog/2026-03-30-why-rates-improved-today-bond-rally.html` | Market commentary — rate movements and bond rally |
| `blog/2026-03-30-first-time-home-buyer-programs-austin-tx-2026.html` | First-time buyer programs roundup 2026 |
| `blog/2026-03-29-va-loan-eligibility-texas.html` | VA loan eligibility guide for Texas |
| `blog/2026-03-28-how-long-does-mortgage-pre-approval-take.html` | Pre-approval timeline explainer |
| `blog/2026-03-28-fha-vs-conventional-loan-austin-tx.html` | FHA vs. Conventional comparison |
| `blog/2026-03-27-down-payment-assistance-texas-2026.html` | Down payment assistance programs 2026 |
| `blog/2026-03-24-cash-out-refinance-austin-tx.html` | Cash-out refinance guide |
| `blog/2026-03-20-austin-mortgage-rates-march-2026.html` | March 2026 rate outlook |
| `blog/2026-03-18-the-ai-trap-i-walked-right-into.html` | Personal/thought leadership — AI in mortgage |
| `blog/2026-03-10-when-you-cant-control-it-surrender-it.html` | Personal/faith — surrender and perspective |
| `blog/2026-03-06-oil-prices-jobs-report-rate-volatility.html` | Market analysis — oil prices and jobs data impact |
| `blog/2026-03-30-temp-placeholder.html` | Temp placeholder (noindex) |

---

## Rate Updates (`rates/`)

| File | Purpose |
|------|---------|
| `rates/2026-03-24.html` | Weekly rate update — March 24, 2026 |
| `rates/2026-03-19.html` | Weekly rate update — March 19, 2026 |
| `rates/2026-03-13.html` | Weekly rate update — March 13, 2026 |
| `rates/2026-03-03.html` | Weekly rate update — March 3, 2026 |
| `rates/2026-02-25.html` | Weekly rate update — February 25, 2026 |

---

## Newsletter Updates (`updates/`)

Noindex pages generated by the newsletter function. The canonical SEO version lives at `/blog/`.

| File | Purpose |
|------|---------|
| `updates/2026-03-30-temp-placeholder.html` | Temp placeholder |
| `updates/2026-03-18-the-ai-trap-i-walked-right-into.html` | Newsletter version — AI in mortgage |
| `updates/2026-03-10-temp-placeholder.html` | Temp placeholder |
| `updates/2026-03-06-temp-placeholder.html` | Temp placeholder |
| `updates/2026-02-20-fast-closes-teamwork-and-spring-market-momentum.html` | Newsletter — fast closes and spring market |
| `updates/2026-02-19-austin-buyer-window.html` | Newsletter — Austin buyer window |
| `updates/2025-02-19-market-update.html` | Legacy market update |

---

## Realtor Updates (`realtor-updates/`)

| File | Purpose |
|------|---------|
| `realtor-updates/manifest.json` | Realtor post index — JSON feed for realtor-resources.html |
| `realtor-updates/2026-02-27-ai-for-realtors-rates-drop-below-6.html` | Realtor-targeted article — AI tools and sub-6% rates |

---

## Resources Blog (`resources/blog/`)

| File | Purpose |
|------|---------|
| `resources/blog/2026-03-04-wait-for-rates.html` | Borrower version — handling the "wait for rates" objection |
| `resources/blog/2026-03-04-wait-for-rates-realtor.html` | Realtor version — handling the "wait for rates" objection |

---

## Netlify Functions (`netlify/functions/`)

### Core Functions

| File | Purpose |
|------|---------|
| `netlify/functions/dispatch.js` | Unified webhook dispatcher — routes `newsletter`, `realtor`, or `rate` requests to the right generator. Auth via `DISPATCH_SECRET` header. |
| `netlify/functions/generate-newsletter.js` | Generates weekly newsletter — Claude AI writes content, creates blog page, sends Mailchimp email, posts to social |
| `netlify/functions/generate-rate-update.js` | Generates weekly rate update — builds rate table, Claude writes commentary, creates rate page, sends Mailchimp email |
| `netlify/functions/generate-realtor-content.js` | Generates realtor-targeted content — Claude writes article, creates page, sends Mailchimp email, posts to social |
| `netlify/functions/scheduled-rate-update.js` | Cron-triggered rate update scaffold — reads `SCHEDULED_RATE_DATA` env var and calls `generateRateUpdate()` |
| `netlify/functions/subscribe-lead.js` | Lead capture endpoint — subscribes contact to Mailchimp + creates LoanOS web-lead record |
| `netlify/functions/send-correction.js` | One-off correction email sender — fixes broken link in a previous campaign |
| `netlify/functions/mcc-data.js` | Marketing Command Center cloud storage — read/write state JSON via Netlify Blobs |

### Shared Libraries (`netlify/functions/lib/`)

| File | Purpose |
|------|---------|
| `lib/shared.js` | Shared utilities — GitHub file creation, Mailchimp campaign send, link formatting, email HTML wrapping |
| `lib/prompt-builder.js` | Builds Claude prompt for newsletter content from dashboard form data |
| `lib/page-builder.js` | Builds noindex HTML page for `/updates/` from AI-generated newsletter content |
| `lib/blog-page-builder.js` | Builds SEO-optimized HTML page for `/blog/` with JSON-LD structured data |
| `lib/rate-prompt-builder.js` | Builds Claude prompt for rate update commentary (rate table built server-side) |
| `lib/rate-page-builder.js` | Builds HTML page for `/rates/` with server-generated rate table and compliance disclaimers |
| `lib/realtor-prompt-builder.js` | Builds Claude prompt for realtor-targeted content |
| `lib/realtor-page-builder.js` | Builds SEO-optimized HTML page for `/realtor-updates/` with realtor-specific CTAs |
| `lib/social-poster.js` | Generates social media posts via Claude and publishes to LinkedIn + Facebook APIs |

---

## Dashboard / Internal Ops Pages (noindex)

| File | Purpose |
|------|---------|
| `dashboard.html` | Content creation dashboard — newsletter, rate update, and realtor content automation UI |
| `marketing-command-center.html` | Marketing Command Center — password-protected internal tool for campaign management |
| `marketing-content.html` | Marketing content viewer/editor |
| `loan-dashboard.html` | 2026 loan production dashboard with Chart.js visualizations |
| `loanos.html` | LoanOS internal build tracker |
| `ops.html` | Operations dashboard — internal monitoring page |
| `task-dashboard.html` | Task Command Center — displays scheduled agent task reports |
| `hero-test.html` | Glassmorphism hero section prototype (dev/testing) |

---

## Assets (`assets/`)

| File | Purpose |
|------|---------|
| `assets/adam-cutout.webp` | Hero section cutout photo of Adam (WebP, desktop) |
| `assets/adam-cutout.png` | Hero section cutout photo of Adam (PNG fallback) |
| `assets/adam-cutout-900.png` | Hero cutout photo — 900px version |
| `assets/headshot.jpg` | Professional headshot |
| `assets/family.jpg` | Family photo |
| `assets/family2.jpg` | Family photo (alternate) |
| `assets/ruthie-charlie.jpg` | Personal photo |
| `assets/hero-bg.jpg` | Hero section background image |
| `assets/logo.svg` | Site logo (SVG) |
| `assets/logo.png` | Site logo (PNG fallback) |
| `assets/og-image.png` | Open Graph / social share card image |
| `assets/networking-austin.jpg` | Networking event photo |
| `assets/networking-heritage.jpg` | Networking event photo |
| `assets/team-meeting.jpg` | Team/office photo |
| `assets/team-office.jpg` | Team/office photo |

---

## Run Logs (`run-logs/`)

Scheduled agent session logs and competitive analysis notes.

| File | Purpose |
|------|---------|
| `run-logs/latest.md` | Most recent agent run log |
| `run-logs/learnings.md` | Accumulated learnings from agent sessions |
| `run-logs/2026-03-26.md` | Daily agent run log |
| `run-logs/2026-03-27.md` | Daily agent run log |
| `run-logs/2026-03-28.md` | Daily agent run log |
| `run-logs/2026-03-29.md` | Daily agent run log |
| `run-logs/2026-03-29b.md` | Daily agent run log (second session) |
| `run-logs/2026-03-30.md` | Daily agent run log |
| `run-logs/2026-03-31.md` | Daily agent run log |
| `run-logs/content-2026-03-27.md` | Content generation session log |
| `run-logs/social-2026-03-24.md` | Social media posting session log |
| `run-logs/social-2026-03-27.md` | Social media posting session log |
| `run-logs/competitive/latest.md` | Latest competitive analysis |
| `run-logs/competitive/2026-03-24.md` | Competitive analysis — week of March 24 |
| `run-logs/competitive/2026-03-24-week2.md` | Competitive analysis — week 2 |
| `run-logs/competitive/2026-03-25.md` | Competitive analysis — March 25 |
| `run-logs/competitive/2026-03-30.md` | Competitive analysis — March 30 |

---

## Deliverables (`_deliverables/`)

One-off deliverables generated for lead gen campaigns.

| File | Purpose |
|------|---------|
| `_deliverables/guide-gamma.md` | Gamma presentation content for lead gen guide |
| `_deliverables/email-sequence.txt` | Drip email sequence for lead gen campaign |
| `_deliverables/social_automation.py` | Social media automation script (Python) |

---

## Config / Meta

| File | Purpose |
|------|---------|
| `styermortgage-context.md` | Site context document — source of truth for Claude Code and Cowork sessions |
| `task-reporting-prompt.md` | Instructions for scheduled agents to write task reports |
| `task-reports.json` | Structured task report data consumed by task-dashboard.html |
| `README.md` | Repo README |
| `.gitignore` | Git ignore rules |
| `.claude/CLAUDE.md` | Claude Code project instructions for this repo |
| `.claude/launch.json` | Claude Code dev server launch config (port 8766) |
| `.claude/site-server.js` | Internal dev server with API proxy for task reports |
| `.claude/update-nav.py` | Python script to batch-update nav dropdowns across all HTML files |
| `tasks/website/session-log.md` | Website task session log |
