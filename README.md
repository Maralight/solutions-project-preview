# Solutions Project Nigeria Limited — Production Website

Production-ready static corporate website for `https://solutionsprojectltd.com/`.

## Core rules
- `main` is the production source.
- Images are grouped by page and component under `assets/images/`.
- Replace an image with the same filename to update it without editing HTML.
- Global styling is in `assets/css/main.css`.
- Site integrations and homepage slides are configured in `assets/js/config.js`.
- Do not minify the source files in this repository; maintainability is intentional.

## Before go-live
1. Add the GA4 Measurement ID in `assets/js/config.js`.
2. Add the Formspree endpoint in `assets/js/config.js`.
3. Test both forms end-to-end.
4. Confirm DNS/SSL and canonical domain.
5. Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools after launch.
