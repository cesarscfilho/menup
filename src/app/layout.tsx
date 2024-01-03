import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'

import '@/styles/globals.css'
import siteConfig from '@/config/site'

export const metadata: Metadata = {
  title: siteConfig.name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >{children}</body>
    </html>
  )
}
