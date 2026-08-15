# Solutions Project Nigeria Limited — Website Preview v5.0

This package is a clean static-site rebuild for GitHub Pages / Cloudflare deployment.

## Maintenance rule
Replace an image with another image using the **same semantic filename** to update that visual without changing HTML.

## Preview safety
`robots.txt` blocks crawling and every HTML page contains `noindex,nofollow,noarchive`.

## Production activation
Before production:
1. Replace `CLIENT-DOMAIN.example` in HTML and `sitemap.xml`.
2. Remove preview robots meta directives.
3. Replace `robots.txt` with `robots.production.txt`.
4. Configure Formspree in `assets/js/config.js`.
5. Configure GA4 only after a client Measurement ID is available.
6. Validate all credentials/certifications before publishing them.
