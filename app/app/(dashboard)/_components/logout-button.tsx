"use client"

import { signOut } from "next-auth/react"

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

export function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={() => {
        signOut()
      }}
    >
      Sair
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
