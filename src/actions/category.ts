'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { categorySchema } from '@/lib/validations/category'

export async function createCategoryAction(
  inputs: z.infer<typeof categorySchema> & {
    storeId: string
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

export async function deleteCategoryAction(categoryId: string) {
  const categoryExist = await db.query.categories.findFirst({
    where: eq(categories.id, categoryId),
  })

  if (!categoryExist) {
    throw new Error('Category not found.')
  }

  await db.delete(categories).where(eq(categories.id, categoryId))

  revalidatePath('/products')
}
