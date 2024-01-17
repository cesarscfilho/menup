'use client'

import Link from 'next/link'
import {
  useParams,
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export function DashboardTabs() {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const pathname = usePathname()
  const { storeId } = useParams() as { storeId?: string }

  let tabs

  if (storeId) {
    tabs = [
      {
        title: 'Store',
        href: `/dashboard/${storeId}`,
        isActive: pathname === `/dashboard/${storeId}`,
      },
      {
        title: 'Orders',
        href: `/dashboard/${storeId}/orders`,
        isActive: pathname === `/dashboard/${storeId}/orders`,
      },
      {
        title: 'Products',
        href: `/dashboard/${storeId}/products`,
        isActive: pathname === `/dashboard/${storeId}/orders`,
      },
      {
        title: 'Notifications',
        href: `/dashboard/${storeId}/notifications`,
        isActive: pathname === `/dashboard/${storeId}/notifications`,
      },
      {
        title: 'Settings',
        href: `/dashboard/${storeId}/settings`,
        isActive: pathname === `/dashboard/${storeId}/settings`,
      },
    ]
  } else {
    tabs = [
      {
        title: 'Stores',
        href: `/dashboard`,
        isActive: segment === null,
      },
      {
        title: 'Settings',
        href: `/dashboard/settings`,
        isActive: segment === 'settings',
      },
      {
        title: 'News',
        href: `/dashboard/news`,
        isActive: segment === 'news',
      },
    ]
  }

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      onValueChange={(value) => router.push(value)}
    >
      <ScrollArea>
        <TabsList className="inline-flex items-center justify-center space-x-1.5 text-muted-foreground">
          {tabs.map((tab) => (
            <div
              role="none"
              key={tab.href}
              className={cn(
                'border-b-2 border-transparent py-1.5',
                tab.isActive && 'border-foreground',
              )}
            >
              <TabsTrigger
                value={tab.href}
                className={cn(
                  'inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                  tab.isActive && 'text-foreground',
                )}
                asChild
              >
                <Link href={tab.href}>{tab.title}</Link>
              </TabsTrigger>
            </div>
          ))}
        </TabsList>
      </ScrollArea>
    </Tabs>
  )
}
