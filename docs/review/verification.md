# Reproducing the checks

Use Node 24 and Python 3.12 or later. Install npm dependencies with `npm ci --ignore-scripts`. Install the optional Python maintenance dependencies with `python3 -m pip install -r scripts/schema-requirements.txt` (prefer a virtual environment).

```sh
python3 scripts/sync-structured-data.py --check
python3 scripts/verify-business-schema.py
node scripts/audit-structured-data.mjs
NODE_OPTIONS="--require=$PWD/scripts/test-no-network.cjs" node --test --test-reporter=tap tests/*.test.js
NODE_OPTIONS="--require=$PWD/scripts/test-no-network.cjs" node_modules/.bin/tsx --test --test-reporter=tap tests/assistant/*.test.ts
```

The committed network guard rejects unmocked fetch, HTTP(S), and socket connections. Test fixtures can install their own stub transports. The main JavaScript suite has known failures; run the assistant suite separately because `npm test` joins the suites with `&&`.

`config/business-entities.json` is the shared identity source. To regenerate static JSON-LD after changing visible FAQs or the identity source, run `python3 scripts/sync-structured-data.py`. Its `--check` mode makes no changes. It handles the four legacy Python-list FAQs and uses the full displayed specialist answers. `verify-business-schema.py` separately checks visible-text evidence, JSON parsing, identities, addresses, FAQ parity, required specialty nodes, and banned wording. The maintenance requirements are not needed by the deployed static site.

The server page builders use `netlify/functions/lib/business-schema.js` and the same identity JSON. They reference the shared author and organization and do not publish supplied numerical rate/APR table values.

Browser evidence was collected with Chromium 151 and axe-core 4.10.3 against local static files. All external browser requests were blocked; every non-GET request was stubbed. The audit waited for the delayed homepage stylesheet and fonts before running axe. At each viewport, sequential Tab navigation checked whether a fixed header or bottom bar covered the focused control. Closed accordions and menus are excluded from the normal Tab sequence; the evidence does not claim exhaustive manual WCAG certification.

The form comparison tested direct valid submission and invalid-then-corrected submission on contact, bank-statement, and self-employed pages in production base, PR #43, and this branch. Primary and backup payloads matched after excluding the variable first-touch timestamp. Every form element and complete form HTML also remains byte-identical to PR #43 across all changed pages.

Schema Markup Validator checks use its code-validation endpoint with JSON-LD only, rather than a deployed URL. No form HTML, lead payload, private information, or real lead endpoint is submitted. Results and input hashes are recorded in `external-validator-results.json`.

Vercel Git deployments are disabled only for `fix/consistent-compliant-schema` in both `vercel.json` and its generator. No deployment/build command or IndexNow submission was run.
