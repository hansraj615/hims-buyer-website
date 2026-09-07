import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { COMPANY } from '../seo'
import { Seo } from './Seo'

export function Layout() {
  const location = useLocation()
  const { locale, path, switchTo, t } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const nav = [
    { to: path('/hims-software'), label: t.nav.product },
    { to: path('/guides'), label: t.nav.guides },
    { to: path('/pricing'), label: t.nav.pricing },
    { to: path('/contact'), label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    if (location.hash) {
      const id = location.hash.slice(1)
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
      return
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return (
    <>
      <Seo />
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="shell nav">
          <Link className="brand" to={path('/')}>
            <span className="brand-mark">+</span>
            HIMS
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <nav className="lang-switch" aria-label={t.nav.language}>
              <Link to={switchTo('en')} hrefLang="en-IN" aria-current={locale === 'en' ? 'true' : undefined}>
                English
              </Link>
              <Link to={switchTo('hi')} hrefLang="hi-IN" lang="hi" aria-current={locale === 'hi' ? 'true' : undefined}>
                हिन्दी
              </Link>
            </nav>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {t.nav.menu}
            </button>
            <Link className="btn btn-primary" to={path('/contact')}>
              {t.nav.sales}
            </Link>
          </div>
        </div>
        {open ? (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">+</span>
              HIMS
            </div>
            <p className="footer-blurb">{t.footer.blurb}</p>
          </div>
          <div>
            <p className="footer-heading">{t.footer.product}</p>
            <Link to={path('/hims-software')}>{t.footer.himsSoftware}</Link>
            <Link to={path('/modules/opd')}>OPD</Link>
            <Link to={path('/modules/ipd')}>IPD</Link>
            <Link to={path('/modules/pharmacy')}>{locale === 'hi' ? 'फार्मेसी' : 'Pharmacy'}</Link>
            <Link to={path('/modules/billing')}>GST billing</Link>
            <Link to={path('/modules/abdm')}>ABDM-ready</Link>
          </div>
          <div>
            <p className="footer-heading">{t.footer.company}</p>
            <Link to={path('/about')}>{t.footer.about}</Link>
            <Link to={path('/pricing')}>{t.nav.pricing}</Link>
            <Link to={path('/guides')}>{t.nav.guides}</Link>
            <Link to={path('/faq')}>FAQ</Link>
            <Link to={path('/contact')}>{t.footer.bookDemo}</Link>
          </div>
          <div>
            <p className="footer-heading">{t.footer.trust}</p>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <Link to={path('/privacy')}>{t.footer.privacy}</Link>
            <Link to={path('/terms')}>{t.footer.terms}</Link>
            <p className="footer-note">{t.footer.note}</p>
          </div>
        </div>
      </footer>
    </>
  )
}
