import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// Runs on the packaged site only. Source HTML stays readable.
// Combines repeated local stylesheets, then stamps ?v=<hash> so the
// immutable cache headers in netlify.toml can stay on for a year.
const root = process.cwd();
const dist = path.join(root, '.site-dist');

function walk(dir, extension = '.html') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full, extension);
    return full.endsWith(extension) ? [full] : [];
  });
}

function hashFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10);
}

const hashes = new Map();
function versionOf(rel) {
  const abs = path.join(dist, rel);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return null;
  if (!hashes.has(rel)) hashes.set(rel, hashFile(abs));
  return hashes.get(rel);
}

function localPath(url) {
  if (!url || /^(?:[a-z]+:|\/\/|#|data:)/i.test(url)) return null;
  const clean = url.split(/[?#]/)[0];
  if (!clean || clean.endsWith('/')) return null;
  return path.posix.normalize(clean.replace(/^\//, ''));
}

function rewriteCss(rel, css) {
  const dir = path.posix.dirname(rel);
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (whole, quote, value) => {
    const target = value.trim();
    if (/^(?:data:|https?:|\/|#)/i.test(target)) return whole;
    const resolved = path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, target)).replace(/^\//, '');
    return `url(${quote}/${resolved}${quote})`;
  });
}

function safeToBundle(rel) {
  const css = fs.readFileSync(path.join(dist, rel), 'utf8');
  return !/@import\b|<\/style/i.test(css);
}

function bundleStyles(html) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)];
  const sheets = [];
  for (const match of tags) {
    const tag = match[0];
    const relValue = (tag.match(/\brel=(["'])(.*?)\1/i)?.[2] || '').toLowerCase();
    if (!relValue.split(/\s+/).includes('stylesheet')) continue;
    const media = (tag.match(/\bmedia=(["'])(.*?)\1/i)?.[2] || 'all').toLowerCase();
    if (media !== 'all') continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    const rel = localPath(href || '');
    if (!rel || !rel.endsWith('.css')) continue;
    if (!fs.existsSync(path.join(dist, rel))) continue;
    sheets.push({ tag, rel, index: match.index });
  }
  if (sheets.length < 4) return html;
  if (!sheets.every(sheet => safeToBundle(sheet.rel))) return html;
  const key = sheets.map(sheet => sheet.rel).join('|');
  const id = crypto.createHash('sha256').update(key).digest('hex').slice(0, 12);
  const bundleRel = `assets/bundles/styles-${id}.css`;
  const bundleAbs = path.join(dist, bundleRel);
  if (!fs.existsSync(bundleAbs)) {
    fs.mkdirSync(path.dirname(bundleAbs), { recursive: true });
    const css = stampFontUrls(sheets.map(sheet => `/* ${sheet.rel} */\n${rewriteCss(sheet.rel, fs.readFileSync(path.join(dist, sheet.rel), 'utf8'))}`).join('\n'), bundleRel);
    fs.writeFileSync(bundleAbs, css);
  }
  let next = html;
  for (const sheet of sheets) next = next.replace(sheet.tag, '');
  const link = `<link href="/${bundleRel}" rel="stylesheet"/>`;
  if (next.includes('</head>')) next = next.replace('</head>', `${link}</head>`);
  return next;
}

function stamp(url) {
  const rel = localPath(url);
  if (!rel || !/\.(?:css|js|png|jpe?g|webp|avif|svg|ico|woff2?)$/i.test(rel)) return url;
  const hash = versionOf(rel);
  if (!hash) return url;
  const [pathPart, hashPart] = url.split('#');
  const bare = pathPart.split('?')[0];
  return `${bare}?v=${hash}${hashPart ? `#${hashPart}` : ''}`;
}

// Font preloads and @font-face src must be the same URL, including ?v=.
// A version on only the preload makes the browser download the face twice.
function stampFontUrls(css, fromRel = '') {
  const dir = fromRel ? path.posix.dirname(fromRel) : '';
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, (whole, quote, raw) => {
    const target = raw.trim();
    if (/^(?:data:|https?:|#)/i.test(target)) return whole;
    const bare = target.split(/[?#]/)[0];
    if (!/\.woff2?$/i.test(bare)) return whole;
    const rel = bare.startsWith('/')
      ? path.posix.normalize(bare).replace(/^\//, '')
      : path.posix.normalize(path.posix.join(dir === '.' ? '' : dir, bare)).replace(/^\//, '');
    return `url(${quote}${stamp(`/${rel}`)}${quote})`;
  });
}

function stampHtml(html, htmlRel) {
  html = html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, block => stampFontUrls(block, htmlRel));
  // Some inline initializers intentionally depend on the immediately preceding
  // external script. Preserve that ordering when the source marks the script
  // as synchronous; defer every other unannotated local script as before.
  html = html.replace(/<script\b(?![^>]*\b(?:defer|async|data-styer-sync)\b)([^>]*\bsrc=)/gi, '<script defer$1');
  html = html.replace(/\bdata-deferred-href=(["'])([^"']+)\1/gi, (whole, quote, url) => {
    const next = stamp(url);
    return next === url ? whole : `data-deferred-href=${quote}${next}${quote}`;
  });
  html = html.replace(/\b(?:src|href)=(["'])([^"']+)\1/gi, (whole, quote, url) => {
    const next = stamp(url);
    return next === url ? whole : `${whole.slice(0, whole.indexOf(quote))}${quote}${next}${quote}`;
  });
  html = html.replace(/\b(?:srcset|imagesrcset)=(["'])([^"']+)\1/gi, (whole, quote, value) => {
    const next = value.split(',').map(part => {
      const bits = part.trim().split(/\s+/);
      if (!bits[0]) return part;
      bits[0] = stamp(bits[0]);
      return bits.join(' ');
    }).join(', ');
    return `${whole.slice(0, whole.indexOf(quote))}${quote}${next}${quote}`;
  });
  return html;
}

for (const file of walk(dist, '.css')) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  const before = fs.readFileSync(file, 'utf8');
  const after = stampFontUrls(before, rel);
  if (after !== before) fs.writeFileSync(file, after);
}

let bundled = 0;
let stamped = 0;
for (const file of walk(dist)) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  const before = fs.readFileSync(file, 'utf8');
  let html = bundleStyles(before);
  if (html !== before) bundled += 1;
  const after = stampHtml(html, rel);
  if (after !== html) stamped += 1;
  if (after !== before) fs.writeFileSync(file, after);
}

const mismatches = [];
for (const file of walk(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  const cssParts = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const relValue = (tag.match(/\brel=(["'])(.*?)\1/i)?.[2] || '').toLowerCase();
    if (!relValue.split(/\s+/).includes('stylesheet')) continue;
    const href = tag.match(/\bhref=(["'])(.*?)\1/i)?.[2] || '';
    const rel = localPath(href);
    if (!rel) continue;
    const abs = path.join(dist, rel);
    if (fs.existsSync(abs)) cssParts.push(fs.readFileSync(abs, 'utf8'));
  }
  for (const style of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) cssParts.push(style[1]);
  const urls = new Set([...cssParts.join('\n').matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)].map(match => match[2].trim()));
  for (const tag of html.matchAll(/<link\b[^>]*>/gi)) {
    const relValue = (tag[0].match(/\brel=(["'])(.*?)\1/i)?.[2] || '').toLowerCase();
    const asValue = (tag[0].match(/\bas=(["'])(.*?)\1/i)?.[2] || '').toLowerCase();
    if (!relValue.split(/\s+/).includes('preload') || asValue !== 'font') continue;
    const href = tag[0].match(/\bhref=(["'])(.*?)\1/i)?.[2] || '';
    if (!href || /^(?:https?:|\/\/)/i.test(href) || !/\.woff2?(?:$|[?#])/i.test(href)) continue;
    if (!urls.has(href)) mismatches.push(`${path.relative(dist, file).split(path.sep).join('/')}: ${href}`);
  }
}
if (mismatches.length) {
  throw new Error(`Font preload URL does not match a shipped CSS url():\n${mismatches.join('\n')}`);
}
console.log(`Published assets: bundled styles on ${bundled} pages, stamped ${stamped} pages with content hashes.`);
