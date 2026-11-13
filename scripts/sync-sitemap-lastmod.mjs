// Set each sitemap <lastmod> to the date of the last git commit that touched
// the page's file. Run locally after committing page changes, then commit the
// sitemap: `npm run seo:lastmod`. `--check` exits 1 when any date is stale.
// Not part of the Vercel build: the build clone is shallow, so dates there
// would be wrong.
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const check = process.argv.includes('--check');
const fileFor = (url) => {
  const pathname = new URL(url).pathname.slice(1);
  if (pathname === '' || pathname.endsWith('/')) return `${pathname}index.html`;
  if (fs.existsSync(pathname) && fs.statSync(pathname).isDirectory()) return `${pathname}/index.html`;
  return pathname;
};

// One pass over history, newest first: the first date seen for a file wins.
const lastCommit = new Map();
let date = '';
for (const line of execFileSync('git', ['log', '--format=@%cs', '--name-only'], { encoding: 'utf8', maxBuffer: 1 << 28 }).split('\n')) {
  if (line.startsWith('@')) date = line.slice(1);
  else if (line && !lastCommit.has(line)) lastCommit.set(line, date);
}

let stale = 0;
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const updated = sitemap.replace(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g, (entry, url, current) => {
  const committed = lastCommit.get(fileFor(url));
  if (!committed || committed === current) return entry;
  stale += 1;
  return `<loc>${url}</loc><lastmod>${committed}</lastmod>`;
});

if (check) {
  console.log(`Sitemap lastmod: ${stale} stale date(s).`);
  process.exit(stale ? 1 : 0);
}
fs.writeFileSync('sitemap.xml', updated);
console.log(`Sitemap lastmod: updated ${stale} date(s) from git history.`);
