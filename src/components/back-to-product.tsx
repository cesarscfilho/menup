import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

export function BackToProduct({ storeId }: { storeId: string }) {
  return (
    <Link
      href={`/dashboard/${storeId}/products`}
      className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
    >
      <ChevronLeft className="size-4" />
    </Link>
  )
}
