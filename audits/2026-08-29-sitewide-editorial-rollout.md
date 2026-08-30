# Sitewide editorial rollout validation — 2026-08-29

## Scope

The rollout adds an explicitly opted-in `editorial-page` system with page-family classes. The approved bank-statement page and latest pilot homepage remain the visual references; the upstream pilot's compact portrait treatment is preserved without restoring the former oversized hero image.

- Homepage: `index.html`
- Loan programs: 23 public program pages, including the bank-statement reference and seven nested `/loans/` pages
- Locations: Austin-area hub plus 24 city pages
- Guides/resources: 17 top-level guide, resource, legal, and index pages
- Calculators: 9 calculator/tool pages
- Lead/application: 12 form, scenario, quote, and rate-check pages
- Trust/contact: about, testimonials, realtor, referral-partner, and contact pages

Intentionally excluded: `404.html`, dashboards, ops and marketing tools, `forms.html`, `ftb-dpa-guide.html`, LoanOS utility/waitlist pages, `thank-you.html`, dated rate/update archives, dated blog/realtor-update articles, and generated templates. These retain their current isolated behavior and were not given public family classes.

### Changed pages by family

- **Homepage (1):** `index.html`
- **Loan programs (23):** `1099-only-mortgage-texas.html`, `asset-depletion-mortgage-texas.html`, `bank-statement-loans.html`, `dscr-loan-austin-tx.html`, `dscr-loans-dripping-springs.html`, `dscr-loans-fredericksburg-tx.html`, `dscr-loans-texas.html`, `first-time-home-buyer.html`, `high-net-worth-mortgage.html`, `investor-loans.html`, `k1-income-mortgage-austin.html`, `mortgage-for-business-owners-austin.html`, `non-qm-loans.html`, `one-time-close-construction-loan-texas.html`, `p-and-l-mortgage-texas.html`, `self-employed-mortgage-austin.html`, `loans/construction.html`, `loans/conventional.html`, `loans/fha.html`, `loans/investment.html`, `loans/jumbo.html`, `loans/refinance.html`, `loans/va.html`
- **Locations (25):** `austin-area-mortgage-lender.html`, `bastrop-mortgage-lender.html`, `bee-cave-mortgage-lender.html`, `buda-mortgage-lender.html`, `cedar-park-mortgage-lender.html`, `dripping-springs-mortgage-lender.html`, `elgin-mortgage-lender.html`, `florence-mortgage-lender.html`, `georgetown-mortgage-lender.html`, `hutto-mortgage-lender.html`, `jarrell-mortgage-lender.html`, `kyle-mortgage-lender.html`, `lakeway-mortgage-lender.html`, `leander-mortgage-lender.html`, `liberty-hill-mortgage-lender.html`, `manor-mortgage-lender.html`, `marble-falls-mortgage-lender.html`, `new-braunfels-mortgage-lender.html`, `pflugerville-mortgage-lender.html`, `round-rock-mortgage-lender.html`, `san-marcos-mortgage-lender.html`, `smithville-mortgage-lender.html`, `spicewood-mortgage-lender.html`, `taylor-mortgage-lender.html`, `westlake-mortgage-lender.html`
- **Guides and hubs (17):** `austin-down-payment-assistance.html`, `austin-housing-market.html`, `austin-mortgage-rates.html`, `blog.html`, `closing-costs-texas.html`, `fixed-vs-adjustable.html`, `how-much-house-can-i-afford-austin.html`, `how-to-buy-a-house-in-austin-tx.html`, `improve-credit-score.html`, `mortgage-broker-vs-bank.html`, `mortgage-glossary.html`, `mortgage-pre-approval-austin.html`, `privacy.html`, `products.html`, `scenarios.html`, `terms.html`, `texas-complaint-notice.html`
- **Calculators (9):** `asset-depletion-calculator.html`, `calculator-affordability.html`, `calculator-payment.html`, `calculator-refinance-breakeven.html`, `calculators.html`, `dscr-calculator.html`, `rate-buydown-calculator.html`, `refinance-calculator.html`, `wrap-mortgage-calculator.html`
- **Lead and application (12):** `contact.html`, `get-preapproved.html`, `prequal.html`, `rate-alert.html`, `rate-check-buda-kyle.html`, `rate-check-cedar-park.html`, `rate-check-georgetown.html`, `rate-check-new-braunfels.html`, `rate-check-round-rock.html`, `rate-check.html`, `refinance-quote.html`, `scenario.html`
- **Trust, about, and contact (5):** `about.html`, `realtor-resources.html`, `realtors.html`, `referral-partners-self-employed-clients.html`, `testimonials.html`

## Representative page-height comparison

Measured at 1440 × 900 against the pilot commit used to start the rollout (`e251e55`).

| Family | Page | Before | After | Change |
| --- | --- | ---: | ---: | ---: |
| Loan | `non-qm-loans.html` | 15,111 px | 13,108 px | -13% |
| Location | `round-rock-mortgage-lender.html` | 14,217 px | 12,836 px | -10% |
| Guide | `improve-credit-score.html` | 6,950 px | 5,875 px | -15% |
| Calculator | `calculator-payment.html` | 1,825 px | 1,690 px | -7% |
| Lead form | `get-preapproved.html` | 3,215 px | 3,444 px | +7% |
| Trust/about | `about.html` | 16,275 px | 13,832 px | -15% |
| Homepage | `index.html` | 13,114 px | 11,538 px | -12% |
| Reference | `bank-statement-loans.html` | 7,386 px | 7,386 px | 0% |

The pre-approval page is slightly taller because the refined form preserves all fields and consent content while increasing control height and spacing for legibility.

## Automated validation

- Build and knowledge validation: pass
- Node governance, AEO, lead-flow, review-count, rollout, and assistant suites: 144/144 pass
- TypeScript typecheck: pass
- SEO audit: 147 sitemap URLs, 0 issues
- Changed-page JSON-LD parsing: pass
- One H1 and one canonical on every changed HTML page: pass
- Form contracts compared with the pilot base: 0 changes
- Local asset/link scan: no new missing assets; one pre-existing documented `[slug]` placeholder in `scenarios.html`

## Browser coverage

Representative families were checked at 1440 × 900, 1024 px, 768 px, and 390 × 844. Checks covered horizontal overflow, console errors, H1 count, stylesheet loading, image/cutout suppression, focus-visible rules, and FAQ disclosure toggling. No horizontal overflow or console errors were observed. No live form was submitted.

The approved navy header was additionally checked across homepage, loan, location, guide, calculator, lead, and trust representatives at desktop and mobile widths. The shared treatment resolves to navy `rgb(13, 35, 66)`, the light logo asset, white desktop links, and gold `rgb(209, 181, 104)` CTA. The mobile menu uses a white surface with dark text and visible focus/hover states. An excluded dashboard retained its original header, confirming the scope boundary.

### Follow-up audit

A complete 85-page browser crawl at 1440 × 900 and 390 × 844 found one mobile overflow issue in the Austin home-buying guide. Its three comparison tables now use labeled, keyboard-focusable horizontal scroll regions. A second 85-page mobile crawl passed with zero overflow, broken-image, H1, header, or console failures. The mobile navigation was also opened interactively and verified for `aria-expanded`, white menu surface, and readable dark links. Duplicate family/header declarations were removed from `editorial-system.css`; `style.css` is now the authoritative source for shared rollout rules.

The final audit identified seven indexable nested loan pages that were omitted by the original top-level-only inventory. They use the dedicated `public-header-page legacy-loan-page` scope: the approved header treatment is applied without imposing the broader editorial body system on their photo-led templates. The noindex USDA page remains excluded. Their legacy heroes use a responsive two-column pitch/form layout with explicit high-contrast form styling and no clipped content. All seven passed desktop and mobile checks for navy header, light logo, white desktop navigation, gold CTA, fully contained H1 and form, zero horizontal overflow, and zero broken images. The refinance mobile menu was opened interactively and passed its expanded-state color and ARIA checks.
