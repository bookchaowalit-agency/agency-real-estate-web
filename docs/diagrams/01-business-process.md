# 01 — Business process (As-Is / To-Be)

agency-real-estate-web คือเว็บ showcase แบบ static (Next.js `output: "export"`) ของกลุ่มงาน Real Estate (สถานะ `locked` / P3) มีหน้าแรกและหน้า service หน้าเดียว ใช้ทดสอบ positioning และ search intent โดยเจ้าของเท่านั้น ผู้เข้าชมอ่านได้อย่างเดียว ไม่มีฟอร์ม ไม่มี API ไม่มีฐานข้อมูล

Last reviewed: 2026-11-28 · commit `7430d90`

## As-Is (จากโค้ดวันนี้)

```mermaid
flowchart TD
  DEV["push or PR to main"] --> CI["CI: ci-node + security scan"]
  CI -->|"fails closed"| CIFAIL["red check on the commit"]
  CI -->|green| NODEPLOY["no deploy from push (Vercel has no Git link) [ต้องยืนยัน]"]
  OWNER["owner"] -->|"Vercel CLI"| VERCEL["Vercel project solo-agency-real-estate: static out/"]
  DATA["lib/site.ts + lib/pseo.ts (hard-coded copy)"] --> BUILD["next build, output export, trailingSlash"]
  ENV["NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_SITE_INDEXABLE"] --> GATE{"approved URL AND INDEXABLE == true?"}
  GATE -->|no, default| NOIDX["meta noindex, robots Disallow: / (link-preview bots allowed), empty sitemap, no canonical"]
  GATE -->|yes| IDX["index,follow, canonical, sitemap with 3 paths"]
  NOIDX --> BUILD
  IDX --> BUILD
  BUILD --> VERCEL
  VISITOR["visitor"] --> HOME["/ home: promise, scope, readiness note"]
  VISITOR --> SERVICE["/services/ and /services/property-data-operations-strategy/ (Service + BreadcrumbList JSON-LD)"]
  VISITOR --> OTHER["unknown path: not-found page"]
  HOME --> NOFORM["dead end: no form, no API, no database, no inquiry intake"]
  HOME --> PORTFOLIO["out-link to agency portfolio, privacy, status, mail"]
  SERVICE --> NOFORM
  VERCEL --> VISITOR
  VISITOR -.->|"browser error"| SENTRY["Sentry (errors only, scrubbed) only if NEXT_PUBLIC_SENTRY_DSN set"]
```

Sources: `app/page.tsx`, `app/services/page.tsx`, `app/services/[slug]/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `lib/site-config.ts`, `lib/site.ts`, `lib/pseo.ts`, `lib/readiness.ts`, `components/pseo-page.tsx`, `components/site-links.tsx`, `next.config.ts`, `instrumentation-client.ts`, `lib/sentry.ts`, `.github/workflows/ci.yml`, `README.md`, `PRODUCT.md`

ข้อเท็จจริงสำคัญจากโค้ด:

- ข้อความทั้งหมดอยู่ในโค้ด (`lib/site.ts`, `lib/pseo.ts`) ไม่มีการอ่านข้อมูลตอนรัน; `generateStaticParams` ให้ service slug เดียว (`property-data-operations-strategy`) และ `dynamicParams = false` ดังนั้น path อื่นใต้ `/services/` เป็น 404
- `isIndexable` เป็นจริงเมื่อมี `NEXT_PUBLIC_SITE_URL` ที่ parse ผ่าน (http/https, ไม่มี query, fragment หรือ user:password) และ `NEXT_PUBLIC_SITE_INDEXABLE` เท่ากับ `true` พอดี ถ้าไม่ครบ ทุกหน้าเป็น `noindex, nofollow`, sitemap ว่าง, ไม่มี canonical; ภาพ og ใช้โดเมน production ของ site เอง
- sitemap ในโหมด index มี `/`, `/services/`, `/services/property-data-operations-strategy/`
- social card คือ `public/og.png` (วาดโดย `scripts/og.mjs` แล้ว commit ไว้)
- CI รัน lint + typecheck + Vitest (coverage gate 68%) + `npm run check` แล้วเช็คว่า `out/robots.txt` เป็น `Disallow: /` แล้วรัน security scan ที่ใช้ร่วมกัน (`.github/workflows/ci.yml`)
- Sentry เปิดเฉพาะฝั่ง browser เมื่อมี DSN (`instrumentation-client.ts`, `lib/sentry.ts`) ไม่มี DSN คือปิด
- การ deploy: `PRODUCT.md` (2026-10-23) บอกว่า project `solo-agency-real-estate` ไม่มี Git link และ deploy ด้วย Vercel CLI; ในโค้ดไม่มี deploy step จึงยืนยันสถานะวันนี้ไม่ได้ [ต้องยืนยัน]

## To-Be (จาก PRODUCT.md และ docs/UPGRADE-PLAN.md)

```mermaid
flowchart TD
  OWNER["owner"] --> GITLINK["Vercel Git link to repo (owner action D9)"]
  GITLINK --> PUSH["push to main"]
  PUSH --> CI["CI: web + security"]
  CI -->|green| DEPLOY["Vercel deploys main"]
  OWNER --> URL["approve public URL"]
  URL --> ENV["set NEXT_PUBLIC_SITE_URL + NEXT_PUBLIC_SITE_INDEXABLE=true on Vercel"]
  ENV --> BUILD["static export out/"]
  DEPLOY --> BUILD
  BUILD --> IDX["index,follow + canonical + sitemap with 3 paths"]
  BUILD --> SVC2["second service page when an offer is approved"]
```

Sources: `PRODUCT.md` (Live URL and deploy state), `docs/UPGRADE-PLAN.md` (P1, P2)

## Gap

| ID | As-Is → To-Be | Status | Owner | Evidence |
|---|---|---|---|---|
| G1 | deploy by Vercel CLI, `main` push does not deploy → Vercel Git link, push to `main` deploys | blocked | owner | `PRODUCT.md` (owner action D9, 2026-10-23) |
| G2 | noindex, `Disallow: /`, empty sitemap → indexable with an approved public URL | decide | owner | `docs/UPGRADE-PLAN.md` P1 |
| G3 | one service page → a second service page once an offer is approved | blocked | owner | `docs/UPGRADE-PLAN.md` P2 (`lib/pseo.ts` holds one service) |

## Open questions

- Vercel project `solo-agency-real-estate` ถูกเชื่อม Git แล้วหรือยัง และ production ตรงกับ `main` หรือไม่ (ต้องดูใน Vercel; ไม่มีใน repo) [ต้องยืนยัน]
- `README.md` และ `docs/UPGRADE-PLAN.md` ยังเขียนว่า OG image มาจาก `app/opengraph-image.tsx` แต่ในโค้ดไม่มีไฟล์นี้ ใช้ `public/og.png` จาก `scripts/og.mjs` แทน (เอกสารตกค้าง)
