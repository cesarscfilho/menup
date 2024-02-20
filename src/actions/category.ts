'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { categorySchema, getCategorySchema } from '@/lib/validations/category'

const categorySchemaWithStoreId = categorySchema.extend({
  storeId: z.string(),
})

export async function createCategory(
  inputs: z.infer<typeof categorySchemaWithStoreId>,
) {
  const categoryWithSameName = await db.query.categories.findFirst({
    where: and(
      eq(categories.name, inputs.name),
      eq(categories.storeId, inputs.storeId),
    ),
  })

  if (categoryWithSameName) {
    throw new Error('Category name already taken.')
  }

  await db.insert(categories).values({
    name: inputs.name,
    storeId: inputs.storeId,
  })

  revalidatePath('/products')
}

export async function deleteCategory(
  inputs: z.infer<typeof getCategorySchema>,
) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, inputs.id),
  })

  if (!category) {
    throw new Error('Category not found.')
  }

  await db.delete(categories).where(eq(categories.id, inputs.id))

  revalidatePath('/products')
}
