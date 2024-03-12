"use client"

import { useParams, useSelectedLayoutSegment } from "next/navigation"

import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"

import { TabsContainer, TabsLink } from "./tabs-link"

export const pagesConfig = [
  {
    title: "Home",
    href: "/",
    segment: null,
  },
  {
    title: "Lojas",
    href: "/stores",
    segment: "stores",
  },
  {
    title: "Configurações",
    href: "/settings",
    segment: "settings",
  },
]

export function DashboatdTabs() {
  const params = useParams()
  const selectedSegment = useSelectedLayoutSegment()

  return (
    <MaxWidthWrapper>
      <TabsContainer hideSeparator>
        {pagesConfig.map(({ title, segment, href }) => {
          const active = segment === selectedSegment
          return (
            <TabsLink
              key={title}
              active={active}
              href={`/app/${params?.workspaceSlug}${href}`}
            >
              {title}
            </TabsLink>
          )
        })}
      </TabsContainer>
    </MaxWidthWrapper>
  )
}
