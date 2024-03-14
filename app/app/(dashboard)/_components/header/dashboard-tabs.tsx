"use client"

import { useSelectedLayoutSegment } from "next/navigation"

import { tabsNavegation } from "@/config/dashboard"
import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"

import { TabsContainer, TabsLink } from "./tabs-link"

export function DashboatdTabs() {
  const selectedSegment = useSelectedLayoutSegment()

  return (
    <MaxWidthWrapper className="pt-1">
      <TabsContainer hideSeparator>
        {tabsNavegation.map(({ title, segment, href }) => {
          const active = segment === selectedSegment
          return (
            <TabsLink key={title} active={active} href={`/${href}`}>
              {title}
            </TabsLink>
          )
        })}
      </TabsContainer>
    </MaxWidthWrapper>
  )
}
