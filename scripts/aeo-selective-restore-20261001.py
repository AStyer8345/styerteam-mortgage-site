"""Selective AEO restore for styermortgage.com specialty pages (2026-10-01).

Restores what the 9/15-9/18 rewrite removed that answer engines cite:
  - Austin/Texas relevance and direct answers in titles + meta descriptions
  - High-intent FAQ questions that were cut (visible <details> + FAQPage schema)
  - DSCR: Austin/Central Texas depth (sub-markets, DSCR vs conventional, docs, LLC)
Answers are rewritten from facts already on the live site where possible so they
don't contradict the rewrite's factual corrections. Detail stays behind
click-to-expand blocks per Adam's standing rule. Nothing is removed.
"""
import json, re, html, sys
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")


def esc(s):
    return html.escape(s, quote=True)


def set_meta(path, title, desc):
    p = ROOT / path
    h = p.read_text()
    t, d = esc(title), esc(desc)
    n = 0
    for pat, rep in [
        (r"<title>.*?</title>", f"<title>{t}</title>"),
        (r'(<meta name="description" content=")[^"]*(">)', rf"\g<1>{d}\g<2>"),
        (r'(<meta property="og:title" content=")[^"]*(">)', rf"\g<1>{t}\g<2>"),
        (r'(<meta property="og:description" content=")[^"]*(">)', rf"\g<1>{d}\g<2>"),
        (r'(<meta name="twitter:title" content=")[^"]*(">)', rf"\g<1>{t}\g<2>"),
        (r'(<meta name="twitter:description" content=")[^"]*(">)', rf"\g<1>{d}\g<2>"),
    ]:
        h, c = re.subn(pat, rep, h, count=1, flags=re.S)
        n += c
    assert n == 6, f"{path}: only {n}/6 meta tags replaced"
    p.write_text(h)


def strip_tags(s):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", "", s)).split())


def add_faqs(path, after_summary, faqs, style):
    """Insert FAQs after the <details> whose summary is `after_summary`,
    and append the same Q&A to the page's FAQPage schema."""
    p = ROOT / path
    h = p.read_text()
    # visible
    start = h.index(f"<summary>{after_summary}</summary>")
    end = h.index("</details>", start) + len("</details>")
    if style == "ci":
        blocks = "".join(
            f'\n<details class="ci-faq"><summary>{esc(q)}</summary><div><p>{a}</p></div></details>'
            for q, a in faqs)
    else:  # dscr
        blocks = "".join(f"<details><summary>{esc(q)}</summary><p>{a}</p></details>" for q, a in faqs)
    h = h[:end] + blocks + h[end:]
    # schema
    m = None
    for mm in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', h, re.S):
        if '"FAQPage"' in mm.group(2):
            m = mm
            break
    assert m, f"{path}: no FAQPage schema"
    data = json.loads(m.group(2))

    def find(x):
        if isinstance(x, dict):
            if x.get("@type") == "FAQPage":
                return x
            for v in x.values():
                r = find(v)
                if r: return r
        elif isinstance(x, list):
            for v in x:
                r = find(v)
                if r: return r
    faqpage = find(data)
    existing = {q["name"] for q in faqpage["mainEntity"]}
    for q, a in faqs:
        assert q not in existing, f"{path}: duplicate FAQ {q}"
        faqpage["mainEntity"].append({"@type": "Question", "name": q,
                                      "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}})
    new = "\n" + json.dumps(data, indent=2, ensure_ascii=False) + "\n"
    h = h[:m.start(2)] + new + h[m.end(2):]
    p.write_text(h)


def insert_before(path, marker, block):
    p = ROOT / path
    h = p.read_text()
    assert h.count(marker) == 1, f"{path}: marker not unique"
    p.write_text(h.replace(marker, block + "\n" + marker))


# ---------------------------------------------------------------- DSCR (Austin)
set_meta("dscr-loan-austin-tx.html",
         "DSCR Loans in Austin & Texas | No-Ratio & Below 0.75 | Adam Styer",
         "Austin DSCR loans qualify on the rental's income, not your tax returns. Purchase, refinance and cash-out, including below-0.75 and no-ratio options. NMLS #513013.")

DSCR_AUSTIN = """<section class="dscr-section dscr-soft" id="austin-dscr"><div class="container"><p class="dscr-kicker">Austin &amp; Central Texas investors</p><h2>DSCR financing in Austin and Central Texas.</h2><p class="dscr-lead">Austin is my home market. A Round Rock rental, a downtown condo and a Hill Country short-term rental don&rsquo;t underwrite the same way, so the review starts with the property, not your tax return.</p><div class="dscr-faq">
<details><summary>How Central Texas sub-markets underwrite differently</summary><ul>
<li><strong>Core Austin and inner-loop neighborhoods:</strong> long-term rentals and downtown condos. HOA rules, condo warrantability and the appraisal rent schedule drive the outcome more than purchase price.</li>
<li><strong>Round Rock, Pflugerville, Georgetown:</strong> suburban single-family rentals where property taxes, insurance, the rent schedule and lease terms move the ratio.</li>
<li><strong>San Marcos and Kyle:</strong> student-adjacent rentals near Texas State where market-rent schedules, lease terms and lease-up timing need property-specific review.</li>
<li><strong>New Braunfels and Comal County:</strong> lifestyle and vacation rentals near Gruene and the river. Short-term-rental licensing varies by jurisdiction.</li>
<li><strong>Hill Country (Dripping Springs, Wimberley, Fredericksburg, Spicewood):</strong> short-term rentals where the approved rent source, seasonality, licensing, property systems and insurance need careful review. See the <a href="/dscr-loans-dripping-springs.html">Dripping Springs DSCR guide</a> and the <a href="/dscr-loans-fredericksburg-tx.html">Fredericksburg DSCR guide</a>.</li>
</ul></details>
<details><summary>DSCR vs. a conventional investment loan</summary><div class="table-wrap"><table><thead><tr><th>Factor</th><th>DSCR loan</th><th>Conventional investment loan</th></tr></thead><tbody>
<tr><td>Income used</td><td>The property&rsquo;s qualifying rent</td><td>Your full personal income and tax returns</td></tr>
<tr><td>Debt-to-income</td><td>No personal DTI calculation on most programs</td><td>Agency DTI limits apply</td></tr>
<tr><td>Number of properties</td><td>No cap on properties owned</td><td>Agency financed-property limits apply</td></tr>
<tr><td>Ownership</td><td>LLC vesting allowed</td><td>Generally in your personal name</td></tr>
<tr><td>Self-employed borrowers</td><td>Write-offs don&rsquo;t reduce qualifying income</td><td>Taxable income after deductions is used</td></tr>
<tr><td>Price</td><td>Usually higher; prepayment period affects it</td><td>Usually lower when you qualify</td></tr>
</tbody></table></div><p>Conventional financing can be cheaper when your tax returns support it. DSCR is worth comparing when the property&rsquo;s rent is the stronger measure. I quote both on the same date with the same assumptions.</p></details>
<details><summary>Documents you&rsquo;ll need</summary><p>Your personal W-2 and tax-return income usually aren&rsquo;t the qualifying path. You&rsquo;ll still provide government ID, bank statements for the down payment and reserves, a lease or a market-rent appraisal (Form 1007), and entity documents if you&rsquo;re buying through an LLC.</p></details>
<details><summary>Buying through an LLC</summary><p>DSCR programs allow title in an eligible LLC. Entity type, ownership, personal guaranty, title and insurance requirements vary by program, so confirm them before forming or transferring an entity. Ask your attorney and CPA about liability and tax consequences.</p></details>
</div><p class="dscr-source">Run your own numbers with the <a href="/dscr-calculator.html">DSCR calculator</a>.</p></div></section>"""
insert_before("dscr-loan-austin-tx.html", '<section class="dscr-section" id="faq">', DSCR_AUSTIN)

add_faqs("dscr-loan-austin-tx.html", "Can I use a DSCR loan for an LLC or short-term rental?", [
    ("What are the typical DSCR loan requirements in Texas?",
     "Most purchase programs start at 20% to 25% down, with no cap on the number of properties you own and LLC vesting allowed. Many programs prefer a ratio of 1.0 or higher, but we also offer below-0.75 and no-ratio options, which usually require more equity. Expect to document credit, reserves, the lease or appraisal rent schedule (Form 1007), and entity documents if you buy in an LLC."),
    ("Can I use a DSCR loan for a short-term rental in Austin TX?",
     "Yes, eligible short-term rentals can qualify. Confirm the accepted rent method (appraisal rent schedule, operating history or a projection) plus licensing, insurance and reserve requirements before relying on projected revenue. Short-term-rental rules vary across Austin and Hill Country jurisdictions."),
    ("What are current DSCR loan rates in Austin TX?",
     "DSCR pricing changes daily and depends on credit, the ratio, leverage, loan amount, property and the prepayment period you choose. A longer prepayment period generally prices better. Compare written quotes using the same assumptions; I can run current pricing on your specific property."),
    ("Is a DSCR loan right for me if I'm self-employed?",
     "Often, yes. DSCR qualifies on the property&rsquo;s rent, so write-offs on your tax return don&rsquo;t reduce the qualifying income. If you&rsquo;re buying a primary residence instead, compare <a href=\"/bank-statement-loans.html\">bank statement loans</a>."),
    ("Can I get a DSCR loan on a property I'm house hacking?",
     "No. DSCR programs are for non-owner-occupied investment property. If you plan to live in any part of the property, tell me up front and we&rsquo;ll compare owner-occupied options instead."),
], "dscr")

# ---------------------------------------------------------------- Bank statement
set_meta("bank-statement-loans.html",
         "Bank Statement Loans in Austin & Texas | Self-Employed | Adam Styer",
         "Self-employed in Texas? Qualify on 12 or 24 months of deposits instead of tax returns. Up to 90% LTV, credit from 620. Austin-based Adam Styer, NMLS #513013.")
add_faqs("bank-statement-loans.html", "Will it cost more than a conventional mortgage?", [
    ("What credit score do I need for a bank statement loan?",
     "Minimum credit starts at 620 to 660 depending on the program, at reduced leverage. The strongest terms, including 90% loan-to-value on a primary-residence purchase, go to files with stronger credit."),
    ("How much down payment do I need for a bank statement loan?",
     "As little as 10% down on a primary-residence purchase for the strongest files (90% loan-to-value). Cash-out refinances go to 80% loan-to-value. Lower credit or larger loans usually need more down; loan amounts reach $3 million to $4 million."),
    ("I'm a 1099 contractor. Can I qualify on my deposits?",
     "Yes. Contractors can use 12 or 24 months of deposits, or a <a href=\"/1099-only-mortgage-texas.html\">1099-only program</a> that starts from your gross 1099 income with a flat 10% expense factor. Which one qualifies you for more depends on your expenses and whether you deposit income from other sources."),
    ("Can I use a bank statement loan for an investment property?",
     "Yes, but for most rentals a <a href=\"/dscr-loan-austin-tx.html\">DSCR loan</a> is the cleaner fit because it qualifies on the property&rsquo;s rent and skips your personal income. Bank statement loans on investment property usually allow less leverage and price higher. I compare both for the same deal."),
    ("How long does a bank statement loan take to close?",
     "Plan on roughly 25 to 35 days. Underwriters read the statements line by line, so clean statements, quick answers on large deposits and no unexplained transfers keep it on schedule."),
], "ci")

# ---------------------------------------------------------------- High-net-worth
set_meta("high-net-worth-mortgage.html",
         "High-Net-Worth Mortgages in Austin & Texas | Asset-Based | Adam Styer",
         "Qualify on assets, not W-2 income. Asset depletion divides eligible assets by 36 to 84 months. Texas loans to $4M-$5M at 55%-65% LTV. Adam Styer, NMLS #513013.")
add_faqs("high-net-worth-mortgage.html", "Can I use these approaches for a second home or investment property?", [
    ("What's the minimum asset balance to qualify?",
     "There&rsquo;s no single published minimum, but the asset math usually starts working around $1 million of eligible liquid assets for a modest loan and gets meaningfully stronger from $2 million. Plan for reserves too: larger loans require 6 to 18 months of the housing payment left after closing."),
    ("Can I include my retirement account if I'm under 59½?",
     "Yes, at a discount. On the programs I place, retirement accounts count at 70% before 59&frac12;, and at 80% to 90% once you&rsquo;re past 59&frac12; and can access the funds. Cash counts at 100% and marketable securities at 80% to 90%."),
    ("What's the rate difference versus a conforming jumbo?",
     "Asset-based and no-ratio pricing depends on credit, loan-to-value, loan size, liquidity and the investor. Lower-LTV files price better. You do pay for the documentation flexibility, but for borrowers with the assets and not the W-2 to fit a conforming jumbo, the alternative usually isn&rsquo;t a cheaper loan; it&rsquo;s no loan."),
], "ci")

# ---------------------------------------------------------------- Self-employed
set_meta("self-employed-mortgage-austin.html",
         "Self-Employed Mortgage Austin TX | Bank Statement, 1099 & P&L | Adam Styer",
         "Self-employed in Austin? Qualify with tax returns, 12-24 months of bank statements, 1099s, a CPA-prepared P&L or assets. Compare every path with Adam Styer, NMLS #513013.")
add_faqs("self-employed-mortgage-austin.html", "What credit score and down payment do I need?", [
    ("What's the difference between a bank statement loan, 1099 loan, and P&L loan?",
     "They&rsquo;re three ways to document the same business. A <a href=\"/bank-statement-loans.html\">bank statement loan</a> averages 12 or 24 months of deposits and subtracts an expense factor (50% by default, lower with a qualified expense letter). A <a href=\"/1099-only-mortgage-texas.html\">1099 loan</a> starts from your gross 1099 income with a flat 10% expense factor. A <a href=\"/p-and-l-mortgage-texas.html\">P&amp;L loan</a> uses a CPA-prepared profit-and-loss statement. The method that qualifies you for the most is rarely the one with the lowest rate, so I compare all three."),
    ("Why do write-offs hurt my mortgage qualification?",
     "A tax-return mortgage qualifies you on taxable income after deductions, so legitimate write-offs lower the number the lender can use. Some items, like eligible depreciation, are added back. Bank statement and P&amp;L programs start from what came into the business instead, which is why the same borrower can qualify for much more under one method than another."),
], "ci")

# ---------------------------------------------------------------- Asset depletion (meta only)
set_meta("asset-depletion-mortgage-texas.html",
         "Asset Depletion Mortgages in Austin & Texas | Adam Styer",
         "Qualify for a Texas mortgage using savings and investments instead of income. Eligible assets are divided by 36 to 84 months. Austin-based Adam Styer, NMLS #513013.")
print("ok")
