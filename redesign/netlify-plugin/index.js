const path = require('node:path');
const fs = require('node:fs');

module.exports = {
  onPreBuild({ netlifyConfig, utils }) {
    const branch = process.env.HEAD || process.env.BRANCH;
    if (process.env.NETLIFY !== 'true' || branch !== 'preview-redesign' ||
        !['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
      return utils.build.failBuild('The redesign may build only on the preview-redesign branch in a Netlify preview context. ' + JSON.stringify({ branch, context: process.env.CONTEXT, netlify: process.env.NETLIFY }));
    }
    // The production defaults stay in netlify.toml. Only this preview replaces
    // server functions and routing with its audited static, non-transmitting site.
    netlifyConfig.functions.directory = path.resolve(__dirname, '../empty-functions');
    netlifyConfig.edge_functions = [];
    netlifyConfig.build.edge_functions = path.resolve(__dirname, '../empty-edge-functions');
    netlifyConfig.redirects = fs.readFileSync(path.resolve(__dirname, '../site/_redirects'), 'utf8')
      .split('\n').filter(line => line.trim() && !line.startsWith('#')).map(line => {
        const [from, to, status] = line.trim().split(/\s+/);
        return { from, to, status: Number.parseInt(status, 10), force: status.endsWith('!') };
      });
    const values = {};
    for (const line of fs.readFileSync(path.resolve(__dirname, '../site/_headers'), 'utf8').split('\n').slice(1)) {
      const colon = line.indexOf(':');
      if (colon !== -1) values[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    }
    netlifyConfig.headers = [{ for: '/*', values }];
    netlifyConfig.build.processing.skip_processing = true;
    netlifyConfig.build.processing.html.pretty_urls = false;
    console.log('Private redesign preview: static site, no server or edge functions, preview-only routes and headers.');
  },
};
