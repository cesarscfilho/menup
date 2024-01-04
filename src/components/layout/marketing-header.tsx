import Link from "next/link"

import marketingConfig from "@/config/marketing"
import { cn } from "@/lib/utils"

import { Container } from "../container"
import { Logo } from "../logo"
import { buttonVariants } from "../ui/button"
import MarketingMobileNav from "./marketing-mobile-nav"
import { MarketingNavLinks } from "./marketing-nav-links"

export function MarketingHeader() {
  return (
    <header>
      <Container className="relative flex flex-row justify-between py-8">
        <MarketingMobileNav navItems={marketingConfig.navItems} />

        <div className="relative z-10 hidden items-center gap-16 md:flex">
          <Logo />
          <nav className="hidden md:flex md:gap-10">
            <MarketingNavLinks navItems={marketingConfig.navItems} />
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "default" }), "font-bold")}
          >
            Sign In
          </Link>
        </div>
      </Container>
    </header>
  )
}
