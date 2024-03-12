"use client"

import { ModalProvider } from "@/components/modal/provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}
