"use client";

import Link from "next/link";
import { buttonVariants } from "@menup/ui";

import marketingConfig from "@/config/marketing";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Container } from "../container";
import { Logo } from "../logo";
import MarketingMobileNav from "./marketing-mobile-nav";
import { MarketingNavLinks } from "./marketing-nav-links";

export function MarketingHeader({ scroll = true }) {
  const scrolled = useScroll(50);

  return (
    <header
      className={`sticky top-0 z-40 bg-transparent transition-all duration-100 ${
        scroll
          ? scrolled
            ? "border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/70 border-b backdrop-blur"
            : "bg-background/0"
          : null
      }`}
    >
      <Container className="relative flex flex-row items-center justify-between py-4">
        <MarketingMobileNav navItems={marketingConfig.navItems} />

        <div className="relative z-10 hidden items-center gap-16 md:flex">
          <Logo />

          <MarketingNavLinks navItems={marketingConfig.navItems} />
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default" }), "font-bold")}
          >
            Sign In
          </Link>
        </div>
      </Container>
    </header>
  );
}
