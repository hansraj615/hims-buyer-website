import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import fs from 'node:fs'
import path from 'node:path'
import { config, isProduction } from './config.js'
import { adminRouter } from './routes/admin.js'
import { leadsRouter } from './routes/leads.js'
import { applySeoToHtml, pageForPath, robotsTxt, sitemapXml } from './seo.js'

export const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))
app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      ok: false,
      error: 'invalid_json',
      message: 'Invalid JSON body.',
    })
  }
  return next(err)
})
app.use(
  cors({
    origin: isProduction ? [config.corsOrigin, config.siteUrl, 'https://buyer-hims.trinovustech.com'] : true,
    methods: ['POST', 'GET', 'PATCH', 'OPTIONS'],
    credentials: true,
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'hims-buyer-api' })
})

app.use(
  '/api/admin/login',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      error: 'rate_limited',
      message: 'Too many login attempts. Please wait a few minutes.',
    },
  }),
)

app.use('/api/admin', adminRouter)

app.use(
  '/api/leads',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      error: 'rate_limited',
      message: 'Too many submissions. Please wait a few minutes and try again.',
    },
  }),
  leadsRouter,
)

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' })
})

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(robotsTxt(config.siteUrl))
})

app.get('/sitemap.xml', (_req, res) => {
  const lastmod = new Date().toISOString().slice(0, 10)
  res.type('application/xml').send(sitemapXml(config.siteUrl, lastmod))
})

if (isProduction) {
  app.use(express.static(config.publicDir, { index: false }))
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith('/admin')) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow')
    }

    const indexPath = path.join(config.publicDir, 'index.html')
    let html = fs.readFileSync(indexPath, 'utf8')
    const page = pageForPath(req.path)
    if (page) {
      html = applySeoToHtml(html, page, config.siteUrl)
    } else if (req.path.startsWith('/admin')) {
      html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex, nofollow" />')
    }
    if (config.googleSiteVerification) {
      const token = config.googleSiteVerification.replace(/[^a-zA-Z0-9_-]/g, '')
      if (token && !html.includes('google-site-verification')) {
        html = html.replace('</head>', `<meta name="google-site-verification" content="${token}" />\n</head>`)
      }
    }
    res.type('html').send(html)
  })
}
