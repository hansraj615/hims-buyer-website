import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'

export function NotFoundPage() {
  const { path, t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">404</p>
          <h1 className="page-title">{t.notFound.title}</h1>
          <p className="section-lead">
            <Link to={path('/')}>{t.notFound.tryHome}</Link>
            {' · '}
            <Link to={path('/hims-software')}>{t.notFound.product}</Link>
            {' · '}
            <Link to={path('/contact')}>{t.notFound.sales}</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
