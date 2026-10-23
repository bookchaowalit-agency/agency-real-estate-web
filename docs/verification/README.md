# Verification

หลักฐานและ checklist สำหรับ Real Estate showcase

## pSEO service page

- Route: `/services/property-data-operations-strategy/`
- ขอบเขต: workflow, deliverables, evidence boundary และ readiness ของ Real Estate
- ไม่มี lead form, API, database, analytics identifier หรือข้อมูลลูกค้า
- ค่าเริ่มต้นของ build เป็น `noindex` และ `Disallow: /`; เปิด index ได้เฉพาะเมื่อกำหนด `NEXT_PUBLIC_SITE_URL` และ `NEXT_PUBLIC_SITE_INDEXABLE=true` ที่ผ่านการอนุมัติ

## Local checks

```bash
npm run lint
npm run typecheck
npm test        # Vitest: noindex / Disallow default, the indexing switch, URL parsing (tests/site.test.ts, tests/routes.test.ts)
npm run check   # lint + typecheck + tests + static export
```

CI runs the same checks through the shared workflow (`.github/workflows/ci.yml`) with a line-coverage gate, then
asserts `out/robots.txt` is `Disallow: /`.
