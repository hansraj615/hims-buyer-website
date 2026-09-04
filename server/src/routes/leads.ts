import { Router } from 'express'
import { createLead } from '../services/leads.js'
import { formatFieldErrors, leadSchema } from '../validation.js'

export const leadsRouter = Router()

leadsRouter.post('/', async (req, res) => {
  const parsed = leadSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: 'validation',
      fields: formatFieldErrors(parsed.error),
    })
  }

  if (parsed.data.hp) {
    return res.status(201).json({ ok: true })
  }

  try {
    const result = await createLead(parsed.data, req.ip)
    if (result.duplicate) {
      return res.status(200).json({
        ok: true,
        duplicate: true,
        message: 'We already received your enquiry recently. Our team will reply shortly.',
      })
    }

    return res.status(201).json({
      ok: true,
      id: result.id,
      message: 'Thanks — we received your enquiry and will get back to you.',
    })
  } catch (error) {
    console.error('[leads] failed to create lead', error)
    return res.status(500).json({
      ok: false,
      error: 'server',
      message: 'Could not send your enquiry just now. Please email hello@trinovustech.com.',
    })
  }
})
