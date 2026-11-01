'use strict';

// Production pages load GTM immediately so the GA4 page_view is queued before
// any later event. StyerAfterGoogleTag flushes direct gtag commands only after
// GTM emits gtm.load, which is after the container, DOM-ready, and window-load
// triggers. Preview hosts do not load the container.
const gtmSnippet = '<script>(function(){var host=location.hostname;if(host!=="styerteam.com"&&host!=="www.styerteam.com")return;if(window.__styerTags)return;window.__styerTags=1;window.dataLayer=window.dataLayer||[];window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});var j=document.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=GTM-PQQ6PGLR";var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(j,f);window.StyerAfterGoogleTag=function(fn){var q=window.__styerTagQueue||(window.__styerTagQueue=[]);q.push(fn);if(window.__styerTagWait)return;window.__styerTagWait=setInterval(function(){var ready=(window.dataLayer||[]).some(function(entry){return entry&&entry.event==="gtm.load";});if(!ready)return;clearInterval(window.__styerTagWait);window.__styerTagWait=0;q.splice(0).forEach(function(item){item();});},50);};})();</script>';

module.exports = { gtmSnippet };
