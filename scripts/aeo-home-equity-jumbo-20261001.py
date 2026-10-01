"""Home equity rebuild (HELOAN-first) + jumbo key facts and hero form — 2026-10-01."""
import re, json, html as H

HOME = open("index.html").read()
FORM = re.search(r'<form name="contact" method="POST".*?</form>', HOME, re.S).group(0)
MSG = re.search(r'<div class="journey-field journey-full"><label for="message">.*?</div>', HOME, re.S).group(0)
REASSURE = "Adam replies personally, usually within one business day. No application, no credit pull."
SCRIPTS = '<script src="/situation-journeys.js" defer></script>\n<script src="/assets/utm.js?v=20260920" defer></script>'
CSS = '<link rel="stylesheet" href="/situation-journeys.css">\n  <link rel="stylesheet" href="/key-facts.css?v=20261001">'

def strip(s): return " ".join(H.unescape(re.sub(r"<[^>]+>", "", s)).split())

def quick_form(path, source, situation, heading, goal=None, longer=None):
    slug = path.replace("/", "-")[:-5]
    f = FORM.replace('id="form-homepage-contact"', f'id="form-quick-{slug}"').replace('data-journey-mode="conversation"', 'data-journey-mode="conversation" data-quick-form="true"')
    msg = MSG.replace("Anything you’d like me to know? (optional)", "Tell me more about your situation (optional)").replace('rows="2"', 'rows="3"')
    f = re.sub(r'<div class="journey-field journey-full"><label for="message">.*?</div>', lambda _: msg, f, count=1, flags=re.S)
    for i in ["loan-goal", "name", "email", "phone", "message", "message-hint", "contact-heard-about"]:
        f = f.replace(f'id="{i}"', f'id="qf-{i}"').replace(f'for="{i}"', f'for="qf-{i}"').replace(f'aria-describedby="{i}"', f'aria-describedby="qf-{i}"')
    f = f.replace('name="source" value="homepage_options"', f'name="source" value="{source}"')
    f = f.replace('name="cta_source_page" value="https://styermortgage.com/"', f'name="cta_source_page" value="https://styermortgage.com/{path}"')
    f = f.replace('<input type="hidden" name="situation" value="">', f'<input type="hidden" name="situation" value="{situation}">')
    if goal:
        f = f.replace(f'<option value="{goal}">', f'<option value="{goal}" selected>', 1)
    more = f'{longer} or call' if longer else 'Call'
    return (f'<aside class="journey-card quick-options-card hero-quick" id="quick-options" tabindex="-1" aria-labelledby="quick-options-title">'
            f'\n    <h2 id="quick-options-title" class="quick-options-heading">{heading}</h2>\n    <p class="journey-form-intro">{REASSURE}</p>\n    {f}'
            f'\n    <p class="journey-hint">Prefer to talk first? {more} <a href="tel:+15129566010">(512) 956-6010</a>. <a href="/privacy.html">Privacy</a></p>\n  </aside>')

def facts(label, rows):
    dl = "".join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in rows)
    return f'<div class="key-facts key-facts-hero"><p class="key-facts-title">{label}</p><dl class="key-facts-grid">{dl}</dl><p class="key-facts-note">Figures reflect programs Adam currently places and Texas homestead rules. Your terms depend on the full file.</p></div>'

def add_assets(h):
    if "/situation-journeys.js" not in h:
        h = h.replace("</body>", SCRIPTS + "\n</body>", 1)
    if "/key-facts.css" not in h:
        h = h.replace("</head>", "  " + CSS + "\n</head>", 1)
    return h

def set_meta(h, title, desc):
    t, d = H.escape(title, quote=True), H.escape(desc, quote=True)
    h = re.sub(r"<title>.*?</title>", f"<title>{t}</title>", h, count=1, flags=re.S)
    h = re.sub(r'(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*', lambda m: m.group(1) + t, h)
    h = re.sub(r'(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*', lambda m: m.group(1) + d, h)
    return h

# ======================= HOME EQUITY =======================
p = "home-equity-loans-texas.html"; h = open(p).read()
h = set_meta(h, "Texas Home Equity Loans (HELOAN) | Keep Your Low Rate | Adam Styer",
             "Keep your low first-mortgage rate and borrow against your Texas home with a fixed-rate home equity loan. Up to 80% combined loan-to-value. Austin-based Adam Styer, NMLS #513013.")
hero = re.search(r'<section class="eq-hero">.*?</section>', h, re.S)
left = f'''<div class="eq-hero-copy"><p class="eq-kicker">Home equity loans · Texas</p><h1>Texas Home Equity Loans: Keep Your Low Rate</h1><p class="eq-lead">A home equity loan (HELOAN) gives you a lump sum at a fixed rate as a second mortgage, so your low first-mortgage rate stays in place. In Texas, all loans on your homestead combined can reach 80% of its value.</p><div class="eq-actions"><a class="eq-button" href="#quick-options">See My Options</a><a class="eq-button eq-button-ghost" href="tel:+15129566010">Call Adam</a></div><p class="eq-note">By <a href="/about.html">Adam Styer</a>, Senior Loan Officer · NMLS #513013 · Company NMLS #2653540 · Updated October 1, 2026</p>
    {facts("Texas home equity loans at a glance", [
        ("What you get", "Fixed-rate lump sum, second mortgage"),
        ("Your first mortgage", "Stays in place, rate unchanged"),
        ("Texas homestead limit", "80% of value, all loans combined"),
        ("Waiting period", "12 days after the required notice"),
        ("Right to cancel", "3 days after closing"),
        ("How often", "One Texas equity loan every 12 months")])}</div>'''
aside = quick_form(p, "home_equity_quick", "Home equity", "Check your home equity options", goal="Access equity", longer='<a href="/refinance-quote.html">Use the longer form</a>')
h = h[:hero.start()] + f'<section class="eq-hero"><div class="eq-wrap eq-hero-grid has-hero-quick">{left}\n  {aside}</div></section>' + h[hero.end():]

FAQS = [
 ("What is a home equity loan (HELOAN)?",
  "A home equity loan is a second mortgage that pays you a lump sum at a fixed rate, with its own fixed monthly payment. Your first mortgage stays exactly as it is. It fits a planned expense like a renovation, paying off higher-rate debt or funding a purchase."),
 ("Should I use a home equity loan or a cash-out refinance?",
  "If your first-mortgage rate is lower than today&rsquo;s rates, a home equity loan usually wins: you only pay the new rate on the new money. A cash-out refinance replaces your whole mortgage at today&rsquo;s rate, which can make sense when your current rate is already higher or you want one payment. I run both side by side."),
 ("How much can I borrow with a Texas home equity loan?",
  "On a Texas homestead, your first mortgage plus the new loan can total up to 80% of the home&rsquo;s value. Example: on a $600,000 home with $300,000 owed, 80% is $480,000, so up to about $180,000 before closing costs. Your credit, income and the appraisal set the final amount."),
 ("How long does a Texas home equity loan take?",
  "Texas law requires at least 12 days between the required home equity notice and closing, and you have 3 days after closing to cancel before funds go out. Plan on roughly 3 to 5 weeks from start to cash, depending on the appraisal and documents."),
 ("How often can I take out a home equity loan in Texas?",
  "Once every 12 months on your homestead. Texas allows only one home equity loan or cash-out refinance in any 12-month period, so it&rsquo;s worth borrowing the right amount the first time."),
 ("What's the difference between a home equity loan and a HELOC?",
  "A home equity loan pays a lump sum at a fixed rate with a fixed payment. A HELOC is a line of credit you draw from as needed, usually at a variable rate, so the payment can change. With today&rsquo;s higher rates, the fixed payment of a home equity loan is easier to plan around."),
 ("Can I get a home equity loan on a rental property?",
  'The Texas homestead rules apply only to the home you live in. For a rental, compare a <a href="/dscr-loan-austin-tx.html#dscr-cash-out">DSCR cash-out refinance</a>, which qualifies on the property&rsquo;s rent, or an investment-property second loan where available.'),
 ("Can I qualify if I'm self-employed?",
  'Yes, on some programs. Alongside tax returns, some second-mortgage programs accept <a href="/bank-statement-loans.html">bank statements</a> to document self-employed income. Tell me how you earn and I&rsquo;ll match the right program.'),
]
details = "".join(f'<details><summary>{H.escape(q, quote=False)}</summary><p>{a}</p></details>' for q, a in FAQS)
blk = re.search(r'<h2>Questions to bring to your review</h2>.*?(?=</div></section>)', h, re.S)
assert blk
h = h[:blk.start()] + '<h2 id="home-equity-faq">Texas home equity loan questions</h2>' + details + h[blk.end():]
schema = {"@context": "https://schema.org", "@type": "FAQPage",
          "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in FAQS]}
h = h.replace('"dateModified": "2026-09-16"}</script>', '"dateModified": "2026-10-01"}</script><script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False) + '</script>', 1)
# hero-specific style tweaks
h = h.replace("</style>", ".equity-page .eq-hero-grid.has-hero-quick{align-items:start}.equity-page .eq-hero .eq-button-ghost{background:transparent;color:var(--ink);border:1px solid var(--ink)}.equity-page .eq-hero h1{font-size:clamp(34px,4.2vw,52px)}.equity-page .eq-lead{font-size:18px}@media(min-width:1000px){.equity-page .eq-hero-grid.has-hero-quick{grid-template-columns:minmax(0,1fr) 420px}}</style>", 1)
h = add_assets(h)
open(p, "w").write(h); print(p, "ok")

# ======================= JUMBO =======================
p = "loans/jumbo.html"; h = open(p).read()
old_sub = re.search(r'<p class="hero-subtitle">.*?</p>', h, re.S)
h = h[:old_sub.start()] + '<p class="hero-subtitle">A jumbo loan in Austin is any mortgage above the 2026 Travis County conforming limit of $832,750. Expect 700-plus credit and 15% to 20% down on most programs, with 10% down up to $1.5 million on some.</p>' + h[old_sub.end():]
h = h.replace('<a href="/get-preapproved.html" class="btn btn-primary hero-cta-primary hero-cta-btn">Get Pre-Approved</a>',
              '<a href="#quick-options" class="btn btn-primary hero-cta-primary hero-cta-btn">See My Options</a>', 1)
jf = facts("Jumbo loans at a glance", [
    ("Jumbo starts", "Above $832,750 (Travis County, 2026)"),
    ("Loan size", "$833K to $10M+"),
    ("Minimum credit", "700 · best pricing at 740+"),
    ("Down payment", "15–20% · 10% to $1.5M on some programs"),
    ("Debt-to-income", "43% typical · 45–50% portfolio"),
    ("Closing", "25 to 35 days with clean files")]).replace("and Texas homestead rules", "")
byline = '<p class="hero-byline">By <a href="/about.html">Adam Styer</a>, Senior Loan Officer · NMLS #513013 · Updated October 1, 2026</p>'
m = re.search(r'(<p class="hero-call-link">.*?</p>)', h, re.S)
h = h[:m.end()] + "\n                  " + byline + "\n                  " + jf + h[m.end():]
# form into the empty right column of hero-two-col
aside = quick_form(p, "jumbo_quick", "Jumbo purchase or refinance", "Check your jumbo options")
legal = h.index('<p class="hero-legal">')
close = h.rindex('</div>', 0, legal)   # closes .hero-two-col
h = h[:close] + f'\n                <div class="hero-col hero-col-form hero-col-quick">{aside}</div>\n              ' + h[close:]
# drop the older 'Quick Quote' block further down; the hero form replaces it
qq = re.search(r'<section class="advisory-quote" aria-label="Discuss this loan with Adam">.*?</section>', h, re.S)
h = h[:qq.start()] + h[qq.end():]
h = re.sub(r'("dateModified"\s*:\s*")[0-9-]+(")', r'\g<1>2026-10-01\2', h)
h = add_assets(h)
open(p, "w").write(h); print(p, "ok")
