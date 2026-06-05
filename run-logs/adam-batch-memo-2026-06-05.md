# Adam Batch-Decision Memo — Suburb-Cluster Carries

**Prepared:** 2026-06-05 (styer-site-daily, Friday Content Planning + AEO rotation)
**Why this exists:** Three suburb-cluster issues have sat in carry for weeks because each is a genuine positioning/factual call only you can make — not mechanical cleanup. This consolidates all three into one decision pass with exact file lists so you can clear them in a single sitting. **Nothing below has been edited.** I need your call on each before any sweep is safe.

---

## DECISION 1 — USDA on rural suburb pages (NEW framing — this is the important one)

**The carry used to say:** "143 USDA mentions across 12 suburbs — mechanical cleanup, Round Rock playbook."
**That framing was wrong.** Today's content read shows the mentions split into two completely different classes:

### Class A — pages that PROMOTE USDA as the lead product (8 pages)
These pages lead with USDA zero-down in the hero subtitle + dedicated `<h3>/<h4>` section + FAQ ("Yes — most of X qualifies for USDA Rural Development loans"):

| Page | USDA mentions | USDA in headers |
|---|---|---|
| smithville-mortgage-lender.html | 23 | 3 |
| elgin-mortgage-lender.html | 21 | 3 |
| florence-mortgage-lender.html | 15 | 3 |
| jarrell-mortgage-lender.html | 14 | 3 |
| bastrop-mortgage-lender.html | 15 | 1 |
| san-marcos-mortgage-lender.html | 12 | 1 |
| kyle-mortgage-lender.html | 10 | 1 |
| new-braunfels-mortgage-lender.html | 7 | 1 |

### Class B — pages that STEER AWAY from USDA (honest eligibility context, low harm)
Round Rock (9), Austin Area (11), Taylor (5), Cedar Park (1) — these say "most of this area is *no longer* USDA-eligible." This is honest, helpful content that actually routes buyers off USDA. **Recommend leaving as-is.**

### The actual question
Your voice guide and CONTEXT both say **"Does NOT do: USDA loans"** / **"No USDA origination."** The deprioritized `/loans/usda.html` is correctly noindexed and out of the sitemap. **But these 8 indexed, ranking suburb pages route around that — they advertise a product you say you don't originate.** That's an accuracy/compliance question, not a tidy-up.

**Pick one:**
- **(a)** You DO broker/refer USDA in rural Central TX → the 8 pages are correct, close this carry, I'll update CONTEXT to reflect "USDA brokered in rural markets only."
- **(b)** You do NOT do USDA → these 8 pages need repositioning OFF USDA as the lead product (new lead product for rural buyers: likely conventional + acreage/construction + DPA). This is a real content rewrite — I'll need your go-ahead and it's a content-rewrite batch (currently gated by GOALS.md "no new content").
- **(c)** Keep but reframe USDA as "may be available — ask me" referral language without leading the page on it.

---

## DECISION 2 — Performance-metric claims (the GOALS.md vs voice-guide conflict)

**Root cause of why this never resolves:** your own two documents contradict each other.
- **GOALS.md** says: *"No more performance-metric marketing."*
- **Voice guide** (line 48) says: *"Same-day pre-approvals — Adam does these routinely; it's a real differentiator."*

So a sweep would either violate GOALS.md (keep the claims) or strip a differentiator your voice guide explicitly endorses (remove them). I can't safely resolve that for you.

**Live footprint (suburb cluster):** ~89 instances across 25/25 suburb pages — mostly "same-day pre-approval" and "24-hour" / "pre-approval in 24 hours." Note: **"21-day close" is already 0 sitewide** — that win condition is met. The remaining claims are the speed-of-service ones.
**Plus:** 3 headline-page title carries (homepage, /get-preapproved "24-Hour Turnaround", /hutto "Same-Day Pre-Approval") + thank-you.html lines 459/468/469.

**Pick one:**
- **(a)** Keep "same-day pre-approval" (it's true and a differentiator), but kill "24-hour turnaround" closing-style metrics → I sweep the "24-hour" variants only (~53 instances), leave "same-day."
- **(b)** Kill all speed claims sitewide → I sweep all ~89 + headlines + thank-you.
- **(c)** Keep all (voice guide wins) → I close this carry and stop re-surfacing it.

**My recommendation: (a).** It satisfies GOALS.md's intent (no metric-style marketing) while preserving the genuine, true differentiator. Replacement for "24-hour turnaround" in titles → "Fast Pre-Approval" or drop the clause.

---

## DECISION 3 — Organic funnel architecture (0 tracked-LP links)

**State:** 34 surfaces (8 loan-type cluster + 25 suburbs + homepage) have **0 links to `/get-preapproved` or `/refinance-quote`.** All organic traffic routes through `/scenarios.html` and `/contact.html` instead. This is by design (your 2026-05-28 scenarios architecture) — it's not a bug. The cost is that organic visitors never hit the Google-Ads-attributed landing pages.

**The question isn't "should suburbs link to tracked LPs" — it's:**
- **(a)** `/scenarios.html` is the canonical organic LP → leave it, accept that tracked LPs are paid-traffic-only. Close carry.
- **(b)** Tracked LPs should ALSO be surfaced on organic pages for attribution coverage → I add `/get-preapproved` + `/refinance-quote` links to the cluster (mechanical, ~34 pages, ZERO risk once you say go).

---

## What I can do the moment you answer
- Decision 1(b) or 2(a)/(b) or 3(b) → I execute the sweep with consistent cluster-wide handling in one commit each.
- Any "(a)/keep/close" answer → I retire the carry from CONTEXT.md and stop re-surfacing it (kills weeks of carry noise).

Reply inline (e.g. "1=b, 2=a, 3=a") and I'll act on the next run.
