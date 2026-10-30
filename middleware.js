// Preview noindex, withheld pages, form posts, and the admin gate.
// Production (VERCEL_ENV=production) does not add a sitewide X-Robots-Tag.
// Vercel compiles this file to CommonJS, where import.meta is a syntax error.
// Use the CommonJS require and __dirname that the compiled module provides.
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { handleFormPost } = require('./api/lib/form-post.js');
const auth = require('./netlify/functions/lib/admin-session.js');
const blocked = new Set(require('./api/lib/blocked-paths.json'));
const root = typeof __dirname === 'string' ? __dirname : process.cwd();

const protectedPaths = new Set([
  '/dashboard.html', '/dashboard', '/dashboard.js', '/dashboard.css',
  '/marketing-command-center.html', '/marketing-command-center',
  '/marketing-content.html', '/marketing-content',
  '/ops.html', '/ops',
  '/task-dashboard.html', '/task-dashboard',
  '/task-reports.json',
  '/loan-dashboard.html', '/loan-dashboard',
  '/api/admin-session',
]);

const gateHeaders = {
  'Cache-Control': 'private, no-store',
  'X-Robots-Tag': 'noindex, nofollow',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

const login = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Administrative access</title><body><main><h1>Administrative access</h1><p>Enter your existing Marketing Command Center access code.</p><form method="post"><label>Access code <input type="password" name="code" autocomplete="current-password" required maxlength="256"></label><button type="submit">Sign in</button></form></main></body></html>';

export const config = { runtime: 'nodejs' };

export function continueRequest() {
  const headers = new Headers();
  headers.set('x-middleware-next', '1');
  if (process.env.VERCEL_ENV !== 'production') headers.set('X-Robots-Tag', 'noindex');
  return new Response(null, { headers });
}

export function notFoundResponse() {
  let body = 'Not found';
  try { body = readFileSync(path.join(root, '404.html'), 'utf8'); } catch { /* keep the short body */ }
  return new Response(body, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex',
    },
  });
}

async function adminGate(request, url) {
  const headers = Object.fromEntries(request.headers.entries());
  const event = { headers, rawUrl: request.url, httpMethod: request.method };
  if (url.pathname === '/api/admin-session' && request.method === 'DELETE') {
    if (!auth.sameOrigin(event)) return new Response('Forbidden', { status: 403, headers: gateHeaders });
    return new Response(null, { status: 204, headers: { ...gateHeaders, 'Set-Cookie': auth.cookieHeader('') } });
  }
  if (request.method === 'POST') {
    if (!auth.sameOrigin(event)) return new Response('Forbidden', { status: 403, headers: gateHeaders });
    if (!process.env.MCC_PASS) return new Response('Administrative access unavailable', { status: 503, headers: gateHeaders });
    const body = await request.text();
    if (Buffer.byteLength(body) > 2048 || (request.headers.get('content-type') || '').split(';')[0] !== 'application/x-www-form-urlencoded') {
      return new Response('Invalid request', { status: 400, headers: gateHeaders });
    }
    const code = new URLSearchParams(body).get('code');
    if (!auth.equal(code, process.env.MCC_PASS)) {
      return new Response(login, { status: 401, headers: { ...gateHeaders, 'Content-Type': 'text/html; charset=utf-8' } });
    }
    return new Response(null, {
      status: 303,
      headers: { ...gateHeaders, Location: url.pathname, 'Set-Cookie': auth.cookieHeader(auth.issueSession()) },
    });
  }
  if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: gateHeaders });
  if (!auth.validSession(headers)) {
    const html = url.pathname.endsWith('.html') || !path.posix.extname(url.pathname);
    return new Response(request.method === 'HEAD' ? null : html ? login : 'Unauthorized', {
      status: 401,
      headers: { ...gateHeaders, 'Content-Type': html ? 'text/html; charset=utf-8' : 'text/plain; charset=utf-8' },
    });
  }
  return continueRequest();
}

export default async function middleware(request) {
  const url = new URL(request.url);
  if (protectedPaths.has(url.pathname)) return adminGate(request, url);
  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (request.method === 'POST' && type.includes('application/x-www-form-urlencoded') && !url.pathname.startsWith('/api/')) {
    return handleFormPost(request);
  }
  if (request.method !== 'POST' && blocked.has(url.pathname)) return notFoundResponse();
  return continueRequest();
}
