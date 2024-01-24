'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { categorySchema } from '@/lib/validations/category'

export async function createCategoryAction(
  inputs: z.infer<typeof categorySchema> & {
    storeId: number
  },
) {
  const categoryWithSameName = await db.query.categories.findFirst({
    where: and(
      eq(categories.name, inputs.name),
      eq(categories.storeId, inputs.storeId),
    ),
  })

  if (categoryWithSameName) {
    throw new Error('Categoru name already taken.')
  }

  await db.insert(categories).values({
    name: inputs.name,
    storeId: inputs.storeId,
  })

  revalidatePath('/products')
}
