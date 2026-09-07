import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { ScreenshotFrame } from './ScreenshotFrame'

export function ProductTour() {
  const { path, t } = useLocale()

  return (
    <div className="shell" style={{ display: 'grid', gap: '4.5rem', marginTop: '3rem' }}>
      {t.tour.map((tour, index) => (
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
            <Link className="text-link" to={path(tour.to)}>
              {tour.link}
            </Link>
          </div>
          <ScreenshotFrame alt={tour.alt} src={tour.src} delay={0.1} />
        </motion.div>
      ))}
    </div>
  )
}
