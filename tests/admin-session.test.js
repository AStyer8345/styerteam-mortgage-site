const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const auth = require('../netlify/functions/lib/admin-session');
test('admin sessions reject tampering, expiry, changed access code and cross-origin writes', () => {
 const previous = process.env.MCC_PASS; process.env.MCC_PASS='test-only-admin-code';
 try {
  const now=Date.now(),token=auth.issueSession(now);
  const event={headers:{cookie:auth.cookieHeader(token),origin:'https://styermortgage.com'},rawUrl:'https://styermortgage.com/.netlify/functions/dispatch',httpMethod:'POST'};
  assert.equal(auth.validSession(event.headers,now),true);
  assert.equal(auth.sessionAuthorization(event),true);
  assert.equal(auth.sessionAuthorization({...event,headers:{...event.headers,origin:'https://attacker.invalid'}}),false);
  assert.equal(auth.sessionAuthorization({...event,headers:{cookie:event.headers.cookie}}),false);
  assert.equal(auth.validSession({cookie:auth.cookieHeader(token.slice(0,-1)+'!')},now),false);
  assert.equal(auth.validSession(event.headers,now+8*3600*1000),false);
  process.env.MCC_PASS='changed-code'; assert.equal(auth.validSession(event.headers,now),false);
  delete process.env.MCC_PASS; assert.equal(auth.validSession(event.headers,now),false);
  assert.match(auth.cookieHeader(token),/HttpOnly; Secure; SameSite=Strict/);
 } finally { if(previous===undefined)delete process.env.MCC_PASS;else process.env.MCC_PASS=previous; }
});
test('private files are explicitly excluded from public packaging and browser credentials removed',()=>{
 const files=JSON.parse(fs.readFileSync('scripts/admin-paths.json'));
 assert.ok(files.includes('task-reports.json'));
 const packager=fs.readFileSync('scripts/package-public-site.mjs','utf8');
 assert.match(packager,/if \(privateFiles.has\(file\)\) return false/);
 for(const file of ['marketing-command-center.html','marketing-content.html','loan-dashboard.html']) {
  const html=fs.readFileSync(file,'utf8');
  assert.doesNotMatch(html,/PASS_HASH|setItem\('mcc_pass'/);
 }
});
