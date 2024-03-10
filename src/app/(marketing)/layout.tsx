import { auth } from "@/lib/auth"
import { Background } from "@/components/background"
import { MarketingFooter } from "@/components/layout/marketing-footer"
import { MarketingHeader } from "@/components/layout/marketing-header"

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth()

  return (
    <div className="relative flex min-h-screen flex-col">
      <Background />
      <MarketingHeader user={session?.user} />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
