'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import {
  addonCategories,
  addons,
  productAddonCategoryRelation,
  products,
} from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { ProductCategoriesWithAddons } from '@/types/product'
import { getProductSchema, productSchema } from '@/lib/validations/product'

const productSchemaWithStoreId = productSchema.extend({
  storeId: z.string(),
})

export async function createProduct(
  inputs: z.infer<typeof productSchemaWithStoreId>,
) {
  const productWithSameName = await db.query.products.findFirst({
    where: and(
      eq(products.name, inputs.name),
      eq(products.storeId, inputs.storeId),
    ),
  })

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

export async function deleteProduct(inputs: z.infer<typeof getProductSchema>) {
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

export async function updateProductStatus(inputs: { id: string }) {
  const productExist = await db.query.products.findFirst({
    where: eq(products.id, inputs.id),
  })

  if (!productExist) {
    throw new Error('Product not found.')
  }

  await db
    .update(products)
    .set({ active: !productExist.active })
    .where(eq(products.id, inputs.id))

  revalidatePath(`/dashboard/${productExist.storeId}/products`)
}

const productSchemaWithId = productSchemaWithStoreId.extend({ id: z.string() })

export async function updateProduct(
  inputs: z.infer<typeof productSchemaWithId>,
) {
  const product = await db.query.products.findFirst({
    where: and(
      eq(products.id, inputs.id),
      eq(products.storeId, inputs.storeId),
    ),
  })

  if (!product) {
    throw new Error('Product not found.')
  }

  await db
    .update(products)
    .set({
      name: inputs.name,
      price: inputs.price,
      categoryId: inputs.categoryId,
      description: inputs.description,
    })
    .where(eq(products.id, inputs.id))

  revalidatePath(`/dashboard/${inputs.storeId}/products/${inputs.id}`)
}

export async function getProductCategoriesWithAddons(
  inputs: z.infer<typeof getProductSchema>,
) {
  const items = await db
    .select({
      category: {
        categoryId: addonCategories.id,
        name: addonCategories.name,
        quantityMin: addonCategories.quantityMin,
        quantityMax: addonCategories.quantityMax,
        mandatory: addonCategories.mandatory,
        active: addonCategories.active,
      },
      addons: {
        addonId: addons.id,
        name: addons.name,
        price: addons.price,
      },
    })
    .from(addonCategories)
    .where(eq(addonCategories.productId, inputs.id))
    .leftJoin(
      productAddonCategoryRelation,
      and(
        eq(productAddonCategoryRelation.productId, inputs.id),
        eq(productAddonCategoryRelation.addonCategoryId, addonCategories.id),
      ),
    )
    .leftJoin(addons, eq(addons.id, productAddonCategoryRelation.addonsId)) // TODO: Add orderBy
    .then((res) => {
      const addonsListItems = res.reduce<
        Record<string, ProductCategoriesWithAddons>
      >((acc, row) => {
        const category = row.category
        const item = row.addons

        if (!acc[category.name]) {
          acc[category.name] = {
            ...category,
            addons: [],
          }
        }

        if (item) {
          acc[category.name].addons.push(item)
        }

        return acc
      }, {})

      return Object.values(addonsListItems)
    })

  return {
    productCategoriesWithAddons: items,
  }
}
