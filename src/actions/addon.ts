'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import {
  addonCategories,
  addons,
  productAddonCategoryRelation,
} from '@/db/schema'
import { and, eq, sql } from 'drizzle-orm'
import { z } from 'zod'

import { productCategoriesWithAddonsSchema } from '@/lib/validations/product'
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

const schemaWithoutItems = productCategoriesWithAddonsSchema.omit({
  items: true,
})

export async function updateProductCategoryAddonsAction(
  inputs: z.infer<typeof schemaWithoutItems> & {
    productId: string
    storeId: string
  },
) {
  const categoryExist = await db.query.addonCategories.findFirst({
    where: eq(addonCategories.id, inputs.categoryId),
  })

  if (!categoryExist) {
    throw new Error('Not found')
  }

  await db
    .update(addonCategories)
    .set({
      name: inputs.name,
      quantityMax: inputs.quantityMax,
      quantityMin: inputs.quantityMin,
      productId: inputs.productId,
      active: inputs.active,
      mandatory: inputs.mandatory,
    })
    .where(eq(addonCategories.id, inputs.categoryId))

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${inputs.productId}/addons`,
  )
}

export async function addProductCategoryAddonsAction(
  productId: string,
  storeId: string,
) {
  const count = await db
    .select({ count: sql<number>`count(${addonCategories.id})` })
    .from(addonCategories)
    .where(eq(addonCategories.productId, productId))
    .then((res) => res[0].count ?? 0)

  await db.insert(addonCategories).values({
    name: `Category ${+count + 1}`,
    productId,
    active: true,
    mandatory: false,
    quantityMax: 1,
    quantityMin: 0,
  })

  revalidatePath(`/dashboard/${storeId}/products/${productId}/addons`)
}

export async function deleteProductCategoryAddonsAction(inputs: {
  productId: string
  storeId: string
  categoryId: string
}) {
  await db
    .delete(addonCategories)
    .where(eq(addonCategories.id, inputs.categoryId))

  await db
    .delete(productAddonCategoryRelation)
    .where(
      and(
        eq(productAddonCategoryRelation.addonCategoriesId, inputs.categoryId),
        eq(productAddonCategoryRelation.productId, inputs.productId),
      ),
    )

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${inputs.productId}/addons`,
  )
}
