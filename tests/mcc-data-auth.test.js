const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const auth=require('../netlify/functions/lib/admin-session');
test('MCC connects legacy Blobs after auth and preserves state through cookie reads',async()=>{
 const id=require.resolve('@netlify/blobs');const existing=require.cache[id];
 const pass=process.env.MCC_PASS;process.env.MCC_PASS='test-only-admin';let connected=false,requests=0;
 require.cache[id]={id,filename:id,loaded:true,exports:{connectLambda(event){assert.equal(event.blobs,'test-context');connected=true;},getStore(opts){assert.equal(connected,true);assert.equal(opts.name,'mcc-state');return {get:async()=>{requests++;return '{"tasks":{"existing":true}}';},set:async()=>{requests++;}};}}};
 const {handler}=require('../netlify/functions/mcc-data');
 try {
  const base={httpMethod:'GET',headers:{},rawUrl:'https://styermortgage.com/.netlify/functions/mcc-data',blobs:'test-context'};
  assert.equal((await handler(base)).statusCode,401);assert.equal(requests,0);
  const event={...base,headers:{cookie:auth.cookieHeader(auth.issueSession())}};
  const res=await handler(event);assert.equal(res.statusCode,200);assert.equal(JSON.parse(res.body).tasks.existing,true);
  const denied=await handler({...event,httpMethod:'POST',body:'{}'});assert.equal(denied.statusCode,401);assert.equal(requests,1);
  const bad=await handler({...event,httpMethod:'POST',headers:{...event.headers,origin:'https://styermortgage.com'},body:'null'});
  assert.equal(bad.statusCode,400);assert.equal(requests,1);
 }finally {if(existing)require.cache[id]=existing;else delete require.cache[id];if(pass===undefined)delete process.env.MCC_PASS;else process.env.MCC_PASS=pass;}
});
test('shared publishing footer is compiled from the canonical HTML',()=>{
 assert.equal(require('../netlify/functions/lib/site-footer-content'),fs.readFileSync('netlify/functions/lib/site-footer.html','utf8').trim());
});
