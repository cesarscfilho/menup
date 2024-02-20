import { getProductCategoriesWithAddons } from '@/actions/product'

import { BackToProduct } from '@/components/back-to-product'
import { Container } from '@/components/container'
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
    productId,
  })

  console.log(productCategoriesWithAddons)

  return (
    <Container className="my-8 space-y-4">
      <div className="flex flex-row items-center gap-4">
        <BackToProduct storeId={storeId} />
        <LinkTabs productId={productId} />
      </div>

      <div className="mb-5 flex items-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product addons</h2>
      </div>
    </Container>
  )
}
