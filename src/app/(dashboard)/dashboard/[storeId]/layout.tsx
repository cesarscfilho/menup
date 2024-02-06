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

  return <>{children}</>
}
