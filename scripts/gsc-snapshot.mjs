import crypto from 'node:crypto';
import fs from 'node:fs';

const siteUrl = process.env.GSC_SITE_URL || 'https://styermortgage.com/';
const rawCredentials = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!rawCredentials) throw new Error('Set GSC_SERVICE_ACCOUNT_JSON to a read-only Google service-account JSON value.');
const credentials = JSON.parse(rawCredentials);

const base64url = (value) => Buffer.from(value).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const assertionHeader = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
const assertionClaims = base64url(JSON.stringify({
  iss: credentials.client_email,
  scope: 'https://www.googleapis.com/auth/webmasters.readonly',
  aud: 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: now + 3600
}));
const unsigned = `${assertionHeader}.${assertionClaims}`;
const signature = crypto.sign('RSA-SHA256', Buffer.from(unsigned), credentials.private_key).toString('base64url');
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` })
});
if (!tokenResponse.ok) throw new Error(`Google authentication failed: ${tokenResponse.status}`);
const { access_token: accessToken } = await tokenResponse.json();

const end = new Date(Date.now() - 3 * 86400000);
const start = new Date(end.getTime() - 55 * 86400000);
const iso = (date) => date.toISOString().slice(0, 10);
const dimensions = ['date', 'query', 'page', 'device', 'country'];
const snapshots = {};
for (const dimension of dimensions) {
  const response = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
    body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: [dimension], rowLimit: 25000, dataState: 'final' })
  });
  if (!response.ok) throw new Error(`Search Console ${dimension} query failed: ${response.status} ${await response.text()}`);
  snapshots[dimension] = await response.json();
}

const day = iso(end);
fs.mkdirSync('seo-data/gsc', { recursive: true });
fs.writeFileSync(`seo-data/gsc/${day}.json`, `${JSON.stringify({ siteUrl, startDate: iso(start), endDate: day, snapshots }, null, 2)}\n`);
console.log(`Saved read-only Search Console snapshot for ${day}.`);
