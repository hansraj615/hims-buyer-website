import { motion } from 'framer-motion'
import { ScreenshotFrame } from './ScreenshotFrame'

const tours = [
  {
    title: 'Front desk that moves',
    body: 'Register patients, book appointments and keep the OPD queue honest — reception stays in one place.',
    src: '/screenshots/appointments.jpg',
    alt: 'HIMS appointments and OPD booking screen',
  },
  {
    title: 'Pharmacy without paper piles',
    body: 'Pending prescriptions become dispenses with quantity review, stock checks and bill handoff.',
    src: '/screenshots/pharmacy.jpg',
    alt: 'HIMS pharmacy counter screen',
    reverse: true,
  },
  {
    title: 'Diagnostics with real results',
    body: 'Enter summary, findings, parameter rows and upload the report file straight to the patient chart.',
    src: '/screenshots/diagnostics.jpg',
    alt: 'HIMS diagnostics orders and results screen',
  },
  {
    title: 'Billing that closes the loop',
    body: 'Create invoices, take payments and print receipts with hospital branding already on the document.',
    src: '/screenshots/billing.jpg',
    alt: 'HIMS billing and receipts screen',
    reverse: true,
  },
]

export function ProductTour() {
  return (
    <div className="shell" style={{ display: 'grid', gap: '4.5rem', marginTop: '3rem' }}>
      {tours.map((tour, index) => (
        <motion.div
          className={`tour-layout${tour.reverse ? ' reverse' : ''}`}
          key={tour.title}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tour-copy">
            <p className="section-kicker">0{index + 1}</p>
            <h3>{tour.title}</h3>
            <p>{tour.body}</p>
          </div>
          <ScreenshotFrame alt={tour.alt} src={tour.src} delay={0.1} />
        </motion.div>
      ))}
    </div>
  )
}
