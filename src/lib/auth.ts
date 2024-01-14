import { db } from '@/db'
import { env } from '@/env.mjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/GitHub'

export const authConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)
