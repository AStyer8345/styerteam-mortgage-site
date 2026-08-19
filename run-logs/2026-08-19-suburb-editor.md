# styer-suburb-editor-daily — 2026-08-19

**Round 5, #8 — `liberty-hill-mortgage-lender.html`** (last touched 2026-06-29, R4)
Next run: **#9 `manor-mortgage-lender.html`**

## Preflight
- `GOALS.md` checked — `styer-suburb-editor-daily` is on the **Keep running** list (content freeze lifted 2026-06-06). No conflict, proceeded.
- Tree arrived with **52 unrelated stale/concurrent entries**, diagnosed by the 2026-08-19 styer-site-daily run as a stale ~08-06 checkout overlay. `liberty-hill-mortgage-lender.html` was **not** among them, so no drift to resolve. Staged my 4 files by explicit path and left the overlay untouched.

## Headline: this was a correctness run first, a content run second

The page was serving a **market claim that had reversed sign**. It presented `+11.0% YoY` and a `$500,000` April median as current; Redfin 78642 now reads **$491,049 / −4.6% YoY / 107 DOM** for June 2026.

The bigger problem was structural. **`8.0 months of supply` was load-bearing** — it justified the "buyer's market" framing in the `FAQPage` schema, the `MortgageBroker` description, the leverage paragraph, Step 4, and the body. Supply is now **5.9 months (April 2026)**, which crosses the 6.0 balanced-market line. So this wasn't a stat refresh; it invalidated a claim repeated in **6 places, two of them inside structured data Google consumes directly**. All six corrected together, and the page now *names* the reversal instead of silently swapping numbers.

## Method note — the spec's dedup instruction has a blind spot

The task says to `grep` for verbatim duplicates before cutting. Exact-match grep across the 24 other suburb pages returns **only the shared footer and trust strip** — it reports the page as clean.

The duplication is real but **parameterized**: identical sentences with a city name and price swapped. Normalizing city names and numerics to placeholders, then running `difflib` similarity, moved **Step 2 from "no match" to verbatim-on-7-pages** and Step 3 to verbatim-on-6. Both de-templated. Post-edit rescan: **0 templated body dupes**, blocks 50 → 66.

Worth carrying forward to future runs — the literal grep measures the wrong thing.

## Differentiated insight — the MUD spread beats the rate

**North San Gabriel MUD #1 = $0.950000/$100** in Lariat, **more than double the entire City of Liberty Hill rate**, against **Clearwater Ranch 1.727171%** (no MUD) and **Butler Farms 2.1966%**. ~92bp inside one city and one ISD — **$317/mo on a $400K valuation**, roughly $50K of borrowing power at a stated 6.5% assumption. Replaced the page's old hand-wave, "ESD/MUD overlays: vary by parcel."

This connects to a structural fact new to the page: **~16,000 people live inside city limits vs ~87,000 in the ETJ**. Most Liberty Hill addresses aren't in the city — which is why parcels carry no city line but a large MUD line, and why two homes under the same community name carry very different payments.

## What I refused to publish
- **Lariat fact sheet's headline total (2.651843%)** — its own components sum to 2.696172% (silently drops the FM-RD line), and it carries pre-Prop A LHISD 1.226900 + prior county 0.399999. Published only the MUD component, with all three defects disclosed on-page.
- **Sitterle Homes citation** — 403, cut rather than shipped behind an unverifiable link.
- **Bar W Ranch** (mailing ZIP is 78641, not 78642), **Liberty Parke** (no fetchable builder source), **Legacy Ranch Middle** (no rating published yet), **Clearwater "1-acre lots"** (aggregator-only), **$3,506 statewide insurance average** (~27% inflated by Gulf Coast wind — used the Williamson County $2,758 instead).

## Verification
- **4/4 JSON-LD blocks valid**; HTML tag-balanced via parser check
- **23/24 new source URLs return HTTP 200** (24th cut)
- **TDI title formula verified directly against TDI's own worked example**, not reused from prior-run precedent
- meta description 163 → **153 chars**; title 60 chars
- `dateModified` + sitemap `lastmod` → 2026-08-19

## Caveats for the next run
- **Dev-server preview is blocked in unattended sessions** — render verification deferred to the live Netlify deploy. Confirm the page renders before assuming this run is fully closed.
- One research agent **died on an API error** mid-run and was relaunched narrowly scoped. Two additional agent results arrived that this session did not launch (2026 loan limits, Texas insurance premiums) — both verified against primary sources and used. Worth checking whether an earlier orphaned run is still firing.
- Neuhaus **discontinued the Liberty Hill monthly series after April 2026**. Future runs need a different Liberty Hill–specific supply source; Williamson County via Unlock MLS is the current proxy.
