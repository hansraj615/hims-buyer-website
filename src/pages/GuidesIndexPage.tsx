import { Link } from 'react-router-dom'
import { getGuides } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function GuidesIndexPage() {
  const { locale, path, t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">{t.guides.kicker}</p>
          <h1 className="page-title">{t.guides.h1}</h1>
          <p className="section-lead">{t.guides.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell modules">
          {getGuides(locale).map((guide) => (
            <article className="module" key={guide.slug}>
              <p className="section-kicker">{guide.kicker}</p>
              <h2>
                <Link to={path(`/guides/${guide.slug}`)}>{guide.title}</Link>
              </h2>
              <p>{guide.description}</p>
              <Link className="text-link" to={path(`/guides/${guide.slug}`)}>
                {t.guides.read}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
