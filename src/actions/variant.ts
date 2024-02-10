'use server'

import { db } from '@/db'
import { productsVariants, variants } from '@/db/schema'
import { z } from 'zod'

import { variantSchema } from '@/lib/validations/variant'

export async function createVariantAction(
  inputs: z.infer<typeof variantSchema> & {
    storeId: string
  },
) {
  await db.insert(variants).values({
    name: inputs.name,
    price: inputs.price,
    storeId: inputs.storeId,
  })
}

export async function createProductVariantAction(inputs: {
  productId: string
  variantId: string
}) {
  await db.insert(productsVariants).values({
    productId: inputs.productId,
    variantId: inputs.variantId,
  })
}
