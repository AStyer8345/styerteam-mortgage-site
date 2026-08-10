import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const origin = 'https://styermortgage.com';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const redirects = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const issues = [];

const localPathFor = (url) => {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return 'index.html';
  if (pathname.endsWith('/')) return `${pathname.slice(1)}index.html`;
  return pathname.slice(1);
};

const redirectMap = new Map(
  redirects.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [from, to] = line.split(/\s+/);
      return [from, to];
    })
);
const redirectSources = new Set(redirectMap.keys());

for (const url of urls) {
  if (!url.startsWith(origin)) issues.push({ type: 'foreign-sitemap-url', url });
  if (url.includes('#') || new URL(url).search) issues.push({ type: 'noncanonical-sitemap-url', url });
  const pathname = new URL(url).pathname;
  if (redirectSources.has(pathname)) issues.push({ type: 'redirect-in-sitemap', url });

  const relative = localPathFor(url);
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) {
    issues.push({ type: 'missing-sitemap-file', url, file: relative });
    continue;
  }

  const html = fs.readFileSync(absolute, 'utf8');
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1]
    || html.match(/<link\s+href=["']([^"']+)["']\s+rel=["']canonical["']/i)?.[1];
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].replace(/\s+/g, ' ').trim();
  const description = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i)?.[1]
    || html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  if (canonical !== url) issues.push({ type: 'canonical-mismatch', url, canonical: canonical || null });
  if (!title) issues.push({ type: 'missing-title', url });
  if (!description) issues.push({ type: 'missing-description', url });
  if (h1Count !== 1) issues.push({ type: 'h1-count', url, count: h1Count });

  for (const match of html.matchAll(/href=["']([^"'#]+)(?:#[^"']*)?["']/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(href)) continue;
    const resolvedPath = new URL(href, url).pathname;
    if (redirectSources.has(resolvedPath)) {
      issues.push({ type: 'internal-link-to-redirect', url, href: resolvedPath, target: redirectMap.get(resolvedPath) });
    }
  }
}

const titles = new Map();
for (const url of urls) {
  const file = path.join(root, localPathFor(url));
  if (!fs.existsSync(file)) continue;
  const title = fs.readFileSync(file, 'utf8').match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].replace(/\s+/g, ' ').trim();
  if (!title) continue;
  titles.set(title, [...(titles.get(title) || []), url]);
}
for (const [title, titleUrls] of titles) {
  if (titleUrls.length > 1) issues.push({ type: 'duplicate-title', title, urls: titleUrls });
}

const report = { generatedAt: new Date().toISOString(), sitemapUrls: urls.length, issueCount: issues.length, issues };
if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`SEO audit: ${urls.length} sitemap URLs, ${issues.length} issue(s)`);
  for (const issue of issues) console.log(`- ${issue.type}: ${issue.url || issue.title}`);
}
if (issues.length) process.exitCode = 1;
