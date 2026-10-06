import type { Config } from '@netlify/functions';
import { adminAssets } from './_shared/admin-assets.ts';
import auth from './lib/admin-session.js';
const headers = {'Cache-Control':'private, no-store', 'X-Robots-Tag':'noindex, nofollow', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff', 'X-Frame-Options':'DENY'};
const login = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Administrative access</title><body><main><h1>Administrative access</h1><p>Enter your existing Marketing Command Center access code.</p><form method="post"><label>Access code <input type="password" name="code" autocomplete="current-password" required maxlength="256"></label><button type="submit">Sign in</button></form></main></body></html>`;
export default async (request:Request) => {
  const url = new URL(request.url);
  const h = Object.fromEntries(request.headers.entries());
  const event = {headers:h,rawUrl:request.url,httpMethod:request.method};
  const path = url.pathname.endsWith('.html') || /\.(js|css|json)$/.test(url.pathname) ? url.pathname : url.pathname + '.html';
  const asset = adminAssets[path];
  if (url.pathname === '/api/admin-session' && request.method === 'DELETE') {
    if (!auth.sameOrigin(event)) return new Response('Forbidden',{status:403,headers});
    return new Response(null,{status:204,headers:{...headers,'Set-Cookie':auth.cookieHeader('')}});
  }
  if (!asset) return new Response('Not found',{status:404,headers});
  if (request.method === 'POST') {
    if (!auth.sameOrigin(event)) return new Response('Forbidden',{status:403,headers});
    if (!process.env.MCC_PASS) return new Response('Administrative access unavailable',{status:503,headers});
    const body = await request.text();
    if (Buffer.byteLength(body) > 2048 || request.headers.get('content-type')?.split(';')[0] !== 'application/x-www-form-urlencoded') return new Response('Invalid request',{status:400,headers});
    const code = new URLSearchParams(body).get('code');
    if (!auth.equal(code,process.env.MCC_PASS)) return new Response(login,{status:401,headers:{...headers,'Content-Type':'text/html; charset=utf-8'}});
    return new Response(null,{status:303,headers:{...headers,Location:url.pathname,'Set-Cookie':auth.cookieHeader(auth.issueSession())}});
  }
  if (!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed',{status:405,headers});
  if (!auth.validSession(h)) return new Response(request.method === 'HEAD' ? null : asset.type.startsWith('text/html') ? login : 'Unauthorized',{status:401,headers:{...headers,'Content-Type':asset.type.startsWith('text/html')?'text/html; charset=utf-8':'text/plain; charset=utf-8'}});
  return new Response(request.method === 'HEAD' ? null : asset.body,{status:200,headers:{...headers,'Content-Type':asset.type}});
};
export const config:Config = {
 path:['/dashboard.html','/dashboard','/dashboard.js','/dashboard.css','/marketing-command-center.html','/marketing-command-center','/marketing-content.html','/marketing-content','/ops.html','/ops','/task-dashboard.html','/task-dashboard','/task-reports.json','/loan-dashboard.html','/loan-dashboard','/api/admin-session'],
 rateLimit:{action:'rate_limit',aggregateBy:['ip','domain'],windowLimit:60,windowSize:60}
};
