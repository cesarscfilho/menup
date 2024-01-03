import Link from "next/link"

import marketingConfig from "@/config/marketing"
import { cn } from "@/lib/utils"

import { Container } from "../container"
import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"
import { MarketingNavLinks } from "./marketing-nav-links"

export function MarketingHeader() {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16">
            <Link href="/" className="flex items-center text-primary">
              <Icons.logo className="h-8 w-auto" />
              <p className="ml-4 text-base font-semibold">Menup</p>
            </Link>
            <div className="hidden md:flex md:gap-10">
              <MarketingNavLinks navItems={marketingConfig.navItems} />
            </div>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Feedback
            </Link>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Sign In
            </Link>
          </div>
        </Container>
      </nav>
    </header>
  )
}
