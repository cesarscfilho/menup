import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { parse } from "./utils"

export default async function AppMiddleware(req: NextRequest) {
  const { path } = parse(req)

  const session = await getToken({ req })

  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  } else if (session && path == "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.rewrite(
    new URL(`/app${path === "/" ? "" : path}`, req.url)
  )
}
