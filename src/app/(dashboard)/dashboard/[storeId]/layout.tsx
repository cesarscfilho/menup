import React from 'react'
import { notFound } from 'next/navigation'
import { db } from '@/db'
import { stores } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { auth } from '@/lib/auth'

interface DashboardStoreLayoutProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function DashboardStoreLayout({
  children,
  params,
}: DashboardStoreLayoutProps) {
  const session = await auth()
  const storeId = params.storeId

  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  })

  // check if store exist and belongs to the current user
  if (!store || store.userId !== session?.user.id) {
    notFound()
  }

  // const items = await db
  //   .select({
  //     product: products,
  //     productVariant: productsVariants,
  //   })
  //   .from(products)
  //   .where(eq(products.storeId, store.id))
  //   .leftJoin(productsVariants, eq(products.id, productsVariants.productId))
  //   .leftJoin(variants, eq(productsVariants.variantId, variants.id))
  //   .then((items) => {
  //     const products = items.reduce<
  //       Record<
  //         string,
  //         {
  //           productVariants: ProductVariant[]
  //         }
  //       >
  //     >((acc, row) => {
  //       const product = row.product
  //       const productVariant = row.productVariant

  //       if (!acc[product.id]) {
  //         acc[product.id] = {
  //           ...product,
  //           productVariants: [],
  //         }
  //       }
  //       if (productVariant) {
  //         acc[product.id].productVariants.push(productVariant)
  //       }

  //       return acc
  //     }, {})

  //     return Object.values(products)
  //   })

  return <>{children}</>
}
