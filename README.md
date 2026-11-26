# Kitaa Digital Solutions

Website for [kitaadigitalsolutions.tech](https://kitaadigitalsolutions.tech), a web design studio in Arusha, Tanzania.

Built with Vite, React, TypeScript and Tailwind CSS.

## Develop

```sh
npm install
npm run dev        # local dev server on http://localhost:8080
npm test           # data checks (projects, pricing, SEO, sitemap)
npm run lint
```

## Edit content

- Portfolio projects: `src/lib/projects.ts` (images in `public/project-previews/` and `public/project-logos/`)
- Prices: `src/lib/pricing.ts`
- Services and process steps: `src/lib/services.ts`
- Contact details and social links: `src/lib/site.ts`

## Deploy

Push to `main`. A GitHub Action (`.github/workflows/deploy.yml`) runs `npm run build` and `npm run prerender`, then publishes `dist/` to the `deploy` branch, which Hostinger pulls into `public_html`.

- `public/.htaccess`: URL rewrites, the `www` redirect and the security headers.
- `public/contact.php`: the contact form handler. The SMTP password is **not** in this repository; it lives in `kitaa-mail-config.php`, a private file outside the website folder on the server.
- `npm run audit`: checks a built site for broken links and missing assets (`node scripts/audit-site.mjs`).
