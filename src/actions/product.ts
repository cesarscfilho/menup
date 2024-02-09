'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { products } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { productSchema } from '@/lib/validations/product'

export async function createProductAction(
  inputs: z.infer<typeof productSchema> & {
    storeId: string
  },
) {
  const productWithSameName = await db.query.products.findFirst({
    where: and(
      eq(products.name, inputs.name),
      eq(products.storeId, inputs.storeId),
    ),
  })

  console.log(productWithSameName)

  if (productWithSameName) {
    throw new Error('Product name already taken.')
  }

  await db.insert(products).values({
    ...inputs,
    storeId: inputs.storeId,
  })

  const path = `/dashboard/${inputs.storeId}/products`
  revalidatePath(path)
}

export async function deleteProductAction(inputs: {
  id: string
  storeId: string
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

export async function updateProductStatusAction({
  productId,
}: {
  productId: string
}) {
  const productExist = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!productExist) {
    throw new Error('Product not found.')
  }

  await db
    .update(products)
    .set({ active: !productExist.active })
    .where(eq(products.id, productId))

  revalidatePath(`/dashboard/${productExist.storeId}/products`)
}
