import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

if (process.env.NETLIFY !== 'true' || process.env.BRANCH !== 'preview-redesign' ||
    !['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
  throw new Error('This build is restricted to preview-redesign on Netlify. Production and local execution are disabled.');
}
const root = path.dirname(fileURLToPath(import.meta.url));
for (const script of ['static-verify.mjs', 'assembled-verify.mjs', 'asset-verify.mjs',
  'calculator-numerics.mjs', 'interaction-dom.mjs', 'preview-safety-dom.mjs', 'navigation-dom.mjs']) {
  const result = spawnSync(process.execPath, [path.join(root, 'qa', script)], { stdio: 'inherit' });
  if (result.error || result.status !== 0) throw new Error(`Preview verification failed: ${script}`);
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'route-manifest.json'), 'utf8'));
if (manifest.routes.length !== 173) throw new Error('Expected the complete 173-route ledger.');
fs.writeFileSync(path.join(root, 'site', 'preview-build.json'), JSON.stringify({
  branch: process.env.BRANCH,
  commit: process.env.COMMIT_REF,
  context: process.env.CONTEXT,
  ledgerRoutes: manifest.routes.length,
  forms: 'disabled',
  hosting: 'Netlify',
}, null, 2));
console.log('Netlify preview ready: 173 ledger routes, eight calculator engines, shared interactions verified.');
