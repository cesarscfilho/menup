"use client"

import React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

interface MarketingNavLinksProps {
  navItems: {
    title: string
    href: string
  }[]
}

export function MarketingNavLinks({ navItems }: MarketingNavLinksProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const timeoutRef = React.useRef<number | null>(null)

  return navItems.map(({ title, href }, index) => (
    <Link
      key={title}
      href={href}
      className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0"
      onMouseEnter={() => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current)
        }
        setHoveredIndex(index)
      }}
      onMouseLeave={() => {
        timeoutRef.current = window.setTimeout(() => {
          setHoveredIndex(null)
        }, 200)
      }}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 rounded-lg bg-gray-100"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15 },
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{title}</span>
    </Link>
  ))
}
