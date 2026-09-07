import { useLocation } from 'react-router-dom'
import { localeFromPath, withLocale, type Locale } from './locale'
import { ui } from './ui'

export function useLocale() {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)

  return {
    locale,
    path: (href: string) => withLocale(href, locale),
    switchTo: (next: Locale) => withLocale(pathname, next),
    t: ui[locale],
  }
}
