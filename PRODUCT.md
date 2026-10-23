# Real Estate showcase — Product truth

> Inferred from the code and copy (no user interview), 2026-10-23. The portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`) has no row for this site; nothing here goes beyond
> what the pages render.

## What it is

A static (Next.js `output: "export"`) showcase page for the Real Estate vertical, plus one service page
(`/services/property-data-operations-strategy/`). All copy is hard-coded in `lib/site.ts` and `lib/pseo.ts`.

## Who it is for

The owner, to test positioning and search intent for the offer "Property data and operations strategy (future)". Visitors can read it; they cannot
send anything.

## What works today

1. Home page: promise, buyer, starting offer, scope (Advisory, Development, Property operations, Asset strategy), what must be built, and an honest readiness note
   (`locked` / P3, "future capability").
2. Service page: search intent, a 4-step workflow, deliverables, evidence boundary and the readiness
   gate that must pass before any inquiry is accepted. It carries Service and BreadcrumbList JSON-LD.
   Every page has a generated social card image (`app/opengraph-image.tsx`).
3. Search engines are kept out by default (`noindex, nofollow`, `Disallow: /`, empty sitemap). Indexing turns on only
   when an approved `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_SITE_INDEXABLE=true` are set at build time.
4. Browser errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- A property operating map, not brokerage and not a return guarantee.
- ไม่อ้าง valuation, occupancy, yield หรือ market data ที่ไม่ได้ตรวจ
- ไม่เก็บข้อมูลผู้เช่าหรือเอกสารสิทธิ์ใน public repo
- งานนายหน้า กฎหมาย และการประเมินใช้ผู้มีคุณสมบัติเหมาะสม
- No lead form, inquiry intake, account, API, database, analytics identifier or client data.
- No clients, case studies or results. The workflow and deliverables describe a planned scope, not delivered work.

## Live URL and deploy state

- Live: https://solo-agency-real-estate.vercel.app (HTTP 200 on 2026-10-23).
- The Vercel project `solo-agency-real-estate` has no Git link, so a push to `main` does not deploy. The last production deployment
  is the CVE patch (2026-10-23 12:18, Vercel CLI, commit caf379e). The L2 commits (tests, Sentry, CI, heading spacing) stay
  undeployed until the owner connects Vercel Git to `bookchaowalit-agency/agency-real-estate-web` (owner action D9).
- `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `agency-real-estate-web`, org `personal-yu0`); it takes
  effect with the next deployment.

## Boundaries

- Static files only; no server runtime. Keep `npm run check` (typecheck + static export) passing.
- Follow `AGENTS.md`: public-safe positioning only.
