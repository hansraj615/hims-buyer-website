import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ContactForm } from './ContactForm'
import { submitLead } from '../lib/leads'

vi.mock('../lib/leads', () => ({
  submitLead: vi.fn(),
}))

const mockedSubmitLead = vi.mocked(submitLead)

function renderForm() {
  return render(
    <MemoryRouter>
      <ContactForm source="test" />
    </MemoryRouter>,
  )
}

async function fillAndSubmit() {
  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText('Your name'), 'Asha Rao')
  await user.type(screen.getByPlaceholderText('Hospital / clinic name'), 'City Clinic')
  await user.type(screen.getByPlaceholderText('Work email'), 'asha@hospital.in')
  await user.click(screen.getByRole('button', { name: /request demo details/i }))
  return user
}

describe('ContactForm conversion tracking', () => {
  beforeEach(() => {
    mockedSubmitLead.mockReset()
    delete window.oaiq
  })

  afterEach(() => {
    cleanup()
  })

  it('fires one conversion after a saved enquiry', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockResolvedValue({ ok: true, id: 'lead-1', message: 'Thanks — we received your enquiry and will get back to you.' })

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText(/we received your enquiry/i)).toBeInTheDocument())
    expect(oaiq).toHaveBeenCalledTimes(1)
    expect(oaiq).toHaveBeenCalledWith(
      'measure',
      'lead_created',
      { type: 'customer_action' },
      { event_id: 'lead-1' },
    )
  })

  it('does not fire conversion for a duplicate enquiry', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockResolvedValue({
      ok: true,
      duplicate: true,
      message: 'We already received your enquiry recently. Our team will reply shortly.',
    })

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText(/already received your enquiry/i)).toBeInTheDocument())
    expect(oaiq).not.toHaveBeenCalled()
  })

  it('does not fire conversion when the API rejects the enquiry', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockRejectedValue(Object.assign(new Error('Enter a valid work email'), { fields: { email: 'Enter a valid work email' } }))

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getAllByText('Enter a valid work email').length).toBeGreaterThan(0))
    expect(oaiq).not.toHaveBeenCalled()
  })

  it('does not fire conversion on a network error', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockRejectedValue(new TypeError('Failed to fetch'))

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText('Failed to fetch')).toBeInTheDocument())
    expect(oaiq).not.toHaveBeenCalled()
  })

  it('still shows success when the pixel SDK is missing', async () => {
    mockedSubmitLead.mockResolvedValue({ ok: true, id: 'lead-1', message: 'Thanks — we received your enquiry and will get back to you.' })

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText(/we received your enquiry/i)).toBeInTheDocument())
  })

  it('does not turn a saved enquiry into a form error when the pixel throws', async () => {
    window.oaiq = () => {
      throw new Error('pixel down')
    }
    mockedSubmitLead.mockResolvedValue({ ok: true, id: 'lead-1', message: 'Thanks — we received your enquiry and will get back to you.' })

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText(/we received your enquiry/i)).toBeInTheDocument())
    expect(screen.queryByText(/could not send/i)).not.toBeInTheDocument()
  })

  it('does not fire conversion for a honeypot success without an id', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockResolvedValue({ ok: true })

    renderForm()
    await fillAndSubmit()

    await waitFor(() => expect(screen.getByText(/thanks/i)).toBeInTheDocument())
    expect(oaiq).not.toHaveBeenCalled()
  })

  it('fires one conversion per successful submit, not extra events from re-renders', async () => {
    const oaiq = vi.fn()
    window.oaiq = oaiq
    mockedSubmitLead.mockResolvedValue({ ok: true, id: 'lead-1', message: 'Thanks — we received your enquiry and will get back to you.' })

    const { rerender } = renderForm()
    await fillAndSubmit()
    await waitFor(() => expect(screen.getByText(/we received your enquiry/i)).toBeInTheDocument())

    rerender(
      <MemoryRouter>
        <ContactForm source="test" />
      </MemoryRouter>,
    )

    expect(oaiq).toHaveBeenCalledTimes(1)
  })
})
