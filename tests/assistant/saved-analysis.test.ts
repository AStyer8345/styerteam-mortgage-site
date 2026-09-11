import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, webcrypto } from 'node:crypto';
import { createHandler } from '../../netlify/functions/saved-analysis.ts';
function fixture(){let time=Date.now();const records=new Map();const handler=createHandler({get:async k=>records.get(k)||null,setJSON:async(k,v)=>{records.set(k,v)},delete:async k=>{records.delete(k)}},()=>time);const token=randomBytes(32).toString('base64url');const request=(method:string,body?:unknown,cap=token)=>handler(new Request('https://preview.example/api/saved-analysis',{method,headers:{authorization:'Bearer '+cap,'content-type':'application/json'},body:body?JSON.stringify(body):undefined}));return {records,request,token,expire:()=>{time+=91*24*60*60*1000}};}
test('private analysis accepts ciphertext only, restores by capability, expires and deletes',async()=>{
 const f=fixture();const key=await webcrypto.subtle.generateKey({name:'AES-GCM',length:256},true,['encrypt','decrypt']);const iv=randomBytes(12);const ciphertext=await webcrypto.subtle.encrypt({name:'AES-GCM',iv},key,Buffer.from(JSON.stringify({rent:4500})));
 const envelope={version:1,iv:iv.toString('base64url'),ciphertext:Buffer.from(ciphertext).toString('base64url')};
 assert.equal((await f.request('POST',envelope)).status,200);assert.equal((await f.request('POST',envelope)).status,200);assert.equal(f.records.size,1);
 const r=await f.request('GET');assert.match(r.headers.get('cache-control')||'',/no-store/);assert.match(r.headers.get('x-robots-tag')||'',/noindex/);const stored=await r.json();assert.equal(JSON.stringify(stored).includes('4500'),false);assert.equal(JSON.stringify([...f.records]).includes(f.token),false);
 const plain=await webcrypto.subtle.decrypt({name:'AES-GCM',iv},key,Buffer.from(stored.ciphertext,'base64url'));assert.deepEqual(JSON.parse(Buffer.from(plain).toString()),{rent:4500});
 assert.equal((await f.request('GET',undefined,randomBytes(32).toString('base64url'))).status,404);
 f.expire();assert.equal((await f.request('GET')).status,410);assert.equal(f.records.size,0);
 await f.request('POST',envelope);assert.equal((await f.request('DELETE')).status,200);assert.equal((await f.request('GET')).status,404);
});
test('missing capabilities, cross-origin writes and plaintext are rejected',async()=>{
 const f=fixture();assert.equal((await f.request('GET',undefined,'bad')).status,401);assert.equal((await f.request('POST',{rent:4500})).status,400);assert.equal((await f.request('POST',{version:1,iv:'x'.repeat(16),ciphertext:'x'.repeat(25000)})).status,413);assert.equal(f.records.size,0);
 const handler=createHandler({get:async()=>null,setJSON:async()=>{},delete:async()=>{}});
 const result=await handler(new Request('https://preview.example/api/saved-analysis',{method:'POST',headers:{origin:'https://elsewhere.example',authorization:'Bearer '+f.token},body:'{}'}));assert.equal(result.status,403);
});
test('storage failure never reports a saved result',async()=>{
 const handler=createHandler({get:async()=>{throw Error('offline')},setJSON:async()=>{throw Error('offline')},delete:async()=>{throw Error('offline')}});
 const r=await handler(new Request('https://preview.example/api/saved-analysis',{method:'POST',headers:{authorization:'Bearer '+randomBytes(32).toString('base64url'),'content-type':'application/json'},body:JSON.stringify({version:1,iv:'x'.repeat(16),ciphertext:'x'.repeat(50)})}));assert.equal(r.status,503);assert.equal((await r.json()).saved,undefined);
});
