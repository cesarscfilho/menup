'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'

export default function SignInForm() {
  const [clickedGoogle, setClickedGoogle] = React.useState(false)

  return (
    <div className="space-y-3">
      <Button
        onClick={() => {
          setClickedGoogle(true)
          signIn('github', {
            callbackUrl: '/dashboard',
          })
        }}
        className="w-full"
      >
        {clickedGoogle ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Continue with Github'
        )}
      </Button>
      <Button disabled variant="outline" className="w-full">
        Continue with Email
      </Button>
    </div>
  )
}
