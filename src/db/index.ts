import { env } from '@/env.mjs'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

const connection = neon(env.DATABASE_URL)

export const db = drizzle(connection, { schema })
