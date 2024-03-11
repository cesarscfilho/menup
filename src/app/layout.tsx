import type { Metadata } from "next"

import { fontSans } from "@/lib/font"

import "@/styles/globals.css"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

import Providers from "./providers"

export const metadata: Metadata = {
  title: "Menup",
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
          fontSans.variable
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
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
