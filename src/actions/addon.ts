'use server'

import { db } from '@/db'
import { addons } from '@/db/schema'
import { z } from 'zod'

import { addonsSchema } from '@/lib/validations/variant'

export async function createAddonsAction(
  inputs: z.infer<typeof addonsSchema> & {
    storeId: string
  },
) {
  await db.insert(addons).values({
    name: inputs.name,
    price: inputs.price,
    storeId: inputs.storeId,
  })
}
