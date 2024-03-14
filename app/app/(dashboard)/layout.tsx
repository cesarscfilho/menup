import { DashboardHeader } from "./_components/header/dashboard-header"
import { DashboatdTabs } from "./_components/header/dashboard-tabs"
import { Providers } from "./providers"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Providers>
      <div className="min-h-screen w-full flex-1">
        <DashboardHeader />
        <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
          <DashboatdTabs />
        </div>
        {children}
      </div>
    </Providers>
  )
}
