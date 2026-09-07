import { withLocale } from './i18n/locale'

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://buyer-hims.trinovustech.com').replace(
  /\/$/,
  '',
)

export const COMPANY = {
  name: 'Trinovus Tech',
  product: 'HIMS',
  email: 'hello@trinovustech.com',
  url: SITE_URL,
  parentUrl: 'https://trinovustech.com',
  locality: 'India',
  sameAs: ['https://trinovustech.com'] as string[],
}

export type SeoPage = {
  path: string
  title: string
  description: string
  priority?: number
  changefreq?: 'daily' | 'weekly' | 'monthly'
}

const SEO_PAGES_EN: SeoPage[] = [
  {
    path: '/',
    title: 'HIMS Software India | Hospital Information Management System',
    description:
      'HIMS by Trinovus Tech is an India-first hospital information management system for OPD, IPD, pharmacy, diagnostics, GST billing and ABDM-ready workflows. Book a live demo.',
    priority: 1,
    changefreq: 'weekly',
  },
  {
    path: '/hims-software',
    title: 'HIMS Software for Hospitals & Clinics in India | Trinovus Tech',
    description:
      'See what HIMS software includes for Indian hospitals: UHID registration, OPD queues, EMR, IPD, pharmacy, lab, GST billing, documents and multi-branch control.',
    priority: 0.9,
    changefreq: 'weekly',
  },
  {
    path: '/modules/opd',
    title: 'OPD Management Software India | HIMS Appointments & Queue',
    description:
      'HIMS OPD software for Indian hospitals: UHID registration, appointments, walk-ins, doctor slots, queue tokens and visit history in one front-desk flow.',
    priority: 0.8,
  },
  {
    path: '/modules/ipd',
    title: 'IPD Hospital Software | Beds, Admission & Discharge | HIMS',
    description:
      'HIMS IPD software for admissions, beds, OT, emergency triage and discharge packages including LAMA and DOPR — built for Indian hospital floors.',
    priority: 0.8,
  },
  {
    path: '/modules/pharmacy',
    title: 'Hospital Pharmacy Software | Dispense & Stock | HIMS',
    description:
      'Hospital pharmacy software inside HIMS: pending prescriptions, dispense, stock awareness and billing handoff without spreadsheet chaos.',
    priority: 0.8,
  },
  {
    path: '/modules/diagnostics',
    title: 'Diagnostics & Lab Software for Hospitals | HIMS',
    description:
      'Pathology, radiology and procedure orders with structured results, report upload and patient documents — diagnostics software inside HIMS.',
    priority: 0.8,
  },
  {
    path: '/modules/billing',
    title: 'Hospital Billing Software with GST | HIMS India',
    description:
      'Hospital billing software for OPD, IPD, lab and pharmacy invoices, payments, receipts and printable GST-ready PDFs in HIMS.',
    priority: 0.8,
  },
  {
    path: '/modules/abdm',
    title: 'ABDM-Ready HIMS | ABHA & Health Records India',
    description:
      'What ABDM-ready HIMS means for Indian hospitals: ABHA-oriented records, document trails and a certification-ready path without fake compliance claims.',
    priority: 0.8,
  },
  {
    path: '/pricing',
    title: 'HIMS Pricing for Hospitals & Clinics in India',
    description:
      'HIMS pricing depends on beds, branches and modules. Talk to sales for a hospital-specific quote, live demo tenant and rollout plan.',
    priority: 0.7,
  },
  {
    path: '/about',
    title: 'About Trinovus Tech | HIMS Hospital Software',
    description:
      'Trinovus Tech builds HIMS, an India-first hospital information management system. Meet the product, the company behind it, and how we sell and support it.',
    priority: 0.6,
  },
  {
    path: '/contact',
    title: 'Talk to HIMS Sales | Book a Hospital Software Demo',
    description:
      'Book a live HIMS demo for your hospital or clinic. Email hello@trinovustech.com or send the form — we walk through OPD, pharmacy, diagnostics and billing.',
    priority: 0.8,
  },
  {
    path: '/faq',
    title: 'HIMS FAQ | Hospital Information Management System India',
    description:
      'Answers on HIMS software, deployment, ABDM readiness, GST billing, demos and who the system is built for — Indian clinics, diagnostic centres and hospitals.',
    priority: 0.7,
  },
  {
    path: '/guides',
    title: 'HIMS Guides | Hospital Software in India',
    description:
      'Practical guides on HIMS, HMIS, ABDM and how Indian hospitals should choose hospital information management software.',
    priority: 0.7,
  },
  {
    path: '/guides/what-is-hims',
    title: 'What is HIMS? Hospital Information Management System Explained',
    description:
      'HIMS means Hospital Information Management System. Learn what it covers in Indian hospitals, how it differs from a billing-only app, and what to look for.',
    priority: 0.8,
  },
  {
    path: '/guides/hims-vs-hmis',
    title: 'HIMS vs HMIS vs HMS in India | What Hospitals Should Buy',
    description:
      'HIMS, HMIS and HMS are used interchangeably in India. This guide explains the overlap so hospital owners can compare software without getting lost in acronyms.',
    priority: 0.8,
  },
  {
    path: '/guides/choose-hospital-software-india',
    title: 'How to Choose Hospital Software in India | 20–200 Bed Checklist',
    description:
      'A practical checklist for Indian nursing homes and hospitals choosing HIMS: OPD, IPD, pharmacy, lab, GST, TPA, training, data ownership and support.',
    priority: 0.8,
  },
  {
    path: '/guides/abdm-ready-hims',
    title: 'ABDM-Ready HIMS in India | ABHA, Records and What to Ask Vendors',
    description:
      'ABDM-ready is not the same as ABDM-certified. Learn what Indian hospitals should ask a HIMS vendor about ABHA, health records and the certification path.',
    priority: 0.8,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | HIMS by Trinovus Tech',
    description: 'How Trinovus Tech handles enquiry data on the HIMS buyer website, including contact details submitted for demos.',
    priority: 0.3,
    changefreq: 'monthly',
  },
  {
    path: '/terms',
    title: 'Terms | HIMS Demo & Website | Trinovus Tech',
    description: 'Terms for using the HIMS marketing website and requesting a product demo from Trinovus Tech.',
    priority: 0.3,
    changefreq: 'monthly',
  },
]

const HI_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'HIMS सॉफ्टवेयर भारत | हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम',
    description:
      'Trinovus Tech का HIMS भारतीय अस्पतालों के लिए हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम है — OPD, IPD, फार्मेसी, डायग्नोस्टिक्स, GST बिलिंग और ABDM-ready वर्कफ़्लो। लाइव डेमो बुक करें।',
  },
  '/hims-software': {
    title: 'भारत के अस्पताल और क्लिनिक के लिए HIMS सॉफ्टवेयर | Trinovus Tech',
    description:
      'भारतीय अस्पतालों के लिए HIMS में क्या है: UHID रजिस्ट्रेशन, OPD कतार, EMR, IPD, फार्मेसी, लैब, GST बिलिंग, दस्तावेज़ और मल्टी-ब्रांच नियंत्रण।',
  },
  '/modules/opd': {
    title: 'OPD मैनेजमेंट सॉफ्टवेयर भारत | HIMS अपॉइंटमेंट और कतार',
    description: 'भारतीय अस्पतालों के लिए HIMS OPD सॉफ्टवेयर: UHID रजिस्ट्रेशन, अपॉइंटमेंट, वॉक-इन, डॉक्टर स्लॉट, कतार टोकन और विज़िट इतिहास।',
  },
  '/modules/ipd': {
    title: 'IPD हॉस्पिटल सॉफ्टवेयर | बेड, एडमिशन और डिस्चार्ज | HIMS',
    description: 'एडमिशन, बेड, OT, इमरजेंसी ट्रायज और LAMA/DOPR सहित डिस्चार्ज पैकेज — भारतीय अस्पताल फ्लोर के लिए HIMS IPD।',
  },
  '/modules/pharmacy': {
    title: 'हॉस्पिटल फार्मेसी सॉफ्टवेयर | डिस्पेंस और स्टॉक | HIMS',
    description: 'HIMS के अंदर हॉस्पिटल फार्मेसी: लंबित प्रिस्क्रिप्शन, डिस्पेंस, स्टॉक जागरूकता और बिल हैंडऑफ।',
  },
  '/modules/diagnostics': {
    title: 'अस्पतालों के लिए डायग्नोस्टिक्स और लैब सॉफ्टवेयर | HIMS',
    description: 'पैथोलॉजी, रेडियोलॉजी और प्रोसीजर ऑर्डर — संरचित रिजल्ट, रिपोर्ट अपलोड और मरीज़ दस्तावेज़ HIMS में।',
  },
  '/modules/billing': {
    title: 'GST के साथ हॉस्पिटल बिलिंग सॉफ्टवेयर | HIMS भारत',
    description: 'OPD, IPD, लैब और फार्मेसी इनवॉइस, पेमेंट, रसीद और प्रिंट योग्य GST-ready PDF — HIMS बिलिंग।',
  },
  '/modules/abdm': {
    title: 'ABDM-ready HIMS | ABHA और हेल्थ रिकॉर्ड भारत',
    description: 'भारतीय अस्पतालों के लिए ABDM-ready HIMS का मतलब: ABHA-उन्मुख रिकॉर्ड, दस्तावेज़ ट्रेल और बिना नकली दावे का सर्टिफिकेशन पथ।',
  },
  '/pricing': {
    title: 'भारत के अस्पताल और क्लिनिक के लिए HIMS कीमत',
    description: 'HIMS कीमत बेड, ब्रांच और मॉड्यूल पर निर्भर करती है। अस्पताल-विशिष्ट क्वोट, लाइव डेमो टेनेंट और रोलआउट प्लान के लिए सेल्स से बात करें।',
  },
  '/about': {
    title: 'Trinovus Tech के बारे में | HIMS अस्पताल सॉफ्टवेयर',
    description: 'Trinovus Tech भारतीय अस्पतालों के लिए HIMS बनाता है। उत्पाद, कंपनी, बिक्री और सपोर्ट के बारे में जानें।',
  },
  '/contact': {
    title: 'HIMS सेल्स से बात करें | अस्पताल सॉफ्टवेयर डेमो बुक करें',
    description: 'अपने अस्पताल या क्लिनिक के लिए लाइव HIMS डेमो बुक करें। hello@trinovustech.com या फ़ॉर्म — OPD, फार्मेसी, डायग्नोस्टिक्स और बिलिंग।',
  },
  '/faq': {
    title: 'HIMS FAQ | हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम भारत',
    description: 'HIMS सॉफ्टवेयर, डिप्लॉयमेंट, ABDM readiness, GST बिलिंग और डेमो पर सवाल-जवाब — भारतीय क्लिनिक, डायग्नोस्टिक सेंटर और अस्पताल।',
  },
  '/guides': {
    title: 'HIMS गाइड | भारत में अस्पताल सॉफ्टवेयर',
    description: 'HIMS, HMIS, ABDM और भारतीय अस्पताल सॉफ्टवेयर कैसे चुनें — व्यावहारिक गाइड।',
  },
  '/guides/what-is-hims': {
    title: 'HIMS क्या है? हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम समझाया',
    description: 'HIMS यानी Hospital Information Management System। भारतीय अस्पतालों में यह क्या कवर करता है और क्या देखना चाहिए।',
  },
  '/guides/hims-vs-hmis': {
    title: 'भारत में HIMS बनाम HMIS बनाम HMS | अस्पताल क्या खरीदें',
    description: 'भारत में HIMS, HMIS और HMS एक-दूसरे की जगह इस्तेमाल होते हैं। ओवरलैप समझें ताकि तुलना में उलझन न हो।',
  },
  '/guides/choose-hospital-software-india': {
    title: 'भारत में अस्पताल सॉफ्टवेयर कैसे चुनें | 20–200 बेड चेकलिस्ट',
    description: '20–200 बेड नर्सिंग होम और अस्पतालों के लिए HIMS चेकलिस्ट: OPD, IPD, फार्मेसी, लैब, GST, ट्रेनिंग और डेटा स्वामित्व।',
  },
  '/guides/abdm-ready-hims': {
    title: 'भारत में ABDM-ready HIMS | ABHA, रिकॉर्ड और वेंडर से क्या पूछें',
    description: 'ABDM-ready और ABDM-certified एक नहीं। भारतीय अस्पताल HIMS वेंडर से ABHA, रिकॉर्ड और सर्टिफिकेशन पथ पर क्या पूछें।',
  },
  '/privacy': {
    title: 'गोपनीयता नीति | HIMS by Trinovus Tech',
    description: 'HIMS मार्केटिंग वेबसाइट पर Trinovus Tech डेमो पूछताछ डेटा कैसे संभालता है।',
  },
  '/terms': {
    title: 'नियम | HIMS डेमो और वेबसाइट | Trinovus Tech',
    description: 'HIMS मार्केटिंग वेबसाइट उपयोग और Trinovus Tech से डेमो अनुरोध के नियम।',
  },
}

export const SEO_PAGES: SeoPage[] = [
  ...SEO_PAGES_EN,
  ...SEO_PAGES_EN.map((page) => {
    const hi = HI_SEO[page.path]
    return {
      ...page,
      path: withLocale(page.path, 'hi'),
      title: hi?.title ?? page.title,
      description: hi?.description ?? page.description,
    }
  }),
]

const pageByPath = new Map(SEO_PAGES.map((page) => [page.path, page]))

export function isIndexedPath(pathname: string): boolean {
  const clean = pathname.replace(/\/$/, '') || '/'
  return pageByPath.has(clean)
}

export function seoForPath(pathname: string): SeoPage {
  const clean = pathname.replace(/\/$/, '') || '/'
  return (
    pageByPath.get(clean) ?? {
      path: clean,
      title: 'HIMS | Hospital Information Management System India',
      description: COMPANY.product + ' by ' + COMPANY.name + ' — hospital software for India.',
    }
  )
}

export function absoluteUrl(pathname: string): string {
  if (pathname.startsWith('http')) return pathname
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${COMPANY.parentUrl}/#organization`,
        name: COMPANY.name,
        url: COMPANY.parentUrl,
        email: COMPANY.email,
        areaServed: 'IN',
        sameAs: COMPANY.sameAs,
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#software`,
        name: 'HIMS',
        alternateName: ['Hospital Information Management System', 'HIMS software India'],
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        url: SITE_URL,
        description:
          'India-first hospital information management system for OPD, IPD, pharmacy, diagnostics, GST billing and ABDM-ready workflows.',
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/pricing`,
          availability: 'https://schema.org/OnlineOnly',
          priceCurrency: 'INR',
        },
        provider: { '@id': `${COMPANY.parentUrl}/#organization` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'HIMS by Trinovus Tech',
        inLanguage: ['en-IN', 'hi-IN'],
        publisher: { '@id': `${COMPANY.parentUrl}/#organization` },
      },
    ],
  }
}
