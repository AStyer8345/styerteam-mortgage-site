"""Second template pass (2026-10-01): remaining specialty pages.
Facts come only from each page's own published copy (or figures already on
sibling pages). No URLs change."""
import re, json, html as H

HOME = open("index.html").read()
FORM = re.search(r'<form name="contact" method="POST".*?</form>', HOME, re.S).group(0)
MSG = re.search(r'<div class="journey-field journey-full"><label for="message">.*?</div>', HOME, re.S).group(0)
REASSURE = "Adam replies personally, usually within one business day. No application, no credit pull."

def strip(s): return " ".join(H.unescape(re.sub(r"<[^>]+>", "", s)).split())

PAGES = {
 "1099-only-mortgage-texas.html": dict(
  intro="A 1099-only mortgage qualifies Texas contractors on gross 1099 income minus a flat 10% expense factor, not Schedule C net. Minimum credit starts at 660, and 720-plus credit buys with 10% down.",
  label="1099-only mortgages at a glance",
  facts=[("Qualifies on","Gross 1099 income minus 10%"),("1099 history","1 or 2 years"),("Minimum credit","660"),("Down payment","10% with 720+ credit"),("Loan size","Up to $3M to $4M"),("Second homes","Up to 80% loan-to-value")],
  quick=("ten99_quick","Self-employed / business owner","Check your 1099 options")),
 "p-and-l-mortgage-texas.html": dict(
  intro="A P&amp;L-only mortgage qualifies self-employed Texas borrowers on a 12- or 24-month profit-and-loss statement from a CPA, enrolled agent or CTEC preparer, instead of tax returns. Expect 700-plus credit and up to 80% loan-to-value on a primary residence.",
  label="P&amp;L-only mortgages at a glance",
  facts=[("Qualifies on","12- or 24-month P&amp;L"),("Prepared by","CPA, enrolled agent or CTEC preparer"),("Minimum credit","700 to 720"),("Max loan-to-value","80% primary · 75% second home or rental"),("Loan size","$1.5M to $3M by program"),("Ownership","50% (one program accepts 25%)")],
  quick=("pnl_quick","Self-employed / business owner","Check your P&amp;L options")),
 "k1-income-mortgage-austin.html": dict(
  intro="K-1 income can qualify for a conventional or jumbo mortgage. At 25% or more ownership you&rsquo;re treated as self-employed and need two years of personal and business returns. When the K-1 math falls short, bank statement, P&amp;L or asset programs are the backup.",
  label="K-1 income mortgages at a glance",
  facts=[("Self-employed at","25%+ ownership"),("Documents","2 years of personal returns with K-1s"),("Business returns","2 years at 25%+ ownership"),("Income used","Your share of ordinary income"),("Conforming limit (2026)","$832,750"),("Backup paths","Bank statements · P&amp;L · assets")],
  quick=("k1_quick","Self-employed / business owner","Check your K-1 options")),
 "mortgage-for-business-owners-austin.html": dict(
  intro="Texas business owners can qualify on tax returns, 12 or 24 months of bank statements, a CPA-prepared P&amp;L, 1099s or assets. The right path depends on how you pay yourself, so I compare them side by side before you change anything with your CPA.",
  label="Business-owner mortgages at a glance",
  facts=[("Ways to qualify","Tax returns · bank statements · P&amp;L · 1099 · assets"),("Bank statement credit","620 to 660 minimum"),("P&amp;L credit","700 to 720 minimum"),("Asset depletion","Assets ÷ 36 to 84 months"),("Conforming limit (2026)","$832,750 in Travis County"),("Pre-approval","1 business day once the file is complete")],
  quick=("business_owner_quick","Self-employed / business owner","Check your business-owner options")),
 "non-qm-loans.html": dict(
  intro="Non-QM loans let Texas borrowers qualify without the standard W-2 and tax-return formula: on bank deposits, 1099s, a P&amp;L, assets, or a rental&rsquo;s income. Bank statement purchases reach 90% loan-to-value with minimum credit of 620 to 660.",
  label="Non-QM loans at a glance",
  facts=[("Programs","Bank statement · 1099 · P&amp;L · asset depletion · DSCR"),("Bank statement credit","620 to 660 minimum"),("Bank statement down payment","From 10% on the strongest files"),("1099 expense factor","Flat 10%"),("DSCR down payment","From 20% to 25%"),("Asset depletion","Assets ÷ 36 to 84 months")],
  quick=("non_qm_quick","Another circumstance","Check your Non-QM options")),
 "asset-depletion-mortgage-texas.html": dict(
  intro="Asset depletion lets you qualify for a Texas mortgage on savings and investments instead of a paycheck. Eligible assets are divided by 36, 60 or 84 months to create qualifying income, with loans up to $3 million and minimum credit of 640 to 700.",
  label="Asset depletion at a glance",
  facts=[("Qualifies on","Assets ÷ 36, 60 or 84 months"),("Minimum credit","640 to 700"),("Max loan-to-value","80% to 85%, primary residence"),("Loan size","Up to $3M"),("Assets counted","Cash 100% · securities 80–90%"),("Retirement accounts","70% before 59½ · 80–90% after")],
  quick=("asset_depletion_quick","Substantial assets","Check your asset-based options")),
 "investor-loans.html": dict(
  intro="Texas investors can finance rentals with conventional loans, DSCR loans that qualify on the property&rsquo;s rent, bank statements or assets. DSCR purchases start at 20% to 25% down, with no cap on properties owned and LLC ownership allowed.",
  label="Investor financing at a glance",
  facts=[("Paths","Conventional · DSCR · bank statement · assets"),("DSCR down payment","From 20% to 25%"),("Properties owned (DSCR)","No cap"),("Ownership (DSCR)","Personal name or LLC"),("Bridge / fix-and-flip","12- to 24-month terms, draw-funded rehab"),("5+ units","Separate commercial review")],
  quick=None),
 "dscr-loans-texas.html": dict(
  intro="Investors anywhere can buy Texas rentals with a DSCR loan that qualifies on the property&rsquo;s rent, with 20% to 25% down, LLC ownership and no trip to Texas to close. Texas has no state income tax, which helps the cash flow.",
  label="Texas DSCR loans at a glance",
  facts=[("Qualifies on","The rental&rsquo;s income"),("Down payment","20% to 25%"),("No-ratio option","Available"),("Out-of-state investors","Yes, no trip needed to close"),("LLC","Texas LLC or registered foreign LLC"),("Texas property tax","Roughly 1.6% to 2.2% of value")],
  quick=None),
}

for path, cfg in PAGES.items():
    h = open(path).read()
    hero = re.search(r'<section class="journey-hero[^"]*".*?</section>', h, re.S)
    assert hero, path
    s = hero.group(0)
    s, n = re.subn(r'<p class="journey-intro">.*?</p>', f'<p class="journey-intro">{cfg["intro"]}</p>', s, count=1, flags=re.S)
    assert n == 1, path
    company = " · Company NMLS #2653540" if "2653540" in s else ""
    byline = f'<p class="journey-byline">By <a href="/about.html">Adam Styer</a>, Senior Loan Officer · NMLS #513013{company} · Updated October 1, 2026</p>'
    s = re.sub(r'\s*<p class="journey-byline">.*?</p>', '', s, flags=re.S)
    s = re.sub(r'\s*<div class="journey-path-note">.*?</div>', '', s, count=1, flags=re.S)
    # place byline after the contact line, else after the action buttons
    m = re.search(r'<p class="journey-contact">.*?</p>', s, re.S) or re.search(r'<div class="journey-actions">.*?</div>', s, re.S)
    assert m, (path, "anchor")
    s = s[:m.end()] + "\n    " + byline + s[m.end():]
    if cfg["quick"]:
        s = s.replace('class="journey-button journey-primary" href="#scenario-review"', 'class="journey-button journey-primary" href="#quick-options"', 1)
    facts = "".join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in cfg["facts"])
    strip_html = f'\n<section class="key-facts" aria-label="{strip(cfg["label"])}"><div class="container"><p class="key-facts-title">{cfg["label"]}</p><dl class="key-facts-grid">{facts}</dl><p class="key-facts-note">Figures reflect programs Adam currently places. Your terms depend on the full file.</p></div></section>'
    quick_html = ""
    if cfg["quick"]:
        source, situation, heading = cfg["quick"]
        slug = path[:-5]
        f = FORM.replace('id="form-homepage-contact"', f'id="form-quick-{slug}"').replace('data-journey-mode="conversation"', 'data-journey-mode="conversation" data-quick-form="true"')
        msg = MSG.replace("Anything you’d like me to know? (optional)", "Tell me more about your situation (optional)").replace('rows="2"', 'rows="3"')
        f = re.sub(r'<div class="journey-field journey-full"><label for="message">.*?</div>', lambda _: msg, f, count=1, flags=re.S)
        for i in ["loan-goal", "name", "email", "phone", "message", "message-hint", "contact-heard-about"]:
            f = f.replace(f'id="{i}"', f'id="qf-{i}"').replace(f'for="{i}"', f'for="qf-{i}"').replace(f'aria-describedby="{i}"', f'aria-describedby="qf-{i}"')
        f = f.replace('name="source" value="homepage_options"', f'name="source" value="{source}"')
        f = f.replace('name="cta_source_page" value="https://styermortgage.com/"', f'name="cta_source_page" value="https://styermortgage.com/{path}"')
        f = f.replace('<input type="hidden" name="situation" value="">', f'<input type="hidden" name="situation" value="{situation}">')
        longer = '<a href="#scenario-review">Use the longer form</a> or call' if 'id="scenario-review"' in h else 'Call'
        quick_html = f'''
<section class="ci-section quick-options" id="quick-options" aria-labelledby="quick-options-title"><div class="container">
  <div class="journey-card quick-options-card">
    <h2 id="quick-options-title">{heading}</h2>
    <p class="journey-form-intro">{REASSURE}</p>
    {f}
    <p class="journey-hint">Want to share more detail first? {longer} <a href="tel:+15129566010">(512) 956-6010</a>. <a href="/privacy.html">Privacy</a></p>
  </div>
</div></section>'''
    h = h[:hero.start()] + s + strip_html + quick_html + h[hero.end():]
    h = re.sub(r'<details((?:\s+class="(?!advisory-inside)[^"]*")?)\s+open(\s*>)', r'<details\1\2', h)
    if "/key-facts.css" not in h:
        h = h.replace("</head>", '  <link rel="stylesheet" href="/key-facts.css?v=20261001">\n</head>', 1)
    h = re.sub(r'("dateModified"\s*:\s*")[0-9-]+(")', r'\g<1>2026-10-01\2', h)
    open(path, "w").write(h)
    print(path, "ok", "quick" if cfg["quick"] else "")

# ---- answer-first FAQ rewrites (accordion pages): visible + schema
def rewrite_accordion(path, mapping):
    h = open(path).read()
    for q, a in mapping.items():
        pat = re.compile(r'(<button class="accordion-button"[^>]*>\s*' + re.escape(H.escape(q, quote=False)).replace("\\'", "(?:'|&#x27;|&rsquo;)") + r'\s*</button>\s*<div class="accordion-content">\s*(?:<div class="accordion-body">)?\s*)<p>.*?</p>', re.S)
        m = pat.search(h) or re.compile(pat.pattern.replace(re.escape(H.escape(q, quote=False)), re.escape(q)), re.S).search(h)
        assert m, (path, q)
        h = h[:m.start()] + m.group(1) + f"<p>{a}</p>" + h[m.end():]
    for mm in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', h, re.S):
        if '"FAQPage"' not in mm.group(2): continue
        d = json.loads(mm.group(2)); hit = 0
        def walk(x):
            nonlocal hit
            if isinstance(x, dict):
                if x.get("@type") == "Question" and H.unescape(x.get("name", "")) in mapping:
                    x["acceptedAnswer"]["text"] = strip(mapping[H.unescape(x["name"])]); hit += 1
                for v in x.values(): walk(v)
            elif isinstance(x, list):
                for v in x: walk(v)
        walk(d)
        assert hit == len(mapping), (path, hit)
        h = h[:mm.start(2)] + "\n" + json.dumps(d, indent=2, ensure_ascii=False) + "\n" + h[mm.end(2):]
        break
    open(path, "w").write(h); print(path, "faqs", len(mapping))

rewrite_accordion("mortgage-for-business-owners-austin.html", {
 "Can I use money from my business account for the down payment?":
  "Usually, yes. Lenders accept business funds when you own the business and the withdrawal won&rsquo;t hurt it, typically shown with a CPA letter or a review of business cash flow. Tell me early if the same business provides both your income and your down payment.",
 "How much down payment do business owners need?":
  "From 10% on a primary residence with bank statement or 1099 programs on the strongest files, and 20% on P&amp;L-only programs (80% maximum loan-to-value). Conventional loans follow their own published minimums when your tax returns support the loan.",
 "Can my LLC or S-corp own the property?":
  'For a rental, yes: <a href="/dscr-loan-austin-tx.html">DSCR loans</a> allow LLC ownership. For a home you live in, title usually goes in your personal name or an eligible revocable trust. Ask your attorney and CPA about liability and tax effects before moving title.',
 "How fast does a self-employed mortgage typically close in Austin?":
  "Pre-approval usually takes one business day once your file is complete. P&amp;L and jumbo files typically close in 25 to 35 days when documents, appraisal and title are clean.",
 "Can a self-employed business owner in Austin get a mortgage without tax returns?":
  'Yes. <a href="/bank-statement-loans.html">Bank statement</a>, <a href="/1099-only-mortgage-texas.html">1099</a>, <a href="/p-and-l-mortgage-texas.html">P&amp;L</a> and <a href="/asset-depletion-mortgage-texas.html">asset-depletion</a> programs qualify you without tax-return income. Bank statement loans use 12 or 24 months of deposits with a 50% default expense factor; 1099 loans use gross 1099 income minus 10%.',
 "What's the difference between bank statement, P&L, and 1099 loans?":
  "Three ways to document the same business. Bank statement loans average 12 or 24 months of deposits minus an expense factor (50% by default). 1099 loans start from gross 1099 income with a flat 10% factor. P&amp;L loans use a CPA-prepared profit-and-loss statement, with 700-plus credit and up to 80% loan-to-value.",
})

rewrite_accordion("investor-loans.html", {
 "How many investment properties can I have financed at once?":
  "There&rsquo;s no cap on DSCR loans. Fannie Mae limits you to 10 financed properties, so investors past that point usually move to DSCR or portfolio loans, which qualify each rental on its own rent.",
 "Do investor loans show up on my personal credit report?":
  "Conventional investment loans report on your personal credit. Many DSCR lenders don&rsquo;t report a loan closed in an LLC, but most require a personal guaranty, so ask each lender before you count on it.",
 "Do you do blanket loans across 5+ properties?":
  "Yes. A blanket or portfolio loan can combine several rentals into one loan with one payment. The tradeoff is cross-collateralization: one property&rsquo;s trouble can affect the others, so I compare it with separate DSCR loans.",
 "How do I finance a fix-and-flip?":
  "With a short-term bridge or fix-and-flip loan: typically 12 to 24 months, based mainly on the property, with rehab money released in draws. Many investors then refinance into a DSCR loan once the property is rented.",
 "Can I cash out to buy the next investment property?":
  'Yes. A <a href="/dscr-loan-austin-tx.html#dscr-cash-out">DSCR cash-out refinance</a> qualifies on the rental&rsquo;s income, and many investors use it to fund the next purchase. Below-0.75 and no-ratio options exist with more equity left in the property.',
 "I'm at 10 conventional loans — what now?":
  "Move to DSCR or portfolio financing. Fannie Mae caps you at 10 financed properties, but DSCR programs have no cap on properties owned and qualify each rental on its own rent.",
})

# ---- DSCR pages: differentiate and cross-link (no redirect)
p = "dscr-loan-austin-tx.html"; h = open(p).read()
old = 'Run your own numbers with the <a href="/dscr-calculator.html">DSCR calculator</a>.'
assert h.count(old) == 1
h = h.replace(old, 'Buying elsewhere in Texas or investing from out of state? See <a href="/dscr-loans-texas.html">Texas DSCR loans</a>. Run your own numbers with the <a href="/dscr-calculator.html">DSCR calculator</a>.')
open(p, "w").write(h); print("austin crosslink ok")
