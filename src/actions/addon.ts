'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { addons } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
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

  revalidatePath(`/dashboard/${inputs.storeId}/addons`)
}

export async function deleteAddonAction(inputs: {
  id: string
  storeId: string
}) {
  const product = await db.query.addons.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(addons.id, inputs.id), eq(addons.storeId, inputs.storeId)),
  })

  if (!product) {
    throw new Error('Addon not found.')
  }

  await db.delete(addons).where(eq(addons.id, inputs.id))

  revalidatePath(`/dashboard/${inputs.storeId}/addons`)
}

export async function updateAddonStatusAction({
  addonId,
}: {
  addonId: string
}) {
  const addonExist = await db.query.addons.findFirst({
    where: eq(addons.id, addonId),
  })

  if (!addonExist) {
    throw new Error('Product not found.')
  }

  await db
    .update(addons)
    .set({ active: !addonExist.active })
    .where(eq(addons.id, addonId))

  revalidatePath(`/dashboard/${addonExist.storeId}/addons`)
}
