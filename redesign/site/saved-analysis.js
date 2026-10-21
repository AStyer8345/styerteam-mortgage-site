(async function(){
 'use strict';
 var $=function(id){return document.getElementById(id);},api=window.StyerAnalysis,analysis=null,capability=null,key=null,busy=false,saved=false;
 function b64(bytes){return btoa(String.fromCharCode.apply(null,new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
 function bytes(value){return Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')),function(c){return c.charCodeAt(0);});}
 function say(message){$('status').textContent=message;}
 function setBusy(value){busy=value;['save','delete','review','recalculate'].forEach(function(id){$(id).disabled=value;});}
 async function request(method,body){var controller=new AbortController(),timer=setTimeout(function(){controller.abort();},15000);try{var r=await fetch('/api/saved-analysis',{method:method,headers:{'Authorization':'Bearer '+capability,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:controller.signal,cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'});var result=await r.json();if(!r.ok)throw new Error(result.error||'Saving is temporarily unavailable. Please retry.');return result;}finally{clearTimeout(timer);}}
 function showReceipt(receipt){saved=true;$('saved').hidden=false;$('return-link').value=location.origin+'/saved-analysis.html#'+capability+'.'+b64(key);$('expiry').textContent='Available until '+new Date(receipt.expiresAt).toLocaleDateString()+'. Saving updates extends this by 90 days.';$('save').textContent='Save changes';}
 function render(){api.render($('summary'),analysis);$('workspace').hidden=false;var fields=$('fields');fields.replaceChildren();api.fields.forEach(function(f){var wrap=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input');label.htmlFor='edit-'+f[0];label.textContent=f[1]+(f[0]==='down'?(analysis.inputs.downMode==='pct'?' (%)':' ($)'):'');input.id=label.htmlFor;input.type='number';input.min='0';input.step='any';input.value=analysis.inputs[f[0]];input.required=true;wrap.append(label,input);fields.appendChild(wrap);});}
 function update(){var next={kind:'dscr',at:Date.now(),inputs:{downMode:analysis.inputs.downMode}};api.fields.forEach(function(f){var input=$('edit-'+f[0]);if(!input.value.trim()||!input.checkValidity())throw new Error('Enter a valid estimate for '+f[1]+'.');next.inputs[f[0]]=Number(input.value);});analysis=api.normalize(next);api.render($('summary'),analysis);}
 try{
  if(!crypto.subtle)throw new Error('This browser cannot encrypt an analysis. Use a current browser with a secure connection.');
  var fragment=location.hash.slice(1),parts=fragment.split('.');
  if(fragment){
   if(parts.length!==2||!parts.every(function(p){return /^[A-Za-z0-9_-]{43}$/.test(p);}))throw new Error('This private link is incomplete. Use the full link you saved.');
   capability=parts[0];key=bytes(parts[1]);
   var record=await request('GET');var cryptoKey=await crypto.subtle.importKey('raw',key,'AES-GCM',false,['decrypt']);var decrypted=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(record.iv)},cryptoKey,bytes(record.ciphertext));
   analysis=api.normalize(JSON.parse(new TextDecoder().decode(decrypted)));render();showReceipt(record);say('Your saved estimates are restored. You can update the numbers below.');
  }else{
   var pending=JSON.parse(sessionStorage.getItem('styer:analysis-to-save')||'null');if(!pending||Date.now()-pending.at>2*60*60*1000)throw new Error('Start in the DSCR calculator, then choose Save This Analysis to bring your numbers here.');
   analysis=api.normalize(pending);capability=b64(crypto.getRandomValues(new Uint8Array(32)));key=crypto.getRandomValues(new Uint8Array(32));render();say('Your numbers are ready. Choose Save This Analysis to create your private return link.');
  }
 }catch(error){say(error.name==='OperationError'?'This link could not unlock the analysis. Check that you copied the full return link.':error.message);return;}
 $('recalculate').addEventListener('click',function(){try{update();say('Results updated on this page. Choose Save changes to update the saved analysis.');}catch(error){say(error.message);}});
 $('save').addEventListener('click',async function(){if(busy)return;setBusy(true);try{
  update();var iv=crypto.getRandomValues(new Uint8Array(12)),cryptoKey=await crypto.subtle.importKey('raw',key,'AES-GCM',false,['encrypt']);var encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:iv},cryptoKey,new TextEncoder().encode(JSON.stringify(analysis)));
  var receipt=await request('POST',{version:1,iv:b64(iv),ciphertext:b64(encrypted)});showReceipt(receipt);history.replaceState(null,'','#'+capability+'.'+b64(key));try{sessionStorage.removeItem('styer:analysis-to-save');}catch(_){}say('Your analysis is saved. Copy the private return link or download a copy below. No message or marketing subscription was sent.');
 }catch(error){say(error.name==='AbortError'?'We could not confirm the save. Your numbers are here; retry safely with the same link.':error.message);}finally{setBusy(false);}});
 $('copy').addEventListener('click',async function(){try{await navigator.clipboard.writeText($('return-link').value);say('Private return link copied. Keep it somewhere safe.');}catch(_){$('return-link').focus();$('return-link').select();say('Select and copy the private return link above.');}});
 $('download').addEventListener('click',function(){try{update();var content=api.summary(analysis)+(saved?'\n\nPrivate return link (keep private): '+$('return-link').value:'\n\nNot yet saved online.');var url=URL.createObjectURL(new Blob([content],{type:'text/plain'})),link=document.createElement('a');link.href=url;link.download='property-analysis.txt';link.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);}catch(error){say(error.message);}});
 $('review').addEventListener('click',function(){try{update();sessionStorage.setItem('styer:calculator-review',JSON.stringify(analysis));location.href='/investor-loans.html?goal=Invest&context=calculator';}catch(error){say(error.message);}});
 $('delete').addEventListener('click',async function(){if(busy||!confirm('Delete this saved analysis? Its return link will stop working.'))return;setBusy(true);try{await request('DELETE');saved=false;$('saved').hidden=true;history.replaceState(null,'',location.pathname);capability=b64(crypto.getRandomValues(new Uint8Array(32)));key=crypto.getRandomValues(new Uint8Array(32));$('save').textContent='Save This Analysis';say('The saved analysis is deleted. Your estimates remain on this page until you leave.');}catch(error){say(error.message);}finally{setBusy(false);}});
})();
