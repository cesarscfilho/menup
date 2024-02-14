'use client'

import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function LinkTabs({ productId }: { productId: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const paths = pathname.split('/')
  const lastIndex = paths.length - 1

  const { storeId } = useParams() as { storeId?: string }

  const tabs = [
    {
      title: 'Product',
      href: `/dashboard/${storeId}/products/${productId}`,
      isActive: paths[lastIndex] === productId,
    },
    {
      title: 'Addons',
      href: `/dashboard/${storeId}/products/${productId}/addons`,
      isActive: paths[lastIndex] === 'addons',
    },
  ]

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      onValueChange={(value) => router.push(value)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.href} key={tab.title}>
            <Link href={tab.href}>{tab.title}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
