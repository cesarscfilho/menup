'use server'

import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { productSchema } from '@/lib/validations/product'

export async function createProductAction(
  inputs: z.infer<typeof productSchema> & {
    storeId: number
  },
) {
  const productWithSameName = await db.query.products.findFirst({
    where: eq(products.name, inputs.name),
  })

  if (productWithSameName) {
    throw new Error('Product name already taken.')
  }

  await db.insert(products).values({
    categoryId: Number(inputs.categoryId),
    name: inputs.name,
    storeId: inputs.storeId,
    description: inputs.description,
  })
}
