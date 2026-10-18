const path = require('node:path');

module.exports = {
  onPreBuild({ netlifyConfig, utils }) {
    if (process.env.NETLIFY !== 'true' || process.env.BRANCH !== 'preview-redesign' ||
        !['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT)) {
      return utils.build.failBuild('The redesign may build only on the preview-redesign branch in a Netlify preview context.');
    }
    // The production defaults stay in netlify.toml. Only this preview replaces
    // server functions and routing with its audited static, non-transmitting site.
    netlifyConfig.functions = { directory: path.resolve(__dirname, '../empty-functions'), node_bundler: 'esbuild' };
    netlifyConfig.edge_functions = [];
    netlifyConfig.build.edge_functions = path.resolve(__dirname, '../empty-edge-functions');
    netlifyConfig.redirects = [];
    netlifyConfig.headers = [];
    netlifyConfig.build.processing = { skip_processing: true, html: { pretty_urls: false } };
    console.log('Private redesign preview: static site, no server or edge functions, preview-only routes and headers.');
  },
};
