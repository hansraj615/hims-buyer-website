import { createHash, randomUUID } from 'node:crypto'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'
import { config } from '../config.js'
import { getDb } from '../db.js'
import type { LeadInput } from '../validation.js'
import { sendLeadNotification } from './mailer.js'

export type CreateLeadResult =
  | { ok: true; id: string; duplicate?: false }
  | { ok: true; duplicate: true }

function hashIp(ip: string | undefined): string | null {
  if (!ip) return null
  return createHash('sha256').update(ip).digest('hex').slice(0, 32)
}

async function findRecentLead(email: string): Promise<{ id: string } | undefined> {
  const since = new Date(Date.now() - config.duplicateWindowMinutes * 60_000)
  const [rows] = await getDb().execute<RowDataPacket[]>(
    `SELECT id FROM leads
     WHERE email = ? AND created_at >= ?
     ORDER BY created_at DESC
     LIMIT 1`,
    [email, since],
  )
  return rows[0] as { id: string } | undefined
}

export async function createLead(
  input: LeadInput,
  ip: string | undefined,
): Promise<CreateLeadResult> {
  const existing = await findRecentLead(input.email)
  if (existing) {
    return { ok: true, duplicate: true }
  }

  const lead = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    company: input.company,
    message: input.message ?? null,
    status: 'new',
    source: input.source,
    ipHash: hashIp(ip),
    createdAt: new Date(),
  }

  await getDb().execute<ResultSetHeader>(
    `INSERT INTO leads (
      id, name, email, phone, company, message, status, source, ip_hash, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.message,
      lead.status,
      lead.source,
      lead.ipHash,
      lead.createdAt,
    ],
  )

  // Later: enqueue CRM sync, autoresponder, UTM enrichment, admin workflow.
  await sendLeadNotification({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone ?? undefined,
    company: lead.company,
    message: lead.message ?? undefined,
    source: lead.source,
  })

  return { ok: true, id: lead.id }
}

export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'spam'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export type LeadRecord = {
  id: string
  name: string
  email: string
  phone: string | null
  company: string
  message: string | null
  status: string
  source: string | null
  created_at: string
}

function toLead(row: RowDataPacket): LeadRecord {
  const created = row.created_at
  return {
    id: String(row.id),
    name: String(row.name),
    email: String(row.email),
    phone: row.phone ? String(row.phone) : null,
    company: String(row.company),
    message: row.message ? String(row.message) : null,
    status: String(row.status),
    source: row.source ? String(row.source) : null,
    created_at: created instanceof Date ? created.toISOString() : String(created),
  }
}

export async function listLeads(filters: {
  status?: string
  q?: string
}): Promise<LeadRecord[]> {
  const where: string[] = []
  const params: Array<string> = []

  if (filters.status && LEAD_STATUSES.includes(filters.status as LeadStatus)) {
    where.push('status = ?')
    params.push(filters.status)
  }

  if (filters.q) {
    const like = `%${filters.q}%`
    where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR phone LIKE ?)')
    params.push(like, like, like, like)
  }

  const sql = `
    SELECT id, name, email, phone, company, message, status, source, created_at
    FROM leads
    ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    ORDER BY created_at DESC
    LIMIT 200
  `
  const [rows] = await getDb().execute<RowDataPacket[]>(sql, params)
  return rows.map(toLead)
}

export async function leadCounts(): Promise<Record<string, number>> {
  const [rows] = await getDb().execute<RowDataPacket[]>(
    'SELECT status, COUNT(*) AS count FROM leads GROUP BY status',
  )
  const counts: Record<string, number> = { total: 0 }
  for (const row of rows) {
    const count = Number(row.count)
    counts[String(row.status)] = count
    counts.total += count
  }
  return counts
}

export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<LeadRecord | undefined> {
  const [result] = await getDb().execute<ResultSetHeader>(
    'UPDATE leads SET status = ? WHERE id = ?',
    [status, id],
  )
  if (!result.affectedRows) return undefined

  const [rows] = await getDb().execute<RowDataPacket[]>(
    `SELECT id, name, email, phone, company, message, status, source, created_at
     FROM leads WHERE id = ? LIMIT 1`,
    [id],
  )
  return rows[0] ? toLead(rows[0]) : undefined
}
