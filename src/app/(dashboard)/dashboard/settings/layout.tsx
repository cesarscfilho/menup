import { Metadata } from 'next'

import { Container } from '@/components/container'
import { SidebarNav } from '@/components/layout/dashboard-sidebar-settings'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/dashboard/settings',
  },
  {
    title: 'Appearance',
    href: '/dashboard/settings/appearance',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div>
      <div className="flex h-32 items-center border-b bg-muted/20">
        <Container className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>
        </Container>
      </div>
      <Container className="space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </Container>
    </div>
  )
}