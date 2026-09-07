import { CtaBlock } from '../components/CtaBlock'
import { useLocale } from '../i18n/useLocale'
import { COMPANY } from '../seo'

export function ContactPage() {
  const { t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">{t.contact.kicker}</p>
          <h1 className="page-title">{t.contact.h1}</h1>
          <p className="section-lead">
            {t.contact.leadBefore} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> {t.contact.leadAfter}
          </p>
        </div>
      </section>
      <CtaBlock source="contact" title={t.contact.ctaTitle} copy={t.contact.ctaCopy} />
    </main>
  )
}
