import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
dotenv.config({ path: path.join(rootDir, '.env') })

function env(name: string, fallback = ''): string {
  return (process.env[name] ?? fallback).trim()
}

function envInt(name: string, fallback: number): number {
  const raw = env(name)
  const value = raw ? Number(raw) : fallback
  return Number.isFinite(value) ? value : fallback
}

function envBool(name: string, fallback: boolean): boolean {
  const raw = env(name).toLowerCase()
  if (!raw) return fallback
  return raw === '1' || raw === 'true' || raw === 'yes'
}

const smtpPort = envInt('SMTP_PORT', 465)

export const config = {
  rootDir,
  nodeEnv: env('NODE_ENV', 'production'),
  port: envInt('PORT', 5181),
  host: env('HOST', '0.0.0.0'),
  corsOrigin: env('CORS_ORIGIN', 'http://127.0.0.1:5180'),
  publicDir: path.join(rootDir, 'dist'),
  db: {
    host: env('DB_HOST', '127.0.0.1'),
    port: envInt('DB_PORT', 3306),
    user: env('DB_USERNAME', 'root'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE', 'hims_buyer'),
  },
  smtp: {
    host: env('SMTP_HOST'),
    port: smtpPort,
    secure: envBool('SMTP_SECURE', smtpPort === 465),
    user: env('SMTP_USER'),
    password: env('SMTP_PASSWORD'),
    from: env('SMTP_FROM', env('SMTP_USER', 'HIMS Sales <hello@trinovustech.com>')),
  },
  leadNotificationEmail: env('LEAD_NOTIFICATION_EMAIL', 'hello@trinovustech.com'),
  leadNotificationEmails: env('LEAD_NOTIFICATION_EMAIL', 'hello@trinovustech.com')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
  duplicateWindowMinutes: envInt('LEAD_DUPLICATE_WINDOW_MINUTES', 10),
  adminPassword: env('ADMIN_PASSWORD'),
  adminSessionHours: envInt('ADMIN_SESSION_HOURS', 12),
}

export const isProduction = config.nodeEnv === 'production'
