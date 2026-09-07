export type ModulePage = {
  slug: string
  nav: string
  h1: string
  kicker: string
  lead: string
  image: string
  imageAlt: string
  sections: { title: string; body: string }[]
}

export const modulePages: ModulePage[] = [
  {
    slug: 'opd',
    nav: 'OPD',
    kicker: 'OPD & appointments',
    h1: 'OPD management software for Indian hospital front desks',
    lead: 'UHID registration, walk-ins, slots, queue tokens and doctor context — one continuous front-desk flow so reception is not running three registers at once.',
    image: '/screenshots/appointments.jpg',
    imageAlt: 'HIMS OPD appointments and booking screen for Indian hospitals',
    sections: [
      {
        title: 'What the OPD module is for',
        body: 'In most Indian hospitals the day is won or lost at the front desk. HIMS OPD software keeps registration, appointments and the live queue on the same patient record. A walk-in and a booked slot should not become two different identities.',
      },
      {
        title: 'What staff actually do in it',
        body: 'Reception creates or finds the UHID, books or checks in the visit, issues a queue token and hands the doctor a complete context. Nurses and compounders can capture vitals on the same visit. The consultant sees history instead of a blank page.',
      },
      {
        title: 'Why this ranks as “OPD software India”',
        body: 'Buyers searching for OPD software are not looking for a US EHR. They need INR, GST later in the journey, Indian phone numbers, and a queue that matches how a busy polyclinic actually calls patients. That is the job of this module.',
      },
    ],
  },
  {
    slug: 'ipd',
    nav: 'IPD',
    kicker: 'IPD, OT & emergency',
    h1: 'IPD hospital software: beds, admission, OT and discharge',
    lead: 'Admissions, beds, OT cases, triage and discharge packages including LAMA and DOPR — indoor care with the same patient record that started in OPD.',
    image: '/screenshots/ipd.jpg',
    imageAlt: 'HIMS IPD beds and indoor patient management screen',
    sections: [
      {
        title: 'Indoor care is not a second product',
        body: 'Many “HIMS” tools are strong in OPD billing and weak the moment a patient is admitted. HIMS treats IPD as part of the same hospital day: the UHID, documents and bills stay attached when the patient moves from OPD to a bed.',
      },
      {
        title: 'Discharge the Indian way',
        body: 'Discharge is not only “went home”. Indian hospitals need LAMA, DOPR and death summaries with reports attached. HIMS is specified around those packages so MRD is not assembling a file from WhatsApp images at midnight.',
      },
      {
        title: 'OT and emergency on the same spine',
        body: 'OT cases and emergency triage sit on the same platform so the floor is not maintaining a parallel Excel sheet for casualty. Ask for these journeys on the live demo if indoor care is your buying trigger.',
      },
    ],
  },
  {
    slug: 'pharmacy',
    nav: 'Pharmacy',
    kicker: 'Pharmacy counter',
    h1: 'Hospital pharmacy software: pending Rx to dispense to bill',
    lead: 'Pending prescriptions become dispenses with quantity review, stock awareness and billing handoff — without a paper pile beside the pharmacist.',
    image: '/screenshots/pharmacy.jpg',
    imageAlt: 'HIMS hospital pharmacy counter and dispense screen',
    sections: [
      {
        title: 'The counter is a workflow, not a catalogue',
        body: 'Hospital pharmacy software fails when it is only inventory. HIMS starts from the pending prescription, lets the pharmacist review quantities, and hands a billable line to the same billing stack the rest of the hospital uses.',
      },
      {
        title: 'Stock without a second brain',
        body: 'Pharmacists need to see whether the item can be dispensed before the patient is sent to billing. HIMS keeps stock awareness next to the dispense action so the counter does not promise a strip that is not on the shelf.',
      },
      {
        title: 'Built for Indian hospital pharmacies',
        body: 'This is not a retail POS bolted onto a clinic. It is the hospital pharmacy: Rx from the consult, dispense at the window, invoice in GST-ready billing. That is the search intent behind hospital pharmacy software in India.',
      },
    ],
  },
  {
    slug: 'diagnostics',
    nav: 'Diagnostics',
    kicker: 'Pathology & radiology',
    h1: 'Diagnostics software for hospitals: orders, results, reports',
    lead: 'Pathology, radiology and procedures with structured results, report upload and files that stay on the patient chart.',
    image: '/screenshots/diagnostics.jpg',
    imageAlt: 'HIMS diagnostics orders and laboratory results screen',
    sections: [
      {
        title: 'Lab is part of the visit',
        body: 'A diagnostic order should not live in a separate lab product that never writes back. HIMS keeps orders, summary findings, parameter rows and the uploaded report on the same patient journey the doctor already has open.',
      },
      {
        title: 'Reports that MRD can find',
        body: 'PDFs and images are useless if they are only in a technician’s download folder. HIMS attaches diagnostic documents to the record so discharge, TPA and the next consult can open them with clinical context.',
      },
      {
        title: 'For hospitals and diagnostic centres',
        body: 'If you run in-house pathology or radiology, this module is the buying page. If you are a diagnostic centre evaluating HIMS as a wider platform, the same result and document patterns apply — ask for that walkthrough on the demo.',
      },
    ],
  },
  {
    slug: 'billing',
    nav: 'Billing',
    kicker: 'Billing & GST',
    h1: 'Hospital billing software with GST for OPD, IPD, lab and pharmacy',
    lead: 'Invoices, payments, receipts and printable PDFs with hospital branding — billing that closes the loop instead of a Tally dump at month end.',
    image: '/screenshots/billing.jpg',
    imageAlt: 'HIMS hospital billing, GST invoice and receipts screen',
    sections: [
      {
        title: 'Billing has to follow the clinical day',
        body: 'OPD consults, pharmacy lines, lab orders and IPD packages should not be retyped into a separate billing tool. HIMS billing is downstream of those workflows so leakage is a process problem you can see, not a mystery in Excel.',
      },
      {
        title: 'GST-ready hospital invoices',
        body: 'Indian hospitals need GST-aware invoices and receipts that look like the hospital, not a generic SaaS template. HIMS prints branded PDFs from the same invoice the cashier just collected against.',
      },
      {
        title: 'What to ask on the demo',
        body: 'Bring a real tariff question: OPD consultation plus lab plus pharmacy in one visit, or an IPD package. Watch whether the bill is assembled from live work or from a dummy SKU list. That is how you judge hospital billing software.',
      },
    ],
  },
  {
    slug: 'abdm',
    nav: 'ABDM',
    kicker: 'ABDM & records',
    h1: 'ABDM-ready HIMS: ABHA, documents and an honest certification path',
    lead: 'Health records, prescriptions and reports stay attached to the patient journey. ABDM readiness is a build path — not a logo we paste without a certificate.',
    image: '/screenshots/documents.jpg',
    imageAlt: 'HIMS patient documents, prescriptions and clinical reports',
    sections: [
      {
        title: 'What buyers mean by ABDM',
        body: 'Ayushman Bharat Digital Mission is India’s national health stack: ABHA IDs, interoperable records, and a certification programme for hospital software. Searching “ABDM HIMS” usually means: will this software still be usable when the hospital is asked to participate?',
      },
      {
        title: 'Ready vs certified',
        body: 'HIMS is engineered toward M1/M2/M3 style milestones (identity, records, consent-oriented exchange). Until a given milestone is certified, we say ready or in-progress — never “certified” as a shortcut. That honesty is part of why a hospital should trust the vendor.',
      },
      {
        title: 'What you get today',
        body: 'Documents, prescriptions and diagnostic files already sit on the chart. That is the operational foundation ABDM needs. On the demo we will tell you exactly which integration milestone is live versus planned.',
      },
    ],
  },
]

export function moduleBySlug(slug: string | undefined) {
  return modulePages.find((module) => module.slug === slug)
}
