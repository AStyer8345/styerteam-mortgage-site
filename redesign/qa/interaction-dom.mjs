// Executes real interaction.js against the assembled HTML with explicitly mocked
// browser-native form/dialog/focus methods. Tests controller state and promises,
// not actual browser rendering, keyboard trapping, native validity, or WCAG.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {parseHTML,packagePath} from './runtime.mjs';
const html=fs.readFileSync(packagePath('site','bank-statement-loans.html'),'utf8');
const {document,window:native}=parseHTML(html);
let active=document.body;
Object.defineProperty(document,'activeElement',{get:()=>active});
native.HTMLElement.prototype.focus=function(){active=this;};
const form=document.querySelector('[data-inquiry-form]');
const controls=[...form.querySelectorAll('input,select,textarea')];
for(const field of controls){
 let value=field.tagName==='SELECT'?field.querySelector('option').textContent:field.getAttribute('value')||'';
 Object.defineProperty(field,'value',{get:()=>value,set:v=>{value=String(v)},configurable:true});
 field.setCustomValidity=message=>{field.customValidationMessage=message;};
 if(field.tagName==='SELECT'){
  Object.defineProperty(field,'options',{value:[...field.querySelectorAll('option')]});
  for(const option of field.options)Object.defineProperty(option,'value',{get:()=>option.getAttribute('value')||option.textContent});
 }
}
form.elements={namedItem:name=>controls.find(x=>x.getAttribute('name')===name)};
form.reset=()=>{for(const field of controls){field.value=field.tagName==='SELECT'?field.options[0].value:'';field.customValidationMessage='';}};
let validity=true,validityCalls=0;
form.reportValidity=()=>{validityCalls++;return validity&&!controls.some(x=>x.customValidationMessage);};
for(const dialog of document.querySelectorAll('dialog')){
 Object.defineProperty(dialog,'open',{get:()=>dialog.hasAttribute('open')});
 dialog.showModal=()=>dialog.setAttribute('open','');
 dialog.close=()=>{dialog.removeAttribute('open');dialog.dispatchEvent(new native.Event('close'));};
}
class FixtureFormData{
 constructor(){this.rows=controls.map(x=>[x.getAttribute('name'),x.value]);}
 [Symbol.iterator](){return this.rows[Symbol.iterator]();}
}
let storageCalls=0,networkCalls=0;
const context={document,console,AbortController,DOMException,FormData:FixtureFormData,setTimeout,clearTimeout,Date,Promise,
 location:{origin:'http://fixture.test',pathname:'/',hash:''},
 matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},crypto:{randomUUID:()=>String(Math.random())},
 fetch:()=>{networkCalls++;throw Error('Network forbidden in fixture');}
};
for(const name of ['localStorage','sessionStorage'])Object.defineProperty(context,name,{get(){storageCalls++;throw Error('Storage forbidden in fixture');}});
context.window=context;
vm.runInNewContext(fs.readFileSync(packagePath('site','interaction.js'),'utf8'),context);
const click=el=>el.dispatchEvent(new native.Event('click',{bubbles:true,cancelable:true}));
const submit=()=>form.dispatchEvent(new native.Event('submit',{bubbles:true,cancelable:true}));
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();await new Promise(setImmediate);};
const field=name=>form.elements.namedItem(name);
const checks=[];
const trigger=document.querySelector('[data-contact]'),dialog=document.querySelector('#contact');
trigger.focus();click(trigger);assert.equal(dialog.open,true);assert.equal(active.id,'contact-title');checks.push('Controller opens dialog and requests heading focus');
dialog.dispatchEvent(new native.Event('cancel',{cancelable:true}));assert.equal(dialog.open,false);assert.equal(active,trigger);checks.push('Cancel handler closes dialog and requests opener focus');
click(trigger);field('name').value='   ';submit();await flush();assert.equal(field('name').customValidationMessage,'Enter your name.');assert.equal(document.querySelector('[data-contact-confirmation]').hidden,true);checks.push('Whitespace-only name rejected before transport');
field('name').value=' Sample Person ';field('email').value='sample@example.test';
validity=false;submit();await flush();assert.equal(document.querySelector('[data-contact-confirmation]').hidden,true);assert.ok(validityCalls>0);checks.push('Native validity false result prevents transport/confirmation');validity=true;
let calls=0,resolveTransport,lastPayload;
context.StyerInquiryTransport={mode:'preview',submit:payload=>{calls++;lastPayload=payload;return new Promise(resolve=>{resolveTransport=resolve;});}};
submit();await flush();submit();await flush();assert.equal(calls,1);assert.equal(lastPayload.name,'Sample Person');assert.equal(form.getAttribute('aria-busy'),'true');checks.push('Concurrent submits call adapter once and payload strings are trimmed');
resolveTransport({accepted:false});await flush();assert.match(document.querySelector('[data-form-error]').textContent,/Nothing was sent or saved/);assert.equal(field('name').value,' Sample Person ');assert.equal(active,document.querySelector('[data-form-error]'));checks.push('Rejected capture preserves input and requests error focus');
const firstId=lastPayload.inquiry_id;
context.StyerInquiryTransport={mode:'preview',submit:async payload=>{lastPayload=payload;return {accepted:true};}};
submit();await flush();assert.equal(lastPayload.inquiry_id,firstId);assert.equal(document.querySelector('[data-contact-confirmation]').hidden,false);assert.match(document.querySelector('[data-confirmation-copy]').textContent,/Nothing was sent or saved/);assert.equal(field('name').value,'');checks.push('Retry reuses inquiry ID, confirms preview honestly, and clears contact fields');
click(dialog.querySelector('.close-action'));assert.equal(dialog.open,false);assert.equal(active,trigger);
click(trigger);assert.equal(field('name').value,'');assert.equal(document.querySelector('[data-contact-entry]').hidden,false);checks.push('Close/reopen resets temporary state and restores entry view');
field('name').value='Sample';field('email').value='sample@example.test';let signal;
context.StyerInquiryTransport={mode:'preview',submit:(_,options)=>{signal=options.signal;return new Promise(()=>{});}};
submit();await flush();click(dialog.querySelector('.close'));await flush();assert.equal(signal.aborted,true);assert.equal(dialog.open,false);checks.push('Closing an in-flight request aborts it without false success');
context.StyerInquiryTransport={mode:'live'};click(trigger);field('name').value='Sample';field('email').value='sample@example.test';
submit();await flush();assert.equal(document.querySelector('[data-contact-confirmation]').hidden,true);assert.match(document.querySelector('[data-form-error]').textContent,/not confirmed/);assert.equal(field('name').value,'Sample');checks.push('Live mode without a callable adapter fails closed and retains input');
context.StyerInquiryTransport={mode:'live',submit:true};submit();await flush();assert.equal(document.querySelector('[data-contact-confirmation]').hidden,true);assert.match(document.querySelector('[data-form-error]').textContent,/not confirmed/);checks.push('Malformed live adapter cannot produce false success');
context.StyerInquiryTransport={mode:'preview'};submit();await flush();assert.equal(document.querySelector('[data-contact-confirmation]').hidden,false);assert.match(document.querySelector('[data-confirmation-copy]').textContent,/Nothing was sent or saved/);checks.push('Explicit preview fallback remains non-transmitting and honest');
assert.equal(networkCalls,0);assert.equal(storageCalls,0);checks.push('No network or persistent storage access by controller');
const result={checks,passed:checks.length,networkCalls,storageCalls,limitations:'Dialog/form/focus native methods mocked. This does not test actual browser focus containment, CSS, native validation behavior, or accessibility conformance.'};
fs.writeFileSync(packagePath('qa','interaction-dom-results.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
