import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getFaqs } from '../content/localized'
import { localeFromPath, stripLocale, withLocale } from '../i18n/locale'
import { absoluteUrl, COMPANY, isIndexedPath, organizationJsonLd, seoForPath, SITE_URL } from '../seo'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const selector = extra?.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
  if (extra) {
    for (const [key, value] of Object.entries(extra)) tag.setAttribute(key, value)
  }
}

function upsertJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

type SeoProps = {
  noindex?: boolean
}

export function Seo({ noindex = false }: SeoProps) {
  const location = useLocation()

  useEffect(() => {
    const locale = localeFromPath(location.pathname)
    const page = seoForPath(location.pathname)
    const url = absoluteUrl(page.path === '/' ? '/' : page.path)
    const image = absoluteUrl('/screenshots/dashboard.jpg')
    const indexable = !noindex && isIndexedPath(location.pathname)
    const bare = stripLocale(location.pathname)
    const enUrl = absoluteUrl(withLocale(bare, 'en'))
    const hiUrl = absoluteUrl(withLocale(bare, 'hi'))

    document.title = page.title
    document.documentElement.lang = locale === 'hi' ? 'hi-IN' : 'en-IN'

    upsertMeta('name', 'description', page.description)
    upsertMeta('name', 'robots', indexable ? 'index, follow' : 'noindex, nofollow')
    upsertMeta('name', 'author', COMPANY.name)
    upsertMeta('name', 'theme-color', '#0d6e6e')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'HIMS by Trinovus Tech')
    upsertMeta('property', 'og:title', page.title)
    upsertMeta('property', 'og:description', page.description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', locale === 'hi' ? 'hi_IN' : 'en_IN')
    upsertMeta('property', 'og:locale:alternate', locale === 'hi' ? 'en_IN' : 'hi_IN')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', page.title)
    upsertMeta('name', 'twitter:description', page.description)
    upsertMeta('name', 'twitter:image', image)
    upsertLink('canonical', url)
    upsertLink('alternate', enUrl, { hreflang: 'en-IN' })
    upsertLink('alternate', hiUrl, { hreflang: 'hi-IN' })
    upsertLink('alternate', enUrl, { hreflang: 'x-default' })

    const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION
    if (verification) upsertMeta('name', 'google-site-verification', verification)

    upsertJsonLd('jsonld-org', organizationJsonLd())

    const faqPath = stripLocale(location.pathname)
    if (faqPath === '/' || faqPath === '/faq') {
      upsertJsonLd('jsonld-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: locale === 'hi' ? 'hi-IN' : 'en-IN',
        mainEntity: getFaqs(locale).map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      })
    } else {
      document.getElementById('jsonld-faq')?.remove()
    }

    upsertJsonLd('jsonld-crumbs', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'HIMS', item: SITE_URL },
        ...(page.path === '/' || page.path === '/hi'
          ? []
          : [
              {
                '@type': 'ListItem',
                position: 2,
                name: page.title.split('|')[0].trim(),
                item: url,
              },
            ]),
      ],
    })
  }, [location.pathname, noindex])

  return null
}
