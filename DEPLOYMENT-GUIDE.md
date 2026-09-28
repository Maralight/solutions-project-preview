# Production Deployment Guide

## Integrations
Open `assets/js/config.js`.
- `gaMeasurementId`: paste the GA4 Measurement ID (`G-...`).
- `formspreeEndpoint`: paste the Formspree endpoint (`https://formspree.io/f/...`).

## Domain
The package is prepared for `https://solutionsprojectltd.com/`. Canonical tags, Open Graph URLs, robots.txt and sitemap.xml use that domain.

## DNS / hosting
Preserve Zoho MX, SPF, DKIM and DMARC records when moving authoritative DNS to Cloudflare. Do not change nameservers until all existing mail records have been reproduced in Cloudflare.

## Launch QA
- Test Home and every navigation link on desktop and mobile.
- Test both forms and confirmation/error states.
- Test `https://solutionsprojectltd.com` and `https://www.solutionsprojectltd.com`.
- Confirm one canonical host redirects to the other.
- Confirm HTTPS.
- Validate structured data, sitemap and robots.txt.
- Verify GA4 Realtime after adding the Measurement ID.
- Retest Zoho inbound/outbound mail after DNS migration.
