import { Link, Navigate, useParams } from 'react-router-dom'
import { CtaBlock } from '../components/CtaBlock'
import { getGuides, guideBySlug } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function GuidePage() {
  const { slug } = useParams()
  const { locale, path, t } = useLocale()
  const guide = guideBySlug(slug, locale)
  if (!guide) return <Navigate to={path('/guides')} replace />

  return (
    <main className="page">
      <article className="page-hero">
        <div className="shell prose prose-wide">
          <p className="crumbs">
            <Link to={path('/')}>HIMS</Link> / <Link to={path('/guides')}>{t.guides.kicker}</Link> / {guide.title}
          </p>
          <p className="section-kicker">{guide.kicker}</p>
          <h1 className="page-title">{guide.h1}</h1>
          <p className="guide-meta">
            {t.guides.updated} {guide.updated} · Trinovus Tech
          </p>
          {guide.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>
            {t.guides.next}{' '}
            {getGuides(locale)
              .filter((item) => item.slug !== guide.slug)
              .slice(0, 2)
              .map((item, index) => (
                <span key={item.slug}>
                  {index > 0 ? ' · ' : ''}
                  <Link to={path(`/guides/${item.slug}`)}>{item.title}</Link>
                </span>
              ))}
          </p>
        </div>
      </article>
      <CtaBlock source={`guide-${guide.slug}`} />
    </main>
  )
}
