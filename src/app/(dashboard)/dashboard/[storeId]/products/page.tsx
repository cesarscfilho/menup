import React from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { categories, Product, products } from '@/db/schema'
import { and, asc, desc, eq, like, sql } from 'drizzle-orm'
import { Store } from 'lucide-react'

import { productsSearchParamsSchema } from '@/types/params'
import { Container } from '@/components/container'
import { CreateCategoryButton } from '@/components/create-category-button'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { InfoCard } from '@/components/info-card'
import { ProductsTableShell } from '@/components/shells/products-table-shell'

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
          button={
            <CreateCategoryButton label="Create category" storeId={storeId} />
          }
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

  const productsPromise = db.transaction(async (tx) => {
    try {
      const data = await tx
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          active: products.active,
          createdAt: products.createdAt,
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
        .orderBy(
          column && column in products
            ? order === 'asc'
              ? asc(products[column])
              : desc(products[column])
            : desc(products.createdAt),
        )

      const count = await tx
        .select({
          count: sql<number>`count(${products.id})`,
        })
        .from(products)
        .where(
          and(
            eq(products.storeId, storeId),
            name ? like(products.name, `%${name}`) : undefined,
          ),
        )
        .then((res) => res[0].count ?? 0)

      const pageCount = Math.ceil(count / limit)

      return { data, pageCount }
    } catch (error) {
      return { data: [], pageCount: 0 }
    }
  })

  return (
    <Container className="mt-8 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <CreateCategoryButton label="Categories" storeId={storeId} />
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            isNewRowCreatable={true}
            isRowsDeletable={true}
          />
        }
      >
        <ProductsTableShell
          categories={existCategory}
          promise={productsPromise}
          storeId={storeId}
        />
      </React.Suspense>
    </Container>
  )
}
