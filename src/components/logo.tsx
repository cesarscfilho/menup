import Link from "next/link"

import { Icons } from "./icons"

export function Logo() {
  return (
    <Link href="/" className="flex items-center text-primary">
      <Icons.logo className="h-8 w-auto" />
      <p className="ml-4 text-base font-semibold">Menup</p>
    </Link>
  )
}
