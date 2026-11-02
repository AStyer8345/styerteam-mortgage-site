/* Public Cloudflare Turnstile site key.
   Leave this empty in git. An empty key does not render a widget, and lead
   forms submit the same way they do without Turnstile.

   Vercel environment variable: TURNSTILE_SITE_KEY
   The publish step writes that value into this file (and the same marker in
   js/form-guard.js) in the deployed output only. It is a public site key.

   The secret is a different variable and never belongs in this file:
   TURNSTILE_SECRET_KEY, read only by the lead-intake function on the server.
   When that secret is unset, the server skips token verification.

   A local check can set window.STYER_TURNSTILE_SITE_KEY before this file runs.
   Do not commit Cloudflare's test keys as the production value. */
window.STYER_TURNSTILE_SITE_KEY = window.STYER_TURNSTILE_SITE_KEY || "" /* turnstile-site-key */;
