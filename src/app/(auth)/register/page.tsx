import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      <div className="col-span-1 flex items-center justify-center md:col-span-2">
        <div className="cols-span-1 relative flex h-full flex-col items-center justify-center">
          <Card>
            <CardHeader className="space-y-1 border-b text-center">
              <CardTitle className="text-xl">
                Create your Menup account
              </CardTitle>
              <CardDescription>
                Get started free for 30 days. No credit card required.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 px-5 py-7 backdrop-blur">
              <Button className="w-full">Continue with Google</Button>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground mx-auto text-sm">
                Already have an account? <Link href={'/login'}>Sign in.</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="border-border bg-background/10 hidden h-full flex-col justify-center space-y-12 overflow-hidden border-l shadow backdrop-blur md:flex"></div>
    </div>
  )
}
