import nodemailer from 'nodemailer'
import { config, isProduction } from '../config.js'

export type LeadMailPayload = {
  id: string
  name: string
  email: string
  phone?: string
  company: string
  message?: string
  source: string
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function smtpReady(): boolean {
  return Boolean(config.smtp.host && config.smtp.user && config.smtp.password)
}

export async function sendLeadNotification(lead: LeadMailPayload): Promise<void> {
  if (!smtpReady()) {
    const message = 'SMTP is not configured. Lead was stored but no email was sent.'
    if (isProduction) {
      throw new Error(message)
    }
    console.warn(`[mailer] ${message}`)
    return
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.password,
    },
  })

  const lines = [
    `New HIMS buyer lead (${lead.id})`,
    '',
    `Name: ${lead.name}`,
    `Hospital / company: ${lead.company}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || '—'}`,
    `Source: ${lead.source}`,
    '',
    lead.message || 'No message provided.',
  ]

  const info = await transporter.sendMail({
    from: config.smtp.from,
    to: config.leadNotificationEmails.join(', '),
    replyTo: lead.email,
    envelope: {
      from: config.smtp.user,
      to: config.leadNotificationEmails,
    },
    subject: `HIMS demo request — ${lead.company}`,
    text: lines.join('\n'),
    html: `
      <h2>New HIMS buyer lead</h2>
      <p><strong>ID:</strong> ${escapeHtml(lead.id)}</p>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}<br/>
      <strong>Hospital / company:</strong> ${escapeHtml(lead.company)}<br/>
      <strong>Email:</strong> ${escapeHtml(lead.email)}<br/>
      <strong>Phone:</strong> ${escapeHtml(lead.phone || '—')}<br/>
      <strong>Source:</strong> ${escapeHtml(lead.source)}</p>
      <p>${escapeHtml(lead.message || 'No message provided.').replaceAll('\n', '<br/>')}</p>
    `,
  })
  console.log('[mailer] sent', info.messageId, 'to', config.leadNotificationEmails.join(', '))
}
