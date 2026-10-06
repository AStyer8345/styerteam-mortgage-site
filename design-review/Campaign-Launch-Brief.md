# Campaign integration and morning review

Status: reviewable local proposal. No campaign activated, spend approved, live analytics changed or release attempted.

## Review sequence

1. Open `http://127.0.0.1:8767/` for the broad company design.
2. Open `http://127.0.0.1:8767/dscr-cash-out-refinance-texas.html`. Change payoff, current payment, proposed rate, costs and target cash. Compare the full replacement payment, not just cash proceeds. Attach the estimate, inspect every assumption and edit/remove it. Loopback inquiries are blocked.
3. Open `http://127.0.0.1:8767/__review/campaign/` for evidence, three matching ad concepts, existing landing destinations, staged budget proposal and snapshot inspection. Dashboard is internal and not packaged for publication.
4. Review Cashout-Preview-Verification.md and the final morning report when the remaining sitewide re-audit is finished. This checkpoint alone is not a launch recommendation.

## Evidence and proposed scope

The controlling research is `_deliverables/2026-10-04-actual-keyword-data-and-ranking.md` in the primary repository, read only. Texas Planner ranges, September 2025–August 2026, retrieved October 4: broad DSCR 1,000–10,000 monthly; DSCR cash-out 10–100; bank statements 100–1,000; asset depletion 10–100. Historical top-of-page bid ranges are bidding context, not expected CPC or funding economics. Sparse Austin cash-out bid data is unknown, not zero. The existing GSC asset-calculator observation (3 clicks/55 impressions, Sept 4–Oct 1) is historical organic evidence, not lead quality.

Proposed monthly ceilings remain $1,800 DSCR, $900 self-employed and $300 assets, all unapproved. Start with the specific DSCR cash-out journey only after measurement and business gates; do not force the full monthly ceiling if qualified demand is sparse. Add bank statements later; keep assets demand-limited. No forecast of inquiries or funded loans without account/CRM evidence. No replacement of the company homepage with a paid-campaign pitch.

Ad assets are saved in Campaign-Ad-Assets.json and rendered in the internal dashboard. DSCR headline position 1 preserves rental cash-out intent in every combination. Headlines/descriptions/path segments/sitelinks pass character-limit checks; this is not Google approval or an exact Google rendering.

## Required gates and explicit approvals

Before any public release: finish the full scoped design/SEO/AEO preservation audit; Adam verifies current legal company/DBA/individual disclosures, service geography and actual lender access; review original and new lending claims against available program evidence. Keep protected forms, routing, consent, stable inquiry ID, source/UTMs and known destinations. Use a clean isolated release checkout with the tested commit; reconcile the dirty primary separately without resetting it.

Deployment is a separate explicit approval. After a release is authorized, verify the ready deployment matches the tested commit and conduct a specifically authorized controlled inquiry from ad/landing through capture, deduplicated record, notification and CRM. Local tests cannot substitute for this chain. Verify typed click-ID persistence (gclid/gbraid/wbraid), attribution across navigation/return visits and privacy/consent behavior before importing offline outcomes.

Campaign activation and spending require a separate explicit approval of account, exact campaigns/keywords/negatives, geography, schedule, bidding controls and monetary ceiling. Current platform financial/housing targeting rules must be checked at activation; this document does not approve targeting or advertise guaranteed eligibility.

Track spend → unique legitimate inquiry → human-qualified scenario → application → lock → funded loan → actual retained revenue, with cohort dates/age, denominators and invalid/duplicate dispositions. Report calculator use separately. It proves engagement, not eligibility or lead quality. No fabricated conversion values, signed-in analytics claims or assumed funded revenue.

## Primary references reviewed

- https://www.consumerfinance.gov/owning-a-home/closing-disclosure/ — general cost/prepaid definitions; not proof of business-purpose disclosure applicability.
- https://corr.pennymac.com/assets/documents/non-qm-resources/Non-QM_DSCR.pdf — lender-specific profile, not proof of Adam's access or offer.
- https://support.google.com/google-ads/answer/7684791?hl=en — responsive search ad structure; final platform/policy review remains necessary.
