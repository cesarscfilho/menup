'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { products } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
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

  const path = `/dashboard/${inputs.storeId}/products`
  revalidatePath(path)
}

export async function deleteProductAction(inputs: {
  id: number
  storeId: number
}) {
  const product = await db.query.products.findFirst({
    columns: {
      id: true,
    },
    where: and(
      eq(products.id, inputs.id),
      eq(products.storeId, inputs.storeId),
    ),
  })

  if (!product) {
    throw new Error('Product not found.')
  }

  await db.delete(products).where(eq(products.id, inputs.id))

  revalidatePath(`/dashboard/${inputs.storeId}/products`)
}
