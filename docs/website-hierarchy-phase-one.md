# Website hierarchy — first implementation

Prepared September 13, 2026 from verified production commit `51b16fb745133bd7919f6528a2291d428427bffb`.

## Scope

The main navigation now separates Mortgage Options, Tools & Guides, Real Scenarios, For Partners and About Adam. The options menu leads to `/products.html`, with links organized around borrower situations. The phone, scenario and secure-application destinations are preserved.

The programs directory routes visitors by their goal and keeps a compact program-name directory. The business-owner page owns strategy, liquidity and choice of income path. The self-employed page owns qualification, documentation and preparation. Each connects to the specific program guides and the existing scenario form.

## Page ownership

| URL | Primary job | Next step |
|---|---|---|
| `/products.html` | Choose a mortgage path by situation | Relevant situation hub or short scenario |
| `/mortgage-for-business-owners-austin.html` | Compare strategy around business income, liquidity and property goals | Qualification guide or specific program |
| `/self-employed-mortgage-austin.html` | Understand documents, income review and the qualification process | Specific documentation guide or existing scenario form |
| `/bank-statement-loans.html` | Explain the bank-statement program | Existing program-specific review |
| `/resources/mortgage-options-for-business-owners.html` | Provide a deeper documentation comparison | Relevant program or business-owner review |

## Preservation and maintenance

- All established page URLs, canonical targets, robots controls, redirects and original main-content anchors remain.
- Every form in every modified HTML file remains byte-for-byte unchanged from the production baseline.
- Outside the three rewritten pages, HTML changes are limited to navigation and the matching Mortgage Options link label/destination.
- Existing business-owner and self-employed FAQs remain; two pre-existing schema/text discrepancies were corrected.
- The sitemap updates only the three substantive pages' modification dates.
- Shared navigation is owned by `scripts/sync-navigation.mjs`, including all four HTML-generating templates. Run it after a menu change and use `--check` to detect drift.
- `mortgage-hierarchy.css` is loaded only by the three revised pages.
- The original, heavily modified checkout is untouched. This work is isolated on `codex/website-hierarchy-phase-one`.

## Verification

- Full automated suite: 233 tests passed (115 site tests plus 118 assistant tests).
- Focused tests after template changes: 18 passed.
- Typecheck and build passed. Build form audit: 56 contact forms recognized (48 Netlify and eight approved custom).
- SEO audit: 157 sitemap URLs, zero issues.
- Header and navigation checks: 30 destinations at five widths (1440, 2100, 1240, 1024 and 390 pixels).
- Existing self-employed and bank-statement form navigation, entered values and mocked submission behavior passed. No test lead was sent to a live service.
- Additional checks cover the three revised pages at 320, 390 and 1440 pixels, FAQ/schema agreement and all four mobile dropdown paths.

## Next phase

Evaluate the new navigation and these three page roles before extending the body-content work to assets and investors. Verify originating-page attribution before assigning lead or funded-loan value to individual content pages. Consolidation and redirects remain separate, evidence-led decisions; none are included here.
