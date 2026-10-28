import fs from 'node:fs';
import path from 'node:path';

// Optimize the packaged homepage only. Keep the authored shared stylesheets and
// their cascade order intact, including all responsive and interactive states.
const root = process.cwd();
const target = path.join(root, '.site-dist/index.html');
let html = fs.readFileSync(target, 'utf8');
html = html.replace(/  <!-- Fonts -->[\s\S]*?(?=  <!-- Critical CSS)/, `  <!-- Same fonts, discovered directly without a third-party CSS round trip. -->
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/source-serif-4-600-latin.woff2" crossorigin>
  <style data-homepage-fonts>${fs.readFileSync('assets/fonts/inter.css', 'utf8')}</style>

`);
// Remove the fallback duplicate before replacing the async base stylesheet.
html = html.replace(/<noscript><link[^>]+href="style\.css[^"]*"[^>]*><\/noscript>/, '');
const styles = [];
html = html.replace(/<link\b[^>]*>/g, tag => {
  const href = tag.match(/href="([^"]+)"/)?.[1];
  if (!href || !/\.css(?:\?|$)/.test(href) || /^https?:/.test(href)) return tag;
  if (!/rel="stylesheet"|as="style"/.test(tag)) return tag;
  const file = href.split('?')[0].replace(/^\//, '');
  const css = fs.readFileSync(path.join(root, file), 'utf8');
  if (/@import\b|<\/style/i.test(css)) throw new Error(`Unsafe inline stylesheet: ${file}`);
  // Root-level stylesheet URLs retain the same base on the root homepage.
  styles.push(file);
  return `<style data-homepage-style="${file}">${css}</style>`;
});
if (styles.length !== 8) throw new Error(`Expected 8 homepage stylesheets, found ${styles.length}`);
// Same semibold outlines and optical-size axis as the original headline font.
// A distinct family avoids matching the shared variable face before the small face.
html = html.replace('</head>', `<style data-homepage-headline-font>
@font-face{font-family:'Homepage Serif';font-style:normal;font-weight:600;font-display:swap;src:url(/assets/fonts/source-serif-4-600-latin.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
body.premium-homepage.home-pilot main .hero h1{font-family:'Homepage Serif','Source Serif 4',Georgia,serif!important}
</style></head>`);
fs.writeFileSync(target, html);
console.log(`Homepage: inlined ${styles.length} stylesheets in original cascade order; self-hosted Inter.`);
