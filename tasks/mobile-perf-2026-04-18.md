# Mobile Performance Diagnosis — 2026-04-18

Trigger: GSC shows desktop avg position 9.25 vs mobile 36.47 — a 27-position gap on the same content. Mobile CWV is the prime suspect.

## Part 1 — Executed (committed this session)

### Image compression results

| File | Before | After (WebP) | After (Fallback) | Savings |
|------|--------|--------------|------------------|---------|
| `family2.jpg` | 8.1 MB | 108 KB | 332 KB (JPG) | 98.7% / 96.0% |
| `adam-cutout.png` | 5.0 MB | 64 KB | 1.1 MB (PNG, alpha required) | 98.8% / 78.0% |
| `headshot.jpg` | 2.0 MB | 68 KB | 264 KB (JPG) | 96.7% / 87.0% |
| **Total** | **15.1 MB** | **240 KB** | **1.7 MB (worst case)** | **98.4% webp / 88.7% fallback** |

Originals moved to `assets/originals/` for rollback. All three output formats sit at/under task targets for WebP (≤200/150/100 KB). The PNG fallback for `adam-cutout` is still 1.1 MB (PNG with alpha at 1200px is inherently large without pngquant available) — but WebP is served to ~96% of browsers, so this is effectively a rare path.

Encoder: `cwebp 1.6.0` (Homebrew) + `sips` (macOS) for fallbacks. No new npm packages installed.

### `<picture>` wrapping

- **48 HTML files** modified (42 individual `<img>` occurrences across the repo).
- Wrapping pattern:
  ```html
  <picture>
    <source srcset="<relative-path>/<name>.webp" type="image/webp">
    <img src="<relative-path>/<name>.<jpg|png>" ... (existing attrs preserved) >
  </picture>
  ```
- Preserved: `alt`, `class`, `width`, `height`, `fetchpriority`, `decoding`, `loading`, inline `style`.
- Skipped: `index.html` (already wrapped with its own preload), `austin-mortgage-rates.html` (already wrapped), structured-data JSON strings referencing `headshot.jpg` (correct — those are public URLs for schema, not rendered).
- Resource files touched include all suburb pages, loan-type pages, about/contact/realtors/realtor-resources/testimonials/blog.html/products/self-employed/dscr/how-to-buy/mortgage-pre-approval, all `loans/*.html`, and the blog post that used `headshot.jpg` as author image.

### Changelog

Appended `2026-04-18` entry to `CHANGELOG.md`. `CONTEXT.md` rewritten (kept under 100 lines).

## Part 2 — Diagnosis (Lighthouse mobile + perf traces)

Audits run against **production (pre-deploy)** via chrome-devtools MCP with mobile viewport (390×844 @3x), iOS UA, Slow 4G, 4× CPU throttling. Lighthouse tool only surfaces Accessibility/Best Practices/SEO (performance requires traces).

### Per-page results

| Page | Accessibility | Best Practices | SEO | LCP (observed, throttled) | CLS |
|------|---------------|----------------|-----|--------------------------|-----|
| `/` (homepage) | **100** | 77 | 100 | 294 ms* | 0.02 |
| `/blog/2026-04-04-austin-housing-market-report-april-2026.html` | **94** | 77 | 100 | 1,249 ms (Load-delay 1,117 ms) | 0.00 |
| `/calculator-payment.html` | **90** | 77 | 100 | 265 ms* | 0.00 |

\* Trace values are without throttling — MCP `performance_start_trace` appears to reset emulation on trace start. Numbers should be read as "relative comparisons" not absolute mobile reality. Real-world mobile LCP for the suburb/loan pages (which were serving 5 MB `adam-cutout.png` before today's commit) would be far worse — consistent with the ops.html note of LCP 40.4 s observed March 21.

### LCP element per page

- Homepage: `<picture>` with `adam-cutout.webp` (already optimized + preloaded).
- Blog post: `hero-bg.webp` (119 KB) — fine file size; **1,117 ms load delay** means it's not being discovered early in the critical path (no preload).
- Calculator: text-only hero card, no image LCP.

### Unused JS / render-blocking

- Google Tag Manager (GTM-PQQ6PGLR) + Google Ads conversion pixel (AW-18028490942) + GA4 (G-DDY0H0319S) — all three firing on every page. This is a **P1** weight, but changing analytics config requires Adam's sign-off per repo rules.
- `script.js` and `calculator-suite.js` are render-blocking (no `defer`/`async` on some inclusions). Calculator pages load `calculator-suite.js` synchronously.
- External Google Fonts CSS request chain (`fonts.googleapis.com/css2?...Inter&Playfair`) is render-blocking — but lightweight.

### Image weight concerns (post-deploy projection)

Once this commit deploys to Netlify, the largest mobile payload on any content page drops from ~5 MB image download to **~64 KB** for `adam-cutout`. This is the single biggest CWV lever on the site.

### Other accessibility failures

- **Calculator page: form inputs without labels** — the three `<input type="range">` sliders have no associated `<label for>`. Affects screen readers and Lighthouse scoring.
- **Footer links: color-contrast failure** — several footer `<a>` links flagged for insufficient contrast against background.
- **Blog post: heading order** — `h2` → `h4` skip somewhere in the article.

### Calculator slider tap targets

Inspected `calculator-suite.css`:
- `.calc-slider-input::-webkit-slider-thumb { width: 20px; height: 20px; ... }`
- `.calc-slider-input::-moz-range-thumb { width: 20px; height: 20px; ... }`

**Both slider thumbs are 20×20 px.** WCAG 2.2 Level AA requires 24×24, Material Design recommends 44×44 for mobile. This is below the 44×44 target for mobile tap comfort. Sliders are the primary interaction on three calculator pages (payment, affordability, refinance-breakeven).

## Prioritized top-5 mobile issues

| # | Priority | Issue | Impact | Auto-fix safe? |
|---|----------|-------|--------|----------------|
| 1 | **P0** | Huge images served on 42 `<img>` instances across 48 pages (5 MB PNG, 8.5 MB JPG, 2.1 MB JPG) crushing LCP on all non-homepage pages. | Directly breaks Core Web Vitals → mobile ranking collapse | **DONE this session** (auto-fix) |
| 2 | **P0** | Calculator sliders have 20×20 px tap targets. | Mobile usability failure (Google mobile-friendly / CWV tap signal); calculator is a primary conversion tool. | Safe-ish — a CSS-only increase to 36–44 px thumb with negative margin to keep track height — but task rule says no CSS layout changes. **Needs Adam review**. |
| 3 | **P1** | Blog post LCP `hero-bg.webp` has 1.1 s load delay (no preload hint). | Hurts CWV on every blog post (10+ pages). | **Auto-fix safe** — add `<link rel="preload" as="image" href="/assets/hero-bg.webp" type="image/webp">` in the shared blog header. Would need a sweep across blog posts. |
| 4 | **P1** | Calculator form inputs missing `<label for>` associations. | Accessibility (screen reader) + Lighthouse a11y score. | Safe — add `<label for>` pairing. But task rule says no JS changes and labels may require DOM restructure. Low risk but **should be reviewed**. |
| 5 | **P2** | GTM + Google Ads + GA4 all loading on every page, no `defer`. | Render-blocking weight, 3rd-party cookie warnings. | **Needs Adam review** — consolidate or defer analytics per repo rule "never modify GTM container snippet". |

## Post-deploy action items (not done this session)

1. Verify Netlify deploy publishes updated images and HTML within 2–3 min of push.
2. Re-run this exact audit 24 h post-deploy against all three URLs to confirm LCP improvement.
3. Re-check GSC Mobile CWV status at 7-day mark — the real test.
4. If mobile position gap has closed, tackle P2/P3 above. If not, look deeper at tap-target + analytics load.

## Out of scope for this session

- Did not touch `calculator-suite.js` (task rule).
- Did not change CSS layout (task rule).
- Did not touch other large images (`team-*`, `networking-*`, `ruthie-charlie`, `og-image.png`) even though a compression pass on `og-image.png` (currently full-size) could save further bytes — **future task**.
