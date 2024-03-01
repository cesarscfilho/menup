import { notFound } from 'next/navigation'
import { db } from '@/db'
import { stores } from '@/db/schema'
import { eq } from 'drizzle-orm'

import MenuHeader from '@/components/layout/menu-header'

interface MenuLayoutProps {
  children: React.ReactNode
  params: {
    storeId: string
  }
}

export default async function MenuLayout({
  children,
  params,
}: MenuLayoutProps) {
  const { storeId } = params

  const [store] = await db.select().from(stores).where(eq(stores.id, storeId))

  if (!store) {
    notFound()
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <MenuHeader store={store} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
