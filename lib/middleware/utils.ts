import { NextRequest } from "next/server"
import { env } from "@/env"

export function parse(req: NextRequest) {
  const url = req.nextUrl

  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)

  const searchParams = req.nextUrl.searchParams.toString()

  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`

  return { hostname, path }
}
