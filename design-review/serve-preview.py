"""Local-only design review. Source capture contracts remain untouched."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]/'.site-dist'
GUARD='''<meta name="robots" content="noindex,nofollow"><script>
window.dataLayer=[];window.gtag=function(){};
(function(){var original=window.fetch;window.fetch=function(input,init){var method=(init&&init.method)||((input&&input.method)||'GET');if(!/^(GET|HEAD)$/i.test(method)){return Promise.reject(new Error('Local preview: submissions disabled'));}return original.apply(this,arguments);};navigator.sendBeacon=function(){return false;};window.addEventListener('submit',function(e){e.preventDefault();e.stopImmediatePropagation();var status=e.target.querySelector('[role=status]');if(!status){status=document.createElement('p');status.setAttribute('role','status');e.target.appendChild(status);}status.hidden=false;status.textContent='Preview only. No inquiry was sent. Entries may remain in this browser tab.';},true);})();
</script><style>.local-review-note{background:#ECE8DF;color:#142B3A;padding:6px 16px;text-align:center;font:12px/1.5 Inter,Arial,sans-serif}.local-review-note a{color:inherit;text-underline-offset:3px}.premium-homepage .local-review-note{margin:0}</style>'''
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT),**kwargs)
 def translate_path(self,path):
  if path.split("?",1)[0] in ("/__review/campaign/","/__review/campaign/index.html"):
   return str(Path(__file__).resolve().parent/"campaign-index.html")
  return super().translate_path(path)
 def end_headers(self):
  self.send_header('Cache-Control','no-store');self.send_header('X-Robots-Tag','noindex, nofollow');super().end_headers()
 def do_POST(self):
  self.send_error(405,'Local preview: submissions disabled')
 def do_GET(self):
  target=Path(self.translate_path(self.path))
  if target.is_dir():target=target/'index.html'
  if target.suffix=='.html' and target.is_file():
   s=target.read_text()
   s=re.sub(r'<script\b[^>]*>[\s\S]*?</script>',lambda m:'' if any(t in m.group() for t in ['googletagmanager.com','gtag(\'config\'']) else m.group(),s)
   s=re.sub(r'<noscript><iframe[\s\S]*?</iframe></noscript>','',s)
   s=s.replace('<head>','<head>'+GUARD)
   s=re.sub(r'(<body\b[^>]*>)',r'\1<div class="local-review-note">LOCAL DESIGN REVIEW · Forms and chat cannot send data · Live website unchanged · <a href="/__review/campaign/">Internal campaign review</a></div>',s,count=1)
   b=s.encode();self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  else:super().do_GET()
ThreadingHTTPServer(('127.0.0.1',8767),Handler).serve_forever()
