"""Plan-only by default. Root may apply reviewed, hash-guarded JSON-LD changes.

Only script contents change; visible HTML, CSS, JS, forms, and backend routing do not.
FAQ @id/context/other graph fields survive. Original complete JSON-LD is archived.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import json,re,hashlib,copy,argparse
from propose_faq_sync import extract_pairs,question_heading_pairs,source_question_pairs,questions,key,plain

ROOT=Path(__file__).resolve().parent.parent
SCRIPT=re.compile(r'(<script\b[^>]*\btype\s*=\s*["\']application/ld\+json["\'][^>]*>)([\s\S]*?)(</script>)',re.I)
def nodes(value):
 if isinstance(value,list):
  for x in value:yield from nodes(x)
 elif isinstance(value,dict):
  if value.get('@type')=='FAQPage':yield value
  if '@graph' in value:yield from nodes(value['@graph'])

def make_plan():
 audit=json.loads((ROOT/'qa/seo-aeo-audit.json').read_text());plan=[];manual=[];archive=[]
 for row in audit['files']:
  p=ROOT/'site'/row['source_file'];text=p.read_text();s=BeautifulSoup(text,'html.parser');matches=list(SCRIPT.finditer(text))
  scripts=[json.loads(m.group(2)) for m in matches];faq=[x for doc in scripts for x in nodes(doc)]
  if not faq:continue
  archive.append({'file':row['source_file'],'sha256':hashlib.sha256(text.encode()).hexdigest(),'original_complete_jsonld':scripts})
  if not any(not q['answer_in_delivered_html'] for q in row.get('faq_matches',[])):continue
  if len(faq)!=1:manual.append({'file':row['source_file'],'reason':'Multiple FAQPage graphs need individual ownership review','count':len(faq)});continue
  pairs=extract_pairs(s);known={key(q['name']) for q in faq[0].get('mainEntity',[])}
  # Prefer the page's explicit FAQ inventory; do not add unrelated body/CTA headings.
  if not pairs:
   for pair in question_heading_pairs(s)+source_question_pairs(s,known):
    if not any(key(x['question'])==key(pair['question']) for x in pairs):pairs.append(pair)
  conflicts={key(x['question']) for x in pairs if len({y['answer'] for y in pairs if key(x['question'])==key(y['question'])})>1}
  if conflicts:manual.append({'file':row['source_file'],'reason':'Conflicting delivered answers for the same normalized question','questions':sorted(conflicts)});continue
  if not pairs:manual.append({'file':row['source_file'],'reason':'No identifiable visible FAQ or bounded question/answer group; root manual ruling required','original_mainEntity':faq[0].get('mainEntity',[])});continue
  body=plain(s.body.get_text(' ',strip=True))
  if any(plain(x['answer']) not in body for x in pairs):manual.append({'file':row['source_file'],'reason':'An extracted answer failed exact delivered-text verification'});continue
  replacement=[{'@type':'Question','name':pair['question'],'acceptedAnswer':{'@type':'Answer','text':pair['answer']}} for pair in pairs]
  newdocs=copy.deepcopy(scripts)
  for doc in newdocs:
   for graph in nodes(doc):graph['mainEntity']=replacement
  changes=[{'script_index':i,'old_jsonld':old,'new_jsonld':new} for i,(old,new) in enumerate(zip(scripts,newdocs)) if old!=new]
  oldqs={q['name'] for q in faq[0].get('mainEntity',[])};newqs={q['name'] for q in replacement}
  plan.append({'file':row['source_file'],'route':row['route'],'sha256_before':hashlib.sha256(text.encode()).hexdigest(),'old_question_count':len(faq[0].get('mainEntity',[])),'new_question_count':len(replacement),'old_question_names_not_in_visible_inventory':sorted(oldqs-newqs),'new_visible_question_names':sorted(newqs-oldqs),'extraction_evidence':pairs,'changes':changes})
 out={'mode':'Planned only until explicitly invoked with --apply','summary':{'planned_pages':len(plan),'manual_pages':len(manual),'original_schema_files_archived':len(archive)},'pages':plan,'manual_review':manual}
 (ROOT/'qa/faq-sync-plan.json').write_text(json.dumps(out,indent=2)+'\n')
 (ROOT/'qa/faq-original-schema-archive.json').write_text(json.dumps({'source':'Assembled local full-site build before FAQ synchronization','files':archive},indent=2)+'\n')
 print(json.dumps(out['summary']))

def apply_plan():
 plan=json.loads((ROOT/'qa/faq-sync-plan.json').read_text());loaded=[]
 # Validate all hashes before mutating any file.
 for item in plan['pages']:
  p=ROOT/'site'/item['file'];text=p.read_text();sha=hashlib.sha256(text.encode()).hexdigest()
  if sha!=item['sha256_before']:raise SystemExit('Hash changed; regenerate plan before applying: '+item['file'])
  matches=list(SCRIPT.finditer(text))
  for change in item['changes']:
   if json.loads(matches[change['script_index']].group(2))!=change['old_jsonld']:raise SystemExit('JSON-LD baseline changed: '+item['file'])
  loaded.append((item,p,text,matches))
 log=[]
 for item,p,text,matches in loaded:
  for change in sorted(item['changes'],key=lambda c:c['script_index'],reverse=True):
   m=matches[change['script_index']];new=json.dumps(change['new_jsonld'],ensure_ascii=False).replace('</','<\\/')
   text=text[:m.start(2)]+new+text[m.end(2):]
  p.write_text(text)
  log.append({'file':item['file'],'sha256_before':item['sha256_before'],'sha256_after':hashlib.sha256(text.encode()).hexdigest(),'old_question_count':item['old_question_count'],'new_question_count':item['new_question_count'],'changes':item['changes']})
 (ROOT/'qa/faq-sync-apply-log.json').write_text(json.dumps({'local_only':True,'body_changes':0,'files':log,'manual_review':plan['manual_review']},indent=2)+'\n')
 print(json.dumps({'applied_pages':len(log),'manual_pages':len(plan['manual_review']),'visible_body_changes':0}))

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--apply',action='store_true');args=p.parse_args()
 apply_plan() if args.apply else make_plan()
