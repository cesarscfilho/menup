import { MenuNavMobile } from '@/components/layout/menu-nav-mobile'

export default function MenuRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <MenuNavMobile />
    </div>
  )
}
