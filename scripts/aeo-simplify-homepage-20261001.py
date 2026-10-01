import re, json
p = "/tmp/site/index.html"
h = open(p).read()

def sub1(old, new):
    global h
    assert h.count(old) == 1, ("not unique", old[:80], h.count(old))
    h = h.replace(old, new)

# 1. Hero declutter: drop portrait card + redundant specialty pills; shorten detail line.
h, n = re.subn(r'\s*<div class="home-conversation-contact">.*?</div>\s*</div>\s*</div>', "", h, count=1, flags=re.S)
assert n == 1
h, n = re.subn(r'\s*<div class="modern-specialty-links".*?</div>', "", h, count=1, flags=re.S)
assert n == 1
h, n = re.subn(r'<p class="modern-hero-detail">.*?</p>',
               '<p class="modern-hero-detail">First home or a simple refinance? I help with those too.</p>',
               h, count=1, flags=re.S)
assert n == 1

# 2. Stats: capital partners wording.
sub1('<div class="stat-label">Wholesale Lenders Shopped</div>', '<div class="stat-label">Capital partners</div>')

# 3. Reviews: keep the three most relevant (Sherita, Ellery, Matthew).
for name in ["Mary Cairnie", "Jeanne Miller"]:
    m = None
    for mm in re.finditer(r'<div class="testimonial-marquee-card">.*?</p>\s*</div>', h, re.S):
        if name in mm.group(0):
            m = mm; break
    assert m, name
    h = h[:m.start()] + h[m.end():]

# 4. Remove the duplicate "Ready to Get Started?" section (final CTA remains).
h, n = re.subn(r'\s*<section class="quick-contact-section" id="homepage-next-steps".*?</section>', "", h, count=1, flags=re.S)
assert n == 1

# 5. FAQ: answer-first, no construction push, no "wholesale lender" wording. Visible + schema.
faqs = [
 ("Can self-employed business owners get a mortgage without tax returns in Austin TX?",
  'Yes. Self-employed Austin borrowers can qualify on 12 or 24 months of <a href="/bank-statement-loans.html">bank statements</a>, a <a href="/1099-only-mortgage-texas.html">1099-only program</a>, a CPA-prepared <a href="/p-and-l-mortgage-texas.html">P&amp;L</a>, or <a href="/asset-depletion-mortgage-texas.html">eligible assets</a>. These <a href="/non-qm-loans.html">non-QM programs</a> start from the money your business brings in, not the income your write-offs reduced. Bank statement purchases reach 90% loan-to-value on the strongest files, with minimum credit of 620 to 660.'),
 ("What is a DSCR loan and who qualifies in Texas?",
  'A <a href="/dscr-loan-austin-tx.html">DSCR loan</a> qualifies a real estate investor on the property&rsquo;s rental income instead of personal income. DSCR = rent &divide; the full housing payment (PITIA). Many programs prefer 1.0 or higher, but below-0.75 and no-ratio options exist. Down payments start at 20% to 25%, there&rsquo;s no cap on properties owned, and LLC vesting is allowed.'),
 ("How does asset depletion qualify high-net-worth borrowers in Texas?",
  '<a href="/asset-depletion-mortgage-texas.html">Asset depletion</a> turns eligible assets into qualifying income by dividing them by 36, 60 or 84 months, depending on the program. Cash counts at 100%, marketable securities at 80% to 90%, and retirement accounts at 70% before age 59&frac12;. It fits retirees, business owners after a sale, and anyone whose balance sheet is stronger than their W-2.'),
 ("What loan programs are available for complex-income borrowers in Austin TX?",
  'Self-employed owners, <a href="/k1-income-mortgage-austin.html">K&#8209;1 partners</a>, <a href="/investor-loans.html">investors</a> and high-net-worth borrowers can use <a href="/bank-statement-loans.html">bank statement</a>, <a href="/1099-only-mortgage-texas.html">1099-only</a>, <a href="/p-and-l-mortgage-texas.html">P&amp;L</a>, asset depletion, <a href="/dscr-loan-austin-tx.html">DSCR</a> and <a href="/loans/jumbo.html">jumbo</a> financing (above $832,750 in Travis County for 2026). Adam compares programs across 40+ capital partners for each scenario.'),
 ("How fast can a self-employed buyer get pre-approved in Austin TX?",
  'Most pre-approvals are issued within one business day once the file is complete. Closing timelines for bank statement, DSCR and other non-QM loans depend on the program, appraisal, title and how quickly documents come in. <a href="#contact-form">Send the short scenario</a> or call <a href="tel:+15129566010">(512) 956-6010</a>.'),
]
items = "".join(
    f'\n          <div class="accordion-item">\n            <button class="accordion-button"><span>{q}</span></button>\n            <div class="accordion-content"><div class="accordion-body"><p>{a}</p></div></div>\n          </div>'
    for q, a in faqs)
h, n = re.subn(r'(<div class="accordion content-medium mx-auto">).*?(\n        </div>\n      </div>\n    </section>)',
               lambda m: m.group(1) + items + m.group(2), h, count=1, flags=re.S)
assert n == 1

# schema
def strip(s):
    import html as H
    return " ".join(H.unescape(re.sub(r"<[^>]+>", "", s)).split())
for mm in re.finditer(r'(<script type="application/ld\+json">)(.*?)(</script>)', h, re.S):
    if '"FAQPage"' in mm.group(2):
        d = json.loads(mm.group(2))
        def find(x):
            if isinstance(x, dict):
                if x.get("@type") == "FAQPage": return x
                for v in x.values():
                    r = find(v)
                    if r: return r
            if isinstance(x, list):
                for v in x:
                    r = find(v)
                    if r: return r
        f = find(d)
        f["mainEntity"] = [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in faqs]
        h = h[:mm.start(2)] + "\n" + json.dumps(d, indent=2, ensure_ascii=False) + "\n" + h[mm.end(2):]
        break
else:
    raise SystemExit("no FAQ schema")

open(p, "w").write(h)
print("homepage ok")
