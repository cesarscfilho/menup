"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Store } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

export function LinkToStoreFront() {
  const { storeId } = useParams() as { storeId?: string }

  return (
    <Link
      href={`/${storeId}`}
      target="_blank"
      className={cn(buttonVariants({ size: "icon", variant: "outline" }), {
        hidden: !storeId,
      })}
    >
      <Store className="size-4" />
    </Link>
  )
}
