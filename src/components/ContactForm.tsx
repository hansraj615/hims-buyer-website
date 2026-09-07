import { useState, type FormEvent } from 'react'
import { useLocale } from '../i18n/useLocale'
import { submitLead } from '../lib/leads'

type FormStatus = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error'

type ContactFormProps = {
  source?: string
}

export function ContactForm({ source = 'buyer-website' }: ContactFormProps) {
  const { locale, t } = useLocale()
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
        source: `${source}:${locale}`,
      })

      form.reset()
      if (result.duplicate) {
        setStatus('duplicate')
        setMessage(result.message || t.form.duplicate)
        return
      }

      setStatus('success')
      setMessage(result.message || t.form.thanks)
    } catch (error) {
      const fields = (error as { fields?: Record<string, string> }).fields
      setFieldErrors(fields ?? {})
      setStatus('error')
      setMessage(error instanceof Error ? error.message : t.form.error)
    }
  }

  const disabled = status === 'submitting'
  const noteClass =
    status === 'error' ? 'form-note form-note-error' : status === 'idle' ? 'form-note' : 'form-note form-note-ok'

  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="form-hp" aria-hidden="true">
        {t.form.hp}
        <input name="hp" tabIndex={-1} autoComplete="off" />
      </label>
      <input name="name" placeholder={t.form.name} required autoComplete="name" disabled={disabled} />
      {fieldErrors.name ? <p className="form-field-error">{fieldErrors.name}</p> : null}
      <input
        name="hospital"
        placeholder={t.form.hospital}
        required
        autoComplete="organization"
        disabled={disabled}
      />
      {fieldErrors.hospital ? <p className="form-field-error">{fieldErrors.hospital}</p> : null}
      <input name="email" placeholder={t.form.email} required type="email" autoComplete="email" disabled={disabled} />
      {fieldErrors.email ? <p className="form-field-error">{fieldErrors.email}</p> : null}
      <input name="phone" placeholder={t.form.phone} type="tel" autoComplete="tel" disabled={disabled} />
      {fieldErrors.phone ? <p className="form-field-error">{fieldErrors.phone}</p> : null}
      <textarea name="message" placeholder={t.form.message} rows={4} disabled={disabled} />
      {fieldErrors.message ? <p className="form-field-error">{fieldErrors.message}</p> : null}
      <button className="btn btn-primary" type="submit" disabled={disabled}>
        {disabled ? t.form.sending : t.form.submit}
      </button>
      {message ? <p className={noteClass}>{message}</p> : null}
    </form>
  )
}
