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

Release 1 production: commit `83be4e54ad787b15099ad1fa2e13cf97a22fa477`; Netlify `6aac5ab754557e0008adede0`, verified ready. Live assets and named repairs were read back after publication.

## Release 2: shared design and core page families

- Applied the scoped advisory type, color, spacing, control, navigation and review-footer system to 190 existing HTML pages. The homepage now uses the same navigation groups as the rest of the site.
- Rebuilt the homepage composition with the existing portrait visible in the first phone screen, ruled goal/program directories, three accurately labeled published scenario reviews, and stationary sourced reviews. The established inquiry form stays in place.
- Shortened Contact's introduction and moved its application/scheduling alternatives beside the form. Kept every field, consent requirement, action, and capture identity.
- Moved the complete quote forms on eight older loan pages after their opening explanations. Converted feature grids to readable rows. Refined HNW's four situation explanations without altering its authored comparisons or FAQs.
- Added exact numeric entry beside Payment, Affordability, and current-loan Refinance sliders. Preserved the original math; incomplete tax/insurance costs are labeled. A phone result strip updates while inputs are visible and leads to the full result/assumptions.
- Fixed refinance review/restore to use exact entries rather than slider-rounded values. Existing analysis version, timestamp, results and caveats remain in the review payload. DSCR's existing rent/PITIA review handoff is retained.
- Simplified the DSCR opening, removed the decorative gauge and duplicate coverage badge, and retained the ratio, interpretation, PITIA ledger, exclusions, review and save controls.
- Set article prose to a 720px desktop measure and readable phone type. Contents disclosures open on desktop and are expandable on phones. Existing bookmarks reveal their containing answers; FAQ hidden state matches expanded state.
- Repaired the older AI essay's duplicated title/sign-off, letter avatar and newsletter-only instruction while preserving its voice and dates.
- Rebuilt blog discovery as a featured story plus dated rows. Display-category aliases merge duplicate labels without changing manifest categories or URLs; Back restores the selected category.
- All four publishing builders now inherit the new shell through the shared refinement. Regeneration and idempotence checks are in the test suite, and the build checks design sync.

### Validation

Final layout preview: https://6aac6159286132735f3e3e32--shiny-paprenjak-c7e741.netlify.app . The product/DSCR heading rules also receive narrowly scoped precedence over the older global heading override; verify their computed size again on production.

- 125 JavaScript tests and 119 assistant tests passed; TypeScript check passed.
- Build passed: 57 contact forms audited, 472 JSON-LD blocks validated, 194 navigation files checked, design sync current.
- Compared all 190 changed HTML files with release 1: all 56 static form contracts, all 472 schema blocks, all canonicals and existing IDs preserved. The sole removed unique link was the blog index's opening Calendly solicitation; scheduling remains on Contact and other relevant pages.
- No packaged HTML references a missing local script, stylesheet or image. Only the restricted 284-file public package is uploaded; functions are bundled separately.
- Browser checks cover Home, Contact, Conventional, HNW, Self-Employed, Payment, Refinance, DSCR, Asset Depletion, WRAP, Blog, a current article and the older essay across representative 320/390/768/1440px states.
- Exact-entry example: $357,891.23 at 6.987%, 30 years, produces approximately $2,378 P&I. Adding $620.55 monthly tax and $175.25 insurance gives approximately $3,174 PITI. A fractional whole-year entry is visibly rejected without replacing the last valid result.
- Refinance inquiry/return preserved $357,891.23 and 6.987%. Its contact step received focus below the sticky header. No lead was submitted.
- DSCR review preserved $4,500 rent, approximately $3,755 PITIA and 1.20 DSCR under its existing default property/loan assumptions. No lead or analysis save was submitted.
- Verified menu/submenu expanded states, Escape/focus return, static reviews, loaded portraits, expandable contents, article Back/category preservation, and a deep-linked FAQ opening clear of the header.

### Deliberately separate work

- The homepage form relocation remains a separate conversion experiment as specified in the approved plan.
- New environmental photography and new attributed observations require real assets or Adam's approved words. Existing approved photography and published case material are used now.
- Review counts, licensing claims and underwriting content were not refreshed from guesses; existing dates, source links and review archive remain intact. Any factual refresh requires current source verification.
- Representative borrower usability sessions, qualified-conversation measurement, and traffic-led page-by-page refinements follow the technical rollout. No conversion lift is claimed.
- Legacy shared CSS remains where still used. Only the homepage stylesheet was consolidated in this release; a broad unused-style purge would need further dependency coverage.
