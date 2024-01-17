import { redirect } from 'next/navigation'
import { db } from '@/db'
import { stores } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { auth } from '@/lib/auth'

import { Container } from '../container'
import { Notifications } from '../notifications'
import { DashboardTabs } from '../pagers/dashboard-tabs'
import StoreSwitcher from '../store-switcher'
import { UserNav } from '../user-nav'

export async function DashboardHeader() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  const strs = await db
    .select({ id: stores.id, name: stores.name })
    .from(stores)
    .where(eq(stores.userId, session.user.id))

  console.log(strs)
  return (
    <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
      <Container>
        <div className="flex h-16 items-center">
          <StoreSwitcher user={session.user} stores={strs} />
          <div className="ml-auto flex items-center gap-4">
            <Notifications />
            <UserNav />
          </div>
        </div>
        <DashboardTabs />
      </Container>
    </div>
  )
}
