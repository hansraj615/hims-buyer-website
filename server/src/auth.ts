import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'
import { config, isProduction } from './config.js'

export const ADMIN_COOKIE = 'buyer_admin'
const SESSION_MS = config.adminSessionHours * 60 * 60 * 1000

function sessionSecret(): string {
  return createHash('sha256').update(`hims-buyer-admin:${config.adminPassword}`).digest('hex')
}

function readCookie(header: string | undefined, name: string): string | undefined {
  if (!header) return undefined
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return undefined
}

export function passwordsMatch(input: string, expected: string): boolean {
  const left = createHash('sha256').update(input).digest()
  const right = createHash('sha256').update(expected).digest()
  return timingSafeEqual(left, right)
}

export function createSessionToken(): string {
  const exp = Date.now() + SESSION_MS
  const sig = createHmac('sha256', sessionSecret()).update(String(exp)).digest('hex')
  return `${exp}.${sig}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !config.adminPassword) return false
  const [expRaw, sig] = token.split('.')
  const exp = Number(expRaw)
  if (!expRaw || !sig || !Number.isFinite(exp) || exp < Date.now()) return false
  const expected = createHmac('sha256', sessionSecret()).update(String(exp)).digest('hex')
  const left = Buffer.from(sig)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}

export function setAdminCookie(res: Response, token: string): void {
  res.cookie(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
    path: '/',
    maxAge: SESSION_MS,
  })
}

export function clearAdminCookie(res: Response): void {
  res.clearCookie(ADMIN_COOKIE, { path: '/' })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!config.adminPassword) {
    res.status(503).json({
      ok: false,
      error: 'admin_disabled',
      message: 'Set ADMIN_PASSWORD to enable the leads dashboard.',
    })
    return
  }

  if (!verifySessionToken(readCookie(req.headers.cookie, ADMIN_COOKIE))) {
    res.status(401).json({ ok: false, error: 'unauthorized' })
    return
  }

  next()
}
