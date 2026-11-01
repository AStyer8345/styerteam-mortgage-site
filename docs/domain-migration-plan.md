# Domain migration plan: styermortgage.com to thestyerteam.com

Prepared 2026-10-29 for GoRascal Compliance. The domain https://thestyerteam.com is not confirmed for launch. This branch only prepares the site. Do not change DNS, do not add the domain in Netlify, and do not enable the redirects below until Compliance gives written approval.

The site origin for this branch is the `origin` value in `site.config.json`. A build can override it with the `SITE_ORIGIN` environment variable. Page builders and IndexNow read that value. Static HTML, the sitemap, robots.txt, and llms.txt on this branch are already stamped to `https://thestyerteam.com`.

No page paths were renamed. A path such as `/bank-statement-loans.html` stays the same. The host change is path-preserving. Renaming paths that contain the words mortgage or loans is a separate decision and is not in this map.

## 301 map

Send every request on the old hosts to the same path on the new host.

| From | To |
| --- | --- |
| `https://styermortgage.com/` | `https://thestyerteam.com/` |
| `https://styermortgage.com/*` | `https://thestyerteam.com/:splat` |
| `https://www.styermortgage.com/` | `https://thestyerteam.com/` |
| `https://www.styermortgage.com/*` | `https://thestyerteam.com/:splat` |
| `http://styermortgage.com/*` | `https://thestyerteam.com/:splat` |
| `http://www.styermortgage.com/*` | `https://thestyerteam.com/:splat` |

There are no page renames in this plan. If a path is renamed later, add a specific 301 from the old path to the new path before the host-wide splat, or the splat will preserve the old path on the new host.

## DO NOT ENABLE UNTIL APPROVED

Do not paste this into the live `netlify.toml` or `_redirects` until the new domain is the production host and Compliance has approved the cutover in writing. Enabling it while styermortgage.com is still the live site would redirect current visitors and crawlers.

```toml
# DO NOT ENABLE UNTIL APPROVED
# Host redirect only. Path is preserved. No page renames.
[[redirects]]
  from = "https://styermortgage.com/*"
  to = "https://thestyerteam.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "https://www.styermortgage.com/*"
  to = "https://thestyerteam.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://styermortgage.com/*"
  to = "https://thestyerteam.com/:splat"
  status = 301
  force = true

[[redirects]]
  from = "http://www.styermortgage.com/*"
  to = "https://thestyerteam.com/:splat"
  status = 301
  force = true
```

The same rules in `_redirects` form, also not enabled:

```
# DO NOT ENABLE UNTIL APPROVED
https://styermortgage.com/*  https://thestyerteam.com/:splat  301!
https://www.styermortgage.com/*  https://thestyerteam.com/:splat  301!
http://styermortgage.com/*  https://thestyerteam.com/:splat  301!
http://www.styermortgage.com/*  https://thestyerteam.com/:splat  301!
```

## Order of operations

1. Written approval from GoRascal Compliance for the domain thestyerteam.com. Do not launch before that approval.
2. Confirm the domain registration is in an account Adam or GoRascal controls.
3. Add thestyerteam.com and www.thestyerteam.com as domains on the Netlify site. Do not remove styermortgage.com.
4. Point DNS for thestyerteam.com at Netlify. Leave MX records for thestyerteam.com alone. Email on that domain is separate from the website.
5. Wait until Netlify provisions SSL for thestyerteam.com and www.thestyerteam.com.
6. Confirm the site on the new host serves the prepared pages, including /licensing.html, before any redirect.
7. Enable the host redirects above. Force them so an existing Netlify rule cannot shadow them.
8. In Google Search Console, add the new property and use Change of address from styermortgage.com to thestyerteam.com.
9. In Bing Webmaster Tools, add the new site and submit the new sitemap.
10. Resubmit https://thestyerteam.com/sitemap.xml in both consoles.
11. Run IndexNow against the new host. The key file stays at `/{key}.txt`. The submitter reads `site.config.json`.
12. Update Google Business Profile and social profile website links to https://thestyerteam.com.
13. Keep styermortgage.com registered and redirecting for at least 12 months.

## Risks

- Rankings can dip while Google and Bing recrawl the new host. The 301s are what pass the signals. A dip is still possible for weeks.
- Backlinks that use styermortgage.com keep working only while the 301 stays in place. Dropping the old domain, or letting the registration expire, drops those links.
- Email on thestyerteam.com is separate from this website move. It stays as it is only if the MX records are left alone. Do not replace the domain's DNS with a record set that omits MX.
- Absolute URLs in old PDFs, emails, and ads will 404 or show the old brand until the 301 is on. The 301 covers them if the path is unchanged.
- This branch is a preview. Production still serves styermortgage.com until someone deploys this branch and completes the steps above.
