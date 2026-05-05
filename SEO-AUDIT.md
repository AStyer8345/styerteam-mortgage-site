# styermortgage.com — Phase 1 SEO/AEO Audit

**Date:** 2026-05-05
**Repo:** `/Users/adamstyer/Documents/Claude/styerteam-mortgage-site/`
**Stack:** Static HTML/CSS/JS on Netlify. Flat file structure (no `/slug/index.html` directories). 79 `.html` files at repo root + 8 loan pages in `/loans/` + dated blog posts in `/blog/`.
**Audit scope:** Strategic SEO/AEO audit to support expansion around non-QM positioning (DSCR, bank statement, self-employed, HNW, investor, nationwide ~30 states).

---

## 1. Design System Summary

Phase 3 build subagents must match this exactly. Tokens are defined in `style.css` (single file, ~unminified) and **also inlined as critical CSS in every page's `<head>`**. Always include both: critical CSS inline + `<link rel="preload">` to `style.css?v=20260417` for the full sheet.

### CSS Variables (from `:root` in `style.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-navy` | `#0A1F3F` | Primary brand, headings, header |
| `--color-gold` | `#8B6E24` | Accents, links (note: `#C9A84C` in older docs is wrong — current is darker `#8B6E24`) |
| `--color-white` | `#FFFFFF` | Backgrounds |
| `--color-light-gray` | `#F7F7F7` | Section alt-backgrounds |
| `--color-gray` | `#6B7280` | Secondary text |
| `--color-text` | `#1F2937` | Body text |
| `--color-border` | `#E5E7EB` | Dividers, card borders |
| `--color-success` | `#10B981` | Form success |
| `--color-error` | `#EF4444` | Form error |
| `--font-primary` | `'Inter', -apple-system, ...` | Body |
| `--font-display` | `'Playfair Display', serif` | All h1–h6 |
| `--font-size-base` | `1rem` | Body |
| `--font-size-5xl` | `clamp(1.9rem,1.35rem+2.1vw,2.7rem)` | h1 default |
| `--font-size-3xl` | `clamp(1.5rem,1.2rem+1.2vw,1.875rem)` | Mobile h1 |
| Spacing | `--spacing-xs` 0.25rem → `--spacing-6xl` 6rem | Linear scale |
| `--radius-lg` | `0.75rem` | Buttons |
| `--radius-2xl` | `1.5rem` | Glass card |
| `--shadow-md` / `--shadow-lg` | std elevations | Cards, sticky nav |
| `--transition-base` | `200ms ease-in-out` | Default |

**Hard-coded button colors (NOT vars — copy verbatim):**
- `.btn-primary` background `#F2C840`, color `#0D1F3C`
- `.nav-cta` background `#3F2F0F`, color white

### Global rules
- `html { font-size: 16px; scroll-behavior: smooth; }`
- `body` line-height `1.75`
- All headings → Playfair Display, navy, `text-wrap: balance`
- Body links → gold (`var(--color-gold)`)
- `.container { max-width: 1280px; padding: 0 var(--spacing-lg); }`
- `section { padding: clamp(5rem, 7vw, 7.5rem) 0; }`

### Key Component Classes

| Class | Purpose |
|-------|---------|
| `.container` | 1280px-max wrapper, used inside header/footer/sections |
| `.btn` / `.btn-primary` / `.btn-hero-ghost` | CTAs |
| `.nav-brand` / `.nav-logo-img` (h:90px desktop, 55px mobile) | Header logo |
| `.nav-links` / `.nav-has-dropdown` / `.nav-dropdown` | Top nav with hover dropdowns |
| `.nav-cta` | "Apply Now" pill |
| `.hero` / `.hero-glass-card` / `.hero-two-col` / `.hero-quick-form-glass` | Homepage hero pattern |
| `.heading-sm` | Footer column heads |
| `.footer-grid` / `.footer-section` / `.footer-divider` / `.footer-bottom` / `.footer-nmls` | Footer |
| `.social-links` | Footer social icon row |
| `.skip-link` | A11y skip-to-main |
| `.mobile-menu-toggle` | Hamburger (hidden ≥768px) |

### Canonical Nav HTML (copy verbatim into new pages)

```html
<header>
  <div class="container">
    <nav>
      <a href="index.html" class="nav-brand">
        <img src="assets/logo.svg" alt="Adam Styer | Mortgage Solutions LP" class="nav-logo-img" width="180" height="40">
      </a>

      <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links">
        <li class="nav-has-dropdown"><a href="/products.html">Loan Programs</a><ul class="nav-dropdown"><li><a href="/loans/conventional.html">Conventional</a></li><li><a href="/loans/fha.html">FHA</a></li><li><a href="/loans/va.html">VA</a></li><li><a href="/loans/usda.html">USDA</a></li><li><a href="/loans/jumbo.html">Jumbo</a></li><li><a href="/loans/construction.html">Construction</a></li><li><a href="/loans/refinance.html">Refinance</a></li><li><a href="/loans/investment.html">Investment</a></li><li><a href="/dscr-loan-austin-tx.html">DSCR / Non-QM</a></li></ul></li>
        <li><a href="/blog.html">Blog</a></li>
        <li class="nav-has-dropdown"><a href="/resources/">Resources</a><ul class="nav-dropdown"><li><a href="/calculators.html">Calculators</a></li><li><a href="/rate-buydown-calculator.html">Buydown Calculator</a></li><li><a href="/wrap-mortgage-calculator.html">WRAP Calculator</a></li><li><a href="/blog.html">Blog</a></li><li><a href="/mortgage-glossary.html">Mortgage Glossary</a></li><li><a href="/resources/first-time-buyer-guide/">Buyer Guide</a></li></ul></li>
        <li><a href="/testimonials.html">Testimonials</a></li>
        <li><a href="/about.html">About Adam</a></li>
        <li><a href="/rate-check.html">Rate Check</a></li>
        <li class="nav-has-dropdown"><a href="/realtors.html">For Realtors</a><ul class="nav-dropdown"><li><a href="/realtor-resources">Realtor Blog</a></li></ul></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="https://mslp.my1003app.com/513013/register" class="nav-cta" target="_blank" rel="noopener">Apply Now</a></li>
      </ul>
    </nav>
  </div>
</header>
```

**Note:** USDA link is currently in the nav dropdown despite Adam not originating USDA — flagged HIGH in CONTEXT.md blockers. Phase 3 builds should match the current nav verbatim until Adam's USDA cascade decision lands.

### Canonical Footer HTML

Standardized: 4-column grid (Company / Service Areas / Contact / Awards). Awards block must say `5.0 Stars · 136+ Reviews / 21-Day Avg. Close · Licensed in Texas` — this is the canonical wording per CONTEXT.md (no longer "Top Producing Broker — Austin 2023 / 5-Star Zillow Reviews"). Footer ships with full NMLS legal disclaimer + Equal Housing line. Reference `index.html` lines 1007–1090 for the exact block.

### Page Skeleton (HTML structure pattern)

```
<!DOCTYPE html><html lang="en"><head>
  <meta charset>, viewport
  <title>{Specific keyword} | Adam Styer | NMLS #513013</title>
  <meta description (~150–160 chars)>
  <meta keywords>
  OG tags (og:title, og:description, og:type, og:url, og:image, og:site_name)
  Twitter Card tags
  Favicons (favicon.ico, 32, 180)
  <link rel="canonical" href="https://styermortgage.com/{slug}.html">
  Fonts (preload Inter + Playfair, async pattern w/ noscript fallback)
  Inline critical CSS (~80 lines, mirrors :root + above-fold rules)
  <link rel="preload" href="style.css?v=20260417" as="style" onload>
  JSON-LD blocks (3–5 typical: LocalBusiness/MortgageBroker, FAQPage, BreadcrumbList, Article/WebPage, Person)
  GTM head snippet
</head><body>
  GTM noscript
  Skip link
  <header>...</header>
  <main id="main">
    <section class="hero">...</section>
    <section>...content...</section>
    ...
  </main>
  <footer>...</footer>
  Scripts: script.js, /js/scroll-effects.js, /analytics.js (all defer)
  Sticky mobile CTA bar
</body></html>
```

**Lead-capture pages (/get-preapproved, /refinance-quote, /thank-you) use stripped nav — logo only, no nav links** (per DECISIONS.md 2026-03).

---

## 2. Page Inventory

Internal/admin pages excluded: `dashboard.html`, `ops.html`, `marketing-command-center.html`, `marketing-content.html`, `task-dashboard.html`, `forms.html`, `loan-dashboard.html`, `loanos.html`, `loanos-waitlist.html`, `googlea3d746ce1ceb4bff.html` (GSC verification).

### Core / Hub Pages

| File | Title (truncated) | Meta (truncated) | H1 | Schema | FAQ |
|------|------|------|----|--------|-----|
| `index.html` | Austin Mortgage Broker — 21-Day Close, 40+ Lenders \| NMLS #513013 | Austin mortgage broker Adam Styer. 21-day average close, 40+ wholesale lenders... | Mortgage Broker Austin TX — Adam Styer \| NMLS #513013 | MortgageBroker, AggregateRating, FAQPage, Person | Yes (5Q) |
| `about.html` | About Adam Styer \| Austin TX Mortgage Broker \| NMLS #513013 | Meet Adam Styer — Austin TX mortgage broker since 2017... | Hi, I'm Adam Styer — Austin Mortgage Broker | LocalBusiness, Person, Organization, AggregateRating | No |
| `contact.html` | Contact Adam Styer \| Austin Mortgage Broker \| NMLS #513013 | Contact Adam Styer, Austin TX independent mortgage broker. Call... | Get in Touch | ContactPage, FinancialService | No |
| `products.html` | Austin Mortgage Loan Programs \| Adam Styer \| NMLS #513013 | Conventional, FHA, VA, USDA, Jumbo, and more... | Mortgage Programs for Every Situation | LocalBusiness, FinancialProduct, FAQPage, CollectionPage | Yes |
| `calculators.html` | Mortgage Calculators Austin TX \| Adam Styer \| NMLS #513013 | Free Austin TX mortgage calculators — payment, affordability... | Mortgage Calculators | **NONE** | No |
| `blog.html` | Mortgage Blog \| Home Loan Tips Austin TX \| Adam Styer | Austin TX mortgage blog — home buying tips... | Mortgage Tips & Austin Market Insights | CollectionPage, ItemList | No |
| `testimonials.html` | Adam Styer Reviews \| Austin Mortgage Broker \| NMLS #513013 | 136+ five-star reviews — read real Austin TX client testimonials... | What Our Clients Say | LocalBusiness, AggregateRating, Review | No |
| `realtors.html` | For Austin Realtors \| Adam Styer \| NMLS #513013 | Austin realtors: partner with a mortgage broker who closes on time... | Your Deals Close. On Time. Every Time. | FAQPage | Yes (2 Q sets) |

### Lead-Capture Pages

| File | Title | Schema | FAQ |
|------|-------|--------|-----|
| `get-preapproved.html` | Austin Home Loan Pre-Approval in 24 Hours — 40+ Lenders \| Adam Styer | **NONE** | No |
| `refinance-quote.html` | Austin Mortgage Refinance Quote — See What You Could Save \| Adam Styer | **NONE** | No |
| `prequal.html` | (legacy 4-step) | (not sampled) | — |
| `rate-alert.html` | (signup) | (not sampled) | — |
| `thank-you.html` | (conversion) | (noindex) | — |

### Resource / Guide Pages (sampled)

| File | Schema | FAQ | Notes |
|------|--------|-----|-------|
| `austin-mortgage-rates.html` | Article, FAQPage, BreadcrumbList | Yes (2) | Strong |
| `dscr-loan-austin-tx.html` | LocalBusiness, FinancialProduct, FAQPage, BreadcrumbList, Article | Yes (2) | **Strong — 748 lines** |
| `self-employed-mortgage-austin.html` | LocalBusiness, FinancialProduct, FAQPage, BreadcrumbList, Article | Yes (2) | **Strong — 671 lines** |
| `first-time-home-buyer.html` | FinancialService, FAQPage, AggregateRating | Yes | Solid |
| `austin-housing-market-2025.html` | Article, FAQPage, WebPage | Yes | Solid; year-stale |
| `mortgage-broker-vs-bank.html` | Article, FAQPage, BreadcrumbList | Yes | Solid |
| `mortgage-pre-approval-austin.html` | Article, FAQPage | Yes | Solid |
| `how-much-house-can-i-afford-austin.html` | Article, FAQPage | Yes | Solid |
| `austin-down-payment-assistance.html` | Article, FAQPage | Yes | Solid |
| `closing-costs-texas.html` | Article, FAQPage | Yes | Solid |
| `first-time-buyer-guide.html` | (not sampled) | — | — |
| `improve-credit-score.html` | (not sampled) | — | — |
| `fixed-vs-adjustable.html` | (not sampled) | — | — |
| `mortgage-glossary.html` | (not sampled) | — | — |
| `how-to-buy-a-house-in-austin-tx.html` | (not sampled) | — | Has USDA mentions to clean (HIGH blocker) |

### Suburb Pages (24 — `[city]-mortgage-lender.html`)

Every suburb page sampled has the **full schema stack**: `LocalBusiness + AggregateRating + FAQPage + BreadcrumbList + WebPage`. Round Rock, Cedar Park, Bee Cave, Westlake, Bastrop, Smithville confirmed. Per CONTEXT.md, Round 2 deepening is in flight (4/13 done as of 2026-05-05: Round Rock, Georgetown, Cedar Park, Leander). Westlake/Spicewood/Manor/Hutto/Liberty Hill/Dripping Springs/Buda/Lakeway also recently deepened in Round 1.

**Strong examples:** Westlake (jumbo-targeted title `Westlake Hills TX: Jumbo & Eanes ISD Home Loans`), Round Rock (`Beat Builder Rates`), Cedar Park (`FHA Loans: 3.5% Down in Leander ISD`) — these break out of the generic template and target a clear search-intent angle.

### Rate-Check Pages (6)

`rate-check.html` (hub) + 5 city splits (round-rock, cedar-park, georgetown, buda-kyle, new-braunfels). Lead-capture pattern, n8n-backed form (per DECISIONS.md JSON+base64 pattern).

### Loan Product Pages (`/loans/` — 8)

`conventional.html, fha.html, va.html, usda.html, jumbo.html, construction.html, refinance.html, investment.html`. Plus `dscr-loan-austin-tx.html` at root. **Not sampled in this audit** — recommend Phase 2 spot-check.

### Blog (`/blog/` — dated posts)

21 posts dated `2026-*` per CONTEXT.md. AEO `<p><strong>` answer-first paragraph cluster nearly complete (11/16 OK on older template; 5 deferred). Rate-shopper series 10/10 complete. CollectionPage schema on `blog.html` index.

### Internal / Excluded
`dashboard.html, ops.html, marketing-command-center.html, marketing-content.html, task-dashboard.html, forms.html, loan-dashboard.html, loanos.html, loanos-waitlist.html, googlea3d746ce1ceb4bff.html, privacy.html, texas-complaint-notice.html, thank-you.html`.

---

## 3. SEO/AEO Gaps

| Gap | Pages affected | Severity |
|-----|----------------|----------|
| **No schema at all** | `calculators.html`, `get-preapproved.html`, `refinance-quote.html` | HIGH for calculators (organic page); accepted for lead-capture (stripped pages) but a `WebPage` + `Service` block costs nothing |
| **No FAQ schema** | `about.html`, `contact.html`, `calculators.html`, `blog.html`, `testimonials.html`, all lead-capture pages | MEDIUM — `about.html` and `calculators.html` are the real misses |
| **Loan product pages (`/loans/*`)** | Not sampled — likely missing FinancialProduct + FAQPage on at least some | UNKNOWN — Phase 2 must verify |
| **Canonicals using `.html`** | All non-lead pages canonicalize with `.html` extension. Lead pages (`get-preapproved`, `refinance-quote`) drop the extension. Inconsistent | LOW — Netlify `_redirects` likely strips `.html`; can be left alone |
| **`about.html` address mismatch** | LocalBusiness on `about.html` says `5900 Balcones Drive Suite 100`; homepage MortgageBroker + 3 other schemas say `5718 Sam Houston Circle`. 12-run open blocker | MEDIUM (one-line fix per CONTEXT.md recommendation) |
| **USDA in nav + schema FAQ + product pages** | Site-wide (88 pages) | HIGH — pending Adam decision |
| **Year-stale title/H1** | `austin-housing-market-2025.html` | MEDIUM — should be `2026` or rolling |
| **Weak meta on `realtors.html`, `testimonials.html`** | Generic; could fold in differentiators | LOW |
| **No OG image alt / explicit image dimensions** | Site-wide (uses single `og-image.png`) | LOW |
| **No `robots` meta tag visible** | Most pages rely on default; internal pages should have `noindex` (only `thank-you.html` confirmed) | MEDIUM — verify dashboard.html / ops.html / loanos.html have noindex |
| **No `Service` schema on calculator pages** | `calculator-payment.html`, `calculator-affordability.html`, `calculator-refinance-breakeven.html`, `rate-buydown-calculator.html`, `wrap-mortgage-calculator.html` | MEDIUM — `WebApplication` or `HowTo` schema would help |
| **Title-tag patterns inconsistent** | Some end `| NMLS #513013`, some `| Adam Styer`, some both. Most are OK length per 2026-05-05 daily-opt sweep | LOW |

---

## 4. Keyword Gap Analysis (Non-QM Expansion)

| Theme | Current coverage | Gap | Recommendation |
|-------|------------------|-----|----------------|
| **DSCR loans** | `dscr-loan-austin-tx.html` (strong, 748 lines, full schema) + blog post `2026-03-31-dscr-loans-austin-tx-2026.html` | DSCR is geo-locked to Austin; investor demand is national (~30 states). No DSCR Texas-statewide page, no DSCR-by-state landing variants, no specific DSCR-1.0 / DSCR-no-ratio sub-pages | Add `/dscr-loans-texas`, `/dscr-loans` (national hub), and consider state-tier landing pages for top 5–10 states |
| **Non-QM loans (umbrella)** | No dedicated `non-qm` hub page. Term appears in DSCR page subtitle ("DSCR / Non-QM" in nav) but no `non-qm-loans.html` page | Major gap — non-QM is the umbrella keyword that pulls all of these together | Build `/non-qm-loans-austin` and `/non-qm-loans-texas` hub pages linking out to DSCR / bank statement / asset depletion / 1099 / ITIN sub-pages |
| **Bank statement loans** | Mentioned in `self-employed-mortgage-austin.html` title ("Bank Statement Loans") + body. **No standalone `bank-statement-loans` page** | Major gap | Build `/bank-statement-loans-austin` and `/bank-statement-loans-texas` |
| **Self-employed mortgages** | `self-employed-mortgage-austin.html` (strong, 671 lines, full schema) + blog post `2026-04-02-self-employed-mortgage-austin-tx.html` | Geo-locked to Austin; no Texas statewide; no 1099-only / P&L-only sub-pages | Add `/self-employed-mortgage-texas`, consider `/1099-only-mortgage`, `/p-and-l-mortgage` |
| **High-net-worth / luxury / jumbo** | Westlake suburb page strongly jumbo-targeted; `loans/jumbo.html` exists (not audited) | No "high-net-worth" or "luxury home loan" branded page; no asset-depletion standalone page (mentioned in Georgetown Sun City context only) | Add `/asset-depletion-mortgage`, `/high-net-worth-mortgage-austin`, `/jumbo-loans-texas` (if not in `loans/jumbo.html`) |
| **Investor loans** | `dscr-loan-austin-tx.html`, `loans/investment.html` (not sampled) | No portfolio-loan, fix-and-flip, BRRRR, multifamily-1-4-unit, foreign-national-investor pages | Build investor cluster: `/portfolio-loans`, `/fix-and-flip-loans`, `/foreign-national-mortgage` |
| **Nationwide / multi-state** | All current pages are Austin- or Texas-anchored. Title tags, schemas, meta descriptions all geo-lock to Austin/TX | **Largest gap** for non-QM expansion. ~30-state license footprint is invisible | Add a `/states` hub + per-state landing pages for top 5–10 (e.g., `/dscr-loans-florida`, `/dscr-loans-tennessee`); update homepage `areaServed` schema to list all licensed states |
| **ITIN borrowers** | None | Niche but high-margin non-QM | Optional Phase 2: `/itin-mortgage-loans` |
| **Foreign national** | None | High-value non-QM | `/foreign-national-mortgage` if Adam originates |

---

## 5. Existing-Page Overlap Assessment

### `self-employed-mortgage-austin.html`
**Status: STRONG. Keep, do not replace. Light refresh only.**
- 671 lines, full 5-schema stack, FAQPage with 2 Q sets, internal links to DSCR, Cedar Park, Georgetown, Leander, Pflugerville, blog post, and all loan products.
- Title already covers two keywords: "Self-Employed Mortgage Austin TX | Bank Statement Loans".
- Meta description names bank statement / 1099 / P&L programs.
- **Recommend:** add a sibling page `/bank-statement-loans-austin` rather than letting this page double-rank for both. Cross-link the two. Both can co-exist; bank-statement-specific page can lean into 12-mo / 24-mo statement nuances + qualifying ratios.

### `dscr-loan-austin-tx.html`
**Status: STRONG. Keep as-is. Use as template for new non-QM pages.**
- 748 lines, 5 schema types, FAQPage with 2 Q sets, internal links to all suburb pages + loan products + blog post + glossary.
- This is the gold-standard template. Phase 3 builds for `bank-statement-loans-austin`, `non-qm-loans-austin`, `asset-depletion-mortgage`, etc., should clone this structure: hero → AEO answer paragraph → "What is X" → "Who qualifies" → "How it works" → use cases → FAQ → CTA.
- **Recommend:** build `/dscr-loans-texas` (statewide variant) and `/dscr-loans` (national) by lifting structure + swapping geo-anchored sections.

### Verdict: both pages are foundation assets. No replacement needed.

---

## 6. Internal Linking Observations

**Hub pages identified:**
- `index.html` — links out to most major pages
- `products.html` — loan products hub
- `calculators.html` — calculator hub
- `blog.html` — blog index w/ CollectionPage schema
- `realtors.html` — realtor hub
- `rate-check.html` — rate-check hub (links to 5 city pages)

**Footer service-area block** lists all 24 suburb pages site-wide — strong distributed equity to suburbs. Confirmed in `index.html` lines 1024–1048.

**Suburb pages cross-link** at least to `/rate-check.html` (per CONTEXT.md Dripping Springs, Round Rock notes) but mostly funnel up to `/get-preapproved` and `/refinance-quote`.

**DSCR + self-employed pages link to:**
- All 8 `/loans/*.html` products
- 5+ suburb pages each
- Their topical blog post (2026-03-31, 2026-04-02)
- `/contact.html`, `/get-preapproved`, `/products.html`, `/calculators.html`, `/blog.html`

This is dense and good. Per CONTEXT.md daily-opt 2026-04-30: DSCR has 28+ links, Round Rock 30+, calculators 17+ — all well above the 2+ threshold.

**Orphan / weak-inbound candidates (likely):**
- `mortgage-glossary.html` — only nav-linked, not strongly cross-linked from content
- `realtor-resources.html` — only nav-linked
- `austin-area-mortgage-lender.html` — unclear role; possible duplicate of homepage
- Calculator sub-pages (payment, affordability, etc.) — heavily linked from `calculators.html` but unclear if cross-linked from content pages
- `austin-housing-market-2025.html` — year-stale; likely losing inbound equity

**No silo / topic cluster structure** — suburb pages aren't grouped, loan products aren't hub-linked from a `loans/index.html`, and no non-QM cluster exists yet (the gap that this audit's recommending).

---

## 7. Top 10 Recommendations (Prioritized by SEO Impact)

1. **Build a non-QM hub + sub-cluster.** Create `/non-qm-loans-austin` and `/non-qm-loans-texas` as hub pages, then add `/bank-statement-loans-austin`, `/asset-depletion-mortgage`, `/portfolio-loans`, `/foreign-national-mortgage` (if in scope). Use `dscr-loan-austin-tx.html` as the structural template. Cross-link DSCR + self-employed into the new hub. **Highest impact for Adam's stated positioning.**

2. **Resolve the USDA cascade decision.** It's an ~88-page nav cleanup blocking forward motion and creating `Adam doesn't originate USDA but his nav says he does` AEO/trust dissonance. Pick one of: (a) keep nav, kill `/loans/usda.html`, redirect; (b) drop USDA from nav across all pages, redirect.

3. **Add nationwide state-page cluster.** Adam's ~30-state footprint is invisible because every page anchors to Austin/TX. Build `/states` hub + 5–10 top-state landing pages (Florida, Tennessee, Georgia, Colorado, Arizona — pick by license + investor demand). Update homepage `areaServed` JSON-LD to list all states. **Unlocks national DSCR/non-QM organic.**

4. **Fix the `about.html` LocalBusiness address mismatch** (5900 Balcones Drive Suite 100 → 5718 Sam Houston Circle). One-line edit, 12-run blocker per CONTEXT.md. Inconsistent NAP across schema is an authority signal hit.

5. **Add `FinancialProduct` / `FAQPage` schema to `/loans/*` pages.** Not audited but likely under-schemed given products.html only has CollectionPage. Each loan product page should have: FinancialProduct + FAQPage + BreadcrumbList minimum.

6. **Add `WebApplication` (or `HowTo`) schema to all calculator pages.** `calculators.html` and the 5 individual calculator pages currently have no structured data. Calculators are linkable assets — schema lift is fast.

7. **Refresh `austin-housing-market-2025.html`** to 2026 (or rebuild as rolling `austin-housing-market.html` with `<meta name="last-modified">` discipline). Year-stamped page is losing freshness signal monthly.

8. **Add a national `/dscr-loans` page (no Austin in the URL).** DSCR queries from out-of-state investors will never hit `dscr-loan-austin-tx.html`. Same for `/bank-statement-loans` (national) — pull double duty by listing licensed-state coverage in the body.

9. **Build a high-net-worth / asset-depletion landing.** Westlake page proves jumbo positioning works locally. `/asset-depletion-mortgage-austin` + `/high-net-worth-mortgage-austin` round out the HNW positioning Adam wants. Asset depletion is mentioned only inside Georgetown Sun City context today — under-leveraged.

10. **Verify `noindex` on internal/admin pages** (`dashboard, ops, marketing-command-center, task-dashboard, loan-dashboard, loanos, loanos-waitlist, marketing-content, forms`). These are correctly excluded from the audit but if any are crawlable they're index-bloat. One-line `<meta name="robots" content="noindex,nofollow">` per page.

---

**End of audit.** Next phase: Adam reads this, then Phase 2/3 build subagents reference Section 1 (design system) verbatim when generating new pages.
