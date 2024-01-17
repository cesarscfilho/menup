'use client'

import React, { useTransition } from 'react'
import { checkEmailExist } from '@/actions/auth'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function SignInForm() {
  const [email, setEmail] = React.useState('')
  const [isPending, startTransition] = useTransition()
  const [showEmailOption, setShowEmailOption] = React.useState(false)

  return (
    <div className="space-y-3">
      <Button
        onClick={() => {
          signIn('github', {
            callbackUrl: '/dashboard',
          })
        }}
        className="w-full"
      >
        Continue with Github
      </Button>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          startTransition(async () => {
            try {
              const existingEmail = await checkEmailExist(email)

              if (existingEmail) {
                await signIn('email', {
                  email,
                  redirect: false,
                  callbackUrl: '/dashboard',
                })
              }

              toast.error('No account found with that email address.')
            } catch (err) {
              // TODO: fix error Failed to construct 'URL': Invalid base URL at signIn
              console.log(err)
            }
          })
        }}
      >
        {showEmailOption ? (
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : null}

        <Button
          {...(!showEmailOption && {
            type: 'button',
            onClick: (e) => {
              e.preventDefault()
              setShowEmailOption(true)
            },
          })}
          variant="outline"
          className="w-full"
        >
          {!isPending ? 'Continue with Email' : 'Loading'}
        </Button>
      </form>
    </div>
  )
}
