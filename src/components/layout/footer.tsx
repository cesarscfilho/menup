import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils"

import { ToggleTheme } from "../toggle-theme"
import { buttonVariants } from "../ui/button"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <section className="container flex items-center gap-8 pb-8 pt-6 md:py-8">
        <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
          Built by{" "}
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
            className={cn(buttonVariants({ size: "icon", variant: "outline" }))}
          >
            <GitHubLogoIcon />
          </Link>
          <ToggleTheme />
        </div>
      </section>
    </footer>
  )
}
