export type Guide = {
  slug: string
  title: string
  description: string
  kicker: string
  h1: string
  updated: string
  paragraphs: string[]
}

export const guides: Guide[] = [
  {
    slug: 'what-is-hims',
    title: 'What is HIMS?',
    description: 'Hospital Information Management System explained for Indian hospitals and clinics.',
    kicker: 'Fundamentals',
    h1: 'What is HIMS? A hospital information management system, explained',
    updated: '4 September 2026',
    paragraphs: [
      'HIMS stands for Hospital Information Management System. In India it is the software a hospital uses to run the operational day: register a patient once, move them through OPD or IPD, send work to pharmacy and diagnostics, collect a GST-aware bill, and keep the documents attached to that same person.',
      'People also search for HMIS (Hospital Management Information System) and HMS (Hospital Management Software). In Indian buying conversations those acronyms usually point at the same job. The useful question is not the acronym. It is whether the product completes real staff journeys or only shows a dashboard in a sales deck.',
      'A HIMS is not the same thing as a doctor’s personal EMR notepad, and it is not Tally with a patient name field. Clinical notes without billing leak revenue. Billing without clinical context creates disputes. Pharmacy without the prescription creates errors. Lab without the visit creates orphan reports. HIMS exists to stop those handoffs from becoming re-entry.',
      'In an Indian hospital the minimum viable HIMS usually includes: UHID-style registration, OPD appointments and queues, consultation notes and prescriptions, diagnostic orders and results, pharmacy dispense, IPD beds and discharge, and invoices/receipts. Larger hospitals add OT, emergency, TPA, inventory, MRD and multi-branch control.',
      'If you searched “HIMS” because you run a clinic or nursing home, start by listing the desks that currently use paper or Excel. The software you buy should replace those desks in order — front desk first, then the doctor, then pharmacy or lab, then cashier — not the other way around.',
      'Trinovus Tech builds HIMS for that India-first shape: INR, GST, role menus that match how hospitals actually staff a shift, and screens captured from live workflows rather than generic ERP forms. Book a demo if you want to see those journeys on a live tenant.',
    ],
  },
  {
    slug: 'hims-vs-hmis',
    title: 'HIMS vs HMIS vs HMS',
    description: 'How Indian hospitals should read HIMS, HMIS and HMS when comparing vendors.',
    kicker: 'Buying language',
    h1: 'HIMS vs HMIS vs HMS in India — same job, messy labels',
    updated: '4 September 2026',
    paragraphs: [
      'Hospital owners comparing software in India will see three labels on almost every Google page: HIMS, HMIS and HMS. Vendors use them as brand language. Procurement committees sometimes treat them as different product categories. They are not reliably different.',
      'HMS is the oldest shorthand: hospital management software. It often started as billing plus registration. HMIS adds “information”: reports, MIS for the medical superintendent, sometimes government reporting. HIMS emphasises that clinical, pharmacy, lab and finance share one information system. In practice a mature product under any of these names should do the same core work.',
      'What does differ is scope. Some products are clinic EMR with a payment link. Some are accounting suites with a patient master. Some are lab information systems sold as “HIMS”. When a salesperson says HIMS, ask them to walk a patient from registration to consult to lab to pharmacy to receipt. If any step is “we integrate later”, you are not buying a hospital system yet.',
      'There is a separate collision on Google: Hims is also a large US telehealth consumer brand, and HIMS is a stock ticker. If you searched only the four letters, you will see those results first. For hospital software, search with India and the module you need — for example “HIMS software India”, “hospital information management system GST”, or “OPD IPD pharmacy software”.',
      'Our product is named HIMS because that is what Indian hospitals search and say. We qualify it as HIMS by Trinovus Tech, a hospital information management system, so you are not looking at a consumer health app.',
      'Use the acronym as a search hint, not as a specification. Specify beds, branches, OPD volume, whether you have in-house pharmacy and lab, and whether you need IPD this year. Then judge vendors on those workflows.',
    ],
  },
  {
    slug: 'choose-hospital-software-india',
    title: 'How to choose hospital software in India',
    description: 'Checklist for 20–200 bed Indian hospitals choosing HIMS software.',
    kicker: 'Checklist',
    h1: 'How to choose hospital software in India (20–200 beds)',
    updated: '4 September 2026',
    paragraphs: [
      'Most hospital software purchases in India fail in the second month, not the demo. The demo looked complete. The floor still keeps a register because a real exception — a LAMA discharge, a split pharmacy bill, a doctor who sits two days a week — was not in the script.',
      'Start with the desks, not the modules list. Who registers the patient? Who calls the queue? Who writes the prescription? Who dispenses? Who collects money? Who files the report? If the vendor cannot name the role on each screen, the product was designed for a brochure.',
      'Demand a live tenant. Screenshots are necessary for a website; they are not sufficient for a contract. Watch your own tariff: consultation + lab + pharmacy in one visit. Watch an IPD admission if you have beds. Watch a reprint of a receipt. Watch what happens when a patient is already in the database.',
      'Check India-specific constraints: GST invoices, UHID, Indian phone and address patterns, role menus (receptionist, nurse, pharmacist, cashier, consultant, admin), and whether data can stay in India. Ask who owns the export. A HIMS you cannot leave is not a management system; it is a hostage.',
      'Training and support decide whether the software sticks. A nursing home in a tier-2 city needs a named person and a WhatsApp path more than a global help centre. Ask what the first two weeks after go-live look like, hour by hour, for reception and pharmacy.',
      'Price last, but price honestly. Per-bed, per-branch, per-module and on-prem versus cloud all change the number. Be suspicious of a public rupee figure that claims to cover every hospital. Ask for a written scope: which modules are in the first invoice, and which are Phase 2.',
      'HIMS by Trinovus Tech is built for this buyer: production workflows, India-first defaults, and a demo that uses the same screens as the floor. Use this checklist on our demo too. We would rather lose a sale on a gap we name than win one on a slide.',
    ],
  },
  {
    slug: 'abdm-ready-hims',
    title: 'ABDM-ready HIMS',
    description: 'What ABHA and ABDM readiness should mean when you buy hospital software in India.',
    kicker: 'Policy',
    h1: 'ABDM-ready HIMS in India: what to ask before you trust the badge',
    updated: '4 September 2026',
    paragraphs: [
      'ABDM is the Ayushman Bharat Digital Mission. It is the national effort to give citizens an ABHA number and to let health records move between facilities with consent. Hospital software vendors now print “ABDM” on every landing page. Some of that is real engineering. Some of it is a badge with no certificate behind it.',
      'ABDM-ready and ABDM-certified are not the same sentence. Ready means the product is designed toward the programme: identity fields, document trails, APIs or milestones on a roadmap. Certified means a specific milestone has been accepted under the national process. If a vendor will not tell you which milestone and on which date, treat the logo as marketing.',
      'For a hospital buyer the practical questions are: Can we capture ABHA if the patient has one? Do prescriptions and reports sit in a longitudinal record? If the government or a network asks us to participate next year, is this vendor already on that path or will we rip-and-replace?',
      'HIMS by Trinovus Tech is explicit: we build toward ABDM milestones and we will tell you on a demo which slice is live. We do not claim a certificate we do not hold. Patient documents, prescriptions and diagnostic files already attach to the journey — that is the operational base any health exchange needs.',
      'Do not delay a HIMS purchase only because a competitor shouted “ABDM certified” in an ad. Delay it if the core OPD–pharmacy–billing day still needs Excel. Digital mission compliance on top of a broken counter does not help the superintendent.',
      'If ABDM is a tender requirement, bring the tender language to the sales call. We will map it to current capability and a written gap list. That is slower than a yes. It is how you avoid buying a sticker.',
    ],
  },
]

export function guideBySlug(slug: string | undefined) {
  return guides.find((guide) => guide.slug === slug)
}
