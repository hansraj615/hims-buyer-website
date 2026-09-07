import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { COMPANY } from '../seo'

export function TermsPage() {
  const { path, t } = useLocale()

  return (
    <main className="page">
      <article className="page-hero">
        <div className="shell prose prose-wide">
          <h1 className="page-title">{t.terms.h1}</h1>
          <p>{t.terms.intro}</p>
          <h2>{t.terms.hProduct}</h2>
          <p>{t.terms.product}</p>
          <h2>{t.terms.hClaims}</h2>
          <p>{t.terms.claims}</p>
          <h2>{t.terms.hUse}</h2>
          <p>{t.terms.use}</p>
          <h2>{t.terms.hContact}</h2>
          <p>
            {COMPANY.email}. <Link to={path('/privacy')}>{t.footer.privacy}</Link> ·{' '}
            <Link to={path('/contact')}>{t.footer.bookDemo}</Link>.
          </p>
        </div>
      </article>
    </main>
  )
}
