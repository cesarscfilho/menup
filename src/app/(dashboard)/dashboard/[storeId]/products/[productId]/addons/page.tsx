import { db } from '@/db'
import {
  Addon,
  addons,
  addonsCategory,
  productsCategoryAddons,
} from '@/db/schema'
import { and, asc, desc, eq } from 'drizzle-orm'

import { BackToProduct } from '@/components/back-to-product'
import { Container } from '@/components/container'
import { LinkTabs } from '@/components/pagers/link-tabs'
import ProductAddonsList from '@/components/product-addons-list'

interface ProductAddonsPageProps {
  params: {
    productId: string
    storeId: string
  }
}

export default async function ProductAddonsPage({
  params,
}: ProductAddonsPageProps) {
  const { productId, storeId } = params

  const productCategoriesWithAddons = await db
    .select({
      category: {
        categoryId: addonsCategory.id,
        name: addonsCategory.name,
        quantityMin: addonsCategory.quantityMin,
        quantityMax: addonsCategory.quantityMax,
        mandatory: addonsCategory.mandatory,
        active: addonsCategory.active,
      },
      items: {
        id: addons.id,
        name: addons.name,
        price: addons.price,
      },
    })
    .from(addonsCategory)
    .where(eq(addonsCategory.productId, productId))
    .leftJoin(
      productsCategoryAddons,
      and(
        eq(productsCategoryAddons.productId, productId),
        eq(productsCategoryAddons.addonsCategoryId, addonsCategory.id),
      ),
    )
    .leftJoin(addons, eq(addons.id, productsCategoryAddons.addonsId))
    .orderBy(desc(addonsCategory.active), asc(addonsCategory.updatedAt))
    .then((res) => {
      const addonsListItems = res.reduce<
        Record<
          string,
          {
            categoryId: string
            name: string
            quantityMin: number
            quantityMax: number
            mandatory: boolean
            active: boolean
            items: Pick<Addon, 'id' | 'name' | 'price'>[]
          }
        >
      >((acc, row) => {
        const category = row.category
        const item = row.items

        if (!acc[category.name]) {
          acc[category.name] = {
            ...category,
            items: [],
          }
        }

        if (item) {
          acc[category.name].items.push(item)
        }

        return acc
      }, {})

      return Object.values(addonsListItems)
    })

  // console.log(productCategoriesWithAddons)

  return (
    <Container className="my-8 space-y-4">
      <div className="flex flex-row items-center gap-4">
        <BackToProduct storeId={storeId} />
        <LinkTabs productId={productId} />
      </div>

      <div className="mb-5 flex items-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product addons</h2>
      </div>

      <ProductAddonsList
        productId={productId}
        storeId={storeId}
        productCategoriesWithAddons={productCategoriesWithAddons}
      />
    </Container>
  )
}
