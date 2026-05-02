/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'node:fs'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const getCandidateCentralEnvPaths = () => {
  const cwd = process.cwd()

  return [
    path.resolve(cwd, 'packages/database/.env'),
    path.resolve(cwd, '../packages/database/.env'),
    path.resolve(cwd, '../../packages/database/.env'),
    path.resolve(cwd, '../../../packages/database/.env'),
  ]
}

const readDotenvValue = (filePath: string, key: string) => {
  if (!fs.existsSync(filePath)) return undefined

  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) continue
    if (!trimmed.startsWith(`${key}=`)) continue

    let value = trimmed.slice(key.length + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    return value
  }

  return undefined
}

const getCentralDatabaseUrl = () => {
  for (const envPath of getCandidateCentralEnvPaths()) {
    const dbUrl = readDotenvValue(envPath, 'DATABASE_URL')
    if (dbUrl) {
      return { envPath, dbUrl }
    }
  }

  return undefined
}

const redactConnectionString = (value: string) => {
  try {
    const parsed = new URL(value)
    if (parsed.password) parsed.password = '***'
    return parsed.toString()
  } catch {
    return '<invalid DATABASE_URL format>'
  }
}

const centralDatabase = getCentralDatabaseUrl()

if (centralDatabase) {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL !== centralDatabase.dbUrl) {
    console.warn(
      `[db] DATABASE_URL mismatch detected. Using central env from ${centralDatabase.envPath}.`,
    )
  }

  process.env.DATABASE_URL = centralDatabase.dbUrl
}

if (!process.env.DATABASE_URL) {
  console.error(
    '[db] Missing DATABASE_URL. Define it in packages/database/.env (preferred) or app .env file.',
  )
}

// Create a connection pool with proper timeout settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 10000, // Return an error after 10 seconds if connection could not be established
})

let didRunStartupDbCheck = false

const runStartupDatabaseCheck = () => {
  if (didRunStartupDbCheck) return
  didRunStartupDbCheck = true

  if (process.env.NODE_ENV !== 'development') return

  if (!process.env.DATABASE_URL) return

  void pool.query('SELECT 1').catch((error: any) => {
    const message = error?.message ?? 'Unknown error'
    const looksLikeAuthError = /P1000|password authentication failed|authentication failed/i.test(message)

    if (looksLikeAuthError) {
      console.error('[db] Prisma startup check: database authentication failed.')
      console.error(`[db] Active DATABASE_URL: ${redactConnectionString(process.env.DATABASE_URL ?? '')}`)

      if (centralDatabase?.envPath) {
        console.error(`[db] Central env source: ${centralDatabase.envPath}`)
      }

      console.error('[db] Fix: regenerate DB credentials and update DATABASE_URL in packages/database/.env.')
    } else {
      console.error(`[db] Prisma startup check failed: ${message}`)
    }
  })
}

runStartupDatabaseCheck()

const adapter = new PrismaPg(pool)

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
  log: ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;

