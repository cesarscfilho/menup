'use client'

import Link from 'next/link'
import { User } from '@auth/core/types'

import marketingConfig from '@/config/marketing'
import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'
import useScroll from '@/hooks/use-scroll'

import { Container } from '../container'
import { Logo } from '../logo'
import { buttonVariants } from '../ui/button'
import MarketingMobileNav from './marketing-mobile-nav'
import { MarketingNavLinks } from './marketing-nav-links'

interface MarketingHeaderProps {
  scroll?: boolean
  user: User | undefined
}

export function MarketingHeader({ scroll = true, user }: MarketingHeaderProps) {
  const scrolled = useScroll(50)

  return (
    <header
      className={`sticky top-0 z-40 bg-transparent transition-all duration-100 ${
        scroll
          ? scrolled
            ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70'
            : 'bg-background/0'
          : null
      }`}
    >
      <Container className="relative flex flex-row items-center justify-between py-4">
        <MarketingMobileNav navItems={marketingConfig.navItems} />

        <div className="relative z-10 hidden items-center gap-16 md:flex">
          <Link href="/" className="flex items-center text-primary">
            <Logo className="size-8" />
            <p className="ml-2 text-base font-extrabold">{siteConfig.name}</p>
          </Link>

          <MarketingNavLinks navItems={marketingConfig.navItems} />
        </div>
        <div className="flex items-center gap-6">
          {user ? (
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'font-bold',
              )}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'font-bold',
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </Container>
    </header>
  )
}
