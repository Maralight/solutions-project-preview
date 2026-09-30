# Forms and email routing

The website has two Formspree-ready endpoints in `assets/js/config.js`:

- `contactFormEndpoint`: create a Formspree form whose target/notification email is `info@solutionsprojectltd.com`.
- `rfqFormEndpoint`: create a Formspree form whose target/notification email is `rfq@solutionsprojectltd.com`.

Paste each complete Formspree endpoint between the quotation marks. No HTML edit is required.

For security, configure Formspree Restrict to Domain for `solutionsprojectltd.com` after deployment.
