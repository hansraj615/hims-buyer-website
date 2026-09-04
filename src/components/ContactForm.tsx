import { useState, type FormEvent } from 'react'
import { submitLead } from '../lib/leads'

type FormStatus = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('submitting')
    setFieldErrors({})
    setMessage('')

    try {
      const result = await submitLead({
        name: String(data.get('name') || '').trim(),
        hospital: String(data.get('hospital') || '').trim(),
        email: String(data.get('email') || '').trim(),
        phone: String(data.get('phone') || '').trim() || undefined,
        message: String(data.get('message') || '').trim() || undefined,
        hp: String(data.get('hp') || '').trim() || undefined,
        source: 'buyer-website',
      })

      form.reset()
      if (result.duplicate) {
        setStatus('duplicate')
        setMessage(result.message || 'We already have your enquiry and will reply shortly.')
        return
      }

      setStatus('success')
      setMessage(result.message || 'Thanks — we received your enquiry and will get back to you.')
    } catch (error) {
      const fields = (error as { fields?: Record<string, string> }).fields
      setFieldErrors(fields ?? {})
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Could not send your enquiry. Please email hello@trinovustech.com.',
      )
    }
  }

  const disabled = status === 'submitting'
  const noteClass =
    status === 'error' ? 'form-note form-note-error' : status === 'idle' ? 'form-note' : 'form-note form-note-ok'

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="form-hp" aria-hidden="true">
        Leave blank
        <input name="hp" tabIndex={-1} autoComplete="off" />
      </label>
      <input name="name" placeholder="Your name" required autoComplete="name" disabled={disabled} />
      {fieldErrors.name ? <p className="form-field-error">{fieldErrors.name}</p> : null}
      <input
        name="hospital"
        placeholder="Hospital / clinic name"
        required
        autoComplete="organization"
        disabled={disabled}
      />
      {fieldErrors.hospital ? <p className="form-field-error">{fieldErrors.hospital}</p> : null}
      <input name="email" placeholder="Work email" required type="email" autoComplete="email" disabled={disabled} />
      {fieldErrors.email ? <p className="form-field-error">{fieldErrors.email}</p> : null}
      <input name="phone" placeholder="Phone (optional)" type="tel" autoComplete="tel" disabled={disabled} />
      {fieldErrors.phone ? <p className="form-field-error">{fieldErrors.phone}</p> : null}
      <textarea
        name="message"
        placeholder="Beds, branches, modules you care about…"
        rows={4}
        disabled={disabled}
      />
      {fieldErrors.message ? <p className="form-field-error">{fieldErrors.message}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={disabled}>
        {disabled ? 'Sending…' : 'Request demo details'}
      </button>
      {message ? <p className={noteClass}>{message}</p> : null}
    </form>
  )
}
