import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'

export function PrivacyPage() {
  const { path, t } = useLocale()

  return (
    <main className="page">
      <article className="page-hero">
        <div className="shell prose prose-wide">
          <h1 className="page-title">{t.privacy.h1}</h1>
          <p>{t.privacy.intro}</p>
          <h2>{t.privacy.hCollect}</h2>
          <p>{t.privacy.collect}</p>
          <h2>{t.privacy.hWhy}</h2>
          <p>{t.privacy.why}</p>
          <h2>{t.privacy.hWhere}</h2>
          <p>{t.privacy.where}</p>
          <h2>{t.privacy.hRights}</h2>
          <p>{t.privacy.rights}</p>
          <p>{t.privacy.productNote}</p>
          <p>
            <Link to={path('/contact')}>{t.privacy.contact}</Link> · <Link to={path('/terms')}>{t.footer.terms}</Link>
          </p>
        </div>
      </article>
    </main>
  )
}
