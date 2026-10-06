# Directory and legacy loan preview checkpoint

October 5, 2026, approximately 10:52 p.m. America/Chicago. Local isolated preview only; production remains unchanged. This is one completed implementation batch, not completion of the entire overnight scope or its final audit gate.

## Scope and changes

- Directories: products.html, resources/index.html, calculators.html.
- Legacy loan guides: loans/conventional.html, fha.html, va.html, usda.html, jumbo.html, refinance.html, investment.html, construction.html.
- Added opt-in premium-guides.css, existing premium-interior.css and navigation primitives. Original document content, forms, metadata/schema, header/footer markup and URLs remain.
- Consistent ink/ivory presentation, serif display hierarchy, readable body measure, centered containers, precise cards, restrained dividers, 16px form text and 50px controls. Existing FAQs, responsive table owner, disclosures and calculators remain.
- Licensed stock photography reused selectively in products, conventional and investment heroes; sources and restrictions remain in Photography.md.
- Resource cards have consistent headings and explicit guide/tool/article actions; existing destinations and descriptions retained.
- Jumbo's original anchor CTA now focuses its original quick-options panel through the scoped shared navigation enhancement.

## Rendered repair loop

Actual rendering exposed conflicts with legacy CSS. Fixed unequal hero/breadcrumb gutters, narrow CTA label alignment, mixed resource-card typography/tags, awkward calculator-card action placement, transient header background transition, excessively wide FAQ titles relative to the answers, a white table-header link on a paper background, the calculator conversion button blending into its dark section, and unused footer-column space on the four-column footer variant. Rechecked the affected components after these repairs.

## Exact coverage

**Automated browser geometry/DOM checks:** all eleven pages at 320, 390, 768 and 1440 pixels, 44 checks. No horizontal document overflow, exactly one H1, no unlabeled visible form controls, all visible text/select/textarea controls at 16px, and all three new image placements loaded. Evidence: guide-responsive-checks.json. These broad checks preceded the last small component contrast/focus repairs; those affected components were subsequently rechecked directly as listed below. This does not assert a full manual visual audit at all 44 combinations.

**Visual review:** products, resources, calculator directory, conventional and jumbo first screens on desktop and narrow mobile; FHA/USDA/investment desktop first screens; VA/refinance/construction narrow mobile first screens. First-screen screenshots for every page at 320 and 1440 are saved in guide-screenshots. Selected lower components reviewed directly: resource cards at 390/1440, conventional quote form at 390/1440, conventional comparison table at 390, open conventional FAQ at 1440, and calculator conversion/footer band at 1440. These checks do not certify every section of every long loan guide.

**Interactions:** resource directory → calculator directory → payment calculator navigated successfully. Calculator conversion CTA opens the established short-inquiry dialog with the original embedded get-preapproved route and closes successfully. No data submitted. Jumbo CTA focuses quick-options. Resource mobile menu opens/closes. Conventional FAQ sets aria-expanded=true; mortgage-options native FAQ opens. Conventional comparison table retains its existing named keyboard-focusable horizontal-scroll region; ArrowRight moved its scroll position. Form labels/controls and visible focus reviewed without submission.

**Protected contracts and regression checks after final repairs:** npm test: 138 site + 127 assistant checks, 265 passing. This includes broad baseline preservation, calculator and lead-flow tests. Safe CONTEXT=deploy-preview build passed forms, attribution, 477 JSON-LD blocks, navigation and design sync; IndexNow explicitly skipped. Typecheck passed. SEO audit: 165 sitemap URLs, zero issues. A source resolution check inspected 1,639 internal link/anchor occurrences in these eleven documents with no missing destinations; see guide-link-checks.json. The unrelated build-generated recent-updates.json is restored and the local public package rebuilt.

## Remaining work and limits

The DSCR cash-out acquisition journey, versioned calculator assumption carryover, matching ad review/dashboard and staged measurement brief remain next in the queue. The actual calculators, remaining editorial/scenario/trust/partner pages and other public page families still need their scoped implementation/review. All changed families—including the Dallas/San Antonio additions—still need the required fresh cross-site final re-audit once implementation is finished.

Existing numerical product/eligibility/closing claims were retained, not newly verified. The conventional/FHA comparison language about lifetime FHA mortgage insurance, broad minimum-credit assertions, dated local market figures and jumbo program ranges need current primary-source/program review before release. Do not treat visual preservation as factual validation. Do not remove substantive content to address these issues; correct and synchronize affected visible/schema answers through an explicit accuracy-focused pass.

Local screenshots and passing checks do not establish live lead delivery, search ranking gains, AI citations, production field Core Web Vitals or conversion lift. No production changes, ads, external communications or submissions occurred.
