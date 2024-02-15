import { db } from '@/db'
import {
  addons,
  AddonsCategory,
  addonsCategory,
  productsCategoryAddons,
} from '@/db/schema'
import { and, eq } from 'drizzle-orm'

import { BackToProduct } from '@/components/back-to-product'
import { Container } from '@/components/container'
import { InfoCard } from '@/components/info-card'
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

  const productAddons = await db
    .select({
      category: {
        id: addonsCategory.id,
        name: addonsCategory.name,
      },
      items: {
        id: addons.id,
        name: addons.name,
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
    .then((res) => {
      const items = res.reduce<
        Record<
          string,
          {
            name: string
            id: string
            items: Pick<AddonsCategory, 'id' | 'name'>[]
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

      return Object.values(items)
    })

  return (
    <Container className="my-8 space-y-4">
      <div className="flex flex-row items-center gap-4">
        <BackToProduct storeId={storeId} />
        <LinkTabs productId={productId} />
      </div>

      <div className="mb-5 flex items-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product addons</h2>
      </div>

      {productAddons.length < 1 ? (
        <InfoCard heading="This product dons't have addons yet" />
      ) : null}

      <ProductAddonsList addons={productAddons} />
    </Container>
  )
}
