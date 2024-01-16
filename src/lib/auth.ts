import { db } from '@/db'
import { users } from '@/db/schema'
import { env } from '@/env.mjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { eq } from 'drizzle-orm'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    // Email provider
    {
      id: 'email',
      type: 'email',
      from: 'asdf@asdf.ca',
      server: {},
      maxAge: 24 * 60 * 60,
      name: 'Email',
      options: {},
      sendVerificationRequest: async ({ url, identifier }) => {
        console.log(url, identifier)
      },
    },
    GitHubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token
    },
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
  },
}

export const { handlers, auth, signOut } = NextAuth(authConfig)
