import { Link, Navigate, useParams } from 'react-router-dom'
import { CtaBlock } from '../components/CtaBlock'
import { ScreenshotFrame } from '../components/ScreenshotFrame'
import { getModules, moduleBySlug } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function ModulePage() {
  const { slug } = useParams()
  const { locale, path, t } = useLocale()
  const module = moduleBySlug(slug, locale)
  if (!module) return <Navigate to={path('/hims-software')} replace />

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="crumbs">
            <Link to={path('/')}>{t.module.crumbsHome}</Link> /{' '}
            <Link to={path('/hims-software')}>{t.module.crumbsSoftware}</Link> / {module.nav}
          </p>
          <p className="section-kicker">{module.kicker}</p>
          <h1 className="page-title">{module.h1}</h1>
          <p className="section-lead">{module.lead}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell tour-layout">
          <div className="prose">
            {module.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <p>
              {t.module.seeRest}{' '}
              <Link to={path('/hims-software')}>{t.footer.himsSoftware}</Link> {t.module.or}{' '}
              <Link to={path('/contact')}>{t.module.bookDemo}</Link>.
            </p>
          </div>
          <ScreenshotFrame alt={module.imageAlt} src={module.image} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <h2 className="section-title">{t.module.related}</h2>
          <div className="modules" style={{ marginTop: '1.5rem' }}>
            {getModules(locale)
              .filter((item) => item.slug !== module.slug)
              .slice(0, 3)
              .map((item) => (
                <article className="module" key={item.slug}>
                  <h3>
                    <Link to={path(`/modules/${item.slug}`)}>{item.nav}</Link>
                  </h3>
                  <p>{item.lead}</p>
                </article>
              ))}
          </div>
        </div>
      </section>

      <CtaBlock source={`module-${module.slug}`} />
    </main>
  )
}
