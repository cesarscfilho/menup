import { Container } from '../container'
import TeamSwitcher from '../dashboard/team-switcher'
import { Notifications } from '../notifications'
import { DashboardTabs } from '../pagers/dashboard-tabs'
import { UserNav } from '../user-nav'

export function DashboardHeader() {
  return (
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
  )
}
