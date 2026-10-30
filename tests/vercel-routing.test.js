const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('committed vercel.json matches the Netlify redirect and header sources', async () => {
  const { buildConfig, publicConfig, matchRequest } = await import('../scripts/vercel-config.mjs');
  const { published, blocked } = publicConfig(buildConfig());
  assert.deepEqual(JSON.parse(fs.readFileSync('vercel.json', 'utf8')), published);
  assert.deepEqual(JSON.parse(fs.readFileSync('api/lib/blocked-paths.json', 'utf8')), blocked);
  assert.deepEqual(blocked, ['/loanos.html', '/loanos', '/loanos-waitlist.html', '/loanos-waitlist', '/forms.html', '/forms']);

  const host = matchRequest(published, { host: 'adamstyer.com', path: '/loans/conventional' });
  assert.equal(host.status, 301);
  assert.equal(host.destination, 'https://styerteam.com/loans/conventional');

  const www = matchRequest(published, { host: 'www.styerteam.com', path: '/contact.html?goal=Purchase' });
  assert.equal(www.status, 301);
  assert.equal(www.destination, 'https://styerteam.com/contact.html?goal=Purchase');

  const extensionless = matchRequest(published, { host: 'styerteam.com', path: '/loans/conventional' });
  assert.equal(extensionless.status, 301);
  assert.equal(extensionless.destination, '/loans/conventional.html');

  const forced = matchRequest(published, { host: 'styerteam.com', path: '/bank-statement-loans-austin-tx.html' });
  assert.equal(forced.destination, '/bank-statement-loans.html');

  const splat = matchRequest(published, { host: 'styermortgage.com', path: '/wp-content/uploads/a.jpg' });
  assert.equal(splat.destination, 'https://styerteam.com/wp-content/uploads/a.jpg');

  const wordpress = matchRequest(published, { host: 'styerteam.com', path: '/wp-content/uploads/a.jpg' });
  assert.equal(wordpress.status, 301);
  assert.equal(wordpress.destination, '/');

  const query = matchRequest(published, { host: 'styerteam.com', path: '/get-preapproved.html' });
  assert.equal(query.destination, '/contact.html?goal=Purchase');

  const rewrite = matchRequest({ ...published, blocked }, { host: 'styerteam.com', path: '/resources/first-time-buyer-guide' });
  assert.equal(rewrite.kind, 'rewrite');
  assert.equal(rewrite.destination, '/resources/first-time-buyer-guide/index.html');

  const guideSlash = matchRequest({ ...published, blocked }, { host: 'styerteam.com', path: '/resources/first-time-buyer-guide/' });
  assert.equal(guideSlash.destination, '/resources/first-time-buyer-guide/index.html');

  const blockedHit = matchRequest({ ...published, blocked }, { host: 'styerteam.com', path: '/forms.html' });
  assert.equal(blockedHit.status, 404);

  const functionRewrite = matchRequest({ ...published, blocked }, { host: 'styerteam.com', path: '/.netlify/functions/lead-intake' });
  assert.equal(functionRewrite.destination, '/api/lead-intake');

  const htmlCache = published.headers.find((block) => block.source === '/(.*)\\.html');
  assert.equal(htmlCache.headers.find((header) => header.key === 'Cache-Control').value, 'public, max-age=0, must-revalidate');
  const security = published.headers.find((block) => block.source === '/(.*)');
  assert.equal(security.headers.find((header) => header.key === 'Strict-Transport-Security').value, 'max-age=31536000; includeSubDomains; preload');
  const saved = published.headers.find((block) => block.source === '/saved-analysis.html');
  assert.match(saved.headers.find((header) => header.key === 'Content-Security-Policy').value, /default-src 'none'/);
  assert.equal(published.redirects.filter((rule) => rule.has).length, 10);
  assert.ok(published.redirects.length > 100);
});
