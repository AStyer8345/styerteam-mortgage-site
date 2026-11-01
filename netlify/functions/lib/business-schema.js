// One reviewed identity set for static pages and future generated articles.
const entities = require('../../../config/business-entities.json');
const origin = 'https://styerteam.com';
const organization = `${origin}/#organization`;
const adam = `${origin}/#adam`;
function stringifyBusinessGraph(node) {
  const article = { ...node };
  delete article['@context'];
  article.author = { '@id': adam };
  article.publisher = { '@id': organization };
  article.image ||= `${origin}/assets/og-image.png`;
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': [...entities, article] }, null, 2).replace(/<\//g, '<\\/');
}
function articleSchema({ url, title, description, date }) {
  return stringifyBusinessGraph({ '@type': 'Article', '@id': `${url}#article`, url, headline: title, description, datePublished: date, dateModified: date });
}
module.exports = { stringifyBusinessGraph, articleSchema };
