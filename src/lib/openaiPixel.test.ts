import { afterEach, describe, expect, it, vi } from 'vitest'
import { isAcceptedNewLead, measureAcceptedLead, OPENAI_LEAD_EVENT } from './openaiPixel'

describe('isAcceptedNewLead', () => {
  it('accepts a saved enquiry with an id', () => {
    expect(isAcceptedNewLead({ ok: true, id: 'lead-1' })).toBe(true)
  })

  it('rejects duplicates', () => {
    expect(isAcceptedNewLead({ ok: true, duplicate: true, message: 'already' })).toBe(false)
  })

  it('rejects honeypot or empty success without an id', () => {
    expect(isAcceptedNewLead({ ok: true })).toBe(false)
  })

  it('rejects unsuccessful API payloads', () => {
    expect(isAcceptedNewLead({ ok: false, error: 'validation' })).toBe(false)
  })
})

describe('measureAcceptedLead', () => {
  afterEach(() => {
    delete window.oaiq
    vi.restoreAllMocks()
  })

  it('emits one lead_created event with event_id and no PII', () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    measureAcceptedLead({ ok: true, id: 'lead-1', message: 'Thanks' })
    expect(oaiq).toHaveBeenCalledTimes(1)
    expect(oaiq).toHaveBeenCalledWith(
      'measure',
      OPENAI_LEAD_EVENT,
      { type: 'customer_action' },
      { event_id: 'lead-1' },
    )
    const serialized = JSON.stringify(oaiq.mock.calls[0])
    expect(serialized).not.toMatch(/@|phone|hospital/i)
  })

  it('does not emit for duplicates', () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    measureAcceptedLead({ ok: true, duplicate: true })
    expect(oaiq).not.toHaveBeenCalled()
  })

  it('does not emit when the SDK is missing', () => {
    expect(() => measureAcceptedLead({ ok: true, id: 'lead-1' })).not.toThrow()
  })

  it('does not throw when the pixel throws', () => {
    window.oaiq = () => {
      throw new Error('pixel down')
    }
    expect(() => measureAcceptedLead({ ok: true, id: 'lead-1' })).not.toThrow()
  })

  it('does not emit twice for two calls unless two new leads exist', () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    measureAcceptedLead({ ok: true, id: 'lead-1' })
    measureAcceptedLead({ ok: true, id: 'lead-1' })
    expect(oaiq).toHaveBeenCalledTimes(2)
  })
})
