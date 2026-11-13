# styerteam.com — Context

Current state only. Replace, don't append. Verified Nov 13, 2026.

## Read this first

* Do NOT read or use GOALS.md, or anything in `_archive/`. Outdated.
* This file replaces the old CONTEXT.md. If another file disagrees with it, this file wins.
* Do not push to production, merge into the production branch, or submit live test leads without Adam's approval.

## What the site is

Mortgage website for Adam Styer, Senior Loan Officer, NMLS #513013, licensed in Texas only. Focus: self-employed and non-QM lending (bank statement, P&L, 1099, K-1, asset depletion, DSCR, jumbo, HELOAN), plus conventional, FHA, VA, refinance.

* Live domain: https://styerteam.com
* Old domains (301 to styerteam.com): styermortgage.com, www.styermortgage.com, adamstyer.com, www.adamstyer.com
* Company: Go Rascal Inc., Company NMLS #2072896. Licensed location on file: 185 Wythe Ave, Suite A2, Brooklyn, NY 11249.

## Stack

* Static HTML / CSS / JS. No framework. Not Next.js.
* Build: `node scripts/vercel-build.mjs` → `npm run build` → output in `.site-dist/`
* Serverless functions: `api/*.js` (lead-intake, mortgage-assistant, saved-analysis, etc.)
* `vercel.json` rewrites `/.netlify/functions/:name` → `/api/:name`, so old function URLs in the front-end still work.
* Analytics: GTM `GTM-PQQ6PGLR` (GA4 + Google Ads), injected by `scripts/gtm-snippet.cjs`.

## Hosting and deploys

* Host: Vercel, team `astyer8345's projects`, project `styerteam-site` (`prj_oPet4IOgPuN9hDtBFYcfbEi3HJEg`).
* PRODUCTION BUILDS FROM BRANCH `cursor/blog-2026-11-02-refi-out-of-non-qm`, NOT `main`. `main` is behind and still has Netlify-era config. Do not set production to `main` until the live branch is merged into it.
* Last known good production deploy: `dpl_8RHRKpec9EjUvqtFvTXsnZNdXLVB`, commit `01a8acf` (Nov 9, 2026). Use Vercel Instant Rollback to return to it.
* Netlify is retired. `netlify.toml`, `_redirects` and `netlify/` are leftovers. Don't edit them; remove only in a dedicated cleanup PR.
* A Vercel Security Checkpoint challenged automated requests on Nov 13. Firewall settings not yet reviewed.

## Leads

* Forms post to `/.netlify/functions/lead-intake` → `api/lead-intake.js` → LoanOS (Supabase).
* The old Netlify Forms backup copy no longer exists on Vercel. LoanOS is the only capture path.
* Form fields: name, email, phone (optional), message/situation, how they heard, TCPA consent. Never add SSN, DOB, income or account numbers.
* Test with the form's non-PII test mode. No live submissions without Adam's OK.

## SEO / AEO setup

* `robots.txt` allows search and AI crawlers; admin pages disallowed.
* `sitemap.xml`: 189 URLs on styerteam.com.
* Every page has Organization + Person + WebSite JSON-LD. FAQPage only where the FAQ is visible on the page.
* New blog posts must be added to `blog/manifest.json`, `blog.html`, `sitemap.xml`.
* Search Console for styerteam.com: not yet set up. Last data is an Aug 2026 export for styermortgage.com in `seo-data/gsc/`.

## Writing rules

* Never "independent broker." Use "Senior Loan Officer." "Broker" is OK for SEO wording only.
* No advertised rates, guarantees, closing-time promises, or "close the loans your bank can't" type claims.
* Eligibility, rates and terms stay conditional ("depends on the program," "subject to underwriting").
* Short, direct, conversational. Not corporate.

## Brand (decided Nov 13, 2026)

* Public name: "The Styer Team, Powered by Go Rascal Inc." Legal entity: Go Rascal Inc.
* Never "Adam Styer | Mortgage Solutions LP," HyperSmart or Kyber on public pages.
* Lender access wording: "many capital partners." Never "wholesale lenders," never a specific count unless Adam gives one.

## Open decisions (Adam)

* Google Business Profile address / service area for local schema.
* Go Rascal compliance answers on the flags in the audit doc (down-payment percentages, trade name, licensed location).

## Before every release

1. `npm test`
2. `npm run typecheck`
3. `npm run seo:audit`
4. `npm run build`
5. Check the Vercel preview at 390 / 768 / 1440 px.
6. Adam approves, then merge into the production branch.

## Reference

Full audit and 90-day plan: "styerteam.com Website Audit & Growth Plan — November 2026" (Claude doc).
