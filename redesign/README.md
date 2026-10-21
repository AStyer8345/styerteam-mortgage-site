# Styer Mortgage private Netlify redesign preview

Branch: `preview-redesign`. Production remains on `main` at `styermortgage.com`.

The completed navy/bronze redesign and bug fixes are committed in `site/`. The
173-route architecture, exact components, calculator fixes, and prior audit
evidence are included alongside it. Netlify publishes only `redesign/site` for
this branch's preview. Source files, review reports, server functions, and
operational tools are outside that publish directory.

## Review workflow

Push this branch and use its draft pull request's Netlify Deploy Preview. Netlify
project visibility must be **Private / Previews only**. Reviewers sign in with
their Netlify team account. Do not merge the draft PR or publish its deploy to
production. Do not run a local preview or deploy to Vercel.

The Netlify build runs the preserved route, asset, syntax, eight-calculator,
contact-dialog, navigation, and preview-safety checks. `preview-build.json` on
the deployed preview records its exact commit. Runtime tests emulate DOM/native
browser behavior where documented; those tests do not certify visual rendering
or full WCAG conformance.

Review `/`, `/bank-statement-loans.html`, `/asset-depletion-calculator.html`,
`/calculators.html`, and `/resources/`. Applications open `/apply.html`, an
explicit preview gate. Inquiry forms and save-analysis actions do not transmit
or persist data. Phone, SMS, email, and calendar links remain real outbound
actions.

## Isolation and preservation

- The root production HTML, functions, hooks, routing defaults and environment
  settings are preserved. The preview plugin replaces routing and function
  directories only inside an authorized Netlify preview build.
- `site/_redirects` retains the historical page redirects and resource rewrites;
  application routes lead to the preview gate. Preview API/function paths return
  404. `site/_headers` blocks intake/network requests and search indexing.
- `components/` contains the exact authored code. `build.py` is the retained
  offline assembler, not the Netlify deployment command.
- `qa/` and `reviews/` preserve the earlier local audit as historical evidence.
  Those reports' local-only wording describes that earlier audit. This commit
  adds the subsequently authorized private Netlify review workflow.
- Preserve `adam@thestyerteam.com`, Tiffany's existing recipients, and all live
  n8n/Netlify notification routing. This preview does not configure live delivery.

The original technical content, titles, descriptions and canonical URLs remain.
Before any separately authorized production release, resolve the company/DBA
and company NMLS review items in `reviews/compliance-red-team.md`, and complete
rendered responsive and keyboard testing through Netlify.
