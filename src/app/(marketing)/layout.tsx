import { MarketingFooter } from "@/components/layout/marketing-footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
