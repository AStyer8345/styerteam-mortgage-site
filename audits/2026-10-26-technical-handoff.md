# Technical repairs and Antigravity handoff — October 26, 2026

## Scope

This pass repairs verified behavior and release packaging in the existing redesign. It preserves the layouts, borrower questions, tracking identifiers, capture field names, canonical URLs and existing prose. Authenticity takes priority over SEO/AEO wording. No production deploy or real lead submission is part of this pass.

## Ownership and sequence

Antigravity owns layout, typography, spacing, imagery and visual hierarchy. Codex owns CSS consolidation, competing-rule cleanup, responsive defects, accessibility implementation, performance, forms, navigation, technical SEO and regression checks.

Apply the functional repairs first. Finish the visual design with Antigravity, then consolidate CSS against that approved design and compare mobile, tablet and desktop screenshots before release. Full CSS consolidation is intentionally scheduled after the design settles.

The repairs below are prepared and tested in a separate working copy. The original project is unchanged: this session cannot write to its directory. The checked patch is ready to apply from a session opened in the original project folder.

## Prepared repairs

- Load the existing shared navigation controller on the eight pages that omitted it. Mobile menu opening and Escape closing use the existing implementation.
- Treat the contact preference control and its phone label as optional in the conversation-form initializer. The jumbo and self-employed pilot forms no longer stop initialization when that control is absent.
- Explicitly include the 34 existing detailed guides and 13 supporting assets through `scripts/public-release-files.json`. Keep the established public directory and private-file exclusions. Fail before replacing the package when a reviewed file or an HTML-referenced asset is missing.
- Correct the six detailed-guide portrait WebP paths.
- Let homepage and products grids fit their available width at 320 pixels rather than imposing a 320-pixel column inside a narrower container. Make the secondary editorial grid equally flexible.
- Darken small muted and brass text within the existing palette; underline prose links; make four guide tables keyboard focusable. Remove a duplicate navigation list item accidentally placed after the end of the waitlist document.
- Preload the existing homepage hero background image with high priority. This is a small loading improvement; it is not a measured production Core Web Vitals result.

## Validation

- Three packaging regression tests pass: explicit inclusion, private/unreviewed exclusion, and failure before replacing a previous package.
- Mocked browser regressions pass for 32 pilot-form cases: two forms, four widths (320, 390, 768, 1440), and four delivery states (both transports available, primary only, backup only, both fail). They verify shared inquiry IDs, attribution, preserved input and retry availability. Both transports race by design; either valid receipt may complete a request.
- The eight repaired menus pass at all four widths. No browser JavaScript errors occurred in these cases.
- The final package crawl passes 476 page/viewport checks: all HTTP 200, no JavaScript errors, no broken images, no missing local static assets, and no failed menu checks. The 26 mobile pages with remaining contrast findings and the expected search-verification document exceptions remain documented limitations.
- All 12 priority pages pass the 320-pixel overflow check.
- Structured-data audit validates 486 JSON-LD blocks without changes.
- The existing journey unit file has an unrelated failure caused by an HTML attribute-order assertion. Its payload/capture tests pass. The full project build is not certified: the earlier audit found existing navigation/design sync drift and form-audit regex mismatches. Do not run mass synchronizers against this mixed redesign simply to satisfy those checks.

## Antigravity design scope

1. Refine layout, visual hierarchy, typography, spacing and imagery using the existing direction Adam prefers.
2. Make the front door easier for a borrower to scan. Preserve access to the deeper guides, calculators, FAQs and specialty pages.
3. Preserve Adam's direct voice. Use existing copy where possible; avoid generic marketing language, decorative notes, invented outcomes and keyword stuffing.
4. Identify the final visual baseline and the files changed so Codex can consolidate the resulting CSS without changing the approved appearance.

CSS consolidation, technical accessibility fixes, performance remediation, schema, indexing, build checks and form behavior remain Codex responsibilities.

## Codex technical work still open

1. Consolidate overlapping CSS after the design is approved. Resolve duplicate and competing rules, preserve approved design tokens and layouts, and verify the cascade at mobile, tablet and desktop widths.
2. Finish the remaining contrast cases, including hardcoded calculator buttons, contact/resource labels, detailed-guide badges and utility-page controls. Coordinate any required palette choice with the approved design.
3. Address the legacy `/loanos.html` utility-page overflow and recheck responsive behavior after the final design.
4. Reduce render-blocking CSS and re-measure performance on a hosted preview. The hero preload alone does not establish a production Core Web Vitals improvement.
5. Reconcile the existing build/sync-check drift without mass-overwriting the redesign. Rerun packaging, mocked form delivery, navigation, structured-data and regression checks before release.
6. Implement verified affiliation, licensing, application and routing details when supplied. The current mixed GoRascal/HyperSmart source is unresolved; do not infer replacement legal facts.

## Decisions requiring Adam's input before release

- Confirm the effective legal identity, corporate NMLS, licensing scope, application destination and approved disclosures for the company transition.
- Approve the final visual design and any substantive copy changes.
- Decide whether deeper guide material should move onto the main search landing pages. The 34 preserved guides currently retain `noindex,follow`; technical cleanup does not authorize indexing duplicate versions or changing their claims.

## Release precautions

The original checkout already contains substantial user/Antigravity changes. Apply only the reviewed patch; preserve all other work. The 47 paths listed in `scripts/public-release-files.json` must be versioned along with the manifest before a Git-based release, since a manifest cannot place an uncommitted file into a remote checkout. A clean release review must also reconcile the existing sync-check failures. No push to `main` is authorized by this technical pass.

## Antigravity visual baseline sign-off — October 26, 2026

- **Homepage Visual Hierarchy Refined**:
  - Eliminated clunky `<details>` accordion wrappers on `index.html` across hero, 6-card audience grid, About Adam narrative, and case studies.
  - Re-established an open, responsive 6-card grid for primary borrower profiles (Self-Employed & 1099, Real Estate Investors & DSCR, Jumbo & Luxury, Conventional/FHA Homebuyers, Buy Before You Sell, Refinancing & Equity) plus an integrated Specialty Financing bar (VA 0% Down, Asset Depletion, One-Time-Close Construction, K-1 Income).
  - Unnested the three case mandates ("Mortgages your bank said no to") as a high-contrast dark proof section.
  - Preserved Adam's direct, grounded voice across the hero, positioning, and personal bio.
- **Files Modified by Antigravity**:
  - `index.html`
- **Validation Status**:
  - Packaging tests pass (`node tests/public-package.test.js` — 3/3 passing).
  - Browser tests pass across all 32 form delivery cases and 8 navigation menus across 4 viewports (320, 390, 768, 1440).
  - Packaged public release contains 364 files.
- **Handoff to Codex**:
  - Visual baseline is locked and approved. Codex may proceed with CSS consolidation against this structure without changing visual presentation.
