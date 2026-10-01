"""Short inline lead form on specialty pages + reassurance copy (2026-10-01).
Clones the proven homepage "contact" form (same Netlify form name, attribution
fields and consent), with page-specific ids and source tags."""
import re

home = open("index.html").read()
m = re.search(r'<form name="contact" method="POST".*?</form>', home, re.S)
assert m
FORM = m.group(0)

REASSURE = 'Adam replies personally, usually within one business day. No application, no credit pull.'
old_hint = '<p class="journey-hint">* Required. No application needed. <a href="/privacy.html">Privacy</a></p>'
assert home.count(old_hint) == 1
home = home.replace(old_hint, f'<p class="journey-hint">{REASSURE} <a href="/privacy.html">Privacy</a></p>')
open("index.html", "w").write(home)

PAGES = {
 "bank-statement-loans.html": ("bank_statement_quick", "Self-employed / business owner", "", "Check your bank statement options"),
 "high-net-worth-mortgage.html": ("hnw_quick", "Substantial assets", "", "Check your asset-based options"),
 "self-employed-mortgage-austin.html": ("self_employed_quick", "Self-employed / business owner", "", "Check your self-employed options"),
}

for path, (source, situation, goal, heading) in PAGES.items():
    h = open(path).read()
    assert 'id="quick-options"' not in h
    slug = path[:-5]
    f = FORM
    f = f.replace('id="form-homepage-contact"', f'id="form-quick-{slug}"')
    f = f.replace('data-journey-mode="conversation"', 'data-journey-mode="conversation" data-quick-form="true"')
    # unique ids / label targets
    for i in ["loan-goal", "name", "email", "phone", "message", "message-hint", "contact-heard-about"]:
        f = f.replace(f'id="{i}"', f'id="qf-{i}"').replace(f'for="{i}"', f'for="qf-{i}"').replace(f'aria-describedby="{i}"', f'aria-describedby="qf-{i}"')
    f = f.replace('name="source" value="homepage_options"', f'name="source" value="{source}"')
    f = f.replace('name="cta_source_page" value="https://styermortgage.com/"', f'name="cta_source_page" value="https://styermortgage.com/{path}"')
    f = f.replace('<input type="hidden" name="situation" value="">', f'<input type="hidden" name="situation" value="{situation}">')
    # keep the first view short: drop the free-text box (they can add detail after submitting)
    f = re.sub(r'\s*<div class="journey-field journey-full"><label for="qf-message">.*?</div>', '', f, count=1, flags=re.S)
    block = f'''
<section class="ci-section quick-options" id="quick-options" aria-labelledby="quick-options-title"><div class="container">
  <div class="journey-card quick-options-card">
    <h2 id="quick-options-title">{heading}</h2>
    <p class="journey-form-intro">Three quick fields. {REASSURE}</p>
    {f}
    <p class="journey-hint">Want to share more detail first? <a href="#scenario-review">Use the longer form</a> or call <a href="tel:+15129566010">(512) 956-6010</a>. <a href="/privacy.html">Privacy</a></p>
  </div>
</div></section>'''
    i = h.index('<section class="key-facts"')
    j = h.index('</section>', i) + len('</section>')
    h = h[:j] + block + h[j:]
    # hero primary button goes to the short form
    hero = re.search(r'<section class="journey-hero.*?</section>', h, re.S)
    s = hero.group(0).replace('class="journey-button journey-primary" href="#scenario-review"', 'class="journey-button journey-primary" href="#quick-options"')
    h = h[:hero.start()] + s + h[hero.end():]
    open(path, "w").write(h)
    print(path, "ok")
