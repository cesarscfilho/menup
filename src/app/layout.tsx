import type { Metadata } from 'next'

import { fontSans } from '@/lib/font'

import '@/styles/globals.css'

import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

import Providers from './providers'

export const metadata: Metadata = {
  title: siteConfig.name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
