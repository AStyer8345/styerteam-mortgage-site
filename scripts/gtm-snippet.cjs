'use strict';

// Production pages create dataLayer at once, so every event queues from the
// first byte, but load the GTM container late: 2.5 seconds after window load
// or on the first pointer, key, touch or scroll, whichever comes first.
// Thank-you pages load it immediately so a conversion is never missed.
// StyerAfterGoogleTag flushes direct gtag commands only after GTM emits
// gtm.load. Preview hosts do not load the container.
const gtmSnippet = '<script>(function(){var host=location.hostname;if(host!=="styerteam.com"&&host!=="www.styerteam.com")return;if(window.__styerTags)return;window.__styerTags=1;window.dataLayer=window.dataLayer||[];var wake=["pointerdown","keydown","touchstart","scroll"];function start(){if(window.__styerTagsStarted)return;window.__styerTagsStarted=1;wake.forEach(function(type){window.removeEventListener(type,start,true);});window.dataLayer.push({"gtm.start":new Date().getTime(),event:"gtm.js"});var j=document.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=GTM-PQQ6PGLR";var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(j,f);}function later(){setTimeout(start,2500);}if(/thank-you/.test(location.pathname)){start();}else{wake.forEach(function(type){window.addEventListener(type,start,{capture:true,passive:true});});if(document.readyState==="complete"){later();}else{window.addEventListener("load",later);}}window.StyerAfterGoogleTag=function(fn){var q=window.__styerTagQueue||(window.__styerTagQueue=[]);q.push(fn);if(window.__styerTagWait)return;window.__styerTagWait=setInterval(function(){var ready=(window.dataLayer||[]).some(function(entry){return entry&&entry.event==="gtm.load";});if(!ready)return;clearInterval(window.__styerTagWait);window.__styerTagWait=0;q.splice(0).forEach(function(item){item();});},50);};})();</script>';

module.exports = { gtmSnippet };
