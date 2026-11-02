"""Read-only checks for the public business graph and visible FAQ evidence.
Install maintenance dependencies with: pip install -r scripts/schema-requirements.txt
"""
import json,re,subprocess
from pathlib import Path
from bs4 import BeautifulSoup
from schema_faq import FAQ_SCHEMA_SKIP,faqs,text
root=Path(__file__).resolve().parents[1]
private=set(json.loads((root/'scripts/admin-paths.json').read_text()))|{'loanos.html','loanos-waitlist.html'}
shared=json.loads((root/'config/business-entities.json').read_text())
ORG='https://styerteam.com/#organization';ADAM='https://styerteam.com/#adam';WEB='https://styerteam.com/#website'
banned=re.compile(r'\bpre-approv\w*|1,000\+\s+loans|more than 1,000 transactions|rates?\s+0\.5[–-]0\.75%|within 0\.125[–-]0\.25%|Rate Cuts Below 6%|\$200/month savings|across the country',re.I)
failures=[];pages=blocks=faqpages=questions=0
for rel in subprocess.check_output(['git','ls-files','*.html'],cwd=root,text=True).splitlines():
 if rel.startswith(('design-review/','_deliverables/','netlify/')) or rel in private:continue
 d=BeautifulSoup((root/rel).read_text(),'html.parser')
 if not d.select_one('link[rel=canonical]'):continue
 pages+=1;nodes=[]
 for script in d.select('script[type="application/ld+json"]'):
  blocks+=1
  try:
   data=json.loads(script.string or script.get_text());nodes+=data.get('@graph',[data])
  except Exception as e:failures.append(f'{rel}: JSON parse error: {e}');continue
  if re.search(r'https?://(?:www\.)?thestyerteam\.com',script.get_text()):failures.append(f'{rel}: retired domain in JSON-LD')
 if not nodes:failures.append(f'{rel}: missing JSON-LD');continue
 for expected in shared:
  found=[n for n in nodes if n.get('@id')==expected['@id']]
  if found!=[expected]:failures.append(f'{rel}: shared identity differs or duplicated: {expected["@id"]}')
 visible=BeautifulSoup(str(d),'html.parser')
 for x in visible.select('script,style,head,.gorascal-visually-hidden,.sr-only,[aria-hidden=true]'):x.decompose()
 visible_text=text(visible)
 faqnodes=[n for n in nodes if n.get('@type')=='FAQPage']
 qs=[] if rel in FAQ_SCHEMA_SKIP else faqs(d)
 if qs and len(faqnodes)!=1:failures.append(f'{rel}: visible FAQ lacks one FAQPage')
 for faq in faqnodes:
  faqpages+=1;questions+=len(faq.get('mainEntity',[]))
  if faq.get('mainEntity')!=qs:failures.append(f'{rel}: FAQ differs from visible questions and answers')
  for q in faq.get('mainEntity',[]):
   if q['name'] not in visible_text or q['acceptedAnswer']['text'] not in visible_text:failures.append(f'{rel}: FAQ lacks contiguous visible-text evidence: {q["name"]}')
 def walk(v):
  if isinstance(v,list):
   for n in v:walk(n)
  elif isinstance(v,dict):
   types=v.get('@type',[]);types=types if isinstance(types,list) else [types]
   if 'Article' in types:
    if v.get('author')!={'@id':ADAM} or v.get('publisher')!={'@id':ORG}:failures.append(f'{rel}: article identity reference')
   if 'Service' in types and v.get('provider')!={'@id':ORG}:failures.append(f'{rel}: service provider identity')
   if 'Person' in types and v.get('name')=='Adam Styer' and v.get('jobTitle')!='Senior Loan Officer':failures.append(f'{rel}: Adam job title')
   if v.get('address') and v.get('@id')!=ORG:failures.append(f'{rel}: address on another entity')
   if v.get('geo'):failures.append(f'{rel}: business geo coordinates')
   if any(k in v for k in ['aggregateRating','review']):failures.append(f'{rel}: review markup')
   for x in v.get('sameAs',[]):
    if re.search(r'adamstyerloans|google.com/maps/search',str(x),re.I):failures.append(f'{rel}: removed sameAs identity')
   for value in v.values():walk(value)
  elif isinstance(v,str) and not re.match(r'https?://',v) and banned.search(v):failures.append(f'{rel}: banned schema wording: {banned.search(v)[0]}')
 walk(nodes)
 for match in banned.finditer(visible_text):failures.append(f'{rel}: banned wording: {match[0]}')
 if re.search(r"\['\s*<details|\\n\s*<summary",(root/rel).read_text()):failures.append(f'{rel}: Python-list FAQ serialization')
 if rel=='dscr-loans-texas.html':
  a=next((n for n in nodes if n.get('@type')=='Article'),{})
  if not all(a.get(k) for k in ['image','datePublished','dateModified']):failures.append(f'{rel}: missing article metadata')
 if rel in ['bank-statement-loans.html','self-employed-mortgage-austin.html','high-net-worth-mortgage.html','loans/jumbo.html']:
  if not any(n.get('@type')=='BreadcrumbList' for n in nodes):failures.append(f'{rel}: missing breadcrumb')
  services=[n for n in nodes if n.get('@type')=='Service']
  if not services or any(n.get('provider')!={'@id':ORG} or n.get('broker')!={'@id':ADAM} for n in services):failures.append(f'{rel}: missing linked service')
print(json.dumps({'pages':pages,'blocks':blocks,'faqPages':faqpages,'questions':questions,'failures':failures},indent=2))
raise SystemExit(bool(failures))
