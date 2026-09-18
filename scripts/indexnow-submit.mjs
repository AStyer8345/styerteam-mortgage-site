// IndexNow: tell Bing (and the engines that share its index — ChatGPT search,
// Copilot, Yandex, Naver, Seznam) which public pages changed, so they refetch
// within hours instead of weeks. Google ignores IndexNow; Search Console covers it.
//
// Runs at the end of `npm run build` on Netlify (never fails the build) and by
// hand: `npm run indexnow -- /page.html /other.html` or `npm run indexnow -- --all`.
// The key is self-issued and hosted at https://styermortgage.com/<key>.txt.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const HOST = 'styermortgage.com';
const KEY = fs.readdirSync('.').find(f => /^[a-f0-9]{32}\.txt$/.test(f))?.replace('.txt', '');
if (!KEY) { console.log('IndexNow: no key file found, skipping.'); process.exit(0); }

const args = process.argv.slice(2);
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const inSitemap = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
const toUrl = file => {
  let p = '/' + file.replace(/\\/g, '/');
  if (p.endsWith('/index.html')) p = p.slice(0, -'index.html'.length);
  return `https://${HOST}${p}`;
};

let urls = [];
if (args.includes('--all')) {
  urls = [...inSitemap];
} else if (args.length) {
  urls = args.map(a => a.startsWith('http') ? a : `https://${HOST}${a.startsWith('/') ? a : '/' + a}`);
} else {
  // Netlify exposes the previously built commit; diff against it. Locally, diff HEAD~1.
  const from = process.env.CACHED_COMMIT_REF, to = process.env.COMMIT_REF || 'HEAD';
  let changed = [];
  try {
    if (from && from !== to) {
      try { execFileSync('git', ['fetch', '--depth=50', 'origin', from], { stdio: 'ignore' }); } catch {}
      changed = execFileSync('git', ['diff', '--name-only', from, to], { encoding: 'utf8' }).split('\n');
    } else if (!from) {
      changed = execFileSync('git', ['diff', '--name-only', 'HEAD~1', 'HEAD'], { encoding: 'utf8' }).split('\n');
    }
  } catch (e) { console.log('IndexNow: could not read git diff:', e.message); }
  urls = changed.filter(f => /\.html$/.test(f)).map(toUrl).filter(u => inSitemap.has(u));
}
urls = [...new Set(urls)];
if (!urls.length) { console.log('IndexNow: no public page changes to submit.'); process.exit(0); }
if (process.env.CONTEXT && process.env.CONTEXT !== 'production') { console.log(`IndexNow: ${process.env.CONTEXT} build, not submitting ${urls.length} URL(s).`); process.exit(0); }

const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) };
try {
  const res = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
  console.log(`IndexNow: submitted ${urls.length} URL(s) — HTTP ${res.status}${res.status === 200 || res.status === 202 ? ' (accepted)' : ' ' + (await res.text()).slice(0, 200)}`);
  for (const u of urls.slice(0, 20)) console.log('  ' + u);
} catch (e) { console.log('IndexNow: submission failed (build continues):', e.message); }
