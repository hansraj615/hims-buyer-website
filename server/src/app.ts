import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import path from 'node:path'
import { config, isProduction } from './config.js'
import { adminRouter } from './routes/admin.js'
import { leadsRouter } from './routes/leads.js'

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
    origin: isProduction ? [config.corsOrigin, 'https://buyer-hims.trinovustech.com'] : true,
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

if (isProduction) {
  app.use(express.static(config.publicDir))
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(config.publicDir, 'index.html'))
  })
}
