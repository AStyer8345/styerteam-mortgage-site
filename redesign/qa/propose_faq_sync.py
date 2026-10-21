"""Read-only FAQ/JSON-LD reconciliation proposals. Never changes site files."""
from pathlib import Path
from bs4 import BeautifulSoup
import re,json,copy,difflib

ROOT=Path(__file__).resolve().parent.parent

def plain(text):
 text=re.sub(r'\s+',' ',text).strip()
 return re.sub(r'\s+([.,;:!?])',r'\1',text)
def key(text):
 text=text.replace('’',"'").replace('‘',"'").replace('“','"').replace('”','"')
 return re.sub(r'[^a-z0-9]+',' ',text.lower()).strip()
def clean_text(node):
 x=copy.copy(node)
 for t in x.select('[aria-hidden="true"],.faq-icon,script,style'):t.decompose()
 return plain(x.get_text(' ',strip=True))
def questions(node):
 if isinstance(node,list):
  for n in node:yield from questions(n)
 elif isinstance(node,dict):
  if node.get('@type')=='FAQPage':
   for q in node.get('mainEntity',[]):yield q
  if '@graph' in node:yield from questions(node['@graph'])

def extract_pairs(s):
 pairs=[];seen=set()
 def add(q,a,method):
  qt=clean_text(q);at=clean_text(a)
  if not qt or not at or not qt.endswith('?'):return
  pair=(key(qt),at)
  if pair in seen:return
  seen.add(pair);pairs.append({'question':qt,'answer':at,'method':method})
 for card in s.select('.accordion-item,.faq-item,.lp-faq-item,.rc-faq-item,.blog-faq-item'):
  q=card.select_one('.accordion-button,.faq-question,.lp-faq-q,h3,h4')
  if not q:continue
  a=card.select_one('.accordion-body,.accordion-content,.faq-answer,.lp-faq-a')
  if a is not None:add(q,a,'explicit FAQ/accordion group')
  else:
   ac=copy.copy(card)
   qc=ac.select_one('.accordion-button,.faq-question,.lp-faq-q,h3,h4')
   if qc:qc.decompose()
   add(q,ac,'explicit FAQ group heading plus answer')
 for card in s.find_all('details'):
  q=card.find('summary',recursive=False)
  if not q or not clean_text(q).endswith('?'):continue
  ac=copy.copy(card);ac.find('summary',recursive=False).decompose()
  add(q,ac,'native FAQ disclosure')
 # Two historical Realtor newsletters use explicit Q/A paragraphs under this heading.
 for heading in s.find_all(['h2','h3','h4']):
  if not re.search(r'(common|frequently asked) questions',clean_text(heading),re.I):continue
  siblings=[x for x in heading.next_siblings if getattr(x,'name',None)]
  for i,q in enumerate(siblings):
   if q.name in ['h1','h2','h3','h4','h5','h6']:break
   if q.name!='p' or not clean_text(q).endswith('?'):continue
   if i+1<len(siblings) and siblings[i+1].name=='p' and not clean_text(siblings[i+1]).endswith('?'):add(q,siblings[i+1],'explicit Q/A paragraphs under Common questions heading')
 return pairs

def question_heading_pairs(s):
 """Visible question headings with their following bounded explanatory content."""
 pairs=[]
 for heading in (s.main or s.body).find_all(['h2','h3','h4']):
  qt=clean_text(heading)
  if not qt.endswith('?') or re.search(r'^(ready|want adam|not sure|questions\?|find out|need help|have questions|let.s|get started|curious)',qt,re.I):continue
  if heading.find_parent(['nav','header','footer','details','a','form']):continue
  if any(any('cta' in c.lower() for c in x.get('class',[])) for x in heading.parents if getattr(x,'attrs',None)):continue
  answer=[]
  for sib in heading.next_siblings:
   if getattr(sib,'name',None) in ['h1','h2','h3','h4','h5','h6','dt','section','article','aside','nav','form','footer','header']:break
   if getattr(sib,'name',None):
    if sib.find(['h1','h2','h3','h4','h5','h6','form','nav']):break
    if sib.select('.button,.btn,.journey-button'):break
    answer.append(str(sib))
  if answer:
   at=clean_text(BeautifulSoup(''.join(answer),'html.parser'))
   if len(at)>=40:pairs.append({'question':qt,'answer':at,'method':'visible question heading and bounded following explanatory content'})
 return pairs

def source_question_pairs(s,known):
 """Only exact normalized heading matches; no topic similarity substitutions."""
 pairs=[]
 for heading in s.find_all(['h2','h3','h4','h5','dt']):
  qt=clean_text(heading)
  if key(qt) not in known:continue
  answer=[]
  for sib in heading.next_siblings:
   if getattr(sib,'name',None) in ['h1','h2','h3','h4','h5','h6','dt','section','article','aside','nav','form','footer','header']:break
   if getattr(sib,'name',None):
    if sib.find(['h1','h2','h3','h4','h5','h6']):break
    answer.append(str(sib))
  if answer:
   at=clean_text(BeautifulSoup(''.join(answer),'html.parser'))
   if at:pairs.append({'question':qt,'answer':at,'method':'exact question heading and following same-section content'})
 return pairs

def generate():
 audit=json.loads((ROOT/'qa/seo-aeo-audit.json').read_text());pages=[]
 for row in audit['files']:
  if not any(not q['answer_in_delivered_html'] for q in row.get('faq_matches',[])):continue
  p=ROOT/'site'/row['source_file'];s=BeautifulSoup(p.read_text(),'html.parser')
  originals=[]
  for script in s.select('script[type="application/ld+json"]'):
   originals.extend(questions(json.loads(script.get_text())))
  dom=extract_pairs(s);known={key(q['name']) for q in originals}
  for pair in question_heading_pairs(s):
   if not any(key(x['question'])==key(pair['question']) for x in dom):dom.append(pair)
  for pair in source_question_pairs(s,known):
   if not any(key(x['question'])==key(pair['question']) for x in dom):dom.append(pair)
  record={'route':row['route'],'file':row['source_file'],'original_schema_questions':len(originals),'dom_faq_pairs':dom,'safe_exact_question_answer_updates':[],'unresolved_schema_questions':[]}
  visible=plain(s.body.get_text(' ',strip=True))
  for q in originals:
   old=q.get('acceptedAnswer',{}).get('text','');oldplain=plain(BeautifulSoup(old,'html.parser').get_text(' ',strip=True))
   if oldplain in visible:continue
   candidates=[x for x in dom if key(x['question'])==key(q['name'])]
   unique={x['answer']:x for x in candidates}
   if len(unique)==1:
    pair=next(iter(unique.values()))
    record['safe_exact_question_answer_updates'].append({'question':q['name'],'old_answer':old,'new_answer':pair['answer'],'visible_question':pair['question'],'method':pair['method']})
   else:
    scored=sorted([(difflib.SequenceMatcher(None,key(q['name']),key(x['question'])).ratio(),x) for x in dom],key=lambda x:x[0],reverse=True)
    record['unresolved_schema_questions'].append({'question':q['name'],'old_answer':old,'reason':'No exact unambiguous visible question/answer pair','closest_visible_candidates':[{'similarity':round(score,3),**pair} for score,pair in scored[:2]]})
  pages.append(record)
 summary={'pages_with_source_nonverbatim_faq':len(pages),'safe_exact_question_answer_updates':sum(len(x['safe_exact_question_answer_updates']) for x in pages),'unresolved_schema_questions':sum(len(x['unresolved_schema_questions']) for x in pages),'pages_with_unresolved_questions':sum(bool(x['unresolved_schema_questions']) for x in pages)}
 result={'scope':'Read-only proposals. Exact-question updates derive answers solely from delivered HTML. Approximate candidates are review suggestions, not approved updates.','summary':summary,'pages':pages}
 (ROOT/'qa/faq-sync-proposals.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(summary))

if __name__=='__main__':generate()
