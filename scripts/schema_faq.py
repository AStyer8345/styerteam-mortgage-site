import re
from bs4 import BeautifulSoup

def text(el):
 if el is None:return ''
 el=BeautifulSoup(str(el),'html.parser')
 for n in el.select('.gorascal-visually-hidden,.sr-only,[aria-hidden=true]'):n.decompose()
 return re.sub(r'\s+',' ',el.get_text(' ',strip=True)).strip()

def faqs(d):
 out=[]
 for item in d.select('details:has(> summary),.accordion-item,.faq-item,.lp-faq-item'):
  if item.find_parent('form'):continue
  q=item.select_one('summary,.accordion-button,.faq-question,.lp-faq-q,h3,h4,span')
  a=item.select_one('.u-faq-answer,.faq-answer,.accordion-content,.lp-faq-a')
  if q is None:continue
  if item.name=='details' and not re.search(r'\?\s*[+−–]?$',text(q)) and not any('faq' in str(v).lower() for v in item.get('class',[])):continue
  if a is None:
   a=BeautifulSoup(str(item),'html.parser');x=a.select_one('summary,.accordion-button,.faq-question,.lp-faq-q,h3,h4')
   if x:x.decompose()
  name,answer=re.sub(r'\s*[+−–]\s*$','',text(q)),text(a)
  if answer==name:answer=''
  if name and answer and name not in [v['name'] for v in out]:out.append({'@type':'Question','name':name,'acceptedAnswer':{'@type':'Answer','text':answer}})
 # Heading FAQs: an FAQ h2 followed by question headings and answer paragraphs.
 # This covers posts whose FAQ is not the first h2 in the article section.
 if not out:
  for h2 in d.find_all('h2'):
   if not re.search(r'FAQ|frequently asked',text(h2),re.I):continue
   for q in h2.find_all_next(['h2','h3','h4']):
    if q.name=='h2':break
    name=re.sub(r'\s*[+−–]\s*$','',text(q))
    if not re.search(r'\?\s*$',name):continue
    answer=''
    for sibling in q.next_siblings:
     if getattr(sibling,'name',None) in ['h2','h3','h4','hr']:break
     if getattr(sibling,'name',None)=='p':
      answer=text(sibling);break
     if getattr(sibling,'name',None):break
    if answer==name:answer=''
    if name and answer and name not in [v['name'] for v in out]:out.append({'@type':'Question','name':name,'acceptedAnswer':{'@type':'Answer','text':answer}})
 # Legacy FAQs use headings and paragraphs inside a section whose first h2 is the FAQ.
 if not out:
  for section in [s for s in d.select('section') if s.select_one('h2') and re.search(r'FAQ|frequently asked',text(s.select_one('h2')),re.I)]:
   for q in section.select('h3,h4'):
    parts=[]
    for sibling in q.next_siblings:
     if getattr(sibling,'name',None) in ['h2','h3','h4']:break
     if getattr(sibling,'name',None):parts.append(text(sibling))
    answer=' '.join(x for x in parts if x)
    name=re.sub(r'\s*[+−–]\s*$','',text(q))
    if answer==name:answer=''
    if name and answer and name not in [v['name'] for v in out]:out.append({'@type':'Question','name':name,'acceptedAnswer':{'@type':'Answer','text':answer}})
 return out
