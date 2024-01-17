'use server'

import { db } from '@/db'
import { stores } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getStoresAction(userId: string) {
  const items = await db.select().from(stores).where(eq(stores.userId, userId))

  return items
}
