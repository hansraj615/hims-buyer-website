import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ContactForm } from './components/ContactForm'
import { BodyMapDemo } from './components/BodyMapDemo'
import { DoctorDemo } from './components/DoctorDemo'
import { HeroDevices } from './components/HeroDevices'
import { ProductTour } from './components/ProductTour'
import { ScreenshotFrame } from './components/ScreenshotFrame'

const modules = [
  {
    title: 'OPD & appointments',
    body: 'UHID registration, walk-ins, slots, queue tokens and doctor context — one continuous front-desk flow.',
  },
  {
    title: 'Consultations & EMR',
    body: 'Vitals, notes, prescriptions, body maps and visit history designed for busy OPD rooms.',
  },
  {
    title: 'Diagnostics',
    body: 'Pathology, radiology and procedures with structured results, report upload and patient documents.',
  },
  {
    title: 'Pharmacy counter',
    body: 'Pending Rx, dispense, stock awareness and billing handoff without spreadsheet chaos.',
  },
  {
    title: 'Billing & GST',
    body: 'OPD, IPD, lab and pharmacy invoices with payments, receipts and printable PDFs.',
  },
  {
    title: 'IPD, OT & emergency',
    body: 'Admissions, beds, OT cases, triage and discharge packages including LAMA and DOPR.',
  },
]

const reasons = [
  {
    title: 'India-first by design',
    body: 'UHID, GST, INR, ABHA readiness and role menus that match how Indian hospitals actually staff a day.',
  },
  {
    title: 'Production workflows',
    body: 'Not demo stubs. Every released screen completes a real staff journey against live data and audit trails.',
  },
  {
    title: 'Multi-branch ready',
    body: 'Hospital and branch isolation, tenant headers and assignment switching for group operators.',
  },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="shell nav">
          <a className="brand" href="#top">
            <span className="brand-mark">+</span>
            HIMS
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#live">Live demo</a>
            <a href="#bodymap">Body map</a>
            <a href="#product">Product</a>
            <a href="#modules">Modules</a>
            <a href="#demo">Book demo</a>
          </nav>
          <a className="btn btn-primary" href="#demo">
            Talk to sales
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero hero-showcase">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-content">
              <motion.p
                className="hero-brand"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                HIMS
              </motion.p>
              <motion.h1
                className="hero-headline"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                See it on desktop and mobile — built for the hospital floor.
              </motion.h1>
              <motion.p
                className="hero-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >
                One India-first system for OPD, pharmacy, diagnostics, billing and IPD — elegant enough to sell, practical enough to run.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <a className="btn btn-primary" href="#demo">
                  Book a live demo
                </a>
                <a className="btn btn-ghost" href="#bodymap">
                  Watch body-map marking
                </a>
              </motion.div>
            </div>

            <HeroDevices />
          </div>
        </section>

        <DoctorDemo />

        <BodyMapDemo />

        <section className="section" id="product">
          <div className="shell">
            <p className="section-kicker">Product tour</p>
            <h2 className="section-title">Real screens. Real workflows.</h2>
            <p className="section-lead">
              Captured from the live HIMS application — the same counter, clinical and billing journeys your team will use every day.
            </p>
          </div>
          <ProductTour />
        </section>

        <section className="section" id="modules" style={{ paddingTop: 0 }}>
          <div className="shell">
            <p className="section-kicker">What you get</p>
            <h2 className="section-title">Everything a busy hospital day needs.</h2>
            <div className="modules" style={{ marginTop: '2rem' }}>
              {modules.map((module) => (
                <article className="module" key={module.title}>
                  <h3>{module.title}</h3>
                  <p>{module.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section why" id="why">
          <div className="shell">
            <p className="section-kicker">Why hospitals buy HIMS</p>
            <h2 className="section-title">Sellable clarity, not another ERP maze.</h2>
            <div className="why-grid" style={{ marginTop: '2.4rem' }}>
              {reasons.map((reason, index) => (
                <motion.article
                  className="why-item"
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <h3>{reason.title}</h3>
                  <p>{reason.body}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="shell tour-layout">
            <div className="tour-copy">
              <p className="section-kicker">ABDM & documents</p>
              <h3>Reports, prescriptions and patient files stay attached to the journey.</h3>
              <p>
                Diagnostics results, discharge packages and branded PDFs land in the patient record — ready to open,
                download and share with clinical context preserved.
              </p>
            </div>
            <ScreenshotFrame
              alt="HIMS patient documents and clinical reports"
              src="/screenshots/documents.jpg"
            />
          </div>
        </section>

        <section className="section" id="demo" style={{ paddingTop: '1rem' }}>
          <div className="shell">
            <div className="cta">
              <h2>Ready to sell or deploy HIMS?</h2>
              <p>
                Tell us about your hospital or reseller motion. We will walk through OPD, pharmacy, diagnostics and billing
                on a live demo tenant.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="mailto:sales@hims.example?subject=HIMS%20demo%20request">
                  Email sales
                </a>
                <a className="btn btn-ghost" href="#live">
                  Replay the consult
                </a>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-row">
          <div className="brand">
            <span className="brand-mark">+</span>
            HIMS
          </div>
          <p style={{ margin: 0 }}>India-first hospital information management · Buyer website</p>
        </div>
      </footer>
    </>
  )
}
