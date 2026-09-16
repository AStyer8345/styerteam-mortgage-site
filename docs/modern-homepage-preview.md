# Modern homepage preview — September 16, 2026

## Scope and baseline
Based on production commit 0a46dc8 and Netlify deploy 6aa98ab4cbc0c7000869f4aa. Preview only; not published.

- Broader purchase, refinance, and investment opening with personal advisor positioning.
- Three navigation groups, financing CTA, and secure application link.
- Existing contact form identity, transport endpoints, consent, attribution, and receipt handling retained.
- Required financing goal; message and phone optional. Goal is included in normalized situation text and both submission payloads.
- Original HyperSmart technology section and positive, illustrative planning examples replace composite success claims.
- Existing specialist URLs, review evidence, application destination, and legal footer preserved.
- Backup-only confirmation accurately identifies pending primary delivery.

## Verification
- Build and form-notification audit passed (57 forms).
- All 119 general tests pass.
- Ten mocked browser cases pass across 390px and 1440px: dual acceptance, primary-only, backup-only, total failure/retry, and JavaScript-disabled native fallback.
- Browser checks verify goal-only payloads, intent, attribution, shared inquiry ID, saved receipt/reload, and no horizontal overflow or uncaught errors.
- Local links/assets exist; JSON-LD parses; git diff whitespace check passes.
- Assistant suite: 105 pass, 13 fail. The same 13 knowledge eligibility/retrieval failures reproduce on the unchanged production baseline; approved knowledge has expired. Knowledge approvals were not extended as part of this homepage work.
- Live submission, new email delivery, and conversion lift are not verified by mocked browser checks.

## Review and release
Review desktop/mobile appearance and copy before publishing. The local preview server simulates POST responses and displays a preview banner. It does not create leads or send notifications. Re-check production HEAD before release, deploy the reviewed changes, verify published pages/assets and form registration, then monitor real inquiry delivery and conversion events.
