import { db } from '@/db'
import { env } from '@/env.mjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
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
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)
