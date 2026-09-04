import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  adminLogin,
  adminLogout,
  checkAdminSession,
  fetchLeads,
  updateLeadStatus,
  type LeadRecord,
} from '../lib/admin'

const STATUSES = ['new', 'contacted', 'qualified', 'closed', 'spam'] as const

function formatWhen(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function AdminPage() {
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [signingIn, setSigningIn] = useState(false)

  const [statusFilter, setStatusFilter] = useState('')
  const [query, setQuery] = useState('')
  const [leads, setLeads] = useState<LeadRecord[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loadError, setLoadError] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = useMemo(
    () => leads.find((lead) => lead.id === selectedId) ?? null,
    [leads, selectedId],
  )

  async function load(nextStatus = statusFilter, nextQuery = query) {
    const data = await fetchLeads({
      status: nextStatus || undefined,
      q: nextQuery.trim() || undefined,
    })
    setLeads(data.leads)
    setCounts(data.counts)
    setLoadError('')
  }

  useEffect(() => {
    document.title = 'HIMS leads'
    checkAdminSession()
      .then(async (ok) => {
        setAuthed(ok)
        if (ok) await load()
      })
      .catch(() => setAuthed(false))
      .finally(() => setReady(true))
  }, [])

  const onLogin = async (event: FormEvent) => {
    event.preventDefault()
    setSigningIn(true)
    setLoginError('')
    try {
      await adminLogin(password)
      setPassword('')
      setAuthed(true)
      await load()
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Could not sign in.')
    } finally {
      setSigningIn(false)
    }
  }

  const onLogout = async () => {
    await adminLogout()
    setAuthed(false)
    setLeads([])
    setSelectedId(null)
  }

  const onStatusChange = async (id: string, status: string) => {
    const updated = await updateLeadStatus(id, status)
    setLeads((current) => current.map((lead) => (lead.id === id ? updated : lead)))
    const data = await fetchLeads({
      status: statusFilter || undefined,
      q: query.trim() || undefined,
    })
    setCounts(data.counts)
  }

  if (!ready) {
    return (
      <main className="admin">
        <p className="admin-muted">Loading…</p>
      </main>
    )
  }

  if (!authed) {
    return (
      <main className="admin admin-login">
        <form className="admin-card" onSubmit={onLogin}>
          <p className="admin-kicker">Internal</p>
          <h1>HIMS leads</h1>
          <p>Sign in to review demo requests from the buyer website.</p>
          <input
            type="password"
            name="password"
            placeholder="Admin password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          <button className="btn btn-primary" type="submit" disabled={signingIn}>
            {signingIn ? 'Signing in…' : 'Open dashboard'}
          </button>
          {loginError ? <p className="admin-error">{loginError}</p> : null}
        </form>
      </main>
    )
  }

  return (
    <div className="admin">
      <header className="admin-top">
        <div className="brand">
          <span className="brand-mark">+</span>
          HIMS leads
        </div>
        <button className="btn btn-ghost" type="button" onClick={onLogout}>
          Sign out
        </button>
      </header>

      <section className="admin-stats">
        <article>
          <strong>{counts.total ?? 0}</strong>
          <span>Total</span>
        </article>
        {STATUSES.map((status) => (
          <article key={status}>
            <strong>{counts[status] ?? 0}</strong>
            <span>{status}</span>
          </article>
        ))}
      </section>

      <section className="admin-toolbar">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void load()
          }}
          placeholder="Search name, hospital, email…"
        />
        <select
          value={statusFilter}
          onChange={(event) => {
            const value = event.target.value
            setStatusFilter(value)
            void load(value, query)
          }}
        >
          <option value="">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" type="button" onClick={() => void load()}>
          Search
        </button>
      </section>

      {loadError ? <p className="admin-error">{loadError}</p> : null}

      <div className="admin-layout">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>When</th>
                <th>Name</th>
                <th>Hospital</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="admin-muted">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={lead.id === selectedId ? 'is-selected' : undefined}
                    onClick={() => setSelectedId(lead.id)}
                  >
                    <td>{formatWhen(lead.created_at)}</td>
                    <td>{lead.name}</td>
                    <td>{lead.company}</td>
                    <td>{lead.email}</td>
                    <td>
                      <select
                        className={`admin-status is-${lead.status}`}
                        value={lead.status}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => void onStatusChange(lead.id, event.target.value)}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <aside className="admin-detail">
          {selected ? (
            <>
              <p className="admin-kicker">Enquiry</p>
              <h2>{selected.name}</h2>
              <p>{selected.company}</p>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    {selected.phone ? <a href={`tel:${selected.phone}`}>{selected.phone}</a> : '—'}
                  </dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{selected.source || '—'}</dd>
                </div>
                <div>
                  <dt>Received</dt>
                  <dd>{formatWhen(selected.created_at)}</dd>
                </div>
              </dl>
              <p className="admin-message">{selected.message || 'No message provided.'}</p>
            </>
          ) : (
            <p className="admin-muted">Select a lead to read the full enquiry.</p>
          )}
        </aside>
      </div>
    </div>
  )
}
