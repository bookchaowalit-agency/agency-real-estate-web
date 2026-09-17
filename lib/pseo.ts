export type PseoService = Readonly<{
  kind: 'service';
  slug: string;
  name: string;
  title: string;
  description: string;
  intent: string;
  buyer: string;
  context: string;
  workflow: readonly string[];
  deliverables: readonly string[];
  evidence: readonly string[];
  readiness: string;
  agencySlug: string;
  agencyName: string;
  agencyThaiName: string;
  agencyStatus: 'incubating' | 'target' | 'locked';
  agencyStage: string;
}>;

export const pseoService: PseoService = {
  "kind": "service",
  "slug": "property-data-operations-strategy",
  "name": "Property data and operations strategy (future)",
  "title": "Property Data & Operations Strategy สำหรับเจ้าของสินทรัพย์",
  "description": "วาง data, operations และ asset decision map สำหรับ portfolio อสังหาริมทรัพย์",
  "intent": "ต้องการเชื่อมข้อมูลทำเล สินทรัพย์ และการดำเนินงานให้ตัดสินใจ property ได้เป็นระบบ",
  "buyer": "Property owner, developer และ operator",
  "context": "เป็น future capability สำหรับ strategy และ operating model ยังไม่ใช่นายหน้าและไม่รับประกันผลตอบแทน",
  "workflow": [
    "กำหนด asset portfolio และ decision ที่ต้องการตอบ",
    "ทำ inventory ของ location, property และ operating data",
    "แยก source, assumption, constraint และ owner",
    "ส่ง asset decision map ให้ owner เลือก pilot"
  ],
  "deliverables": [
    "property data inventory",
    "asset/operations decision map",
    "data quality และ owner register",
    "pilot scope และ review cadence"
  ],
  "evidence": [
    "ไม่อ้าง valuation, occupancy, yield หรือ market data ที่ไม่ได้ตรวจ",
    "ไม่เก็บข้อมูลผู้เช่าหรือเอกสารสิทธิ์ใน public repo",
    "งานนายหน้า กฎหมาย และการประเมินใช้ผู้มีคุณสมบัติเหมาะสม"
  ],
  "readiness": "ต้องมี property owner, data permission, legal/privacy reviewer และ operations lead ก่อนเปิด inquiry",
  "agencySlug": "real-estate",
  "agencyName": "Real Estate",
  "agencyThaiName": "อสังหาริมทรัพย์",
  "agencyStatus": "locked",
  "agencyStage": "P3"
};
