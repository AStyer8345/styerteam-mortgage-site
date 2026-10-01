"""Answer-first FAQ rewrite (2026-10-01). Uses only figures already published
elsewhere on styermortgage.com, so no new unconfirmed claims enter the site."""
import re, json, html as H

def strip(s): return " ".join(H.unescape(re.sub(r"<[^>]+>", "", s)).split())

def rewrite(path, mapping):
    h = open(path).read()
    for q, a in mapping.items():
        qe = H.escape(q, quote=False).replace("'", "&#x27;")
        pat = re.compile(r'(<details[^>]*>\s*<summary>)(' + "|".join(map(re.escape, {q, H.escape(q, quote=False), q.replace("'", "&rsquo;"), q.replace("'", "&#x27;"), q.replace("'", "&#39;"), q.replace("½","&frac12;"), H.escape(q, quote=False).replace("'","&#x27;")})) + r')(</summary>)(\s*<div>)?\s*<p>.*?</p>', re.S)
        m = pat.search(h)
        assert m, (path, q)
        div = m.group(4) or ""
        h = h[:m.start()] + m.group(1) + m.group(2) + m.group(3) + div + "<p>" + a + "</p>" + h[m.end():]
    # schema
    for mm in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', h, re.S):
        if '"FAQPage"' not in mm.group(2): continue
        d = json.loads(mm.group(2)); hit = 0
        def walk(x):
            nonlocal hit
            if isinstance(x, dict):
                if x.get("@type") == "Question" and H.unescape(x.get("name","")) in mapping:
                    x["acceptedAnswer"]["text"] = strip(mapping[H.unescape(x["name"])]); hit += 1
                for v in x.values(): walk(v)
            elif isinstance(x, list):
                for v in x: walk(v)
        walk(d)
        assert hit == len(mapping), (path, hit, len(mapping))
        h = h[:mm.start(2)] + "\n" + json.dumps(d, indent=2, ensure_ascii=False) + "\n" + h[mm.end(2):]
        break
    open(path, "w").write(h)
    print(path, len(mapping))

rewrite("bank-statement-loans.html", {
 "Can a bank statement loan be used to buy or refinance?":
  'Yes. Primary-residence purchases go to 90% loan-to-value on the strongest files, and cash-out refinances to 80%, with loan amounts to $3 million to $4 million. For a rental property, also compare <a href="/dscr-loans-texas.html">DSCR financing based on the property&rsquo;s rental income</a>.',
 "Will it cost more than a conventional mortgage?":
  "Usually, yes. You pay for the documentation flexibility. It&rsquo;s worth it when your tax returns understate what the business earns; if they already support the loan, a conventional mortgage is usually cheaper. I compare both on the same day with the same assumptions.",
 "I'm a 1099 contractor. Can I qualify on my deposits?":
  'Yes. You can use 12 or 24 months of deposits, or a <a href="/1099-only-mortgage-texas.html">1099-only program</a> that starts from your gross 1099 income with a flat 10% expense factor. The 1099 route is often simpler; deposits can qualify you for more if you have other income coming in.',
 "What if I co-mingle business and personal accounts?":
  "You can still qualify. A personal account that also receives business receipts is treated as a business account, so the expense factor (50% by default) applies to the eligible deposits. Separate accounts usually qualify you for more: business money moved into a documented personal account counts at 100%.",
 "What credit score do I need?":
  "Minimum credit starts at 620 to 660, depending on the program, at reduced leverage. Stronger credit unlocks the highest loan-to-value and better pricing.",
 "How much down payment?":
  "As little as 10% down on a primary-residence purchase for the strongest files (90% loan-to-value). Lower credit, larger loans or cash-out refinances need more equity; cash-out tops out at 80% loan-to-value.",
 "How long does closing take?":
  "Pre-approval usually takes one business day once your file is complete. After that, the timeline is driven by the income review, appraisal and title. Clean statements and quick answers on large deposits keep it moving; I map the documents up front so nothing surprises you late.",
})

rewrite("dscr-loan-austin-tx.html", {
 "What are the typical DSCR loan requirements?":
  "Most purchase programs start at 20% to 25% down, with no cap on properties owned and LLC vesting allowed. Many programs prefer a ratio of 1.0 or higher (rent covers the full payment), but below-0.75 and no-ratio options exist with more equity. Expect to document credit, reserves, and a lease or appraisal rent schedule.",
 "Can I use a DSCR loan for a short-term rental in Austin TX?":
  "Yes. Eligible short-term rentals can qualify, using the program&rsquo;s accepted rent method: an appraisal rent schedule, operating history or a projection. Check local short-term-rental permitting first, since rules vary across Austin and Hill Country jurisdictions.",
 "Is a DSCR loan right for me if I'm self-employed?":
  'Often, yes, for a rental. DSCR qualifies on the property&rsquo;s rent, so write-offs on your tax return don&rsquo;t reduce the qualifying income. For a home you&rsquo;ll live in, compare <a href="/bank-statement-loans.html">bank statement loans</a> instead.',
 "What are current DSCR loan rates in Austin TX?":
  "DSCR rates change daily and depend on credit, loan-to-value, the property&rsquo;s ratio, loan amount and the prepayment period you choose. A longer prepayment period prices better; a three-year period is a common middle ground. Send the property and I&rsquo;ll price it today.",
})

rewrite("high-net-worth-mortgage.html", {
 "How does the 60- or 84-month divisor actually work?":
  "The program divides your eligible assets by a fixed number of months to create qualifying income. The programs I place use 36, 60 or 84 months; the shorter the divisor, the more income the same assets produce. Some programs use a coverage test instead: assets must equal the loan balance plus closing costs plus 60 months of your other obligations.",
 "Can I include my retirement account if I'm under 59½?":
  "Yes, at a discount. Retirement accounts count at 70% before 59&frac12;, and at 80% to 90% once you&rsquo;re past 59&frac12; and can access the funds. Cash counts at 100% and marketable securities at 80% to 90%.",
 "What's the minimum asset balance to qualify?":
  "There&rsquo;s no single published minimum; the assets have to support the payment after the program&rsquo;s divisor or coverage test. Plan for reserves too: 6 months of the housing payment through $1 million to $2 million, 9 months to $2.5 million, 12 months to $3.5 million and 18 months above $4 million.",
 "What's the rate difference versus a conventional or jumbo loan?":
  "Asset-based loans usually cost more than a conventional or jumbo loan your documented income already supports. Lower loan-to-value files price better. For borrowers with the assets but not the W-2, the alternative is usually no loan at all, so I quote both whenever the file allows.",
})

rewrite("self-employed-mortgage-austin.html", {
 "What credit score and down payment do I need?":
  'It depends on the path. On <a href="/bank-statement-loans.html">bank statement loans</a>, minimum credit starts at 620 to 660 and the strongest files buy with 10% down (90% loan-to-value). Conventional, FHA and VA follow their own published minimums when your tax returns support the loan.',
 "What is a bank statement loan and how does it work?":
  "It qualifies you on 12 or 24 months of deposits instead of tax-return income. Business deposits are reduced by an expense factor, 50% by default or as low as 10% to 15% with a qualified expense letter from your tax preparer. Transfers, loan proceeds and refunds are excluded first.",
 "What's the difference between a bank statement loan, 1099 loan, and P&L loan?":
  'Three ways to document the same business. A <a href="/bank-statement-loans.html">bank statement loan</a> averages 12 or 24 months of deposits minus an expense factor. A <a href="/1099-only-mortgage-texas.html">1099 loan</a> starts from gross 1099 income with a flat 10% expense factor. A <a href="/p-and-l-mortgage-texas.html">P&amp;L loan</a> uses a CPA-prepared profit-and-loss statement. I run all three, because the one that qualifies you for the most is rarely the one with the best rate.',
})
