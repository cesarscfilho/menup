import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { Container } from '@/components/container'
import { UpdateProductForm } from '@/components/forms/update-product-form'
import { LinkTabs } from '@/components/pagers/link-tabs'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  const allCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.storeId, product.storeId))

  return (
    <Container className="my-8 space-y-4">
      <LinkTabs productId={product.id} />
      <div className="mb-5 flex items-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update product</h2>
      </div>

      <UpdateProductForm product={product} categories={allCategories} />
    </Container>
  )
}
