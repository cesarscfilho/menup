import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { SignInForm } from "../_components/signin-form"

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-full w-full flex-col justify-center px-2 md:max-w-[550px]">
      <Card>
        <CardHeader className="space-y-1 py-8 text-center">
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Não tem uma conta?
            </span>
            <Link
              aria-label="Inscrever-se"
              href="/login"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Inscrever-se
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
