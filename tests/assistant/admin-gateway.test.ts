import {test} from 'node:test';
import assert from 'node:assert/strict';
import handler from '../../netlify/functions/admin.mts';
import auth from '../../netlify/functions/lib/admin-session.js';
test('private gateway hides assets, issues secure sessions and supports logout without external work',async()=>{
 const previous=process.env.MCC_PASS;process.env.MCC_PASS='test-only-access-code';
 try {
  const origin='https://styermortgage.com';
  const locked=await handler(new Request(origin+'/task-reports.json'));
  assert.equal(locked.status,401); assert.equal(await locked.text(),'Unauthorized');
  const login=await handler(new Request(origin+'/dashboard.html'));
  assert.equal(login.status,401);assert.doesNotMatch(await login.text(),/Generate Newsletter|dashboard.js/);
  const cross=await handler(new Request(origin+'/dashboard.html',{method:'POST',headers:{origin:'https://attacker.invalid','content-type':'application/x-www-form-urlencoded'},body:'code=test-only-access-code'}));
  assert.equal(cross.status,403);
  const signed=await handler(new Request(origin+'/dashboard.html',{method:'POST',headers:{origin,'content-type':'application/x-www-form-urlencoded'},body:'code=test-only-access-code'}));
  assert.equal(signed.status,303);assert.equal(signed.headers.get('Location'),'/dashboard.html');
  const cookie=signed.headers.get('Set-Cookie')!;
  assert.equal(auth.validSession({cookie}),true);
  const html=await handler(new Request(origin+'/dashboard.html',{headers:{cookie}}));
  assert.equal(html.status,200);assert.match(await html.text(),/dashboard.js/);assert.match(html.headers.get('Cache-Control')!,/no-store/);
  const logout=await handler(new Request(origin+'/api/admin-session',{method:'DELETE',headers:{origin,cookie}}));
  assert.equal(logout.status,204);assert.match(logout.headers.get('Set-Cookie')!,/Max-Age=0/);
  delete process.env.MCC_PASS;
  assert.equal((await handler(new Request(origin+'/dashboard.html',{headers:{cookie}}))).status,401);
 }finally {if(previous===undefined)delete process.env.MCC_PASS;else process.env.MCC_PASS=previous;}
});
