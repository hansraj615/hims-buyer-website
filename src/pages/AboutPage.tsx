import { Link } from 'react-router-dom'
import { CtaBlock } from '../components/CtaBlock'
import { useLocale } from '../i18n/useLocale'
import { COMPANY } from '../seo'

export function AboutPage() {
  const { path, t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell prose prose-wide">
          <p className="section-kicker">{t.about.kicker}</p>
          <h1 className="page-title">{t.about.h1}</h1>
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>
            {t.about.sales} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. {t.about.company}{' '}
            <a href={COMPANY.parentUrl}>{COMPANY.parentUrl.replace('https://', '')}</a>.
          </p>
          <p>
            {t.about.read} <Link to={path('/hims-software')}>{t.about.product}</Link>,{' '}
            <Link to={path('/guides')}>{t.about.guides}</Link>, {t.module.or}{' '}
            <Link to={path('/contact')}>{t.about.demo}</Link>.
          </p>
        </div>
      </section>
      <CtaBlock source="about" />
    </main>
  )
}
