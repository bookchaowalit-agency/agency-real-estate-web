# Real Estate — อสังหาริมทรัพย์

แยกเป็น showcase site สำหรับ Real Estate ของ Solo Empire ใช้เพื่อแสดง positioning และทดสอบ message เท่านั้น

- Visual world: Architectural plan for property operations
- Suggested Vercel project: `solo-agency-real-estate`
- Route: \/
- สถานะ commercial: `locked` / P3
- ไม่มี database, authentication, API, payment, lead form หรือข้อมูลลูกค้า

## Local

```bash
npm ci
npm run check   # lint + typecheck + unit tests + static build
npm run dev
```

CI (`.github/workflows/ci.yml`) รัน `lint`, `typecheck`, `test` และ `build` ทุก pull request
unit tests (`tests/site.test.ts`, `node:test`) ครอบคลุม indexing gate (noindex เป็นค่าเริ่มต้น),
canonical metadata, sitemap path และการ escape JSON-LD

Build ใช้ Next.js static export และสร้าง artifact ที่ `out/` สำหรับ deploy แบบ static บน Vercel

ข้อมูล public-safe มาจาก agency brief/control-plane; งาน freelance/client เดิมไม่ถูกนับเป็น agency customer หรือ case study ในเว็บนี้

## pSEO service page

เว็บนี้มีหน้า service แบบ static ที่ /services/property-data-operations-strategy/ สำหรับ intent ของ Real Estate โดยแยก workflow, deliverables, evidence boundary และ readiness gate ไว้ชัดเจน หน้าเริ่มต้นเป็น noindex และไม่มีการรับ inquiry หรือข้อมูลลูกค้า
