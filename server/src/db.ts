import mysql from 'mysql2/promise'
import { config } from './config.js'

let pool: mysql.Pool | null = null

function quoteIdent(name: string): string {
  if (!/^[A-Za-z0-9_]+$/.test(name)) {
    throw new Error(`Invalid database name: ${name}`)
  }
  return `\`${name}\``
}

export async function initDb(): Promise<void> {
  const { host, port, user, password, database } = config.db

  const admin = await mysql.createConnection({
    host,
    port,
    user,
    password,
    connectTimeout: 8000,
  })
  try {
    await admin.query(
      `CREATE DATABASE IF NOT EXISTS ${quoteIdent(database)}
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    )
  } catch (error) {
    console.warn(
      '[db] could not create database (will use the existing one):',
      error instanceof Error ? error.message : error,
    )
  } finally {
    await admin.end()
  }

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 8000,
    namedPlaceholders: false,
  })

  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id CHAR(36) NOT NULL,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(160) NOT NULL,
      phone VARCHAR(40) NULL,
      company VARCHAR(160) NOT NULL,
      message TEXT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'new',
      source VARCHAR(80) NULL,
      ip_hash VARCHAR(64) NULL,
      created_at DATETIME(3) NOT NULL,
      PRIMARY KEY (id),
      INDEX idx_leads_email_created (email, created_at),
      INDEX idx_leads_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
}

export function getDb(): mysql.Pool {
  if (!pool) {
    throw new Error('Database is not initialized')
  }
  return pool
}
