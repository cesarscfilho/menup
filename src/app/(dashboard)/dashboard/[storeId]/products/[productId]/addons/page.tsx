import { getProductCategoriesWithAddons } from '@/actions/product'
import { db } from '@/db'
import { addons } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { BackToProduct } from '@/components/back-to-product'
import { Container } from '@/components/container'
import { AddProductCategoryAddons } from '@/components/forms/add-product-category'
import { ProductCategoriesAddonsForm } from '@/components/forms/product-category-addons-form'
import { InfoCard } from '@/components/info-card'
import { LinkTabs } from '@/components/pagers/link-tabs'

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

  const { productCategoriesWithAddons } = await getProductCategoriesWithAddons({
    id: productId,
    storeId,
  })

  const allAddons = await db
    .select({ addonId: addons.id, name: addons.name, price: addons.price })
    .from(addons)
    .where(eq(addons.storeId, storeId))

  return (
    <Container className="my-8 space-y-4">
      <div className="flex flex-row items-center gap-4">
        <BackToProduct storeId={storeId} />
        <LinkTabs productId={productId} />
      </div>

      <div className="mb-5 flex items-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product addons</h2>
      </div>

      {productCategoriesWithAddons.length < 1 ? (
        <InfoCard
          heading="This product does not have registered add-ons"
          button={
            <AddProductCategoryAddons storeId={storeId} productId={productId} />
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-3">
          <div className="col-span-2 space-y-6">
            {productCategoriesWithAddons.map((category) => (
              <ProductCategoriesAddonsForm
                key={category.categoryId}
                storeId={storeId}
                productId={productId}
                allAddons={allAddons}
                category={category}
              />
            ))}
          </div>

          <div className="h-fit rounded-lg border p-4">
            <AddProductCategoryAddons storeId={storeId} productId={productId} />
          </div>
        </div>
      )}
    </Container>
  )
}
