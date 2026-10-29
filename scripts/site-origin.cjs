const fs = require('node:fs');
const path = require('node:path');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'site.config.json'), 'utf8'));

function siteOrigin() {
  return String(process.env.SITE_ORIGIN || config.origin).replace(/\/$/, '');
}

function siteHost() {
  return new URL(siteOrigin()).host;
}

module.exports = { siteOrigin, siteHost };
