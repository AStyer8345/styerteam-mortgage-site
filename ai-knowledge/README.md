# Website assistant knowledge base

Only Markdown files listed in `manifest.json` may support substantive mortgage answers. Every file must retain its metadata header and remain `status: placeholder` until its claims have been reviewed by the business owner and, where appropriate, licensing or legal counsel.

`npm run validate:knowledge` rejects missing files, unsupported metadata, embedded policy-override instructions, unreviewed hard-number claims, URLs in placeholder content, and stale approved files. An approved update becomes active only after validation, review, tests, and deployment. Roll back by reverting the knowledge commit and redeploying the prior validated version.

Do not add rates, fees, approval promises, underwriting outcomes, licensing claims, states served, product availability, contact details, application links, or scheduling links without explicit review.
