import type { LeadResponse } from './leads'

export const OPENAI_LEAD_EVENT = 'lead_created' as const

type OpenAiQueue = (...args: unknown[]) => void

declare global {
  interface Window {
    oaiq?: OpenAiQueue
  }
}

export function isAcceptedNewLead(result: LeadResponse): boolean {
  return Boolean(result.ok && result.id && !result.duplicate)
}

export function measureAcceptedLead(result: LeadResponse): void {
  if (!isAcceptedNewLead(result)) return

  try {
    window.oaiq?.('measure', OPENAI_LEAD_EVENT, { type: 'customer_action' }, { event_id: result.id })
  } catch {
    // Measurement must never change lead-form success.
  }
}
