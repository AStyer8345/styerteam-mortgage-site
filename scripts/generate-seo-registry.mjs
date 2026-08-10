import fs from 'node:fs';

const site = 'https://styermortgage.com';
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

function pageType(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.includes('/blog/')) return 'article';
  if (pathname.includes('calculator')) return 'calculator';
  if (pathname.includes('mortgage-lender')) return 'location';
  if (pathname.startsWith('/loans/') || /loan|mortgage|non-qm|investor/.test(pathname)) return 'service';
  return 'resource';
}

function intent(pathname, type) {
  if (type === 'home') return 'Austin mortgage broker for complex-income borrowers';
  const phrase = pathname.split('/').pop().replace(/(?:index)?\.html$/, '').replace(/-tx$|-texas$/, '').replace(/-/g, ' ').trim();
  return phrase || 'mortgage resources';
}

const pages = urls.map((url) => {
  const pathname = new URL(url).pathname;
  const type = pageType(pathname);
  const file = pathname === '/' ? 'index.html' : pathname.endsWith('/') ? `${pathname.slice(1)}index.html` : pathname.slice(1);
  const html = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const reviewed = html.match(/"dateModified"\s*:\s*"([^"]+)"/i)?.[1]
    || html.match(/<time[^>]+datetime=["']([^"']+)/i)?.[1]
    || null;
  return {
    url,
    intent: intent(pathname, type),
    queryGroup: intent(pathname, type),
    pageType: type,
    owner: 'Adam Styer',
    reviewed,
    consolidationStatus: 'canonical'
  };
});

fs.mkdirSync('seo-data', { recursive: true });
fs.writeFileSync('seo-data/registry.json', `${JSON.stringify({ site, generatedAt: new Date().toISOString(), pages }, null, 2)}\n`);
console.log(`Wrote ${pages.length} canonical pages to seo-data/registry.json`);
