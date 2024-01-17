import React from 'react'

import { Container } from '@/components/container'
import TeamSwitcher from '@/components/dashboard/team-switcher'
import { Notifications } from '@/components/notifications'
import { DashboardTabs } from '@/components/pagers/dashboard-tabs'
import { UserNav } from '@/components/user-nav'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
        <Container>
          <div className="flex h-16 items-center">
            <TeamSwitcher />
            <div className="ml-auto flex items-center gap-4">
              <Notifications />
              <UserNav />
            </div>
          </div>
          <DashboardTabs />
        </Container>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
