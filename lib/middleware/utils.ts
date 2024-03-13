import { NextRequest } from "next/server"
import { env } from "@/env"

export function parse(req: NextRequest) {
  const url = req.nextUrl

  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  const path = req.nextUrl.pathname

  const searchParams = req.nextUrl.searchParams.toString()
  const fullPath = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`

  const key = decodeURIComponent(path.split("/")[1])
  const fullKey = decodeURIComponent(path.slice(1))

  return { hostname, fullPath, path, key, fullKey }
}
