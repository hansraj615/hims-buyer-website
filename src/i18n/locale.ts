export const LOCALES = ['en', 'hi'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export function localeFromPath(pathname: string): Locale {
  return pathname === '/hi' || pathname.startsWith('/hi/') ? 'hi' : 'en'
}

export function stripLocale(pathname: string): string {
  const clean = pathname.replace(/\/$/, '') || '/'
  if (clean === '/hi') return '/'
  if (clean.startsWith('/hi/')) return clean.slice(3) || '/'
  return clean
}

export function withLocale(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname)
  if (locale === 'en') return clean
  return clean === '/' ? '/hi' : `/hi${clean}`
}
