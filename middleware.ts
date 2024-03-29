import { NextRequest, NextResponse } from "next/server"

import { env } from "./env"
import { APP_HOSTNAMES, DEFAULT_REDIRECTS } from "./lib/constants"
import AppMiddleware from "./lib/middleware/app"
import { parse } from "./lib/middleware/utils"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}

export default async function middleware(req: NextRequest) {
  const { hostname, path, key } = parse(req)

  // for app.
  if (APP_HOSTNAMES.has(hostname)) {
    return AppMiddleware(req)
  }

  if (hostname === env.NEXT_PUBLIC_ROOT_DOMAIN && key in DEFAULT_REDIRECTS) {
    return NextResponse.redirect(DEFAULT_REDIRECTS[key])
  }

  // rewrite root application to `/marketing` folder
  if (
    hostname === "localhost:3000" ||
    hostname === env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/marketing${path === "/" ? "" : path}`, req.url)
    )
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))
}
