// Vercel build. Maps VERCEL_ENV onto the Netlify CONTEXT the site already uses.
// Production submits IndexNow. Preview and local runs of this script do not.
import { spawnSync } from 'node:child_process';

const env = { ...process.env };
if (!env.CONTEXT) {
  env.CONTEXT = env.VERCEL_ENV === 'production' ? 'production' : 'deploy-preview';
}
if (!env.COMMIT_REF && env.VERCEL_GIT_COMMIT_SHA) env.COMMIT_REF = env.VERCEL_GIT_COMMIT_SHA;
if (!env.CACHED_COMMIT_REF && env.VERCEL_GIT_PREVIOUS_SHA) env.CACHED_COMMIT_REF = env.VERCEL_GIT_PREVIOUS_SHA;

console.log(`Vercel build: VERCEL_ENV=${env.VERCEL_ENV || '(unset)'} CONTEXT=${env.CONTEXT}`);
const result = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', env });
process.exit(result.status == null ? 1 : result.status);
