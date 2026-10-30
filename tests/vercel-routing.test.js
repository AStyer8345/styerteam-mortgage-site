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
  assert.deepEqual(published.redirects.filter((rule) => !rule.has && ['/:path*', '/(.*)', '/*'].includes(rule.source)), []);
});

test('trailing-slash legacy rules and host redirects still resolve', async () => {
  const { buildConfig, publicConfig, matchRequest } = await import('../scripts/vercel-config.mjs');
  const config = buildConfig();
  const { published } = publicConfig(config);
  const cfg = { ...published, blocked: config.blocked };
  const legacy = published.redirects.filter((rule) => rule.source.length > 1 && rule.source.endsWith('/') && !rule.has);
  assert.equal(legacy.length, 36);

  const bareTargets = {
    '/mortgage-loan-refinance-options-austin/va-home-loan': '/loans/va.html',
    '/mortgage-loan-refinance-options-austin/usda-loan': '/loans/usda.html',
    '/mortgage-loan-refinance-options-austin/fha-loans-austin': '/loans/fha.html',
    '/mortgage-loan-refinance-options-austin': '/products.html',
    '/mortgage-loan-refinance-options-austin/jumbo-home-loans-austin': '/loans/jumbo.html',
    '/mortgage-loan-refinance-options-austin/investment-vacation-home-loans-austin': '/products.html',
    '/loan-options/refinance': '/products.html',
    '/cash-out-refinance': '/products.html',
    '/what-is-an-fha-mortgage-insurance-premium': '/loans/fha.html',
    '/adam-styer': '/about.html',
    '/how-long-does-it-take-to-buy-a-home': '/blog.html',
  };

  for (const rule of legacy) {
    const slashed = matchRequest(cfg, { host: 'styerteam.com', path: rule.source });
    assert.equal(slashed && slashed.status, 301, rule.source);
    assert.equal(slashed.destination, rule.destination, rule.source);
    const normalized = rule.source.replace(/\/$/, '');
    const bare = matchRequest(cfg, { host: 'styerteam.com', path: normalized });
    assert.equal(bare && bare.status, 301, normalized);
    if (bareTargets[normalized]) assert.equal(bare.destination, bareTargets[normalized], normalized);
  }

  for (const host of ['styermortgage.com', 'www.styermortgage.com', 'www.styerteam.com']) {
    const root = matchRequest(cfg, { host, path: '/' });
    assert.equal(root.destination, 'https://styerteam.com/');
    const nested = matchRequest(cfg, { host, path: '/adam-styer' });
    assert.equal(nested.status, 301);
    assert.equal(nested.destination, 'https://styerteam.com/adam-styer');
  }

  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  assert.match(sitemap, /<loc>https:\/\/styerteam.com\/resources<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/styerteam.com\/resources\/first-time-buyer-guide<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/styerteam.com\/resources\/<\/loc>/);
  assert.doesNotMatch(sitemap, /first-time-buyer-guide\/<\/loc>/);
});
