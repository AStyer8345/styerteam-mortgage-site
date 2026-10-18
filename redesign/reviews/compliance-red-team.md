# Compliance and chief-skeptic review

Local-only buildout · reviewed October 18, 2026

## Shared footer delivered

`components/footer.html` includes Adam’s NMLS #513013 and Consumer Access link, direct call/text/email, Tiffany’s document/update contact, four resource-directory groups, Equal Housing Opportunity text, clear estimate/approval boundaries, an always-visible Texas complaint/recovery notice link, and the regulator’s complaint contact. It uses established internal URLs. The resource directory is a navigation landmark without a `<nav>` element, avoiding the older global mobile navigation positioning rule.

Phone `(512) 956-6010` and `adam@thestyerteam.com` match the live [contact page](https://styermortgage.com/contact.html), checked through web retrieval. `tiffanyw@gorascal.com` is retained from the explicit current project instruction; this review does not independently certify her title, license status or affiliation. No call, message or form submission was made.

## Primary legal sources checked

| Source | Finding used in the local implementation |
| --- | --- |
| [Texas SML mortgage-origination FAQ](https://www.sml.texas.gov/mortgage-origination/faqs/), advertising section | Advertising disclosure includes the company’s name, NMLS ID and website, plus the sponsored originator’s name/NMLS. A complaint notice is required on websites. The FAQ is agency guidance, not a safe-harbor legal opinion. |
| [Texas SML mortgage-company website notice](https://www.sml.texas.gov/download/mortgage-company-complaint-recovery-fund-notice/), last updated December 6, 2024 | SML identifies the mortgage-company notice under 7 TAC §56.200(c). The existing local notice page is linked directly; the footer does not substitute a paraphrase for the prescribed notice. |
| [Texas SML mortgage-banker website notice](https://www.sml.texas.gov/download/mortgage-banker-complaint-recovery-fund-notice/) | A different notice exists under §57.200(c); the applicable entity type must be confirmed. |
| [Texas SML 2024 examination/rule presentation](https://www.sml.texas.gov/wp-content/uploads/2024/11/2024MID-2-Meier-Common-Violations-New-Mortgage-Rules.pdf) | Agency material recognizes a direct hyperlink to the company webpage containing the notice. Keep the local notice link visible and functional. |
| [Texas SML complaint information](https://www.sml.texas.gov/consumers/complaints/) and [contact details](https://www.sml.texas.gov/about/contact/) | The footer points to the regulator’s complaint instructions and toll-free consumer contact, 1-877-276-5550. |

The Secretary of State rule links opened from the SML FAQ returned no readable rule text through the available web tool. This review relies on SML’s published guidance and forms; it does not assert independent confirmation of the complete current rule text.

## Release blockers, not reasons to stop the local build

1. **Corporate identity is unresolved.** An individual NMLS number alone does not make the footer ready for public mortgage advertising. Insert the confirmed sponsoring company’s approved name, NMLS ID and website, and review the team-name presentation. A source comment records this gate; no corporate number or affiliation is invented.
2. **The inherited legal page names Kyber/HyperSmart.** The current rebuild’s team presentation must not be paired with that legacy identity by accident. Review the body, title, social metadata, schema and applicable company/banker notice together before publication. Preserve the established legal-page URL.
3. **No blanket approval or special-program promises.** Existing numeric underwriting ranges need their program context. Do not combine best-case credit, loan size, LTV and expense factors into one apparent offer. A generic footer disclaimer does not repair a misleading claim higher on the page.
4. **Preview interactions must stay honest.** Local sample confirmation is not lead delivery. Application, calendar, SMS and inquiry transport must be separately verified before launch. Existing live email-recipient work belongs to the parallel task and is not modified here.
5. **Equal Housing wording is a notice, not a certification.** The footer supports equal access and avoids inventing “bank,” “approved lender” or agency endorsement claims. No new rate, APR, guaranteed approval, closing-time guarantee or licensing status is introduced.

## Three critical Austin borrower paths

These are source-level friction scenarios. Browser layout, focus, touch targets, rendering and delivery are separate QA gates.

| Borrower | Route and questions to test | Fail condition |
| --- | --- | --- |
| Austin business owner declined after tax-return review | Homepage → self-employed hub → bank-statement guide → scenario review. Can the borrower see that conventional income adjustments are considered, deposits are screened, expenses still matter, and a scenario request needs no SSN? | A deposit is treated as automatic income; the path forces an application before a question; the bank-decline story promises the same outcome. |
| Austin borrower with investments and limited recurring income | Homepage → HNW hub → asset-depletion guide/calculator → Adam contact. Are qualification, liquidity and eligibility distinguished, with funds needed after closing acknowledged? | “Use your assets” implies every balance counts or pledging assets equals asset depletion; a calculator result is framed as approval. |
| Austin rental owner seeking cash-out | Homepage → investor hub → DSCR cash-out guide → DSCR calculator → scenario review. Are rental cash-out and owner-occupied home equity separated, rent compared with the full property payment, and review/planning cases labeled honestly? | The user is sent to a primary-home Texas cash-out explanation, a review is described as funded, or a save/send action falsely claims delivery. |

### Assembled-source results

All three paths were inspected in `site/` on October 18, 2026. Link checks were scoped to `<main>` so the shared footer could not create a false pass for a missing contextual path.

| Test | Evidence in the assembled source | Result |
| --- | --- | --- |
| Self-employed owner | Home specialty card links to `/self-employed-mortgage-austin.html`. That hub links to conventional financing and `/bank-statement-loans.html`, including the income-calculation anchor. The bank page excludes transfers and other non-income deposits, addresses expenses and ownership, compares actual costs with conventional options, and offers a no-SSN scenario conversation and direct contact. Its Austin illustration is explicitly hypothetical: `$360,000 ÷ 12 × (1 − 0.50) × 1.00 = $15,000`. The source correctly states that this does not determine approval or a loan amount. | Pass for source flow and copy. No claim that a human completed a rendered form. |
| Asset-rich borrower | Home specialty card links to `/high-net-worth-mortgage.html`, which links contextually to `/asset-depletion-mortgage-texas.html`. That guide links to `/asset-depletion-calculator.html`. The guide distinguishes pledged collateral from assets used as qualifying income, addresses eligibility/liquidity, and calls for setting aside cash needed for closing and reserves. The calculator states its input balances are net of those set-asides; it does not claim automatically to deduct taxes, penalties or other claims. | Pass for source flow and explanation. No certification of available investor programs or calculator underwriting acceptance. |
| Rental cash-out owner | Home card links to `/investor-loans.html`; the hub has a main-content link to `/dscr-cash-out-refinance-texas.html`. The cash-out guide links to `/dscr-calculator.html` and separately directs primary-home borrowers to `/loans/refinance.html`. It describes rental/investment property, full PITIA, costs/liens and reserves. Calculator wording distinguishes rent remaining after PITIA from operating cash flow and excludes vacancy, maintenance, management and other operating costs. A ratio by itself does not promise approval. | Pass for source routing and financial boundaries. Save/delivery behavior remains a separate interaction gate; see note below. |

The homepage proof grid contains two funded cases and two explicitly labeled review/planning cases. The bank-statement case does not say that the excluded deposit was ultimately counted. The rental review does not claim funding, and the construction conversation does not claim an approved loan, closing or future recast. The actual funded case is not assigned an invented Austin location.

After the final rebuild, the footer is present in 200 of the build's 201 `.html` files. The only exception is the plain-text Google verification file, `googlea3d746ce1ceb4bff.html`. The generated package excludes the non-ledger internal tracker (`loanos.html`) and form registry (`forms.html`); their originals remain unchanged. The sampled borrower routes and complaint route each have one shared footer and no duplicate IDs. All 200 footer-bearing documents include Tiffany's retained email. Full 173-route resolution and all-page structural verification are owned by migration/code QA and are not inferred from this footer count.

**Local polish finding closed after rebuild:** the DSCR calculator now states directly in its raw HTML that saving is unavailable in this local preview and that the calculation remains on the page. The encrypted/private-link promise is absent. `preview-safety.js` also intercepts save clicks and reports that nothing was saved. This removes the misleading no-JavaScript fallback without changing calculator arithmetic. No backend or live delivery was exercised.

**Remaining publication evidence:** inherited claims such as one-business-day pre-approval, numeric program thresholds and “programs Adam currently places” require current program/availability verification. The older Kyber/HyperSmart names also remain in the inherited complaint-page body/title and elsewhere in the preserved source. These are explicitly recorded publication holds. They do not block delivery of the local build, and a footer disclaimer is not treated as resolving them.

## Verdict

**Approved as a local source artifact for continued integration and deployment testing; the local save-copy finding is closed.** The shared footer and the three borrower paths meet this source review's scope. The recorded publication holds remain. This is not a public-release compliance sign-off, rendered accessibility sign-off, successful submission test, or live deployment confirmation. The local HTTP bind was unavailable; no alternative browser workaround was attempted. No live server, recipient setting, backend or production calculator was changed by this review.
