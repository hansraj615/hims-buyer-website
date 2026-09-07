import { Link } from 'react-router-dom'
import { CtaBlock } from '../components/CtaBlock'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import { getModules } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function ProductPage() {
  const { path, t, locale } = useLocale()
  const modules = getModules(locale)

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">{t.product.kicker}</p>
          <h1 className="page-title">{t.product.h1}</h1>
          <p className="section-lead">{t.product.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell tour-layout">
          <div className="prose">
            <h2>{t.product.includes}</h2>
            <p>{t.product.p1}</p>
            <p>{t.product.p2}</p>
            <ul>
              {modules.map((module) => (
                <li key={module.slug}>
                  <Link to={path(`/modules/${module.slug}`)}>{module.nav}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ScreenshotFrame alt={t.product.dashboardAlt} src="/screenshots/dashboard.jpg" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <h2 className="section-title">{t.product.who}</h2>
          <div className="modules" style={{ marginTop: '1.5rem' }}>
            {t.product.audience.map((item) => (
              <article className="module" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="modules" style={{ marginTop: '1rem' }}>
            {modules.map((module) => (
              <article className="module" key={module.slug}>
                <h3>
                  <Link to={path(`/modules/${module.slug}`)}>{module.nav}</Link>
                </h3>
                <p>{module.lead}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock source="hims-software" />
    </main>
  )
}
