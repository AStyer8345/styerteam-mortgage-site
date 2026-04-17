# Suburb Page Audit — Phase 0 Output

**Date:** 2026-04-16
**Pages analyzed:** 24 `{city}-mortgage-lender.html` files (excludes hub page `austin-area-mortgage-lender.html`)
**Purpose:** Baseline content uniqueness, identify rewrite priorities, confirm hypothesis for Google "Discovered – currently not indexed" status.

---

## Key finding — hypothesis was partially wrong

Going in, the assumption was the 76 "Discovered not indexed" pages were content-thin (too much shared sentence-level boilerplate across pages). Audit says otherwise:

- **Average unique content:** 80.0%
- **Average literal boilerplate** (sentences appearing on 12+ pages): **7.1%**

The pages actually have plenty of city-specific prose. What they share is **structural skeleton**, not text.

## The real problem — H2 / section template

| Count of 24 pages | Shared H2 pattern |
|---|---|
| 13/24 | "Loan Options for {CITY} Buyers" |
| 13/24 | "Ready to Buy in {CITY}?" |
| 11/24 | "How to Get Pre-Approved for a {CITY} Home" |
| 11/24 + 11/24 | "{CITY} Mortgage FAQ" / "{CITY} TX Mortgage FAQ" (22/24 combined) |
| 10/24 | "Why {CITY} Buyers Work With an Independent Broker" |

Even when the body text is unique, Google's quality classifiers see **an identical outline** across the 24 URLs. Pattern recognition on structure, not text. That's the programmatic-content signal.

**Revised Phase 1 priority:** structural variation > more unique body text. The pages don't need more words; they need different shapes.

## Ranked priority table (worst → best ratio of unique-to-total)

Ordered by `unique_pct` ascending = pages that most need rebuilding appear first.

| Rank | Slug | City | Words | Boiler % | Unique % |
|---:|---|---|---:|---:|---:|
| 1 | round-rock | Round Rock | 1188 | 10.0% | 47.8% |
| 2 | kyle | Kyle | 1256 | 9.5% | 54.3% |
| 3 | san-marcos | San Marcos | 1168 | 8.9% | 58.7% |
| 4 | new-braunfels | New Braunfels | 1180 | 10.1% | 73.5% |
| 5 | manor | Manor | 1320 | 9.0% | 73.5% |
| 6 | taylor | Taylor | 1246 | 9.6% | 75.2% |
| 7 | bastrop | Bastrop | 1235 | 9.6% | 77.5% |
| 8 | dripping-springs | Dripping Springs | 1299 | 9.2% | 80.1% |
| 9 | bee-cave | Bee Cave | 1383 | 8.6% | 80.4% |
| 10 | jarrell | Jarrell | 1301 | 7.5% | 81.1% |
| 11 | liberty-hill | Liberty Hill | 1391 | 8.6% | 82.0% |
| 12 | florence | Florence | 1361 | 4.3% | 82.8% |
| 13 | lakeway | Lakeway | 1412 | 8.4% | 85.6% |
| 14 | smithville | Smithville | 1314 | 4.4% | 86.1% |
| 15 | cedar-park | Cedar Park | 1159 | 9.3% | 86.4% |
| 16 | pflugerville | Pflugerville | 1699 | 5.7% | 86.8% |
| 17 | elgin | Elgin | 1392 | 4.2% | 87.1% |
| 18 | georgetown | Georgetown | 1693 | 5.7% | 87.2% |
| 19 | marble-falls | Marble Falls | 1412 | 4.1% | 87.7% |
| 20 | leander | Leander | 1590 | 6.1% | 88.4% |
| 21 | buda | Buda | 1151 | 3.0% | 90.5% |
| 22 | westlake | Westlake | 1045 | 3.3% | 92.3% |
| 23 | spicewood | Spicewood | 1239 | 4.7% | 92.5% |
| 24 | smithville | (see 14) | | | |

**Note on Round Rock being worst on unique %:** this is because Round Rock's content overlaps heavily with 2-3 other similarly-sized cities (Kyle, San Marcos, Pflugerville). The literal sentences aren't on 12+ pages so they don't show as "boilerplate," but they're duplicated across small clusters of cities.

## Tier 1 rebuild priorities (confirmed with Adam 2026-04-16)

Six cities, locked in:

| Order | City | Current unique % | Words | Notes |
|---:|---|---:|---:|---|
| 1a | Round Rock | 47.8% | 1188 | Worst uniqueness score; highest search volume; rebuild first |
| 1b | Cedar Park | 86.4% | 1159 | Lower words, needs depth |
| 1c | Leander | 88.4% | 1590 | Good baseline, needs structural variation |
| 1d | Georgetown | 87.2% | 1693 | Strongest baseline, minor rework |
| 1e | Pflugerville | 86.8% | 1699 | Strong baseline |
| 1f | Dripping Springs | 80.1% | 1299 | Needs structural variation + depth |

## Kill list (confirmed with Adam 2026-04-16)

Five pages to merge into one `small-town-central-texas-mortgages.html` page in Phase 2:

- florence-mortgage-lender.html
- smithville-mortgage-lender.html
- jarrell-mortgage-lender.html
- spicewood-mortgage-lender.html
- elgin-mortgage-lender.html

All five will 301 to the merged page. Update sitemap. Remove from navigation.

## What Phase 1 must actually do — revised based on audit

For each Tier 1 city, rebuild needs all four:

### 1. Structural variation (highest leverage)

No two Tier 1 pages should have the same H2 outline. Current shared H2s are the smoking gun. Options per city:

- Round Rock → lead with "Round Rock's Teravista vs Forest Creek: Two Different Loan Conversations"
- Cedar Park → lead with "Why Leander ISD Premium Changes Your Mortgage Math"
- Leander → lead with "Buying New Construction in Leander: What Builder Lenders Don't Tell You"
- Georgetown → lead with "Georgetown Water District and MUD Taxes: How They Affect Your DTI"
- Pflugerville → lead with "Pflugerville Property Tax Rate and Why It Changes Your Pre-Approval"
- Dripping Springs → lead with "Dripping Springs Well Water, Septic, and Rural Loans: What to Check Before You Close"

Each outline genuinely different, not just city-substituted.

### 2. Fresh data block (freshness signal + unique value)

Add a "**{City} Market Snapshot — {Month} 2026**" block to each page:

- Median home price (last 30 days)
- Average days on market
- Active inventory count
- Property tax rate (ISD + city + county combined)
- Month-over-month rate movement

Source: Austin Board of Realtors monthly reports. Scheduled monthly update via Phase 3.

### 3. Named-neighborhood depth (true local authority)

3-5 real neighborhoods per city with:
- Price range
- Typical loan type profile (jumbo? conventional? FHA territory?)
- HOA or MUD district notes
- Flood zone flags where relevant
- New construction vs resale ratio

### 4. One real closed-loan story per city

2-3 sentences. Scrubbed for privacy (initials, general price range). Hardest content for AI/scraper to duplicate, strongest E-E-A-T signal.

---

## Files produced

- `_deliverables/suburb-audit.py` — the audit script (re-runnable)
- `_deliverables/suburb-audit-data.json` — machine-readable audit data (for Phase 4 comparison)
- `_deliverables/suburb-audit.md` — this report

## Phase 4 comparison

Re-run `python3 _deliverables/suburb-audit.py` after Phase 1 completes. Expect:
- Average boilerplate %: **~7% → <3%** (structural text removed)
- Average unique %: **80% → >88%**
- H2 duplication: no pattern on more than 3/24 pages

If those targets aren't hit after Phase 1, Phase 2 structural rework gets more aggressive.
