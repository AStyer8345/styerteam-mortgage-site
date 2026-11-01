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
   a=BeautifulSoup(str(item),'html.parser');x=a.select_one('summary,.faq-question,h3,h4')
   if x:x.decompose()
  name,answer=text(q),text(a)
  if name and answer and name not in [v['name'] for v in out]:out.append({'@type':'Question','name':name,'acceptedAnswer':{'@type':'Answer','text':answer}})
 # Legacy FAQs use headings and paragraphs inside a section named faq.
 if not out:
  for section in [s for s in d.select('section') if s.select_one('h2') and re.search(r'FAQ|frequently asked',text(s.select_one('h2')),re.I)]:
   for q in section.select('h3,h4'):
    parts=[]
    for sibling in q.next_siblings:
     if getattr(sibling,'name',None) in ['h2','h3','h4']:break
     if getattr(sibling,'name',None):parts.append(text(sibling))
    answer=' '.join(x for x in parts if x)
    if answer:out.append({'@type':'Question','name':text(q),'acceptedAnswer':{'@type':'Answer','text':answer}})
 return out
