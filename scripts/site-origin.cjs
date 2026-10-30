const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_ORIGIN = 'https://thestyerteam.com';

function readConfiguredOrigin() {
  const candidates = [
    path.join(__dirname, '..', 'site.config.json'),
    path.join(process.cwd(), 'site.config.json'),
  ];
  for (const file of candidates) {
    try {
      const config = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (config && config.origin) return String(config.origin).replace(/\/$/, '');
    } catch (err) {
      // Netlify's function bundle may not keep the repo-relative path.
    }
  }
  return DEFAULT_ORIGIN;
}

function siteOrigin() {
  return String(process.env.SITE_ORIGIN || readConfiguredOrigin()).replace(/\/$/, '');
}

function siteHost() {
  return new URL(siteOrigin()).host;
}

module.exports = { siteOrigin, siteHost };
