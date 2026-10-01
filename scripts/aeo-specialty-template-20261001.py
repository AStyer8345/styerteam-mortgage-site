"""Specialty page template pass (2026-10-01): answer-first intro, one byline,
key-facts strip, FAQs collapsed (Adam's expert note stays open)."""
import re

FACTS = {
 "bank-statement-loans.html": dict(
  intro="A bank statement loan lets self-employed Texas borrowers qualify on 12 or 24 months of deposits instead of tax-return income. Minimum credit starts at 620 to 660, and the strongest files buy with 10% down.",
  label="Bank statement loans at a glance",
  facts=[("Qualifies on","12 or 24 months of deposits"),("Minimum credit","620 to 660"),("Max loan-to-value","90% purchase · 80% cash-out"),("Loan size","Up to $3M to $4M"),("Expense factor","50% default · 10–15% with CPA letter"),("Self-employment","2 years")]),
 "dscr-loan-austin-tx.html": dict(
  intro="<strong>A DSCR loan qualifies your rental on its rent, not your tax returns.</strong> Buy, refinance or pull cash out, with down payments from 20% to 25%, no cap on properties and LLC ownership allowed. Below-0.75 and no-ratio options are available.",
  label="DSCR loans at a glance",
  facts=[("Qualifies on","Rent ÷ full payment (PITIA)"),("Down payment","From 20% to 25%"),("Ratio","1.0+ preferred · below 0.75 and no-ratio available"),("Properties owned","No cap"),("Ownership","Personal name or LLC"),("Prepayment","3 years is common · shorter available")]),
 "high-net-worth-mortgage.html": dict(
  intro="High-net-worth borrowers can qualify on assets instead of W-2 income. Eligible assets are divided by 36, 60 or 84 months to create qualifying income, with primary-residence loans reaching $4 million to $5 million.",
  label="Asset-based financing at a glance",
  facts=[("Qualifies on","Assets ÷ 36, 60 or 84 months"),("Loan size","To $4M–$5M, primary residence"),("Loan-to-value","55% to 65% on the largest loans"),("Credit","720 to 740 on the largest loans"),("Assets counted","Cash 100% · securities 80–90% · retirement 70% before 59½"),("Reserves","6 to 18 months, by loan size")]),
 "self-employed-mortgage-austin.html": dict(
  intro="Yes, you can get a mortgage when you work for yourself. Austin borrowers can qualify on tax returns, 12 or 24 months of bank statements, 1099s, a CPA-prepared P&amp;L or eligible assets, and I compare every path that fits.",
  label="Self-employed mortgages at a glance",
  facts=[("Ways to qualify","Tax returns · bank statements · 1099 · P&amp;L · assets"),("Bank statement credit","620 to 660 minimum"),("Down payment","From 10% on the strongest files"),("1099 expense factor","Flat 10%"),("Self-employment","2 years on most programs"),("Pre-approval","1 business day once the file is complete")]),
}

BYLINE_RE = re.compile(r'(?:\s*<p class="journey-byline">(?:Tell me|By |Adam Styer)[^\n]*?</p>)+', re.S)

for path, cfg in FACTS.items():
    h = open(path).read()
    hero = re.search(r'<section class="journey-hero[^"]*".*?</section>', h, re.S)
    assert hero, path
    s = hero.group(0)
    s2, n = re.subn(r'<p class="journey-intro">.*?</p>', f'<p class="journey-intro">{cfg["intro"]}</p>', s, count=1, flags=re.S)
    assert n == 1, path
    company = " · Company NMLS #2653540" if "2653540" in s else ""
    byline = f'\n    <p class="journey-byline">By <a href="/about.html">Adam Styer</a>, Senior Loan Officer · NMLS #513013{company} · Updated October 1, 2026</p>'
    s2, n = BYLINE_RE.subn(byline, s2, count=1)
    assert n == 1, (path, "byline")
    s2 = BYLINE_RE.sub("", s2[:s2.index(byline)+len(byline)]) + s2[s2.index(byline)+len(byline):] if False else s2
    # drop any remaining extra bylines/path notes after ours (keep the one we wrote)
    first = s2.index(byline) + len(byline)
    tail = re.sub(r'\s*<p class="journey-byline">.*?</p>', "", s2[first:], flags=re.S)
    tail = re.sub(r'\s*<div class="journey-path-note">.*?</div>', "", tail, count=1, flags=re.S)
    s2 = s2[:first] + tail
    facts = "".join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in cfg["facts"])
    strip = f'\n<section class="key-facts" aria-label="{cfg["label"]}"><div class="container"><h2 class="key-facts-title">{cfg["label"]}</h2><dl class="key-facts-grid">{facts}</dl><p class="key-facts-note">Figures reflect programs Adam currently places. Your terms depend on the full file.</p></div></section>'
    h = h[:hero.start()] + s2 + strip + h[hero.end():]
    # collapse disclosures, keep Adam's "What actually moves the file" open
    h = re.sub(r'<details open(?=[ >])(?![^>]*advisory-inside)', '<details', h)
    h = h.replace('<details open>', '<details>')
    # stylesheet
    if "/key-facts.css" not in h:
        h = h.replace("</head>", '  <link rel="stylesheet" href="/key-facts.css?v=20261001">\n</head>', 1)
    # dateModified
    h = re.sub(r'("dateModified"\s*:\s*")[0-9-]+(")', r'\g<1>2026-10-01\2', h)
    open(path, "w").write(h)
    print(path, "open left:", len(re.findall(r'<details[^>]*\bopen\b', h)))

# titles / meta
def meta(path, title=None, desc=None):
    h = open(path).read()
    if title:
        h = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", h, count=1, flags=re.S)
        h = re.sub(r'(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*', lambda m: m.group(1)+title, h)
    if desc:
        h = re.sub(r'(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*', lambda m: m.group(1)+desc, h)
    open(path, "w").write(h)

meta("bank-statement-loans.html", title="Bank Statement Loans Austin &amp; Texas | Self-Employed Mortgage | Adam Styer")
meta("asset-depletion-mortgage-texas.html",
     title="Asset Depletion Mortgages in Austin &amp; Texas | Adam Styer",
     desc="Qualify for a Texas mortgage using savings and investments instead of income. Eligible assets are divided by 36, 60 or 84 months. Austin-based Adam Styer, NMLS #513013.")
print("meta ok")
