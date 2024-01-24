import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Store } from 'lucide-react'

import { Container } from '@/components/container'
import { CreateCategoryButton } from '@/components/create-category-button'
import { InfoCard } from '@/components/info-card'

interface StoreProductsPageProps {
  params: {
    storeId: string
  }
}

export default async function StoreProductsPage({
  params,
}: StoreProductsPageProps) {
  const storeId = Number(params.storeId)

  if (!storeId) {
    notFound()
  }

  const ctgs = await db.query.categories.findMany({
    where: eq(categories.storeId, storeId),
  })

  console.log(ctgs)

  if (ctgs.length < 1) {
    return (
      <Container className="mt-8">
        <InfoCard
          heading="No categories registered yet"
          subheading="
        Create your first category to get started"
          icon={<Store size={36} />}
          button={<CreateCategoryButton storeId={storeId} />}
        />
      </Container>
    )
  }

  const items = await db
    .select({
      id: products.id,
      name: products.name,
      category: {
        id: categories.id,
        name: categories.name,
      },
    })
    .from(products)
    .where(eq(products.storeId, storeId))
    .leftJoin(categories, eq(categories.id, products.categoryId))

  console.log(items)

  return <div></div>
}
