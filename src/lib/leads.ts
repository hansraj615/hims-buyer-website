const API_BASE = import.meta.env.VITE_API_URL ?? ''

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  hospital: string
  message?: string
  website?: string
  hp?: string
  source?: string
}

export type LeadResponse = {
  ok: boolean
  id?: string
  duplicate?: boolean
  message?: string
  error?: string
  fields?: Record<string, string>
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json().catch(() => null)) as LeadResponse | null
  if (!data) {
    throw new Error('Could not reach the sales desk. Please try again.')
  }

  if (!response.ok && !data.ok) {
    const error = new Error(data.message || 'Could not send your enquiry.') as Error & {
      fields?: Record<string, string>
      status: number
    }
    error.fields = data.fields
    error.status = response.status
    throw error
  }

  return data
}
