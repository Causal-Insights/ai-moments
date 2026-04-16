# Magic Lens

Astro-based marketing and information architecture rebuild for the former AI Moments site, now presented as **Magic Lens**.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Structure

- `src/pages/` contains the clean routed Astro pages
- `src/content/` contains structured experience and gallery content
- `src/config/site.js` contains brand, nav, legal, and destination config
- `public/` contains copied media assets, favicon, CNAME, and legacy `.html` redirects

## Notes

- The three live guided experiences still hand off to their existing external creation domains.
- Clean routes are canonical, while legacy `.html` URLs are preserved as static redirect files.
- Source photos are described as non-retained, while final generated videos remain available for up to 60 days per the current policy.
