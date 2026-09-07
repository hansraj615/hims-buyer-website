import { CtaBlock } from '../components/CtaBlock'
import { useLocale } from '../i18n/useLocale'

export function PricingPage() {
  const { t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">{t.pricing.kicker}</p>
          <h1 className="page-title">{t.pricing.h1}</h1>
          <p className="section-lead">{t.pricing.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell modules">
          {t.pricing.rows.map((row) => (
            <article className="module" key={row.title}>
              <h2>{row.title}</h2>
              <p>{row.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBlock source="pricing" title={t.pricing.ctaTitle} copy={t.pricing.ctaCopy} />
    </main>
  )
}
