import { signOut } from 'next-auth/react'

import { Button } from '../ui/button'

export function SignOutButton() {
  return (
    <Button variant="outline" size="sm" onClick={() => signOut()}>
      Sign Out
    </Button>
  )
}
