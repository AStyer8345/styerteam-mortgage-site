// Build vercel.json from _redirects and netlify.toml. Netlify files stay in place.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

const HOSTS = [
  'adamstyer.com',
  'www.adamstyer.com',
  'styermortgage.com',
  'www.styermortgage.com',
  'www.styerteam.com',
];

export function parseRedirectsFile(text) {
  const rules = [];
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 3) throw new Error(`Unparsed redirect: ${line}`);
    const force = parts[2].includes('!');
    const status = Number.parseInt(parts[2], 10);
    rules.push({ from: parts[0], to: parts[1], status, force, origin: '_redirects' });
  }
  return rules;
}

export function parseTomlRedirects(text) {
  return text.split('[[redirects]]').slice(1).map((block) => {
    const from = /from = "([^"]+)"/.exec(block)?.[1];
    const to = /to = "([^"]+)"/.exec(block)?.[1];
    const status = Number(/status = (\d+)/.exec(block)?.[1] || 301);
    const force = /force = true/.test(block);
    if (!from || !to) throw new Error('Redirect block is missing from or to');
    return { from, to, status, force, origin: 'netlify.toml' };
  });
}

export function parseTomlHeaders(text) {
  const section = text.split('# ─── 301 Redirects')[0];
  return section.split('[[headers]]').slice(1).map((block) => {
    const source = /for = "([^"]+)"/.exec(block)?.[1];
    const values = {};
    const body = (block.split('[headers.values]')[1] || '').split('\n[[')[0];
    for (const match of body.matchAll(/^\s*([A-Za-z0-9-]+) = "([^"]*)"/gm)) values[match[1]] = match[2];
    if (!source || !Object.keys(values).length) throw new Error(`Header block could not be parsed for ${source}`);
    return { source, values };
  });
}

function headerSource(netlifyPath) {
  if (!netlifyPath.includes('*')) return netlifyPath;
  return netlifyPath.split('*').map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('(.*)');
}

function pathSource(from) {
  if (from.endsWith('/*')) return `${from.slice(0, -2)}/:path*`;
  if (from.includes('*') || from.includes(':')) throw new Error(`Unsupported redirect source: ${from}`);
  return from;
}

function pathDestination(to) {
  return to.replaceAll(':splat', ':path*');
}

function hostRules() {
  const rules = [];
  for (const host of HOSTS) {
    for (const source of ['/', '/:path*']) {
      const destination = source === '/' ? 'https://styerteam.com/' : 'https://styerteam.com/:path*';
      rules.push({
        source,
        has: [{ type: 'host', value: host }],
        destination,
        statusCode: 301,
      });
    }
  }
  return rules;
}

export function buildConfig({ redirectsText, tomlText } = {}) {
  const redirectsFile = redirectsText ?? fs.readFileSync(path.join(root, '_redirects'), 'utf8');
  const toml = tomlText ?? fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
  const raw = [...parseRedirectsFile(redirectsFile), ...parseTomlRedirects(toml)];
  const blocked = [];
  const redirects = hostRules();
  const rewrites = [{ source: '/.netlify/functions/:name', destination: '/api/:name' }];
  const seen = new Set();

  for (const rule of raw) {
    if (/^https?:\/\//.test(rule.from)) {
      const host = /^https?:\/\/([^/]+)\/\*$/.exec(rule.from);
      if (!host || rule.status !== 301 || !rule.to.startsWith('https://styerteam.com/:splat')) {
        throw new Error(`Unsupported host redirect: ${rule.from}`);
      }
      if (!HOSTS.includes(host[1])) throw new Error(`Host redirect missing from the Vercel host list: ${host[1]}`);
      continue;
    }
    if (rule.status === 404) {
      blocked.push(rule.from);
      continue;
    }
    const source = pathSource(rule.from);
    const destination = pathDestination(rule.to);
    const key = `${rule.status} ${source} ${destination}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (rule.status === 200) {
      rewrites.push({ source, destination });
      continue;
    }
    if (![301, 302, 303, 307, 308].includes(rule.status)) throw new Error(`Unsupported status ${rule.status} for ${rule.from}`);
    redirects.push({ source, destination, statusCode: rule.status });
  }

  const headers = parseTomlHeaders(toml).map((block) => ({
    source: headerSource(block.source),
    headers: Object.entries(block.values).map(([key, value]) => ({ key, value })),
  }));

  return {
    buildCommand: 'node scripts/vercel-build.mjs',
    outputDirectory: '.site-dist',
    framework: null,
    cleanUrls: false,
    trailingSlash: false,
    redirects,
    rewrites,
    headers,
    functions: { 'api/**/*.js': { maxDuration: 30 } },
    blocked,
  };
}

function compileSource(source) {
  const names = [];
  let pattern = '^';
  const parts = source.split('/');
  parts.forEach((part, index) => {
    if (index > 0) pattern += '/';
    if (part === ':path*') {
      names.push('path');
      pattern += '(.*)';
      return;
    }
    if (part.startsWith(':') && !part.includes('/')) {
      names.push(part.slice(1));
      pattern += '([^/]+)';
      return;
    }
    if (part.includes(':')) throw new Error(`Unsupported route token: ${source}`);
    pattern += part.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
  });
  pattern += '$';
  return { re: new RegExp(pattern), names };
}

function fill(destination, values) {
  let output = destination;
  for (const [name, value] of Object.entries(values)) output = output.replaceAll(`:${name}*`, value).replaceAll(`:${name}`, value);
  return output;
}

export function matchRequest(config, { host = 'styerteam.com', path: pathname }) {
  const [bare, query] = pathname.split('?');
  for (const rule of config.redirects) {
    if (rule.has && !rule.has.every((condition) => condition.type === 'host' && condition.value.toLowerCase() === host.toLowerCase())) continue;
    const compiled = compileSource(rule.source);
    const match = compiled.re.exec(bare);
    if (!match) continue;
    const values = {};
    compiled.names.forEach((name, index) => { values[name] = match[index + 1] || ''; });
    let destination = fill(rule.destination, values);
    if (query && !destination.includes('?')) destination += `?${query}`;
    return { kind: 'redirect', status: rule.statusCode, destination };
  }
  for (const rule of config.rewrites) {
    const compiled = compileSource(rule.source);
    const match = compiled.re.exec(bare);
    if (!match) continue;
    const values = {};
    compiled.names.forEach((name, index) => { values[name] = match[index + 1] || ''; });
    return { kind: 'rewrite', status: 200, destination: fill(rule.destination, values) };
  }
  if (config.blocked.includes(bare)) return { kind: 'blocked', status: 404, destination: '/404.html' };
  return null;
}

export function publicConfig(config = buildConfig()) {
  const { blocked, ...published } = config;
  return { published, blocked };
}

function write() {
  const config = buildConfig();
  const { published, blocked } = publicConfig(config);
  fs.writeFileSync(path.join(root, 'vercel.json'), `${JSON.stringify(published, null, 2)}\n`);
  fs.mkdirSync(path.join(root, 'api/lib'), { recursive: true });
  fs.writeFileSync(path.join(root, 'api/lib/blocked-paths.json'), `${JSON.stringify(blocked, null, 2)}\n`);
  console.log(`vercel.json: ${published.redirects.length} redirects, ${published.rewrites.length} rewrites, ${published.headers.length} header blocks, ${blocked.length} blocked paths`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) write();
