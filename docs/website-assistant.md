# Website AI mortgage assistant

The public widget is progressively loaded by `script.js`. It first calls `GET /api/mortgage-assistant`; when the default-off feature flag is disabled, no widget is rendered. The browser never receives OpenAI, LoanOS, Supabase, messaging, or scheduling credentials.

## Local development

Install dependencies and run the site through Netlify’s local development environment so Functions, cookies, and Blobs are available. Copy `.env.example` into an untracked local environment file and use staging-only values. Keep `MORTGAGE_ASSISTANT_ENABLED=false` unless deliberately testing the widget.

Run:

- `npm run validate:knowledge`
- `npm test`
- `npm run typecheck`
- `npm run build`

## Knowledge administration

Only the twelve Markdown files listed in `ai-knowledge/manifest.json` can support substantive answers. Placeholder files are never retrieved. To activate content:

1. Replace placeholders with reviewed content.
2. Set `status: approved`.
3. Record review and expiration dates.
4. Obtain business review for company and product claims.
5. Obtain licensing/legal review for consent, advertising, fair-lending, privacy, and compliance claims.
6. Run validation and tests.
7. Review the exact diff and deploy to staging with the assistant still disabled.

Do not add rates, fees, approval promises, underwriting outcomes, states served, licensing statements, product availability, contact details, application URLs, or scheduling URLs without current approval. Roll back knowledge by reverting its commit and redeploying the last validated version.

## Safety behavior

The gateway scans for prohibited sensitive information before any model call, redacts again before persistence, rejects common prompt-injection patterns, and validates model output for prohibited claims. Detection is pattern-based: long numbers and dates can produce false positives, while obfuscated, image-based, international, or unusual identifiers can evade detection. Document and image uploads are intentionally unsupported.

Substantive answers require retrieved approved content and source identifiers. Greetings, disclosure, operational notices, safe errors, and escalation instructions may use fixed text. The Responses API request uses `store: false`; only redacted operational records are sent to LoanOS.

## Lead and action flow

The “Ask Adam to follow up” form collects first name, one contact method, broad intent, and timeline. It does not request credit, income, assets, purchase price, down payment, DOB, property address, or protected-class information. The visitor sees a confirmation and privacy notice before any mutation. Application, scheduling, task, and escalation operations pass through the signed LoanOS service.

Outbound email/text and live scheduling are disabled in this phase. The assistant must not claim an operation succeeded unless LoanOS confirms it.

## Staging checklist

- Populate only staging environment variables and sandbox credentials.
- Apply the LoanOS migration to staging and review normalization conflicts.
- Keep `MORTGAGE_ASSISTANT_ENABLED=false` for the initial deploy.
- Validate that no credential appears in browser assets or responses.
- Use test contacts and sandbox providers only.
- Exercise sensitive-data, injection, duplicate, replay, rate-limit, OpenAI failure, LoanOS failure, and accessibility paths.
- Enable the staging flag only after the separate staging approval.

Production enablement requires another explicit approval, approved knowledge and consent language, current company/application/scheduling details, legal/compliance review, retention approval, monitoring, rollback verification, and successful staging evidence.
