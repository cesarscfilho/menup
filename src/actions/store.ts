'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { stores } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { storeSchema } from '@/lib/validations/store'

export async function createStoreAction(
  inputs: z.infer<typeof storeSchema> & {
    userId: string
  },
) {
  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, inputs.name),
  })

  if (storeWithSameName) {
    throw new Error('Store name already taken.')
  }

  await db.insert(stores).values({
    userId: inputs.userId,
    name: inputs.name,
    description: inputs.description,
  })

  revalidatePath('/dashboard')
}

export async function getStoresAction(userId: string) {
  const items = await db.select().from(stores).where(eq(stores.userId, userId))

  return items
}
