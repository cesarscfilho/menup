"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import {
  Addon,
  addonCategories,
  addons,
  productAddonCategoryRelation,
} from "@/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { z } from "zod"

import { productCategoriesWithAddonsSchema } from "@/lib/validations/product"
import { addonsSchema, getAddonSchema } from "@/lib/validations/variant"

const addonsSchemaWithStoreId = addonsSchema.extend({
  storeId: z.string(),
})

export async function createAddons(
  inputs: z.infer<typeof addonsSchemaWithStoreId>
) {
  await db.insert(addons).values({
    name: inputs.name,
    price: inputs.price,
    storeId: inputs.storeId,
  })

  revalidatePath(`/dashboard/${inputs.storeId}/addons`)
}

export async function deleteAddon(inputs: z.infer<typeof getAddonSchema>) {
  const addon = await db.query.addons.findFirst({
    columns: {
      id: true,
    },
    where: and(eq(addons.id, inputs.id), eq(addons.storeId, inputs.storeId)),
  })

  if (!addon) {
    throw new Error("Addon not found.")
  }

  await db.delete(addons).where(eq(addons.id, inputs.id))

  revalidatePath(`/dashboard/${inputs.storeId}/addons`)
}

export async function updateAddonStatus(inputs: { id: string }) {
  const addon = await db.query.addons.findFirst({
    where: eq(addons.id, inputs.id),
  })

  if (!addon) {
    throw new Error("Product not found.")
  }

  await db
    .update(addons)
    .set({ active: !addon.active })
    .where(eq(addons.id, inputs.id))

  revalidatePath(`/dashboard/${addon.storeId}/addons`)
}

const extendProductCategoriesWithAddonsSchema =
  productCategoriesWithAddonsSchema
    .omit({
      addons: true,
    })
    .merge(getAddonSchema)

export async function updateProductCategoryAddons(
  inputs: z.infer<typeof extendProductCategoriesWithAddonsSchema>
) {
  const categoryExist = await db.query.addonCategories.findFirst({
    where: eq(addonCategories.id, inputs.categoryId),
  })

  if (!categoryExist) {
    throw new Error("Not found")
  }

  await db
    .update(addonCategories)
    .set({
      name: inputs.name,
      quantityMax: inputs.quantityMax,
      quantityMin: inputs.quantityMin,
      productId: inputs.id,
      active: inputs.active,
      mandatory: inputs.mandatory,
    })
    .where(eq(addonCategories.id, inputs.categoryId))

  revalidatePath(`/dashboard/${inputs.storeId}/products/${inputs.id}/addons`)
}

export async function addProductCategoryAddons(
  productId: string,
  storeId: string
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

export async function deleteProductCategoryAddons(inputs: {
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
        eq(productAddonCategoryRelation.addonCategoryId, inputs.categoryId),
        eq(productAddonCategoryRelation.productId, inputs.productId)
      )
    )

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${inputs.productId}/addons`
  )
}

export async function addAddonInProductAddonCategoryRelation({
  items,
  productId,
  addonCategoryId,
  storeId,
}: {
  items: Pick<Addon, "id" | "name" | "price">[]
  addonCategoryId: string
  productId: string
  storeId: string
}) {
  const itemsWithIds = items.map((item) => ({
    addonsId: item.id,
    productId,
    addonCategoryId,
  }))

  await db.insert(productAddonCategoryRelation).values(itemsWithIds)

  revalidatePath(`/dashboard/${storeId}/products/${productId}/addons`)
}
