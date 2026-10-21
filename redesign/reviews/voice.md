# Voice guardian — local buildout

## Owned component

`components/home.html` was copied from the reviewed orchestration component and edited. No other component, source guide, or deployment was changed.

Source-copy review: **PASS** for the owned component. Integration, rendered layout, behavior, and production readiness are separate checks.

## Changes and evidence

- Preserved the approved eyebrow, H1, and subheadline.
- Kept six sections, three situation cards, four case cards, and the Adam/Tiffany role split.
- Replaced the vague situation heading with “What needs a closer look?”
- Removed “Straightforward income?” from the conventional/jumbo links. Self-employed borrowers should not infer that conventional financing is unavailable to them.
- Only **Review My Scenario** and **Apply Online** use primary button treatment. Calls, texts, booking, and reading remain secondary or text links. The application uses `/apply.html`, preserving the local application gate rather than guessing an external application URL.
- Proof badges identify topics separately from case status. The first two cases have explicit **Obstacle → Strategy → Solution** steps; the last two have **Question → Review/Planning focus → Where it stood**.
- Kept local-preview language that makes the non-submitting form and preview application step clear.

| Card | Source evidence | Copy boundary |
|---|---|---|
| 01 / Bank statements | `production-source/scenarios/self-employed-refinance-deposit-review.html`: excluded payment, expense question, CPA evidence, funded 12-month personal-statement refinance | Does not claim the disputed payment was ultimately accepted, the CPA letter alone secured approval, or a 25% factor applies to another borrower. |
| 02 / Asset depletion | `production-source/scenarios/oil-gas-royalty-asset-depletion.html`: two bank declines, verified investment/retirement assets, completed purchase | Does not imply a prior bank decline guarantees a different result. |
| 03 / Rental cash-out | `production-source/scenarios/two-rental-properties-cash-out-review.html`: separate worksheets, lower cash than requested, unresolved appraisal/lease/underwriting conditions | Labeled financing review; no “Solution” or funded result. |
| 04 / Construction | `production-source/scenarios/build-on-owned-land-before-selling.html`: initial consultation; no approved loan, closing, build, or recast established | Labeled planning conversation; no “Solution” or funded result. |

The Red Team agreed with these boundaries, specifically warning against implying that the disputed deposit was accepted or treating planning cases as approvals. Those claims are absent.

## Bank-statement benchmark additions

Use the already corrected guide and retain its technical substance. The existing calculation, expense schedules, program examples, business-history distinctions, alternative programs, FAQs, and case study remain necessary.

The benchmark calls for a calculation box and a local scenario. The existing $240,000 illustration supplies the calculation. Its current assumptions are sound as a hypothetical: $240,000 eligible deposits over 12 months, a 50% expense factor, and 100% ownership produce $10,000 per month before any further adjustments.

**Recommended local framing for that existing box, without duplicating it:**

> **Austin planning example: business deposits to qualifying income**
>
> Hypothetical illustration—not a funded client case.
>
> Assume a self-employed buyer is planning an Austin home purchase. The selected program accepts $240,000 of eligible business deposits over 12 months, applies an assumed 50% expense factor, and the buyer owns 100% of the business.
>
> $240,000 ÷ 12 = $20,000 average monthly eligible deposits.
>
> $20,000 × (1 − 50%) × 100% ownership = $10,000 monthly income in this illustration.
>
> That is an income calculation, not a loan amount or approval. The expense factor is an assumption. Credit, debts, funds, income trends, and the property still need review. For the Austin purchase, include property taxes and insurance in the payment comparison.

Retain the existing explanation that the $240,000 already excludes ineligible deposits, the complete-file caveat, and the conventional Schedule C/add-back comparison. Do not omit these to fit the box.

**Keep the genuine funded refinance separately:**

> **A funded bank-statement refinance**
>
> A homeowner receiving 1099 income needed to explain a disputed payment and document business expenses. The review used supporting payment records and a CPA expense letter. The loan funded through a 12-month personal bank-statement program, reimbursing repairs and paying off renovation-related card debt.
>
> [Read the bank-statement refinance case.](/scenarios/self-employed-refinance-deposit-review.html)

The funded case does not establish the borrower’s city. Do not label it an Austin case. The author’s Austin location is not evidence of the property location. The proposed local planning example solves that gap honestly without inventing a borrower or outcome.

## Source checks performed

- Six top-level sections, three situation cards, four case cards.
- Exactly two “Solution” labels, both on source-supported funded cases.
- Three primary controls: the two allowed actions in the hero, then only Review My Scenario in the final section. The final Apply Online link is quiet text.
- Case cards range from 50 to 63 words, including labels and links.
- Every internal homepage destination exists in the prior assembled local site. Recheck against the new build after integration.
- No changes to deep-guide technical copy were made by this agent.

## Final-section refinement

Section 6 now has exactly two white contact cards. The first contains Adam’s strategy copy, outlined Call/Text controls, and a booking link. The second contains the bronze Review My Scenario trigger, short instructions, the local-preview notice, and a quiet Tiffany coordination/email line. The former third `.scenario-start` panel was removed. Apply Online and secure-document guidance sit in a text line below the two cards. This preserves the six-section structure and can be reused on the bank-statement page.
