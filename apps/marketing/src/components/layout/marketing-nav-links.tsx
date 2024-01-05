import React from "react";
import Link from "next/link";

interface MarketingNavLinksProps {
  navItems: {
    title: string;
    href: string;
  }[];
}

export function MarketingNavLinks({ navItems }: MarketingNavLinksProps) {
  return (
    <nav className="hidden md:flex md:gap-10">
      {navItems.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className="text-muted-foreground hover:text-accent-foreground relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors delay-150 hover:delay-0"
        >
          <span className="relative z-10">{title}</span>
        </Link>
      ))}
    </nav>
  );
}
