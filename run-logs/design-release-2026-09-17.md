# Advisory design implementation — September 17, 2026

Production baseline: 162316f478394ae6905b7dc37f83d9c3c63e19de, Netlify 6aac46ac81bc80000853ebbe.
Work is isolated from the user's modified main checkout.

## Release 1: observed defects
- Corrected buy-down principal/interest headings to match the calculation and print view; formatted negative currency and explained the shortfall.
- Fixed the payment calculator's 320px reflow, homepage phone/email stacking, mobile dropdown expanded state, and assistant/menu collision.
- Restored hidden Realtor honeypot treatment without changing the form contract.
- Replaced the guide placeholder with the existing Adam portrait and corrected the asset-calculator breadcrumb.
- Added a restricted public-file package after the initial repository-root preview was rejected by approval review. Internal source, tests, reports and repository metadata are excluded. Checked HTML dependencies; no referenced repository files are missing.

Validation: 121 existing JavaScript tests, the new financial-table regression, 119 assistant tests, build/form/schema/navigation audits and typecheck. The knowledge validation reports existing expired approvals; the assistant continues excluding those documents.
Preview: https://6aac5a204dba1b6bc12e3e03--shiny-paprenjak-c7e741.netlify.app
Browser: payment at 320px has no page overflow; menu expanded state and Escape work; assistant is hidden while menu is open; homepage contact fields are ~290px at 390px; buy-down first-row interest is $2,042 and principal $389; negative credit is -$8,932; Realtor spam field is non-visible/non-focusable; existing guide portrait loads.
No real lead or notification was submitted.
