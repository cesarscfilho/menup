import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

import marketingConfig from '@/config/marketing'
import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'

import { Logo } from '../logo'
import { ToggleTheme } from '../toggle-theme'
import { buttonVariants } from '../ui/button'

export function MarketingFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8">
        <section className="py-6 md:py-8">
          <Link href="/" className="flex items-center text-primary">
            <Logo className="size-8" />
            <p className="ml-2 text-base font-extrabold">{siteConfig.name}</p>
          </Link>
        </section>
        <section className="grid flex-1 grid-cols-1 gap-10 py-8 sm:grid-cols-3">
          {marketingConfig.footerNav.map((item) => (
            <div key={item.title} className="space-y-3">
              <h4 className="text-base font-medium">{item.title}</h4>
              <ul className="space-y-2.5">
                {item.items.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link?.external ? '_blank' : undefined}
                      rel={link?.external ? 'noreferrer' : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.title}
                      <span className="sr-only">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="flex items-center border-t pt-8">
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            Built by{' '}
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              Cesar Silva
            </Link>
            .
          </div>
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              href={siteConfig.links.github}
              className={cn(
                buttonVariants({ size: 'icon', variant: 'outline' }),
              )}
            >
              <GitHubLogoIcon />
            </Link>
            <ToggleTheme />
          </div>
        </section>
      </div>
    </footer>
  )
}
