import sys,json,re,ast,subprocess
# Install optional maintenance dependencies: pip install -r scripts/schema-requirements.txt
from pathlib import Path
from bs4 import BeautifulSoup
from schema_faq import faqs, text
root=Path(__file__).resolve().parents[1]
HOST='https://styerteam.com';ORG=HOST+'/#organization';ADAM=HOST+'/#adam';WEB=HOST+'/#website'
shared=json.loads((root/'config/business-entities.json').read_text())
script=re.compile(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',re.I|re.S)
private=set(json.loads((root/'scripts/admin-paths.json').read_text()));special=['bank-statement-loans.html','self-employed-mortgage-austin.html','high-net-worth-mortgage.html','loans/jumbo.html']
summary=[]
for rel in subprocess.check_output(['git','ls-files','*.html'],cwd=root,text=True).splitlines():
 if rel.startswith(('design-review/','_deliverables/','netlify/')):continue
 if rel in private or rel in ['loanos.html','loanos-waitlist.html']:continue
 f=root/rel;s=f.read_text();d=BeautifulSoup(s,'html.parser');canonical_tag=d.select_one('link[rel=canonical]')
 if not canonical_tag:continue
 canonical=canonical_tag['href'];canonical=canonical.replace('https://thestyerteam.com','https://styerteam.com'); title=text(d.select_one('h1')) or text(d.title)
 # Repair the generated Python list as actual HTML, preserving all the FAQ content.
 for line in s.splitlines():
  if line.lstrip().startswith("['") and '<details' in line:
   s=s.replace(line,'\n'.join(ast.literal_eval(line.strip())))
 d=BeautifulSoup(s,'html.parser');qs=faqs(d);old=[]
 for m in script.finditer(s):
  data=json.loads(m[1]);old.extend(data if isinstance(data,list) else data.get('@graph',[data]))
 def clean(v,key=''):
  if isinstance(v,str):
   v=re.sub(r'https?://(?:www\.)?thestyerteam\.com',HOST,v)
   v=re.sub(re.escape(HOST)+r'/#(?:business|organization|financial-service)\b',ORG,v)
   v=re.sub(re.escape(HOST)+r'/#adam-styer\b',ADAM,v)
   return v
  if isinstance(v,list):return [clean(x,key) for x in v if not (key=='sameAs' and re.search(r'linkedin\.com/in/adamstyerloans|google\.com/maps/search',str(x),re.I))]
  if not isinstance(v,dict):return v
  ts=v.get('@type',[]);ts=ts if isinstance(ts,list) else [ts]
  if ('Person' in ts and 'Adam' in v.get('name','')) or key=='author':return {'@id':ADAM}
  if ('FinancialService' in ts or 'ProfessionalService' in ts) or (('Organization' in ts) and ('Styer' in v.get('name','') or 'Rascal' in v.get('name',''))):return {'@id':ORG}
  if 'WebSite' in ts:return {'@id':WEB}
  out={k:clean(x,k) for k,x in v.items() if k not in ['@context','aggregateRating','review']}
  if key in ['provider','publisher','worksFor','broker']:
   if key=='broker':return {'@id':ADAM}
   return {'@id':ORG}
  # No other node represents an office. Regulator credentials retain no employer address.
  if 'address' in out:out.pop('address')
  if 'geo' in out:out.pop('geo')
  if 'Service' in ts:out.update(provider={'@id':ORG},broker={'@id':ADAM},areaServed={'@type':'State','name':'Texas'})
  if 'Article' in ts:out.update(author={'@id':ADAM},publisher={'@id':ORG})
  if any(t in ts for t in ['WebPage','CollectionPage','ContactPage']):out.update(isPartOf={'@id':WEB},publisher={'@id':ORG})
  return out
 nodes=[]
 for v in old:
  if v.get('@type')=='FAQPage':continue
  out=clean(v)
  if set(out)=={'@id'}:continue
  if out.get('@type') in ['Article','WebPage','CollectionPage','ContactPage','FinancialProduct','WebApplication','Service']:
   out['url']=canonical
  if out.get('@type')=='BreadcrumbList' and out.get('itemListElement'):
   out['itemListElement'][-1]['item']=canonical
  nodes.append(out)
 if qs:nodes.append({'@type':'FAQPage','@id':canonical+'#faq','about':{'@id':ORG},'mainEntity':qs})
 if not any(n.get('@type') in ['WebPage','ContactPage','CollectionPage','Article'] for n in nodes):nodes.append({'@type':'WebPage','@id':canonical+'#webpage','url':canonical,'name':title,'isPartOf':{'@id':WEB},'publisher':{'@id':ORG}})
 if rel in special:
  if not any(n.get('@type')=='BreadcrumbList' for n in nodes):nodes.append({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':HOST+'/'},{'@type':'ListItem','position':2,'name':'Mortgage Options','item':HOST+'/products.html'},{'@type':'ListItem','position':3,'name':title,'item':canonical}]})
  if not any(n.get('@type')=='Service' for n in nodes):nodes.append({'@type':'Service','@id':canonical+'#service','name':title,'url':canonical,'provider':{'@id':ORG},'broker':{'@id':ADAM},'areaServed':{'@type':'State','name':'Texas'}})
 if rel=='dscr-loans-texas.html':
  # Use documented repository publication/modification history, never today's date.
  dates=subprocess.check_output(['git','log','--follow','--format=%ad','--date=short','9bcb2d8b','--',rel],cwd=root,text=True).splitlines()
  for n in nodes:
   if n.get('@type')=='Article':n.update(image=HOST+'/assets/og-image.png',datePublished=dates[-1],dateModified=dates[0],author={'@id':ADAM})
 s=script.sub('',s)
 graph={'@context':'https://schema.org','@graph':shared+nodes}
 block='<script type="application/ld+json">\n'+json.dumps(graph,ensure_ascii=False,indent=2).replace('</','<\\/')+'\n</script>\n'
 head,tail=s.split('</head>',1);s=head.rstrip()+'\n'+block+'</head>'+tail
 if '--check' in sys.argv:
  if f.read_text()!=s:raise SystemExit('Stale structured data: '+rel)
 else:f.write_text(s)
 summary.append({'file':rel,'oldBlocks':len(old),'faqs':len(qs),'nodes':len(nodes)})
print(('Checked' if '--check' in sys.argv else 'Normalized'),len(summary),'canonical public HTML pages')
