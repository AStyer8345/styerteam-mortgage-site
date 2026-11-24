import { inject, track } from '@vercel/analytics';

const productionOrigin = 'https://styerteam.com';
const ga4Destination = 'G-DDY0H0319S';

if (window.location.origin === productionOrigin) {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const page = new URL(canonical.href);
    if (page.origin === productionOrigin) installAnalytics(page);
  }
}

function installAnalytics(page) {
  const pageLocation = page.origin + page.pathname;
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const referrerOrigin = referrer && /^https?:$/.test(referrer.protocol) ? referrer.origin : '';
  // The Vercel collector reads document.referrer outside beforeSend. Drop hits
  // if the browser supplied more than an origin. The page also sets an
  // origin-only referrer policy for requests sent to the collection endpoints.
  const safeReferrer = !referrer || (referrerOrigin && document.referrer === referrerOrigin + '/');

  inject({
    mode: 'production',
    beforeSend: event => safeReferrer ? { ...event, url: pageLocation } : null,
  }, process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG);

  function trackLink(name) {
    track(name);
    // Reuse the site's live Google tag. Wait for the page view when GTM starts
    // on this same click, and send only to the GA4 stream.
    function send() {
      window.dataLayer.push(arguments);
    }
    const writeEvent = () => send('event', name, {
      send_to: ga4Destination,
      page_location: pageLocation,
      page_referrer: referrerOrigin,
    });
    if (window.dataLayer?.some(entry => entry?.event === 'gtm.load')) writeEvent();
    else window.StyerAfterGoogleTag?.(writeEvent);
  }

  function handleLink(event) {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    if (link.protocol === 'tel:') trackLink('click_to_call');
    else if (link.protocol === 'mailto:') trackLink('click_to_email');
    else if (link.origin === 'https://gorascal.my1003app.com') trackLink('application_click');
  }

  document.addEventListener('click', handleLink, true);
  document.addEventListener('auxclick', event => {
    if (event.button === 1) handleLink(event);
  }, true);
  document.addEventListener('styer:lead-submitted', event => {
    const form = event.detail?.form_name;
    if (!/^[a-z0-9-]{1,80}$/.test(form || '')) return;
    track('contact_form_submit', { form });
  });
}
