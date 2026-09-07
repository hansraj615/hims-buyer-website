import type { Locale } from './locale'

type Ui = {
  nav: { product: string; guides: string; pricing: string; contact: string; sales: string; menu: string; language: string }
  footer: {
    blurb: string
    product: string
    himsSoftware: string
    company: string
    about: string
    bookDemo: string
    trust: string
    note: string
    privacy: string
    terms: string
  }
  home: {
    h1: string
    copy: string
    bookDemo: string
    bodyMap: string
    trustAria: string
    trust: string[]
    tourKicker: string
    tourTitle: string
    tourLead: string
    modulesKicker: string
    modulesTitle: string
    openModule: string
    whyKicker: string
    whyTitle: string
    reasons: { title: string; body: string }[]
    docsKicker: string
    docsTitle: string
    docsBodyBefore: string
    docsLink: string
    docsBodyAfter: string
    docsAlt: string
    faqKicker: string
    faqTitle: string
    moreGuides: string
    moreFaq: string
  }
  tour: { title: string; body: string; to: string; link: string; alt: string; src: string; reverse?: boolean }[]
  doctor: { kicker: string; title: string; lead: string; start: string }
  bodyMap: { kicker: string; title: string; lead: string; upload: string }
  cta: { title: string; copy: string; email: string; faq: string }
  form: {
    hp: string
    name: string
    hospital: string
    email: string
    phone: string
    message: string
    submit: string
    sending: string
    thanks: string
    duplicate: string
    error: string
  }
  product: {
    kicker: string
    h1: string
    lead: string
    includes: string
    p1: string
    p2: string
    dashboardAlt: string
    who: string
    audience: string[]
  }
  module: {
    crumbsHome: string
    crumbsSoftware: string
    seeRest: string
    or: string
    bookDemo: string
    related: string
  }
  guides: { kicker: string; h1: string; lead: string; read: string; next: string; updated: string }
  pricing: {
    kicker: string
    h1: string
    lead: string
    rows: { title: string; body: string }[]
    ctaTitle: string
    ctaCopy: string
  }
  about: { kicker: string; h1: string; p1: string; p2: string; sales: string; company: string; read: string; product: string; guides: string; demo: string }
  contact: { kicker: string; h1: string; leadBefore: string; leadAfter: string; ctaTitle: string; ctaCopy: string }
  faqPage: { kicker: string; h1: string; lead: string }
  privacy: { h1: string; intro: string; hCollect: string; collect: string; hWhy: string; why: string; hWhere: string; where: string; hRights: string; rights: string; productNote: string; contact: string }
  terms: { h1: string; intro: string; hProduct: string; product: string; hClaims: string; claims: string; hUse: string; use: string; hContact: string }
  notFound: { title: string; tryHome: string; product: string; sales: string }
}

export const ui: Record<Locale, Ui> = {
  en: {
    nav: { product: 'Product', guides: 'Guides', pricing: 'Pricing', contact: 'Contact', sales: 'Talk to sales', menu: 'Menu', language: 'Language' },
    footer: {
      blurb: 'Hospital information management system for Indian hospitals, clinics and diagnostic centres. Built by Trinovus Tech.',
      product: 'Product',
      himsSoftware: 'HIMS software',
      company: 'Company',
      about: 'About',
      bookDemo: 'Book a demo',
      trust: 'Trust',
      note: 'India · Demo-led sales · No fake hospital counts',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    home: {
      h1: 'Hospital Information Management System for Indian hospitals',
      copy: 'One India-first HIMS software for OPD, IPD, pharmacy, diagnostics and GST billing — elegant enough to sell, practical enough to run. Built by Trinovus Tech.',
      bookDemo: 'Book a live demo',
      bodyMap: 'Watch body-map marking',
      trustAria: 'HIMS capabilities',
      trust: ['UHID registration', 'GST-ready billing', 'OPD + IPD', 'Pharmacy + lab', 'ABDM-ready path', 'Built for India'],
      tourKicker: 'Product tour',
      tourTitle: 'Real screens. Real hospital workflows.',
      tourLead: 'Captured from the live HIMS application — the same counter, clinical and billing journeys your team will use every day. This is hospital software, not a slide deck.',
      modulesKicker: 'What you get',
      modulesTitle: 'Everything a busy hospital day needs.',
      openModule: 'Open module',
      whyKicker: 'Why hospitals buy HIMS',
      whyTitle: 'Sellable clarity, not another ERP maze.',
      reasons: [
        { title: 'India-first by design', body: 'UHID, GST, INR, ABHA-oriented records and role menus that match how Indian hospitals actually staff a day.' },
        { title: 'Production workflows', body: 'Not demo stubs. Released screens complete a real staff journey against live data and audit trails.' },
        { title: 'Multi-branch ready', body: 'Hospital and branch isolation, tenant headers and assignment switching for group operators.' },
      ],
      docsKicker: 'ABDM & documents',
      docsTitle: 'Reports, prescriptions and patient files stay attached to the journey.',
      docsBodyBefore: 'Diagnostics results, discharge packages and branded PDFs land in the patient record — ready to open, download and share with clinical context preserved. Read how we talk about',
      docsLink: 'ABDM-ready HIMS',
      docsBodyAfter: 'without fake certificates.',
      docsAlt: 'HIMS patient documents and clinical reports',
      faqKicker: 'FAQ',
      faqTitle: 'Straight answers before you book.',
      moreGuides: 'HIMS guides',
      moreFaq: 'full FAQ',
    },
    tour: [
      { title: 'Front desk that moves', body: 'Register patients, book appointments and keep the OPD queue honest — reception stays in one place.', to: '/modules/opd', link: 'OPD software details', alt: 'HIMS appointments and OPD booking screen', src: '/screenshots/appointments.jpg' },
      { title: 'Pharmacy without paper piles', body: 'Pending prescriptions become dispenses with quantity review, stock checks and bill handoff.', to: '/modules/pharmacy', link: 'Hospital pharmacy software', alt: 'HIMS pharmacy counter screen', src: '/screenshots/pharmacy.jpg', reverse: true },
      { title: 'Diagnostics with real results', body: 'Enter summary, findings, parameter rows and upload the report file straight to the patient chart.', to: '/modules/diagnostics', link: 'Diagnostics software', alt: 'HIMS diagnostics orders and results screen', src: '/screenshots/diagnostics.jpg' },
      { title: 'Billing that closes the loop', body: 'Create invoices, take payments and print receipts with hospital branding already on the document.', to: '/modules/billing', link: 'GST billing software', alt: 'HIMS billing and receipts screen', src: '/screenshots/billing.jpg', reverse: true },
    ],
    doctor: { kicker: 'In the consulting room', title: 'Watch a consult begin.', lead: 'A doctor sits down, opens the queue, and starts the consultation — the clinical workspace unfolds without leaving the patient context.', start: 'Start consultation' },
    bodyMap: { kicker: 'Clinical photography', title: 'Capture. Mark. Document.', lead: 'From the real consultation workspace — open a consented patient photo or catalog silhouette, place markers, and fill observation details without leaving the visit.', upload: 'Upload photo' },
    cta: { title: 'Ready to see HIMS on a live hospital tenant?', copy: 'Tell us about your hospital or clinic. We will walk through OPD, pharmacy, diagnostics and billing — the same screens your team would use.', email: 'Email sales', faq: 'Read FAQ' },
    form: { hp: 'Leave blank', name: 'Your name', hospital: 'Hospital / clinic name', email: 'Work email', phone: 'Phone (recommended)', message: 'Beds, branches, modules you care about…', submit: 'Request demo details', sending: 'Sending…', thanks: 'Thanks — we received your enquiry and will get back to you.', duplicate: 'We already have your enquiry and will reply shortly.', error: 'Could not send your enquiry. Please email hello@trinovustech.com.' },
    product: {
      kicker: 'HIMS software',
      h1: 'HIMS software for hospitals and clinics in India',
      lead: 'HIMS by Trinovus Tech is a hospital information management system: one patient record from the front desk through the consult, pharmacy, diagnostics, indoor care and GST billing. Built for how Indian hospitals actually staff a shift.',
      includes: 'What HIMS includes',
      p1: 'Search “HIMS software India” and you will find everything from a billing app to an enterprise suite. This product is the operational system: UHID registration, OPD queues, EMR, IPD, pharmacy, lab, documents and invoices on one spine.',
      p2: 'We sell it with a live demo, not a promised roadmap disguised as a feature list. If a journey is not released, we will say so on the call.',
      dashboardAlt: 'HIMS hospital dashboard for Indian hospitals',
      who: 'Who it is for',
      audience: ['Clinics and polyclinics that have outgrown Excel', 'Nursing homes adding IPD discipline', 'Diagnostic centres that need orders plus files', 'Multi-branch hospitals that need tenant isolation'],
    },
    module: { crumbsHome: 'HIMS', crumbsSoftware: 'Software', seeRest: 'See the rest of', or: 'or', bookDemo: 'book a demo', related: 'Related HIMS modules' },
    guides: { kicker: 'Guides', h1: 'HIMS guides for Indian hospital buyers', lead: 'Short, honest explainers so “HIMS” on Google turns into a decision — not another acronym fight. Written for owners, medical superintendents and IT leads.', read: 'Read guide', next: 'Next:', updated: 'Updated' },
    pricing: {
      kicker: 'Pricing',
      h1: 'HIMS pricing for hospitals and clinics in India',
      lead: 'Hospital software is not a seat-only SaaS sticker. HIMS pricing is quoted against your hospital so the invoice matches the rollout — not a landing-page fantasy.',
      rows: [
        { title: 'What you are paying for', body: 'A production HIMS tenant, the modules in your first release, training for the desks that will use it, and a named sales/implementation path. Not a mystery “enterprise pack”.' },
        { title: 'What changes the quote', body: 'Bed count, number of branches, whether pharmacy and diagnostics are in-house, IPD go-live in phase one, and whether you need on-prem or cloud. Those are the real levers.' },
        { title: 'What we will not publish as a gimmick', body: 'A fake ₹499/month number that cannot run a hospital. If a competitor shows one, ask what is excluded. We would rather quote after seeing your floor.' },
        { title: 'How to get a number', body: 'Book a demo. Bring beds, branches and the modules you must have in 90 days. You leave with a scoped commercial conversation, not a leftover PDF.' },
      ],
      ctaTitle: 'Ask for a hospital-specific HIMS quote',
      ctaCopy: 'Share beds, branches and must-have modules. We will demo the live product and follow with a scoped price — not a bait tariff.',
    },
    about: {
      kicker: 'About',
      h1: 'Trinovus Tech builds HIMS for Indian hospitals',
      p1: 'Trinovus Tech is the company behind HIMS — a hospital information management system sold to clinics, diagnostic centres and hospitals in India. We are not a US consumer health brand, and we do not inflate “5,000 hospitals live” on this site.',
      p2: 'The product lives in the HIMS Laravel application: OPD, EMR, pharmacy, diagnostics, billing, IPD and an ABDM-ready path. This website is how buyers see the real screens and talk to sales.',
      sales: 'Sales:',
      company: 'Company site:',
      read: 'Read the',
      product: 'product',
      guides: 'guides',
      demo: 'book a demo',
    },
    contact: {
      kicker: 'Talk to sales',
      h1: 'Book a HIMS demo for your hospital',
      leadBefore: 'Email',
      leadAfter: 'or send the form. Tell us beds, branches and the desks that hurt today. We reply with a live walkthrough — OPD, pharmacy, diagnostics and billing.',
      ctaTitle: 'Request demo details',
      ctaCopy: 'Work email and hospital name are enough to start. Phone helps us reach the decision-maker faster.',
    },
    faqPage: { kicker: 'FAQ', h1: 'HIMS FAQ — hospital information management system India', lead: 'Direct answers for owners comparing HIMS software. If something important is missing, ask it on the demo form — we would rather document a gap than invent a claim.' },
    privacy: {
      h1: 'Privacy policy',
      intro: 'Last updated 4 September 2026. This page covers the HIMS marketing website operated by Trinovus Tech.',
      hCollect: 'What we collect',
      collect: 'If you request a demo we store your name, work email, hospital or clinic name, optional phone number, and the message you typed. We also store a source string so we know which page you sent the form from.',
      hWhy: 'Why we collect it',
      why: 'To reply to your enquiry, book a demo, and follow up on HIMS sales. We do not sell enquiry lists. We do not use this form to run unrelated marketing blasts.',
      hWhere: 'Where it goes',
      where: 'Submissions are stored in our leads database and emailed to hello@trinovustech.com. Hosting and mail may use our infrastructure providers in order to deliver that reply.',
      hRights: 'Your rights',
      rights: 'You can ask us to correct or delete an enquiry record by emailing hello@trinovustech.com. This website is aimed at businesses in India; we handle this data under applicable Indian law including the Digital Personal Data Protection Act, 2023 where it applies to this sales context.',
      productNote: 'Product patient data inside a deployed HIMS tenant is a separate processing activity under that hospital’s own policies — this page is only for the public marketing website.',
      contact: 'Contact sales',
    },
    terms: {
      h1: 'Website and demo terms',
      intro: 'Last updated 4 September 2026. These terms cover this HIMS marketing site and demo requests.',
      hProduct: 'The product',
      product: 'HIMS is hospital software from Trinovus Tech. Screenshots and in-page demos illustrate the live application. A demo is not a licence. Commercial terms, SLA and module scope are agreed separately in writing.',
      hClaims: 'No inflated claims',
      claims: 'Module availability, ABDM milestones and rollout effort are confirmed on the sales call. Do not treat marketing copy as a tender compliance certificate.',
      hUse: 'Acceptable use',
      use: 'Do not abuse the enquiry form (spam, fake hospitals, scraping). We may ignore or block abusive submissions.',
      hContact: 'Contact',
    },
    notFound: { title: 'This page is not in the HIMS site map.', tryHome: 'home page', product: 'product', sales: 'talk to sales' },
  },
  hi: {
    nav: { product: 'उत्पाद', guides: 'गाइड', pricing: 'कीमत', contact: 'संपर्क', sales: 'सेल्स से बात करें', menu: 'मेनू', language: 'भाषा' },
    footer: {
      blurb: 'भारतीय अस्पतालों, क्लिनिक और डायग्नोस्टिक सेंटर के लिए हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम। Trinovus Tech द्वारा निर्मित।',
      product: 'उत्पाद',
      himsSoftware: 'HIMS सॉफ्टवेयर',
      company: 'कंपनी',
      about: 'हमारे बारे में',
      bookDemo: 'डेमो बुक करें',
      trust: 'विश्वास',
      note: 'भारत · डेमो से बिक्री · नकली अस्पताल संख्या नहीं',
      privacy: 'गोपनीयता',
      terms: 'नियम',
    },
    home: {
      h1: 'भारतीय अस्पतालों के लिए हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम',
      copy: 'OPD, IPD, फार्मेसी, डायग्नोस्टिक्स और GST बिलिंग के लिए एक India-first HIMS सॉफ्टवेयर — बेचने लायक स्पष्ट, चलाने लायक व्यावहारिक। Trinovus Tech द्वारा निर्मित।',
      bookDemo: 'लाइव डेमो बुक करें',
      bodyMap: 'बॉडी-मैप मार्किंग देखें',
      trustAria: 'HIMS क्षमताएँ',
      trust: ['UHID रजिस्ट्रेशन', 'GST बिलिंग', 'OPD + IPD', 'फार्मेसी + लैब', 'ABDM-ready पथ', 'भारत के लिए बना'],
      tourKicker: 'प्रोडक्ट टूर',
      tourTitle: 'असली स्क्रीन. असली अस्पताल वर्कफ़्लो.',
      tourLead: 'लाइव HIMS ऐप से कैप्चर — वही काउंटर, क्लिनिकल और बिलिंग यात्रा जो आपकी टीम रोज़ चलाएगी। यह अस्पताल सॉफ्टवेयर है, स्लाइड डेक नहीं।',
      modulesKicker: 'आपको क्या मिलता है',
      modulesTitle: 'व्यस्त अस्पताल के दिन के लिए ज़रूरी सब कुछ.',
      openModule: 'मॉड्यूल खोलें',
      whyKicker: 'अस्पताल HIMS क्यों खरीदते हैं',
      whyTitle: 'बेचने लायक स्पष्टता, एक और ERP भूलभुलैया नहीं.',
      reasons: [
        { title: 'डिज़ाइन से India-first', body: 'UHID, GST, INR, ABHA-उन्मुख रिकॉर्ड और रोल मेनू — जैसे भारतीय अस्पताल वास्तव में शिफ्ट चलाते हैं।' },
        { title: 'प्रोडक्शन वर्कफ़्लो', body: 'डेमो स्टब नहीं। रिलीज़्ड स्क्रीन लाइव डेटा और ऑडिट ट्रेल पर असली स्टाफ यात्रा पूरी करती हैं।' },
        { title: 'मल्टी-ब्रांच तैयार', body: 'अस्पताल और ब्रांच आइसोलेशन, टेनेंट हेडर और ग्रुप ऑपरेटर के लिए असाइनमेंट स्विचिंग।' },
      ],
      docsKicker: 'ABDM और दस्तावेज़',
      docsTitle: 'रिपोर्ट, प्रिस्क्रिप्शन और मरीज़ फाइलें यात्रा से जुड़ी रहती हैं.',
      docsBodyBefore: 'डायग्नोस्टिक रिजल्ट, डिस्चार्ज पैकेज और ब्रांडेड PDF मरीज़ रिकॉर्ड में रहते हैं — खोलने, डाउनलोड और क्लिनिकल संदर्भ के साथ साझा करने के लिए। पढ़ें हम',
      docsLink: 'ABDM-ready HIMS',
      docsBodyAfter: 'के बारे में बिना नकली सर्टिफिकेट के कैसे बात करते हैं।',
      docsAlt: 'HIMS मरीज़ दस्तावेज़ और क्लिनिकल रिपोर्ट',
      faqKicker: 'सवाल-जवाब',
      faqTitle: 'बुक करने से पहले सीधे जवाब.',
      moreGuides: 'HIMS गाइड',
      moreFaq: 'पूरा FAQ',
    },
    tour: [
      { title: 'चलता हुआ फ्रंट डेस्क', body: 'मरीज़ रजिस्टर करें, अपॉइंटमेंट बुक करें और OPD कतार ईमानदार रखें — रिसेप्शन एक जगह रहे।', to: '/modules/opd', link: 'OPD सॉफ्टवेयर विवरण', alt: 'HIMS अपॉइंटमेंट और OPD बुकिंग स्क्रीन', src: '/screenshots/appointments.jpg' },
      { title: 'कागज़ के ढेर के बिना फार्मेसी', body: 'लंबित प्रिस्क्रिप्शन डिस्पेंस बनते हैं — मात्रा जाँच, स्टॉक और बिल हैंडऑफ के साथ।', to: '/modules/pharmacy', link: 'हॉस्पिटल फार्मेसी सॉफ्टवेयर', alt: 'HIMS फार्मेसी काउंटर स्क्रीन', src: '/screenshots/pharmacy.jpg', reverse: true },
      { title: 'असली रिजल्ट वाला डायग्नोस्टिक्स', body: 'सारांश, फाइंडिंग, पैरामीटर पंक्तियाँ दर्ज करें और रिपोर्ट फाइल सीधे चार्ट पर अपलोड करें।', to: '/modules/diagnostics', link: 'डायग्नोस्टिक्स सॉफ्टवेयर', alt: 'HIMS डायग्नोस्टिक्स ऑर्डर और रिजल्ट स्क्रीन', src: '/screenshots/diagnostics.jpg' },
      { title: 'लूप बंद करने वाली बिलिंग', body: 'इनवॉइस बनाएँ, पेमेंट लें और अस्पताल ब्रांडिंग वाले रसीद प्रिंट करें।', to: '/modules/billing', link: 'GST बिलिंग सॉफ्टवेयर', alt: 'HIMS बिलिंग और रसीद स्क्रीन', src: '/screenshots/billing.jpg', reverse: true },
    ],
    doctor: { kicker: 'कंसल्टिंग रूम में', title: 'कंसल्ट शुरू होते देखें.', lead: 'डॉक्टर बैठते हैं, कतार खोलते हैं, और कंसल्टेशन शुरू करते हैं — क्लिनिकल वर्कस्पेस मरीज़ के संदर्भ को छोड़े बिना खुलता है।', start: 'कंसल्टेशन शुरू करें' },
    bodyMap: { kicker: 'क्लिनिकल फोटोग्राफी', title: 'कैप्चर. मार्क. दस्तावेज़.', lead: 'असली कंसल्टेशन वर्कस्पेस से — सहमति वाली मरीज़ फोटो या कैटलॉग सिल्हूट खोलें, मार्कर लगाएँ, और विज़िट छोड़े बिना विवरण भरें।', upload: 'फोटो अपलोड करें' },
    cta: { title: 'लाइव अस्पताल टेनेंट पर HIMS देखना है?', copy: 'अपने अस्पताल या क्लिनिक के बारे में बताएँ। हम OPD, फार्मेसी, डायग्नोस्टिक्स और बिलिंग चलाकर दिखाएँगे — वही स्क्रीन जो आपकी टीम चलाएगी।', email: 'सेल्स को ईमेल', faq: 'FAQ पढ़ें' },
    form: { hp: 'खाली छोड़ें', name: 'आपका नाम', hospital: 'अस्पताल / क्लिनिक का नाम', email: 'कार्य ईमेल', phone: 'फ़ोन (सुझाया गया)', message: 'बेड, ब्रांच, मॉड्यूल जिनकी आपको चिंता है…', submit: 'डेमो विवरण माँगें', sending: 'भेजा जा रहा है…', thanks: 'धन्यवाद — आपकी पूछताछ मिल गई, हम जल्द जवाब देंगे।', duplicate: 'आपकी पूछताछ पहले से हमारे पास है, हम जल्द जवाब देंगे।', error: 'पूछताछ नहीं भेज सके। कृपया hello@trinovustech.com पर ईमेल करें।' },
    product: {
      kicker: 'HIMS सॉफ्टवेयर',
      h1: 'भारत के अस्पतालों और क्लिनिक के लिए HIMS सॉफ्टवेयर',
      lead: 'Trinovus Tech का HIMS एक हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम है: फ्रंट डेस्क से कंसल्ट, फार्मेसी, डायग्नोस्टिक्स, इंडोर केयर और GST बिलिंग तक एक मरीज़ रिकॉर्ड। भारतीय अस्पताल की शिफ्ट के हिसाब से बना।',
      includes: 'HIMS में क्या शामिल है',
      p1: '“HIMS software India” खोजें तो बिलिंग ऐप से एंटरप्राइज़ सूट तक सब मिलेगा। यह उत्पाद ऑपरेशनल सिस्टम है: UHID रजिस्ट्रेशन, OPD कतार, EMR, IPD, फार्मेसी, लैब, दस्तावेज़ और इनवॉइस एक रीढ़ पर।',
      p2: 'हम लाइव डेमो से बेचते हैं, फीचर लिस्ट बने रोडमैप से नहीं। जो यात्रा रिलीज़ नहीं है, कॉल पर बताएँगे।',
      dashboardAlt: 'भारतीय अस्पतालों के लिए HIMS डैशबोर्ड',
      who: 'यह किसके लिए है',
      audience: ['Excel से आगे बढ़ चुके क्लिनिक और पॉलीक्लिनिक', 'IPD अनुशासन जोड़ते नर्सिंग होम', 'ऑर्डर प्लस फाइल चाहिए ऐसे डायग्नोस्टिक सेंटर', 'टेनेंट आइसोलेशन चाहिए ऐसे मल्टी-ब्रांच अस्पताल'],
    },
    module: { crumbsHome: 'HIMS', crumbsSoftware: 'सॉफ्टवेयर', seeRest: 'बाकी देखें', or: 'या', bookDemo: 'डेमो बुक करें', related: 'संबंधित HIMS मॉड्यूल' },
    guides: { kicker: 'गाइड', h1: 'भारतीय अस्पताल खरीदारों के लिए HIMS गाइड', lead: 'छोटे, ईमानदार लेख ताकि Google पर “HIMS” एक फैसला बने — सिर्फ़ एक और संक्षिप्त नाम की लड़ाई नहीं। मालिकों, मेडिकल सुपरिटेंडेंट और IT लीड के लिए।', read: 'गाइड पढ़ें', next: 'अगला:', updated: 'अपडेट' },
    pricing: {
      kicker: 'कीमत',
      h1: 'भारत के अस्पतालों और क्लिनिक के लिए HIMS कीमत',
      lead: 'अस्पताल सॉफ्टवेयर सीट-ओनली SaaS स्टिकर नहीं है। HIMS कीमत आपके अस्पताल के हिसाब से क्वोट होती है ताकि इनवॉइस रोलआउट से मेल खाए — लैंडिंग-पेज कल्पना नहीं।',
      rows: [
        { title: 'आप किस चीज़ की कीमत चुका रहे हैं', body: 'प्रोडक्शन HIMS टेनेंट, पहली रिलीज़ के मॉड्यूल, उन डेस्क की ट्रेनिंग जो इसे चलाएँगी, और नामित सेल्स/इम्प्लीमेंटेशन पथ। रहस्यमय “एंटरप्राइज़ पैक” नहीं।' },
        { title: 'क्वोट क्या बदलता है', body: 'बेड संख्या, ब्रांच, इन-हाउस फार्मेसी और डायग्नोस्टिक्स, फेज वन में IPD गो-लाइव, और ऑन-प्रेम या क्लाउड। यही असली लीवर हैं।' },
        { title: 'जो हम गिमिक की तरह नहीं छापेंगे', body: 'नकली ₹499/माह जो अस्पताल नहीं चला सकता। प्रतियोगी दिखाए तो पूछें क्या बाहर है। हम फ्लोर देखने के बाद क्वोट देना पसंद करते हैं।' },
        { title: 'नंबर कैसे मिले', body: 'डेमो बुक करें। 90 दिनों में ज़रूरी बेड, ब्रांच और मॉड्यूल लाएँ। आप स्कोप्ड व्यावसायिक बातचीत के साथ निकलते हैं, बचा हुआ PDF लेकर नहीं।' },
      ],
      ctaTitle: 'अस्पताल-विशिष्ट HIMS क्वोट माँगें',
      ctaCopy: 'बेड, ब्रांच और ज़रूरी मॉड्यूल बताएँ। हम लाइव प्रोडक्ट दिखाएँगे और स्कोप्ड कीमत देंगे — बैट टैरिफ नहीं।',
    },
    about: {
      kicker: 'हमारे बारे में',
      h1: 'Trinovus Tech भारतीय अस्पतालों के लिए HIMS बनाता है',
      p1: 'Trinovus Tech HIMS के पीछे की कंपनी है — भारत के क्लिनिक, डायग्नोस्टिक सेंटर और अस्पतालों को बेचा जाने वाला हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम। हम अमेरिकी कंज़्यूमर हेल्थ ब्रांड नहीं हैं, और इस साइट पर “5,000 अस्पताल लाइव” नहीं बढ़ाते।',
      p2: 'उत्पाद HIMS Laravel ऐप में है: OPD, EMR, फार्मेसी, डायग्नोस्टिक्स, बिलिंग, IPD और ABDM-ready पथ। यह वेबसाइट खरीदारों को असली स्क्रीन दिखाने और सेल्स से बात करने का रास्ता है।',
      sales: 'सेल्स:',
      company: 'कंपनी साइट:',
      read: 'पढ़ें',
      product: 'उत्पाद',
      guides: 'गाइड',
      demo: 'डेमो बुक करें',
    },
    contact: {
      kicker: 'सेल्स से बात करें',
      h1: 'अपने अस्पताल के लिए HIMS डेमो बुक करें',
      leadBefore: 'ईमेल करें',
      leadAfter: 'या फ़ॉर्म भेजें। बेड, ब्रांच और आज जो डेस्क दुखती हैं, बताएँ। हम लाइव वॉकथ्रू से जवाब देते हैं — OPD, फार्मेसी, डायग्नोस्टिक्स और बिलिंग।',
      ctaTitle: 'डेमो विवरण माँगें',
      ctaCopy: 'शुरू करने के लिए कार्य ईमेल और अस्पताल का नाम काफी है। फ़ोन से निर्णयकर्ता तक पहुँच तेज़ होती है।',
    },
    faqPage: { kicker: 'सवाल-जवाब', h1: 'HIMS FAQ — भारत में हॉस्पिटल इन्फॉर्मेशन मैनेजमेंट सिस्टम', lead: 'HIMS सॉफ्टवेयर की तुलना करते मालिकों के लिए सीधे जवाब। कुछ महत्वपूर्ण छूटा हो तो डेमो फ़ॉर्म पर पूछें — दावा गढ़ने से बेहतर है गैप लिखना।' },
    privacy: {
      h1: 'गोपनीयता नीति',
      intro: 'अंतिम अपडेट 4 सितंबर 2026। यह पेज Trinovus Tech द्वारा संचालित HIMS मार्केटिंग वेबसाइट पर लागू होता है।',
      hCollect: 'हम क्या इकट्ठा करते हैं',
      collect: 'डेमो माँगने पर हम आपका नाम, कार्य ईमेल, अस्पताल या क्लिनिक का नाम, वैकल्पिक फ़ोन, और आपका संदेश रखते हैं। स्रोत स्ट्रिंग भी रखते हैं ताकि पता चले फ़ॉर्म किस पेज से आया।',
      hWhy: 'क्यों इकट्ठा करते हैं',
      why: 'आपकी पूछताछ का जवाब देने, डेमो बुक करने और HIMS सेल्स फॉलो-अप के लिए। हम पूछताछ सूचियाँ नहीं बेचते। इस फ़ॉर्म से असंबंधित मार्केटिंग नहीं चलाते।',
      hWhere: 'यह कहाँ जाता है',
      where: 'सबमिशन हमारे लीड्स डेटाबेस में संग्रहित होते हैं और hello@trinovustech.com पर ईमेल होते हैं। जवाब पहुँचाने के लिए होस्टिंग और मेल प्रदाता लग सकते हैं।',
      hRights: 'आपके अधिकार',
      rights: 'hello@trinovustech.com पर ईमेल कर रिकॉर्ड सुधार या हटाने को कह सकते हैं। यह साइट भारत के व्यवसायों के लिए है; लागू भारतीय कानून के तहत डेटा संभाला जाता है, जिसमें Digital Personal Data Protection Act, 2023 शामिल है जहाँ यह सेल्स संदर्भ में लागू हो।',
      productNote: 'डिप्लॉय्ड HIMS टेनेंट के अंदर मरीज़ डेटा उस अस्पताल की अपनी नीति के तहत अलग प्रोसेसिंग है — यह पेज केवल सार्वजनिक मार्केटिंग साइट के लिए है।',
      contact: 'सेल्स से संपर्क',
    },
    terms: {
      h1: 'वेबसाइट और डेमो के नियम',
      intro: 'अंतिम अपडेट 4 सितंबर 2026। ये नियम इस HIMS मार्केटिंग साइट और डेमो अनुरोधों पर लागू हैं।',
      hProduct: 'उत्पाद',
      product: 'HIMS, Trinovus Tech का अस्पताल सॉफ्टवेयर है। स्क्रीनशॉट और पेज डेमो लाइव ऐप दिखाते हैं। डेमो लाइसेंस नहीं है। व्यावसायिक शर्तें, SLA और मॉड्यूल स्कोप अलग से लिखित रूप में तय होते हैं।',
      hClaims: 'बढ़ा-चढ़ा दावा नहीं',
      claims: 'मॉड्यूल उपलब्धता, ABDM माइलस्टोन और रोलआउट प्रयास सेल्स कॉल पर पुष्टि होते हैं। मार्केटिंग कॉपी को टेंडर कंप्लायंस सर्टिफिकेट न मानें।',
      hUse: 'स्वीकार्य उपयोग',
      use: 'पूछताछ फ़ॉर्म का दुरुपयोग न करें (स्पैम, नकली अस्पताल, स्क्रैपिंग)। हम ऐसे सबमिशन अनदेखा या ब्लॉक कर सकते हैं।',
      hContact: 'संपर्क',
    },
    notFound: { title: 'यह पेज HIMS साइट मैप में नहीं है.', tryHome: 'होम पेज', product: 'उत्पाद', sales: 'सेल्स से बात' },
  },
}
