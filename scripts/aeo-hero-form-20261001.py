"""Move the short form into the hero (right column on desktop) — 2026-10-01."""
import re, glob

pages = [p for p in glob.glob("*.html") if 'id="quick-options"' in open(p).read()]
for path in pages:
    h = open(path).read()
    sec = re.search(r'\n<section class="ci-section quick-options" id="quick-options".*?</section>', h, re.S)
    assert sec, path
    card = re.search(r'<div class="journey-card quick-options-card">(.*)</div>\s*</div></section>$', sec.group(0), re.S)
    assert card, (path, "card")
    inner = card.group(1).replace('<h2 id="quick-options-title">', '<h2 id="quick-options-title" class="quick-options-heading">')
    h = h[:sec.start()] + h[sec.end():]
    hero = re.search(r'<section class="journey-hero[^"]*".*?</section>', h, re.S)
    s = hero.group(0)
    assert s.rstrip().endswith("</div></div>\n</section>") or re.search(r'</div>\s*</div>\s*</section>$', s), path
    m = list(re.finditer(r'</div>', s))[-1]          # closes .journey-grid
    aside = f'\n    <aside class="journey-card quick-options-card hero-quick" id="quick-options" tabindex="-1" aria-labelledby="quick-options-title">{inner}</aside>\n  '
    s = s[:m.start()] + aside + s[m.start():]
    s = s.replace('class="container journey-grid"', 'class="container journey-grid has-hero-quick"', 1)
    h = h[:hero.start()] + s + h[hero.end():]
    open(path, "w").write(h)
    print(path, "ok")
