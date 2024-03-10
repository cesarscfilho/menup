"use client"

import { signOut } from "next-auth/react"

import { DropdownMenuItem, DropdownMenuShortcut } from "../ui/dropdown-menu"

export function SignOutButton() {
  return (
    <DropdownMenuItem onClick={() => signOut()}>
      Log out
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  )
}
