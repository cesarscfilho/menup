import Link from 'next/link'

import { Icons } from '../icons'
import { Logo } from '../logo'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'

interface MarketingMobileNavProps {
  navItems: {
    title: string
    href: string
  }[]
}

export default function MarketingMobileNav({
  navItems,
}: MarketingMobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">
        <Icons.menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <nav className="flex flex-col space-y-4 pt-8 text-start">
            {navItems.map(({ href, title }, i) => (
              <Link key={i} href={href}>
                <SheetClose>{title}</SheetClose>
              </Link>
            ))}
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
