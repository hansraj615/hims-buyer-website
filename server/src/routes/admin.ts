import { Router } from 'express'
import { z } from 'zod'
import {
  clearAdminCookie,
  createSessionToken,
  passwordsMatch,
  requireAdmin,
  setAdminCookie,
} from '../auth.js'
import { config } from '../config.js'
import { LEAD_STATUSES, leadCounts, listLeads, updateLeadStatus } from '../services/leads.js'

export const adminRouter = Router()

const loginSchema = z.object({
  password: z.string().min(1).max(200),
})

const statusSchema = z.object({
  status: z.enum(LEAD_STATUSES),
})

adminRouter.post('/login', (req, res) => {
  if (!config.adminPassword) {
    return res.status(503).json({
      ok: false,
      error: 'admin_disabled',
      message: 'Set ADMIN_PASSWORD to enable the leads dashboard.',
    })
  }

  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success || !passwordsMatch(parsed.data.password, config.adminPassword)) {
    return res.status(401).json({ ok: false, error: 'invalid_password', message: 'Wrong password.' })
  }

  setAdminCookie(res, createSessionToken())
  return res.json({ ok: true })
})

adminRouter.post('/logout', (_req, res) => {
  clearAdminCookie(res)
  return res.json({ ok: true })
})

adminRouter.get('/session', requireAdmin, (_req, res) => {
  res.json({ ok: true })
})

adminRouter.get('/leads', requireAdmin, async (req, res) => {
  try {
    const status = typeof req.query.status === 'string' ? req.query.status : undefined
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : undefined
    const [leads, counts] = await Promise.all([listLeads({ status, q }), leadCounts()])
    res.json({ ok: true, leads, counts })
  } catch (error) {
    console.error('[admin] failed to list leads', error)
    res.status(500).json({ ok: false, error: 'server', message: 'Could not load leads.' })
  }
})

adminRouter.patch('/leads/:id', requireAdmin, async (req, res) => {
  const parsed = statusSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'validation', message: 'Invalid status.' })
  }

  try {
    const lead = await updateLeadStatus(String(req.params.id), parsed.data.status)
    if (!lead) {
      return res.status(404).json({ ok: false, error: 'not_found', message: 'Lead not found.' })
    }
    return res.json({ ok: true, lead })
  } catch (error) {
    console.error('[admin] failed to update lead', error)
    return res.status(500).json({ ok: false, error: 'server', message: 'Could not update lead.' })
  }
})
