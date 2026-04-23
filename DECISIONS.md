# styermortgage.com — Decisions

## [2026-04-16] — Rate-check form uses JSON + base64 PDF, not multipart

**Chose:** Form serializes fields as JSON and base64-encodes the PDF before POSTing to the n8n webhook.
**Over:** Native `FormData` / multipart/form-data (the obvious, standard approach for file uploads).
**Why:** n8n's webhook node (both v2 and v2.1) has a broken multipart parser. Testing showed it reliably parses only the first 3 form fields and then mashes everything after — including subsequent text fields AND the file — into a single corrupted binary blob labeled with whatever field name came 4th. This made the notification email useless and would have caused silent data loss on every submission.
**Trade-off:** Slightly larger request payload (base64 inflates binary by ~33%). For typical Loan Estimate PDFs (200KB–1MB) this is a non-issue. On the n8n side, one extra Code node ("Decode PDF") rehydrates the base64 back into a proper `application/pdf` binary for the email attachment.
**Context:** If n8n ever fixes its multipart parser, or if we switch lead capture to a different backend (Supabase Edge Function, Netlify Function), this can be revisited. Until then, JSON + base64 is the reliable path.

## [2026-04-16] — `neverError: false` on all Supabase HTTP nodes in n8n

**Chose:** Let Supabase HTTP node errors fail the workflow and surface in execution history.
**Over:** `neverError: true`, which swallows HTTP 4xx/5xx and reports the execution as successful.
**Why:** The rate-check workflow had `neverError: true` on both its Supabase inserts. NOT NULL constraint violations on `user_id` / `organization_id` were returning 400s that never bubbled up — the workflow reported success while nothing was landing. Found it only by testing with my personal Gmail and noticing no notification, then inspecting the raw HTTP response in execution data.
**Rule going forward:** `neverError` stays off on every Supabase-backed workflow. If a real use case needs tolerance for a single failed insert (e.g., a fan-out where one row can fail without killing the rest), use a dedicated error-handling branch instead of silencing the error globally.

## [2026-03] — Static HTML, No Framework

**Chose:** Vanilla HTML/CSS/JS with no build step.
**Over:** React, Next.js, or any SPA framework.
**Why:** Zero runtime overhead, instant page loads, no framework lock-in. Netlify serves raw files. Content pages don't need client-side routing.

## [2026-03] — Netlify for Hosting + Functions

**Chose:** Netlify with serverless functions (Node.js + esbuild).
**Over:** Vercel, Cloudflare Pages, or self-hosted.
**Why:** Native form handling, edge redirects via `_redirects`, function bundling with zero config. Content generation functions (newsletter, rate updates, realtor content) run as serverless endpoints.

## [2026-03] — Google Ads Conversion on thank_you_page_view Only

**Chose:** Single conversion event fires on /thank-you page load.
**Over:** Counting `generate_lead` as a conversion (which fires on every form submit).
**Why:** Google Ads optimizes bidding around conversions. Counting every form submit (including suburb quick-forms that don't redirect to /thank-you) would inflate conversion numbers and degrade Smart Bidding.
**Context:** This means suburb quick-form submissions are tracked in GA4 but NOT counted as Google Ads conversions. Known trade-off.

## [2026-03] — Landing Pages: Stripped Nav (Logo Only)

**Chose:** /get-preapproved, /refinance-quote, /thank-you show logo only — no site navigation.
**Over:** Full nav on all pages.
**Why:** Conversion optimization — remove exit paths from ad-driven traffic. Once someone is on a lead capture page, the only actions should be: fill the form, call, or book Calendly.

## [2026-03] — AEO Answer-First Paragraphs

**Chose:** Bold `<strong>` answer-first paragraph before the first H2 on every content page.
**Over:** Standard intro paragraphs or jumping straight to H2 sections.
**Why:** AI search engines (Perplexity, Google AI Overview) extract the first definitive statement. A bolded 50-60 word paragraph that directly answers the page's target query gets pulled as a citation.

## [2026-04] — Content Distribution: Two-Tier Auto-Post

**Chose:** Every website content piece auto-distributes twice — Tier 1 (immediate social post via Publer) and Tier 2 (platform-native post 2-3 days later).
**Over:** Manual social posting or single-distribution.
**Why:** Maximizes content ROI. Tier 1 gets fast visibility. Tier 2 adapts format (carousels, Reels) for each platform's algorithm.

## [2026-04-23] — LoanOS is the CRM of record

**Chose:** LoanOS (loanos.html in `AStyer8345/loanos` repo, backed by Supabase project `uuqedsvjlkeszrbwzizl`) as the single source of truth for all contacts, leads, and loan lifecycle data.
**Over:** Salesforce (legacy), Arive (LOS only), or raw Supabase tables as primary record.
**Why:** LoanOS was already being used as the working CRM before this decision was formally logged. Salesforce is decommissioned — no new contacts go there. Arive remains the LOS for pricing, disclosures, and AUS submissions but is not a contact or relationship system. Supabase powers LoanOS under the hood so it IS the data layer, but LoanOS is the record-of-truth interface. All n8n workflows (new-app, contract-received, pre-approval, CD, review-request) log activity to Supabase via LoanOS tables.
**Context:** Decision prompted by fragmentation audit (styer-p3-15): contacts lived in 4 systems depending on lifecycle stage. Commit: LoanOS is authoritative. Other systems sync to it or are reference-only. Salesforce references in any config/docs are legacy and should not be followed.
