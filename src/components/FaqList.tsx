import { getFaqs, type FaqItem } from '../content/localized'
import { useLocale } from '../i18n/useLocale'

export function FaqList({ items }: { items?: FaqItem[] }) {
  const { locale } = useLocale()
  const list = items ?? getFaqs(locale)

  return (
    <div className="faq-list">
      {list.map((item) => (
        <details key={item.q} className="faq-item">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
