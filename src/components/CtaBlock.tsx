import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { ContactForm } from './ContactForm'

type CtaBlockProps = {
  title?: string
  copy?: string
  source: string
}

export function CtaBlock({ title, copy, source }: CtaBlockProps) {
  const { path, t } = useLocale()

  return (
    <section className="section" id="demo">
      <div className="shell">
        <div className="cta">
          <h2>{title ?? t.cta.title}</h2>
          <p>{copy ?? t.cta.copy}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="mailto:hello@trinovustech.com?subject=HIMS%20demo%20request">
              {t.cta.email}
            </a>
            <Link className="btn btn-ghost" to={path('/faq')}>
              {t.cta.faq}
            </Link>
          </div>
          <ContactForm source={source} />
        </div>
      </div>
    </section>
  )
}
