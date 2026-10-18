import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import {createRequire} from 'node:module';
import {parseHTML,packagePath} from './runtime.mjs';
export const sourceRoot=path.resolve(process.env.CALCULATOR_SITE_DIR||packagePath('site'));
const useOverrides=process.env.CALCULATOR_USE_OVERRIDES==='1';
export const fixesRoot=packagePath('components','calculator-fixes');
export function inlineScripts(name){const d=parseHTML(fs.readFileSync(path.join(sourceRoot,name+'.html'),'utf8')).document;return [...d.querySelectorAll('script:not([src])')].filter(x=>x.getAttribute('type')!=='application/ld+json'&&x.textContent.length>100).map(x=>x.textContent);}
export function scriptFor(name,{fixed=useOverrides}={}){const file=path.join(fixesRoot,name+'.js');return fixed&&fs.existsSync(file)?fs.readFileSync(file,'utf8'):inlineScripts(name)[0];}

export function loadCalculator(name,{fixed=useOverrides}={}){
 const {document,window:dom}=parseHTML(fs.readFileSync(path.join(sourceRoot,name+'.html'),'utf8'));
 const proto=dom.HTMLElement.prototype;proto.focus=function(){document._activeElement=this;};proto.getBoundingClientRect=function(){return {top:0,left:0,right:800,bottom:600,width:800,height:600};};proto.scrollIntoView=function(){};proto.setSelectionRange=function(){};
 for(const prop of ['min','max','step','type'])if(!Object.getOwnPropertyDescriptor(dom.HTMLInputElement.prototype,prop))Object.defineProperty(dom.HTMLInputElement.prototype,prop,{configurable:true,get(){return this.getAttribute(prop)||'';},set(v){this.setAttribute(prop,v);}});
 Object.defineProperty(dom.HTMLInputElement.prototype,'checked',{configurable:true,get(){return this.hasAttribute('checked');},set(v){v?this.setAttribute('checked',''):this.removeAttribute('checked');}});
 Object.defineProperty(dom.HTMLInputElement.prototype,'validity',{configurable:true,get(){const n=Number(this.value),raw=this.value.trim(),min=this.getAttribute('min'),max=this.getAttribute('max');return {valid:raw!==''&&Number.isFinite(n)&&(min===null||n>=Number(min))&&(max===null||n<=Number(max))};}});
 Object.defineProperty(dom.HTMLSelectElement.prototype,'value',{configurable:true,get(){return this._fixtureValue??this.querySelector('option[selected]')?.getAttribute('value')??this.querySelector('option')?.getAttribute('value')??this.querySelector('option')?.textContent??'';},set(v){this._fixtureValue=String(v);}});
 for(const canvas of document.querySelectorAll('canvas'))canvas.getContext=()=>({});
 let networkCalls=0,storageCalls=0;
 class Chart{constructor(_ctx,config){this.data=config.data;this.options=config.options;}update(){}destroy(){}}
 const context={document,console,Intl,Date,Math,Number,JSON,URL,URLSearchParams,Event:dom.Event,AbortController,DOMException,FormData,Chart,
 location:{origin:'http://local.invalid',pathname:'/'+name+'.html',search:'',href:'http://local.invalid/'+name+'.html'},
 navigator:{clipboard:{writeText:async()=>{}}},requestAnimationFrame:()=>0,cancelAnimationFrame(){},setTimeout:()=>0,clearTimeout(){},
 matchMedia:()=>({matches:false,addEventListener(){}}),addEventListener(){},print(){},
 IntersectionObserver:class{observe(){}disconnect(){}},MutationObserver:class{observe(){}disconnect(){}},
 fetch(){networkCalls++;throw Error('Network prohibited in calculator QA');}};
 for(const key of ['localStorage','sessionStorage'])Object.defineProperty(context,key,{get(){storageCalls++;throw Error('Storage prohibited in calculator QA');}});
 context.window=context;const sandbox=vm.createContext(context);
 const suiteFile=fixed&&fs.existsSync(path.join(fixesRoot,'calculator-suite.js'))?path.join(fixesRoot,'calculator-suite.js'):path.join(sourceRoot,'calculator-suite.js');
 vm.runInContext(fs.readFileSync(suiteFile,'utf8'),sandbox,{filename:'calculator-suite.js'});
 vm.runInContext(scriptFor(name,{fixed}),sandbox,{filename:name+'.js'});
 document.dispatchEvent(new dom.Event('DOMContentLoaded'));
 return {document,context:sandbox,source:scriptFor(name,{fixed}),input(id,value,event='input'){const el=document.getElementById(id);if(!el)throw Error('Missing input '+id);el.value=String(value);el.dispatchEvent(new dom.Event(event,{bubbles:true}));},click(selector){const el=document.querySelector(selector);if(!el)throw Error('Missing target '+selector);el.dispatchEvent(new dom.Event('click',{bubbles:true,cancelable:true}));},text:id=>document.getElementById(id)?.textContent,metrics:()=>({networkCalls,storageCalls})};
}
