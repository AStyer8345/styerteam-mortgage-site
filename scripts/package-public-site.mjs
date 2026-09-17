import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Publish only website assets. Functions are bundled separately by Netlify.
// Never expose source, tests, audit reports, repository metadata, or local files.
const root = process.cwd();
const destination = path.join(root, '.site-dist');
const publicDirectories = new Set(['assets', 'css', 'js', 'blog', 'loans', 'rates', 'realtor-updates', 'resources', 'scenarios', 'updates', 'downloads']);
const publicExtensions = /\.(html|css|js|svg|png|jpe?g|webp|ico|json|xml|txt|woff2?|pdf)$/i;
const rootData = new Set(['rates.json', 'recent-updates.json', 'task-reports.json', 'robots.txt', 'llms.txt', 'acd320ce4aaac882bfb455892bdcf208.txt', 'sitemap.xml', '_redirects', '_headers']);
const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const files = tracked.filter(file => {
  if (file.startsWith('.') || file.includes('/originals/') || file.includes('_TEMPLATE')) return false;
  const parts = file.split('/');
  if (parts.length === 1) return rootData.has(file) || (/\.(html|css|js|svg|png|ico|pdf)$/i.test(file) && file !== 'server.js');
  return publicDirectories.has(parts[0]) && publicExtensions.test(file);
});
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
for (const file of files) {
  const output = path.join(destination, file);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.copyFileSync(path.join(root, file), output);
}
console.log(`Packaged ${files.length} public website files. Functions, source, reports and metadata excluded.`);
