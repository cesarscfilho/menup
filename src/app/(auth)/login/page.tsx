import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import SignInForm from '@/components/auth/signin-form'

export default function LoginPage() {
  return (
    <Card className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border-border sm:rounded-2xl sm:border sm:shadow-xl">
      <CardHeader className="space-y-1 border-b text-center">
        <CardTitle className="text-xl">Sign in to Menup</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 px-5 py-7 backdrop-blur">
        <SignInForm />
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-sm text-muted-foreground">
          Don&apos;t have an account? <Link href={'/register'}>Sign up.</Link>
        </p>
      </CardFooter>
    </Card>
  )
}
