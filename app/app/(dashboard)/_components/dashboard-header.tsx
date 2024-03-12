import Link from "next/link"

import { getSession } from "@/lib/auth"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"
import { Logo } from "@/components/logo"

import { Notifications } from "./notifications"
import TeamSwitcher from "./team-switcher"
import { UserNav } from "./user-nav"

export async function DashboardHeader() {
  const session = await getSession()

  if (!session?.user) {
    // not auth
    return
  }

  return (
    <MaxWidthWrapper>
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden sm:block">
            <Logo className="size-9" />
          </Link>
          <TeamSwitcher />
        </div>
        <div className="flex items-center space-x-6">
          <Notifications />
          <UserNav user={session.user} />
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
