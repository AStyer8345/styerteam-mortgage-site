"""Assemble a local-only review build from the preserved migration snapshot.

No network, deployment, credentials, server functions, or live routing writes.
Requires beautifulsoup4. Run with ../py/bin/python from this directory's parent.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit
from html import escape
import json, shutil, hashlib, re

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'site'
BASE = OUT  # Reassemble the retained content; never overwrite fixes with an old snapshot.
C = ROOT / 'components'
MANIFEST = json.loads((ROOT / 'route-manifest.json').read_text())
ROWS = {r['route']: r for r in MANIFEST['routes']}

def parse(text): return BeautifulSoup(text, 'html.parser')
def append_html(node, text):
    for child in list(parse(text).contents): node.append(child)

def route_for(path):
    rel = path.relative_to(OUT).as_posix()
    return '/' if rel == 'index.html' else '/' + rel.removesuffix('index.html') if rel.endswith('/index.html') else '/' + rel

def crumbs(route):
    chain=[]; seen=set(); current=route
    while current and current not in seen:
        seen.add(current); row=ROWS.get(current)
        chain.append({'route':current, 'label': 'Home' if current=='/' else row['anchor'] if row else current.strip('/').replace('.html','').replace('-',' ')})
        current=row['primary_parent'] if row else '/'
    if not any(x['route']=='/' for x in chain): chain.append({'route':'/','label':'Home'})
    return list(reversed(chain))

def without_breadcrumbs(value):
    if isinstance(value,list): return [v for x in value if (v:=without_breadcrumbs(x)) is not None]
    if isinstance(value,dict):
        types=value.get('@type',[])
        if 'BreadcrumbList' in ([types] if isinstance(types,str) else types): return None
        return {k:without_breadcrumbs(v) for k,v in value.items()}
    return value

if not BASE.exists(): raise SystemExit('Preserved migration snapshot is missing.')
for name in ['header.html','footer.html','home.html','tiffany-reference.css','navigation.css','navigation.js']:
    if not (C/name).exists(): raise SystemExit('Component is not ready: '+name)
if BASE.resolve()!=OUT.resolve():shutil.copytree(BASE, OUT, dirs_exist_ok=True)
# These non-ledger source utilities are not borrower pages or migration routes.
excluded=['loanos.html','forms.html']
for name in excluded:
    if '/'+name in ROWS:raise ValueError('Cannot exclude a ledger route')
    (OUT/name).unlink(missing_ok=True)
patch_file=C/'calculator-fixes/patches.json'
patches=json.loads(patch_file.read_text()) if patch_file.exists() else {}
for item in patches.get('assets',[]):
    shutil.copy2(ROOT/item['replacementFile'],OUT/item['path'].lstrip('/'))
for name in ['orchestration.css','navigation.css','navigation.js','ui-polish.js']:
    shutil.copy2(C/name,OUT/name)
header=(C/'header.html').read_text(); footer=(C/'footer.html').read_text()
contact=(C/'contact.html').read_text()
removed_scripts=[]; files=[]
for path in sorted(OUT.rglob('*.html')):
    s=parse(path.read_text())
    if not s.head or not s.body: continue
    route=route_for(path); is_home=route=='/'; is_bank=route=='/bank-statement-loans.html'
    for item in patches.get('inlineScripts',[]):
        if item['route']!=route:continue
        matching=[n for n in s.select('script:not([src])') if hashlib.sha256(n.get_text().encode()).hexdigest()==item['originalScriptSha256']]
        replacement_text=(ROOT/item['replacementFile']).read_text()
        if not matching and sum(n.get_text()==replacement_text for n in s.select('script:not([src])'))==1:continue
        if len(matching)!=1:raise ValueError('Calculator script hash mismatch: '+route)
        matching[0].string=replacement_text
    classes=s.body.get('class',[])
    if 'orchestration-page' not in classes: classes+=['orchestration-page']
    if not is_home and not is_bank and 'legacy-page' not in classes: classes+=['legacy-page']
    s.body['class']=classes; s.body['data-palette']='tiffany-original'; s.body['data-preview-only']='true'
    if is_home and 'tiffany-home' not in classes: classes.append('tiffany-home')
    for node in list(s.find_all(['header','footer'])):
        if not node.find_parent('main'): node.decompose()
    for node in list(s.select('.migration-preview')): node.decompose()
    for node in list(s.select('link')):
        href=node.get('href','')
        if (href.startswith(('https:','http:','//')) and any(x in node.get('rel',[]) for x in ['stylesheet','preconnect','preload'])) or href.split('?')[0] in ['/styles.css','/orchestration.css','/styer-visual-overhaul.css','/homepage-visual.css','/navigation.css']:
            node.decompose()
    # Old no-JS header fallback conflicts with the shared component's fallback.
    for node in list(s.select('noscript')):
        if node.style and '#nav' in node.get_text(): node.decompose()
    main=s.main
    if not main: continue
    if not main.get('id'): main['id']='main'
    if is_home:
        # Retain the ledger-generated contextual directory after the six sections.
        extras=''.join(str(n) for n in main.select(':scope > .migration-links, :scope > .migration-parent'))
        main.clear();append_html(main,(C/'home.html').read_text()+extras)
    if is_bank and not s.select_one('#bank-income-example'):
        block=parse((C/'bank-calculation.html').read_text()).section
        anchor=s.select_one('#underwriting-guide');anchor.insert_before(block)
    if is_bank:
        updated=parse((C/'home.html').read_text()).select_one('#scenario-review')
        append_html(updated,'<span id="quick-options"></span>')
        s.select_one('#scenario-review').replace_with(updated)
    if route=='/asset-depletion-calculator.html' and (C/'calculator.html').exists():
        replacement=parse((C/'calculator.html').read_text()).main
        main.replace_with(replacement);main=replacement
    if route=='/high-net-worth-mortgage.html':
        replacement=parse((C/'high-net-worth.html').read_text()).main
        main.replace_with(replacement);main=replacement
    # Replace only navigation breadcrumbs. Technical main content remains intact.
    for node in list(main.select('nav.breadcrumb, nav.breadcrumbs, .premium-breadcrumbs, .breadcrumb, .breadcrumbs, .city-breadcrumb, nav[aria-label="Breadcrumb"]')):
        if node.parent: node.decompose()
    if not is_home:
        chain=crumbs(route)
        markup='<nav class="ledger-breadcrumb" aria-label="Breadcrumb"><ol>'
        for item in chain[:-1]: markup+='<li><a href="'+escape(item['route'],quote=True)+'">'+escape(item['label'])+'</a></li>'
        markup+='<li aria-current="page">'+escape(chain[-1]['label'])+'</li></ol></nav>'
        main.insert(0,parse(markup).nav)
    for node in list(s.select('a.skip, a.skip-link')):
        if not node.find_parent('main'): node.decompose()
    skip=s.new_tag('a',href='#'+main['id']);skip['class']='skip';skip.string='Skip to content';s.body.insert(0,skip)
    main.insert_before(parse(header).header)
    main.insert_after(parse(footer).footer)
    row=ROWS.get(route,{})
    cluster=row.get('cluster','')
    active='invest' if cluster.startswith('Cluster 3') else 'buy' if cluster.startswith(('Cluster 1','Cluster 2','Cluster 4')) else 'resources'
    if any(x in route for x in ['refinance','home-equity','cash-out']) and not cluster.startswith('Cluster 3'):active='refinance'
    s.body['data-active-nav']=active
    for a in s.select('.site-header a[href]'):
        if a['href']==route: a['aria-current']='page'
    # Exact ledger anchors remain in contextual content, independent of short menus.
    missing=[]
    for child in MANIFEST['routes']:
        if child['primary_parent']!=route:continue
        target='/' if child['route']=='/index.html' else child['route']+'.html' if child['route'].endswith('buy-before-you-sell-austin-tx') else child['route']
        if not any(a.get('href')==target and a.get_text(' ',strip=True)==child['anchor'] for a in main.select('a[href]')):
            missing.append('<li><a href="'+escape(target,quote=True)+'">'+escape(child['anchor'])+'</a></li>')
    if missing:append_html(main,'<details class="migration-links"><summary>Related guides and next steps</summary><ul>'+''.join(missing)+'</ul></details>')
    for old in list(s.select('#contact, #info')): old.decompose()
    append_html(s.body,contact)
    if route=='/dscr-calculator.html':
        note=s.select_one('[data-calculator-actions] + .experience-calculator-note')
        if note:note.string='Saving is unavailable in this local preview. Your calculation is still shown on this page.'
    core=['preview-safety.js','script.js','interaction.js','navigation.js','ui-polish.js']
    for node in list(s.select('script[src]')):
        if urlsplit(node['src']).path.split('/')[-1] in core: node.decompose()
    for src in core: append_html(s.body,'<script src="/'+src+'" defer></script>')
    for href in ['/styles.css','/orchestration.css','/navigation.css']:
        append_html(s.head,'<link rel="stylesheet" href="'+href+'">')
    # Existing content metadata remains; breadcrumb schema follows the visible chain.
    for node in list(s.select('script[type="application/ld+json"]')):
        data=json.loads(node.string or node.get_text());clean=without_breadcrumbs(data)
        if clean is None: node.decompose()
        else: node.string=json.dumps(clean,ensure_ascii=False)
    if not is_home:
        data={'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':x['label'],'item':'https://styermortgage.com'+x['route']} for i,x in enumerate(crumbs(route))]}
        append_html(s.head,'<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False)+'</script>')
    if is_home:
        for node in list(s.select('script[type="application/ld+json"]')):
            if json.loads(node.string or node.get_text()).get('@type')=='FAQPage':node.decompose()
        entries=[{'@type':'Question','name':d.summary.get_text(' ',strip=True),'acceptedAnswer':{'@type':'Answer','text':d.p.get_text(' ',strip=True)}} for d in s.select('#faq details')]
        append_html(s.head,'<script type="application/ld+json">'+json.dumps({'@context':'https://schema.org','@type':'FAQPage','mainEntity':entries})+'</script>')
    # Short intake replaces long journey questionnaires, not calculator controls.
    for form in list(s.select('main form.journey-form')):
        prefix=form.get('id','scenario')
        form.clear();form['data-preview-inquiry']='true';form['action']='#'
        form.attrs.pop('data-journey',None);form.attrs.pop('data-journey-mode',None)
        append_html(form,'<p>Use sample details in this preview. Nothing is sent or saved.</p>'
          +'<label for="'+prefix+'-name">Your name *</label><input id="'+prefix+'-name" name="name" required maxlength="160" autocomplete="off">'
          +'<label for="'+prefix+'-email">Email *</label><input id="'+prefix+'-email" name="email" type="email" required maxlength="160" autocomplete="off">'
          +'<label for="'+prefix+'-phone">Phone (optional)</label><input id="'+prefix+'-phone" name="phone" type="tel" maxlength="30" autocomplete="off">'
          +'<label for="'+prefix+'-message">What would you like me to review? (optional)</label><textarea id="'+prefix+'-message" name="message" rows="3" maxlength="2000"></textarea>'
          +'<button type="submit" class="button button--primary">Preview My Scenario Review</button>')
    for button in s.select('.button--primary'):
        button['class']=list(dict.fromkeys(button.get('class',[])+['gold']))
    for button in s.select('.button--secondary'):
        button['class']=list(dict.fromkeys(button.get('class',[])+['outline']))
    text=str(s).replace('adam@styerteam.com','adam@thestyerteam.com')
    path.write_text(text);files.append(path.relative_to(OUT).as_posix())

shutil.copy2(C/'tiffany-reference.css',OUT/'styles.css')

# Align structured FAQ answers with visible text. Immutable before/after JSON
# protects against applying a stale editorial correction to different content.
faq_log=[]; faq_updates=C/'faq-schema-updates.json'
if faq_updates.exists():
    pattern=re.compile(r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)([\s\S]*?)(</script>)',re.I)
    for update in json.loads(faq_updates.read_text()):
        path=OUT/update['file'];text=path.read_text();matches=list(pattern.finditer(text))
        target=[m for m in matches if json.loads(m.group(2))==update['before']]
        if len(target)!=1:
            if update['after'] is None and not target:continue
            if any(json.loads(m.group(2))==update['after'] for m in matches):continue
            raise ValueError('FAQ schema baseline changed: '+update['file'])
        m=target[0]
        replacement=m.group(1)+json.dumps(update['after'],ensure_ascii=False).replace('</','<\\/')+m.group(3) if update['after'] is not None else ''
        path.write_text(text[:m.start()]+replacement+text[m.end():])
        faq_log.append({'file':update['file'],'reason':update['reason'],'before':update['before'],'after':update['after']})
(ROOT/'qa/faq-sync-apply-log.json').write_text(json.dumps({'local_only':True,'visible_body_changes':0,'changes':faq_log},indent=2))
(C/'bank-statement.html').write_text(str(parse((OUT/'bank-statement-loans.html').read_text()).main))
record={'mode':'LOCAL ONLY — ZERO DEPLOYMENT','routes':len(ROWS),'html_files':len(files),'baseline':str(BASE),'excluded_nonledger_utilities':excluded,'removed_non_calculator_scripts':removed_scripts,'legacy_css_fix':'Original Tiffany reference stylesheet copied byte-for-byte; authored page CSS restored','palette':'tiffany-original','live_routing_changed':False,'components':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in C.iterdir() if p.is_file()}}
(ROOT/'build-record.json').write_text(json.dumps(record,indent=2))
print(json.dumps({'html_files':len(files),'ledger_routes':len(ROWS),'output':str(OUT),'deployment':False}))
