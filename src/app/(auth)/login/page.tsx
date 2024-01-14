import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border-y border-border sm:rounded-2xl sm:border sm:shadow-xl">
      <Card>
        <CardHeader className="space-y-1 border-b text-center">
          <CardTitle className="text-xl">Sign in to Menup</CardTitle>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 px-5 py-7 backdrop-blur">
          <Button className="w-full">Continue with Google</Button>
          <Button variant="outline" className="w-full">
            Continue with Email
          </Button>
        </CardContent>
        <CardFooter>
          <p className="mx-auto text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href={'/register'}>Sign up.</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}