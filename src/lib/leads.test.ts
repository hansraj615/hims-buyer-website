import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitLead } from './leads'

describe('submitLead', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns a saved lead on HTTP 201', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 201,
        json: async () => ({ ok: true, id: 'lead-1', message: 'Thanks' }),
      }),
    )
    await expect(
      submitLead({ name: 'Asha', email: 'asha@hospital.in', hospital: 'City Clinic' }),
    ).resolves.toEqual({ ok: true, id: 'lead-1', message: 'Thanks' })
  })

  it('returns duplicates without throwing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true, duplicate: true, message: 'already' }),
      }),
    )
    await expect(
      submitLead({ name: 'Asha', email: 'asha@hospital.in', hospital: 'City Clinic' }),
    ).resolves.toMatchObject({ ok: true, duplicate: true })
  })

  it('throws on unsuccessful API JSON even if HTTP looks odd', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ ok: false, error: 'validation', message: 'Enter a valid work email' }),
      }),
    )
    await expect(
      submitLead({ name: 'Asha', email: 'bad', hospital: 'City Clinic' }),
    ).rejects.toThrow('Enter a valid work email')
  })

  it('throws when HTTP is OK but the payload is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: false, error: 'server', message: 'Could not send' }),
      }),
    )
    await expect(
      submitLead({ name: 'Asha', email: 'asha@hospital.in', hospital: 'City Clinic' }),
    ).rejects.toThrow('Could not send')
  })

  it('throws on network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    await expect(
      submitLead({ name: 'Asha', email: 'asha@hospital.in', hospital: 'City Clinic' }),
    ).rejects.toThrow('Failed to fetch')
  })
})
