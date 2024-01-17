import { db } from '@/db'
import { env } from '@/env.mjs'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { sendVerificationEmail } from './mail'

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
        if (env.NODE_ENV === 'development') {
          console.log(identifier, url)
        } else {
          await sendVerificationEmail(identifier, url)
        }
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
