import "@/styles/globals.css"

import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "sonner"

import { SITE_CONFIG } from "@/config/site"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { cal, inter } from "@/styles/fonts"

import { Providers } from "./providers"

export const metadata: Metadata = {
  ...SITE_CONFIG,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          cal.variable,
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster richColors position="top-right" />
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
