import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BodyMapDemo } from '../components/BodyMapDemo'
import { CtaBlock } from '../components/CtaBlock'
import { DoctorDemo } from '../components/DoctorDemo'
import { FaqList } from '../components/FaqList'
import { HeroDevices } from '../components/HeroDevices'
import { ProductTour } from '../components/ProductTour'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import { getModules } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function HomePage() {
  const { path, t, locale } = useLocale()
  const modules = getModules(locale)

  return (
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
              {t.home.h1}
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.home.copy}
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link className="btn btn-primary" to={path('/contact')}>
                {t.home.bookDemo}
              </Link>
              <a className="btn btn-ghost" href="#bodymap">
                {t.home.bodyMap}
              </a>
            </motion.div>
          </div>
          <HeroDevices />
        </div>
      </section>

      <div className="trust-bar" aria-label={t.home.trustAria}>
        <div className="shell trust-bar-row">
          {t.home.trust.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <DoctorDemo />
      <BodyMapDemo />

      <section className="section" id="product">
        <div className="shell">
          <p className="section-kicker">{t.home.tourKicker}</p>
          <h2 className="section-title">{t.home.tourTitle}</h2>
          <p className="section-lead">{t.home.tourLead}</p>
        </div>
        <ProductTour />
      </section>

      <section className="section" id="modules" style={{ paddingTop: 0 }}>
        <div className="shell">
          <p className="section-kicker">{t.home.modulesKicker}</p>
          <h2 className="section-title">{t.home.modulesTitle}</h2>
          <div className="modules" style={{ marginTop: '2rem' }}>
            {modules.map((module) => (
              <article className="module" key={module.slug}>
                <h3>
                  <Link to={path(`/modules/${module.slug}`)}>{module.nav}</Link>
                </h3>
                <p>{module.lead}</p>
                <Link className="text-link" to={path(`/modules/${module.slug}`)}>
                  {t.home.openModule}: {module.nav}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section why" id="why">
        <div className="shell">
          <p className="section-kicker">{t.home.whyKicker}</p>
          <h2 className="section-title">{t.home.whyTitle}</h2>
          <div className="why-grid" style={{ marginTop: '2.4rem' }}>
            {t.home.reasons.map((reason, index) => (
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
            <p className="section-kicker">{t.home.docsKicker}</p>
            <h2 className="tour-h2">{t.home.docsTitle}</h2>
            <p>
              {t.home.docsBodyBefore}{' '}
              <Link className="text-link" to={path('/modules/abdm')}>
                {t.home.docsLink}
              </Link>{' '}
              {t.home.docsBodyAfter}
            </p>
          </div>
          <ScreenshotFrame alt={t.home.docsAlt} src="/screenshots/documents.jpg" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <p className="section-kicker">{t.home.faqKicker}</p>
          <h2 className="section-title">{t.home.faqTitle}</h2>
          <FaqList />
          <p className="section-lead" style={{ marginTop: '1.2rem' }}>
            <Link className="text-link" to={path('/guides')}>
              {t.home.moreGuides}
            </Link>
            {' · '}
            <Link className="text-link" to={path('/faq')}>
              {t.home.moreFaq}
            </Link>
          </p>
        </div>
      </section>

      <CtaBlock source="home" />
    </main>
  )
}
