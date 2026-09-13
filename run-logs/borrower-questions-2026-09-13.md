# Borrower question integration — September 13, 2026

Implemented the approved question-based Non-QM structure and related answers on nine existing pages. Production baseline: `e679e74f0220d8b5d9845bfa7cb675b024b847ca`, Netlify deploy `6aa7049d797a45000827454d` (verified before editing).

- Non-QM hub: borrower-focused opening, six situation paths, qualification factors, six visible FAQs, existing verified Ellery Wren review, scenario/application actions.
- Self-employed and affordability guides: documentation choices, qualifying income versus revenue, an explicitly assumed numerical illustration, and shorter business-history guidance.
- Document checklist: separate tax-return, bank-statement, 1099, P&L and asset paths; remove conflicting universal tax-return and timing statements from the revised answers.
- DSCR page/article: visible exit-cost guidance, a contractual prepayment example, and consistent FAQ wording.
- Refinance overview: alternative-documentation paths, conventional refinance considerations, transaction-specific seasoning explanation, and corrected Texas timing language.
- Home-equity guide: cash-out refinance versus home-equity loan versus HELOC comparison.
- Resources: six borrower-question groups linking to existing destinations.

Preserved existing URLs, canonicals, form bodies, lead handling, tracking scripts and verified review figures. Today's earlier navigation, homepage and review changes are retained through the exact production baseline. No new landing-page URLs, redirects or mortgage program availability promises were added. The new CSS applies only to the new sections.

FAQ markup was aligned with visible answers on affected pages. Removed the affordability page's pre-existing FAQ markup that lacked corresponding visible questions. Article dates and affected sitemap dates were updated. The homepage recent-updates file remains the baseline version in this change; the established production build generator still runs normally.

Sources checked: CFPB General QM final rule and Regulation Z business-purpose exemption; Fannie Mae self-employed underwriting and cash-out refinance guidance; CFPB HELOC guidance; Texas Constitution Article XVI, Section 50. No private-investor numerical minimums or future refinance guarantees were introduced.

Validation before hosted preview:

- Full tests: 115 site tests and 118 assistant tests passed.
- Build: passed, including 20 knowledge files and the 56-form notification audit.
- SEO audit: 162 sitemap URLs, zero issues.
- Browser: all nine pages checked at 320, 390 and 1440 pixels; no horizontal page overflow; one H1 each; affected FAQ answers agree with markup; all six hub FAQs visible and expandable.
- Original forms, canonical URLs and verified review figures compared unchanged against the production baseline.
- All newly introduced internal links and anchors resolved locally; secure application uses the existing `/apply-now/` redirect.
- Desktop hub, mobile situation cards and mobile equity comparison visually inspected. No borrower inquiry was submitted.
