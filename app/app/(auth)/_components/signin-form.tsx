"use client"

import React from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SignInForm() {
  const [gitHubIsLoading, setGitHubIsLoading] = React.useState(false)

  return (
    <div className="grid gap-4">
      <div className="grid gap-3">
        <Button disabled variant="outline">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant={"outline"}
          isLoading={gitHubIsLoading}
          disabled={gitHubIsLoading}
          onClick={() => {
            setGitHubIsLoading(gitHubIsLoading)
            signIn("github")
          }}
        >
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou</span>
        </div>
      </div>
      <Button disabled variant={"outline"} className="w-full">
        Continue com Email
      </Button>
    </div>
  )
}
