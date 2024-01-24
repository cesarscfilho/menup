import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, Product, products } from '@/db/schema'
import { and, eq, like } from 'drizzle-orm'
import { Store } from 'lucide-react'

import { productsSearchParamsSchema } from '@/types/params'
import { Container } from '@/components/container'
import { CreateCategoryButton } from '@/components/create-category-button'
import { CreateProductButton } from '@/components/create-product-button'
import { InfoCard } from '@/components/info-card'

interface StoreProductsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function StoreProductsPage({
  params,
  searchParams,
}: StoreProductsPageProps) {
  const storeId = Number(params.storeId)

  const { page, active, name, sort, per_page, category } =
    productsSearchParamsSchema.parse(searchParams)

  if (!storeId) {
    notFound()
  }

  const existCategory = await db.query.categories.findMany({
    where: eq(categories.storeId, storeId),
  })

  if (existCategory.length < 1) {
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

  const fallbackPage = isNaN(page) || page < 1 ? 1 : page
  // Number of items per page
  const limit = isNaN(per_page) ? 10 : per_page
  // Number of items to skip
  const offset = fallbackPage > 1 ? (fallbackPage - 1) * limit : 0
  // Column and order to sort by
  const [column, order] = (sort.split('.') as [
    keyof Product | undefined,
    'asc' | 'desc' | undefined,
  ]) ?? ['createdAt', 'desc']
  // const categoriesFilter = (category?.split('.') as string[]) ?? []

  const data = await db
    .select({
      id: products.id,
      name: products.id,
      price: products.price,
      active: products.active,
      category: categories.name,
    })
    .from(products)
    .limit(limit)
    .offset(offset)
    .where(
      and(
        eq(products.storeId, storeId),
        name ? like(products.name, `%${name}`) : undefined,
      ),
    )
    .innerJoin(categories, eq(categories.id, products.categoryId))

  if (data.length < 1) {
    return (
      <Container className="mt-8">
        <InfoCard
          heading="No categories registered yet"
          subheading="
        Create your first category to get started"
          icon={<Store size={36} />}
          button={
            <CreateProductButton categories={existCategory} storeId={storeId} />
          }
        />
      </Container>
    )
  }

  console.log(data)

  return <div></div>
}
