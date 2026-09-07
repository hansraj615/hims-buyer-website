export type SeoPage = {
  path: string
  title: string
  description: string
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

export const SEO_PAGES_EN: SeoPage[] = [
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

function withHi(path: string) {
  return path === '/' ? '/hi' : `/hi${path}`
}

export const SEO_PAGES: SeoPage[] = [
  ...SEO_PAGES_EN,
  ...SEO_PAGES_EN.map((page) => ({
    ...page,
    path: withHi(page.path),
    title:
      page.path === '/'
        ? 'HIMS सॉफ्टवेयर भारत | हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम'
        : page.title,
    description: page.description,
  })),
]

export function pageForPath(pathname: string): SeoPage | undefined {
  const clean = pathname.replace(/\/$/, '') || '/'
  return SEO_PAGES.find((page) => page.path === clean)
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function applySeoToHtml(html: string, page: SeoPage, siteUrl: string): string {
  const url = `${siteUrl}${page.path === '/' ? '/' : page.path}`
  const image = `${siteUrl}/screenshots/dashboard.jpg`
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  let next = html
  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  )
  next = next.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
  next = next.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  )
  next = next.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`)
  next = next.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${image}" />`)
  return next
}

export function sitemapXml(siteUrl: string, lastmod: string): string {
  const urls = SEO_PAGES.map((page) => {
    const loc = `${siteUrl}${page.path === '/' ? '/' : page.path}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq ?? 'weekly'}</changefreq>
    <priority>${(page.priority ?? 0.6).toFixed(1)}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

export function robotsTxt(siteUrl: string): string {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`
}
