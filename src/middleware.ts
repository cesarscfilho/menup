import NextAuth from 'next-auth'

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from '@/lib/routes'

import { authConfig } from './lib/auth'

// import { conn } from './lib/planetscale'

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  // const existingProject = await conn
  //   ?.execute('SELECT id FROM stores WHERE userId = ?', [req.auth?.user.id])
  //   .then((res) => res.rows[0])

  // if (!existingProject) {
  //   return Response.redirect(new URL('/onboarding', nextUrl))
  // }

  return null
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
