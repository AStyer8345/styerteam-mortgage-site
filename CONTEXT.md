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
* Analytics: GTM `GTM-PQQ6PGLR` (GA4 + Google Ads). The snippet is inline in every page; `scripts/gtm-snippet.cjs` is the source of truth. GTM loads 2.5 s after window load or on first interaction; thank-you pages load it at once. It only runs on styerteam.com, so previews and local builds never load it.
* CSS: the build (`scripts/optimize-published-assets.mjs`) minifies CSS, inlines first-screen rules on interior pages and loads the full bundle without blocking. Edit source CSS as usual.

## Hosting and deploys

* Host: Vercel, team `astyer8345's projects`, project `styerteam-site` (`prj_oPet4IOgPuN9hDtBFYcfbEi3HJEg`).
* Production is built from branch `cursor/blog-2026-11-02-refi-out-of-non-qm`, NOT `main`. `main` is behind and still has Netlify-era config. Do not set production to `main` until the live branch is merged into it.
* A push to that branch only builds a preview. Going live takes an explicit production deployment of the commit (Vercel dashboard "Redeploy to Production", or a production deployment through the Vercel API). Do not promote a preview build: previews run with `VERCEL_ENV=preview`, and lead intake treats that as a test environment.
* Rollback target (last deploy before the November audit work): `dpl_8RHRKpec9EjUvqtFvTXsnZNdXLVB`, commit `01a8acf` (Nov 9, 2026). Use Vercel Instant Rollback to return to it.
* Netlify hosting is retired. `netlify.toml` and `_redirects` are leftovers that still feed `vercel.json`. Don't edit them; remove only in a dedicated cleanup PR. `netlify/functions/` is live (see Release in progress).
* A Vercel Security Checkpoint challenged automated requests on Nov 13. Firewall settings not yet reviewed.

## Release in progress (Nov 2026 audit)

* Integration branch: `release/2026-11-audit`, cut from production commit `01a8acf`. Each phase gets its own branch off it.
* All six audit phases and the simpler-style work (`design/simplify`) are LIVE as of Nov 13, at Adam's direction. The 16 suburb pages Phase 4 retired were restored first; they stay live as landing pages but are not linked from the homepage. Phase 5's dataLayer events (`form_start`, `form_submit`, `call_click`, `text_click`, `calendly_click`, `apply_click`) still need triggers and GA4 tags in the GTM container. Every production push still needs Adam's approval.
* Homepage styles for the rebuilt sections live in `<style id="homepage-v2">` in `index.html`. They use `#who-i-help` and `#programs` prefixes on purpose, to outrank older rules in `assets/homepage.css`.
* Simpler style pilot: branch `design/simplify` (off the release branch), preview only. `simple.css` restyles any page with `<body class="simple">`; so far `self-employed-mortgage-austin.html` and `dscr-loan-austin-tx.html`. The homepage uses `<body class="simple-home">` (short menu only) plus `v3` rules in its `homepage-v2` style block, with the contact form in the hero. The short menu is CSS only; the real menu and footer markup are unchanged. Copy rule from Adam: speak to the borrower's situation, not the program name, above the fold.
* Rollout branch `design/rollout` (preview only): every page loads `simple.css`. `<body class="simple">` = full new look (program-layout pages), `simple-nav` = menu plus a lite layer (older layouts), `simple-home` and `simple-calc` = homepage and calculators. New pages should carry one of these classes and the `simple.css` link after `a11y.css`. The page builders in `netlify/functions/lib/` do not yet.
* Test gate, agreed Nov 13: no new failures versus `01a8acf`. That commit fails 32 of 202 tests; those are still open. `npm run seo:audit` is clean on the Phase 4 branch.
* Run the build locally as `CONTEXT=deploy-preview npm run build`. A bare `npm run build` can submit URLs to IndexNow.
* Retired pages: `scripts/retired-pages.json` lists pages kept in the repo but left out of the public build, each with one 301. It holds the 10 `rates/` and 10 `updates/` pages, 23 preserved guides and 2 Hill Country DSCR pages (45 in all). Never link to a retired URL; a test fails if a public page does. A new rate page is published normally unless it is added to that list.
* `api/*.js` loads its handlers from `netlify/functions/`, so that folder is live code, not a leftover. Only `netlify.toml` and `_redirects` are Netlify-era config, and `scripts/vercel-config.mjs` still reads both to build `vercel.json`.

## Leads

* Forms post to `/.netlify/functions/lead-intake` → `api/lead-intake.js` → LoanOS (Supabase).
* The old Netlify Forms backup copy no longer exists on Vercel. LoanOS is the only capture path.
* Form fields: name, email, phone (optional), message/situation, how they heard, TCPA consent. Never add SSN, DOB, income or account numbers.
* Test with the form's non-PII test mode. No live submissions without Adam's OK.

## SEO / AEO setup

* `robots.txt` allows search and AI crawlers; admin pages disallowed.
* `sitemap.xml`: 165 URLs on styerteam.com. `lastmod` comes from git: run `npm run seo:lastmod` after committing page changes.
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
