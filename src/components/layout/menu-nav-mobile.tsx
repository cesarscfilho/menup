'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Icons } from '../icons'

export function MenuNavMobile() {
  const segment = useSelectedLayoutSegment()

  const items: { label: string; icon: keyof typeof Icons; active: boolean }[] =
    [
      {
        label: 'Home',
        icon: 'home',
        active: segment === null,
      },
      {
        label: 'Offers',
        icon: 'badgepercent',
        active: segment === 'offers',
      },
      {
        label: 'Orders',
        icon: 'shopbasket',
        active: segment === 'orders',
      },
      {
        label: 'Profile',
        icon: 'profile',
        active: segment === 'profile',
      },
    ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-12 flex-row items-center justify-around border-t bg-background shadow-md md:hidden">
      {items.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={item.active}
        />
      ))}
    </nav>
  )
}

interface NavItemProps {
  label: string
  icon: keyof typeof Icons
  active: boolean
}

function NavItem({ icon, label, active }: NavItemProps) {
  const Icon = Icons[icon]

  return (
    <div
      className={cn(
        'flex cursor-pointer select-none flex-col items-center justify-center space-y-1 p-1 transition-colors',
        {
          'text-muted-foreground': !active,
        },
      )}
    >
      <Icon className="h-5 w-5" />
      <span className={cn('text-xs font-semibold')}>{label}</span>
    </div>
  )
}
