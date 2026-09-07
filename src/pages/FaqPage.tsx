import { CtaBlock } from '../components/CtaBlock'
import { FaqList } from '../components/FaqList'
import { useLocale } from '../i18n/useLocale'

export function FaqPage() {
  const { t } = useLocale()

  return (
    <main className="page">
      <section className="page-hero">
        <div className="shell">
          <p className="section-kicker">{t.faqPage.kicker}</p>
          <h1 className="page-title">{t.faqPage.h1}</h1>
          <p className="section-lead">{t.faqPage.lead}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell">
          <FaqList />
        </div>
      </section>
      <CtaBlock source="faq" />
    </main>
  )
}
