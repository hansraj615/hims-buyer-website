const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })
}

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

export type LeadsPayload = {
  ok: boolean
  leads: LeadRecord[]
  counts: Record<string, number>
  message?: string
}

export async function checkAdminSession(): Promise<boolean> {
  const response = await adminFetch('/api/admin/session')
  return response.ok
}

export async function adminLogin(password: string): Promise<void> {
  const response = await adminFetch('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
  const data = (await response.json().catch(() => null)) as { message?: string } | null
  if (!response.ok) {
    throw new Error(data?.message || 'Could not sign in.')
  }
}

export async function adminLogout(): Promise<void> {
  await adminFetch('/api/admin/logout', { method: 'POST' })
}

export async function fetchLeads(filters: { status?: string; q?: string } = {}): Promise<LeadsPayload> {
  const params = new URLSearchParams()
  if (filters.status) params.set('status', filters.status)
  if (filters.q) params.set('q', filters.q)
  const query = params.toString()
  const response = await adminFetch(`/api/admin/leads${query ? `?${query}` : ''}`)
  const data = (await response.json().catch(() => null)) as LeadsPayload | null
  if (!response.ok || !data?.ok) {
    throw new Error(data?.message || 'Could not load leads.')
  }
  return data
}

export async function updateLeadStatus(id: string, status: string): Promise<LeadRecord> {
  const response = await adminFetch(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
  const data = (await response.json().catch(() => null)) as {
    ok?: boolean
    lead?: LeadRecord
    message?: string
  } | null
  if (!response.ok || !data?.lead) {
    throw new Error(data?.message || 'Could not update lead.')
  }
  return data.lead
}
