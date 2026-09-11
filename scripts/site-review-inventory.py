"""Inventory every tracked HTML route and audit authored destinations without requests."""
import json, re, subprocess, sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1])
OUTPUT.mkdir(parents=True, exist_ok=True)
INTERNAL = {'dashboard.html','loan-dashboard.html','loanos.html','loanos-waitlist.html',
            'marketing-command-center.html','marketing-content.html','ops.html',
            'task-dashboard.html','forms.html','googlea3d746ce1ceb4bff.html','scenarios/_TEMPLATE.html'}

class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.links=[]; self.assets=[]; self.ids=set(); self.base=None
        self.styles=[]; self.canonical=None; self.body=''; self.robots=''
        self.feed(source)
    def handle_starttag(self, tag, pairs):
        a=dict(pairs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='base': self.base=a.get('href')
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag in ['img','script'] and a.get('src'): self.assets.append(a['src'])
        if tag=='link' and a.get('rel')=='stylesheet': self.styles.append(a.get('href')); self.assets.append(a.get('href'))
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href')
        if tag=='body': self.body=a.get('class','')
        if tag=='meta' and a.get('name')=='robots': self.robots=a.get('content','')

files=[f for f in subprocess.check_output(['git','ls-files'],cwd=ROOT,text=True).splitlines() if f.endswith('.html')]
docs={f:Document((ROOT/f).read_text()) for f in files}
pages=[]; broken=[]; external=set()
for file, doc in docs.items():
    pages.append(dict(route=file,public=file not in INTERNAL,body=doc.body,styles=doc.styles,
                      canonical=doc.canonical,robots=doc.robots,
                      excludedReason='Internal tool, form registry, verification file or publishing template' if file in INTERNAL else None))
    if file in INTERNAL: continue
    base=urljoin('https://styermortgage.com/'+file,doc.base or '')
    for kind, destinations in [('link',doc.links),('asset',doc.assets)]:
        for href in destinations:
            url=urlsplit(urljoin(base,href))
            if url.scheme not in ['http','https']: continue
            if url.netloc not in ['styermortgage.com','www.styermortgage.com']:
                if kind=='link': external.add(url._replace(fragment='').geturl())
                continue
            target=unquote(url.path).lstrip('/') or 'index.html'
            if target.endswith('/'): target+='index.html'
            if not (ROOT/target).exists() and not Path(target).suffix: target+='.html'
            if not (ROOT/target).exists(): broken.append(dict(page=file,href=href,kind=kind,reason='missing file',target=target))
            elif url.fragment and kind=='link' and target in docs and unquote(url.fragment) not in docs[target].ids:
                broken.append(dict(page=file,href=href,kind=kind,reason='missing anchor',target=target))
(OUTPUT/'inventory.json').write_text(json.dumps(pages,indent=2)+'\n')
(OUTPUT/'authored-links.json').write_text(json.dumps(broken,indent=2)+'\n')
(OUTPUT/'external-links.json').write_text(json.dumps(sorted(external),indent=2)+'\n')
print(json.dumps(dict(html=len(files),public=sum(p['public'] for p in pages),authoredIssues=len(broken),external=len(external))))
