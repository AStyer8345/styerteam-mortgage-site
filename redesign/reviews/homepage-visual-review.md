# Homepage photography and review prominence — October 18, 2026

The prior minimalist homepage reduced Adam's Google proof to a small link. This
pass restores prominent review ratings, real borrower excerpts and a photographic
hero with Adam's existing transparent portrait. It is a focused homepage change.

The earlier reference at https://styer-tiffany-preview.vercel.app/ was inspected
in the browser for its photography, serif typography and review presentation.
No Vercel deployment or configuration was changed.

Existing assets used: `hero-bg.webp`, `adam-casual-cutout.webp`, `google-logo.png`
and `zillow-logo.svg`. No generated likeness or new testimonial was introduced.
The photograph is decorative. Adam's cutout remains a separate responsive image.

Ratings checked directly on the public profiles on October 18, 2026:

- Google: 5.0 / 5 from 99 reviews, place ID `ChIJYy5uEFPKRIYRmF-k_5gPk74`.
- Zillow: 4.98 / 5 from 45 reviews, `zillow.com/lender-profile/adamstyer/`.

Keep those source counts separate. The older reference's combined 143-review
label was inconsistent with the individual counts and has not been copied.
Excerpts retain names and outbound source links from the existing review work.
Sherita and Matthew's selected wording was checked on the visible Google page;
Ellery's excerpt and direct review link were preserved from the earlier source.
No new review/rating schema or endorsement claims were added.

The homepage-only stylesheet loads after the existing design system. Deep guides,
calculator code, the 173-route ledger, and live inquiry routing are unchanged.
Build and browser checks run through the existing private Netlify preview.

The preview CSP permits Netlify's own review-tool iframe at app.netlify.com so
its injected collaboration drawer does not render as a broken browser frame.
The main page still uses connect-src 'none' and form-action 'none'; inquiry
transport, analytics and production headers are not changed.
