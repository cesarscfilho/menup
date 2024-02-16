'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { addons, addonsCategory, productsCategoryAddons } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { updateAddonSchema } from '@/lib/validations/addon'

export async function updateAddonCategoryStatusAction(inputs: {
  addonCategoryId: string
  storeId: string
}) {
  const addonCategoryExist = await db.query.addonsCategory.findFirst({
    where: eq(addonsCategory.id, inputs.addonCategoryId),
  })

  if (!addonCategoryExist) {
    throw new Error('Addon Category not found!')
  }

  await db
    .update(addonsCategory)
    .set({ active: !addonCategoryExist.active })
    .where(eq(addonsCategory.id, inputs.addonCategoryId))

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${addonCategoryExist.productId}/addons`,
  )
}

export async function deleteAddonCategoryAction(inputs: {
  addonCategoryId: string
  storeId: string
}) {
  const addonCategoryExist = await db.query.addonsCategory.findFirst({
    where: eq(addonsCategory.id, inputs.addonCategoryId),
  })

  if (!addonCategoryExist) {
    throw new Error('Addon category not found!')
  }

  await db
    .delete(addonsCategory)
    .where(eq(addonsCategory.id, inputs.addonCategoryId))

  // delete all relationships with a deleted category
  await db
    .delete(productsCategoryAddons)
    .where(eq(productsCategoryAddons.addonsCategoryId, inputs.addonCategoryId))

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${addonCategoryExist.productId}/addons`,
  )
}

export async function updateAddonCategoryAction({
  inputs,
}: {
  inputs: z.infer<typeof updateAddonSchema> & {
    storeId: string
    productId: string
  }
}) {
  const { items, storeId, productId } = inputs

  Object.values(items).map(async (category) => {
    const categoryExist = await db.query.addonsCategory.findFirst({
      where: eq(addonsCategory.id, category.categoryId),
    })

    if (!categoryExist) {
      await db.insert(addonsCategory).values({
        id: category.categoryId,
        name: category.name,
        productId,
        active: category.active,
        mandatory: category.mandatory,
        quantityMax: category.quantityMax,
        quantityMin: category.quantityMin,
      })
    }

    category.categoryAddons.map(async (addon) => {
      const addonExist = await db.query.addons.findFirst({
        where: eq(addons.id, addon.id),
      })

      if (!addonExist) {
        await db.insert(addons).values({ ...addon, storeId })
      }

      await db.update(addons).set(addon).where(eq(addons.id, addon.id))

      const relationProductsCategoryAddonsExist =
        await db.query.productsCategoryAddons.findFirst({
          where: and(
            eq(productsCategoryAddons.addonsCategoryId, category.categoryId),
            eq(productsCategoryAddons.addonsId, addon.id),
          ),
        })

      if (!relationProductsCategoryAddonsExist) {
        await db.insert(productsCategoryAddons).values({
          addonsCategoryId: category.categoryId,
          addonsId: addon.id,
          productId,
        })
      }
    })
  })

  revalidatePath(`/dashboard/${storeId}/products/${productId}/addons`)
}
