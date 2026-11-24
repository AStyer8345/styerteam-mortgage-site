import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Publish only website assets. Functions are bundled separately by Netlify.
// Never expose source, tests, audit reports, repository metadata, or local files.
const root = process.cwd();
const destination = path.join(root, '.site-dist');
const publicDirectories = new Set(['assets', 'css', 'js', 'blog', 'loans', 'rates', 'realtor-updates', 'resources', 'scenarios', 'updates', 'downloads']);
const publicExtensions = /\.(html|css|js|svg|png|jpe?g|webp|avif|ico|json|xml|txt|woff2?|pdf)$/i;
const rootData = new Set(['rates.json', 'recent-updates.json', 'task-reports.json', 'robots.txt', 'llms.txt', 'acd320ce4aaac882bfb455892bdcf208.txt', 'sitemap.xml', '_redirects', '_headers', '31a45519eb8335e7c25e45e696e834c6.txt']);
const privateFiles = new Set(JSON.parse(fs.readFileSync(path.join(root, 'scripts/admin-paths.json'), 'utf8')));
const withheldFromProduction = new Set(['loanos.html', 'loanos-waitlist.html', 'forms.html']);
// Retired pages stay in the repository but leave the public build; vercel.json 301s each one.
const retiredPages = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(root, 'scripts/retired-pages.json'), 'utf8'))).map(page => page.slice(1)));
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const releaseFiles = JSON.parse(fs.readFileSync(path.join(root, 'scripts/public-release-files.json'), 'utf8'));
const candidates = [...new Set([...tracked, ...releaseFiles])];
const files = candidates.filter(file => {
  if (privateFiles.has(file) || withheldFromProduction.has(file) || retiredPages.has(file)) return false;
  if (file === '.well-known/security.txt') return true;
  if (file.startsWith('.') || file.includes('/originals/') || file.includes('_TEMPLATE')) return false;
  const parts = file.split('/');
  if (parts.length === 1) return rootData.has(file) || (/\.(html|css|js|svg|png|ico|pdf)$/i.test(file) && file !== 'server.js' && file !== 'middleware.js');
  return publicDirectories.has(parts[0]) && publicExtensions.test(file);
});
// Fail before replacing the previous package if a reviewed release file is unavailable.
for (const file of releaseFiles) {
  if (!files.includes(file) || !fs.existsSync(path.join(root, file))) {
    throw new Error(`Required public release file is missing or excluded: ${file}`);
  }
}
const published = new Set(files);
const vercelBuild = Boolean(process.env.VERCEL_ENV);
const analyticsAsset = 'site-analytics.js';
const googleTag = 'GTM-PQQ6PGLR';

// Run before the Google container reads the browser URL. The website can still
// use its navigation and campaign parameters, and the form POST is unaffected.
function redactAnalyticsLocation() {
  if (location.hostname !== 'styerteam.com') return;
  const url = new URL(location.href);
  const sensitiveKeys = new Set([
    'email', 'name', 'phone', 'first_name', 'last_name', 'firstname', 'lastname',
    'first-name', 'last-name', 'full_name', 'address', 'street', 'dob', 'ssn',
    'inquiry_id', 'contact_id', 'token', 'access_token', 'original_email',
    'original_name', 'original_phone', 'message', 'notes', 'details', 'income', 'credit_score',
  ]);
  let changed = false;
  for (const [key, value] of [...url.searchParams]) {
    if (sensitiveKeys.has(key.toLowerCase()) || /[^\s/@]+@[^\s/@]+\.[^\s/@]+/.test(value)) {
      url.searchParams.delete(key, value);
      changed = true;
    }
  }
  if (changed) history.replaceState(history.state, '', url.pathname + url.search + url.hash);
}

const analyticsPrivacyTags = `<meta name="referrer" content="strict-origin"><script>(${redactAnalyticsLocation.toString()})();</script>`;
const analyticsTags = `${analyticsPrivacyTags}<script defer src="/${analyticsAsset}"></script>`;
for (const file of files.filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const assets = html.matchAll(/<(?:script|link|img|source)\b[^>]*?\b(?:src|href)=["']([^"']+)["']/gi);
  for (const [, raw] of assets) {
    if (/^(?:[a-z]+:|\/\/|#|data:)/i.test(raw)) continue;
    const asset = path.posix.normalize(path.posix.join(raw.startsWith('/') ? '' : path.posix.dirname(file), raw.split(/[?#]/)[0])).replace(/^\//, '');
    if (!/\.(?:css|js|png|jpe?g|webp|avif|svg|ico|woff2?)$/i.test(asset)) continue;
    if (!published.has(asset)) throw new Error(`Public asset missing from package: ${file} -> ${raw}`);
  }
}
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
for (const file of files) {
  const output = path.join(destination, file);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const source = path.join(root, file);
  if (file.endsWith('.html')) {
    let html = fs.readFileSync(source, 'utf8');
    if (/\bhref=["'](?:[^"']*\/)?simple\.css(?:\?[^"']*)?["']/i.test(html)) {
      html = html.replace(
        /<li>\s*<a class="nav-prominent-link" href="\/blog\.html">Blog &amp; Market Updates<\/a>\s*<\/li>/,
        '<li><a href="/blog.html">Blog</a></li>\n<li><a href="/resources">Resources</a></li>',
      );
    }
    // Instrument public pages with a canonical URL and the shared Google tag.
    // Private pages, exports, and the 404 must not send visitor URLs to analytics.
    if (vercelBuild && html.includes(googleTag)) {
      if (file === '404.html') {
        // An arbitrary missing URL may contain private data in its path.
        html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, tag => tag.includes(googleTag) ? '' : tag);
      } else if (file !== 'saved-analysis.html' && /<link\b[^>]*\brel=["']canonical["']/i.test(html)) {
        html = html.replace(/<head\b[^>]*>/i, head => `${head}\n${analyticsTags}`);
      }
    }
    fs.writeFileSync(output, html);
    continue;
  }
  fs.copyFileSync(source, output);
}
if (vercelBuild) {
  const { build } = await import('esbuild');
  await build({
    entryPoints: [path.join(root, 'scripts/site-analytics-client.mjs')],
    outfile: path.join(destination, analyticsAsset),
    bundle: true,
    minify: true,
    define: {
      'process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG': JSON.stringify(process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG || ''),
    },
  });
}
console.log(`Packaged ${files.length} public website files. Functions, source, reports and metadata excluded.`);
await import('./optimize-homepage.mjs');
await import('./optimize-published-assets.mjs');
