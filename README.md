# Real Estate — อสังหาริมทรัพย์

Static showcase site for the Real Estate vertical of Solo Empire. It shows positioning and is used for message
testing only: one home page and one service page, built from data in `lib/`.

- Visual world: Architectural plan for property operations
- Vercel project: `solo-agency-real-estate` (live: https://solo-agency-real-estate.vercel.app, deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`)
- Routes: `/`, `/services/`, `/services/property-data-operations-strategy/`
- Commercial status: `locked` / P3 (future capability)
- No database, authentication, API, payment, lead form or customer data.

## What it does not do

- A property operating map, not brokerage and not a return guarantee.
- No inquiry intake, contact form, client records or case studies. Earlier freelance/client work is not counted as an
  agency customer here.
- It is `noindex` with `Disallow: /` unless `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true` are both set
  (an approved public URL).

## Run

```bash
npm ci
npm run dev        # http://localhost:3010
```

## Checks

```bash
npm run lint       # ESLint (eslint-config-next)
npm run typecheck
npm test           # Vitest: indexing gate, URL parsing, robots/sitemap, JSON-LD escaping, page renders, Sentry
npm run check      # lint + typecheck + tests + static export to out/
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (lint, typecheck, Vitest with a line-coverage gate,
then `npm run check`) and the shared security scan on every push and PR to `main`.

## Code map

- `lib/site.ts`: the vertical's public-safe copy and design tokens. `lib/pseo.ts`: the one service page.
- `lib/readiness.ts`: status label and note, shared by the home and service pages.
- `lib/site-config.ts`: `resolveSiteConfig(env)` (public URL parsing, the indexable switch), canonical URLs, page
  metadata and sitemap paths. `lib/structured-data.ts`: the service page JSON-LD (`<` escaped).
- `app/opengraph-image.tsx`: generated social card (ASCII text only; the OG font has no Thai glyphs).
- `app/robots.ts`, `app/sitemap.ts`: `Disallow: /` and an empty sitemap unless indexing is approved.
- `lib/sentry.ts` + `instrumentation-client.ts`: browser-only error reporting (static export, no server runtime),
  errors only, personal data stripped; off when `NEXT_PUBLIC_SENTRY_DSN` is unset.
- This repo was generated from `agency-main-web` and then diverged (ESLint, node:test tests, OG image, stricter URL
  parsing). Vitest (the old node:test suite moved over), CI and Sentry were added by hand in batch b-website
  (2026-10-22/23). Each agency repo owns its own copy (no shared package).
