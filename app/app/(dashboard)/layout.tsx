import { DashboardHeader } from "./_components/dashboard-header"
import { DashboatdTabs } from "./_components/dashboard-tabs"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full flex-1">
      <DashboardHeader />
      <div className="sticky left-0 right-0 top-0 z-20 border-b border-border bg-background">
        <DashboatdTabs />
      </div>
      {children}
    </div>
  )
}
