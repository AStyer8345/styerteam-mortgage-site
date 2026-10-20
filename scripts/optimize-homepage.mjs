import fs from 'node:fs';
import path from 'node:path';

// Optimize the packaged homepage only. Keep the authored shared stylesheets and
// their cascade order intact, including all responsive and interactive states.
const root = process.cwd();
const target = path.join(root, '.site-dist/index.html');
let html = fs.readFileSync(target, 'utf8');
html = html.replace(/  <!-- Fonts -->[\s\S]*?(?=  <!-- Critical CSS)/, `  <!-- Same fonts, discovered directly without a third-party CSS round trip. -->
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/source-serif-4-roman-latin.woff2" crossorigin>
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
fs.writeFileSync(target, html);
console.log(`Homepage: inlined ${styles.length} stylesheets in original cascade order; self-hosted Inter.`);
