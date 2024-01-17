import React from 'react'

import { DashboardHeader } from '@/components/layout/dashboard-header'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1">{children}</div>
    </div>
  )
}
