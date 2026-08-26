import { useState, type FormEvent } from 'react'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const hospital = String(data.get('hospital') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    const subject = encodeURIComponent(`HIMS demo — ${hospital || name || 'inquiry'}`)
    const body = encodeURIComponent(
      [`Name: ${name}`, `Hospital: ${hospital}`, `Email: ${email}`, '', message].join('\n'),
    )

    window.location.href = `mailto:sales@hims.example?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input name="name" placeholder="Your name" required />
      <input name="hospital" placeholder="Hospital / clinic name" required />
      <input name="email" placeholder="Work email" required type="email" />
      <textarea name="message" placeholder="Beds, branches, modules you care about…" rows={4} />
      <button className="btn btn-primary" type="submit">
        Request demo details
      </button>
      {sent ? <p className="form-note">Opening your email app with the enquiry draft…</p> : null}
    </form>
  )
}
