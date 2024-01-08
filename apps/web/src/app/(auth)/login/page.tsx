import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@menup/ui";

import { Icons } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="border-border relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border-y sm:rounded-2xl sm:border sm:shadow-xl">
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
          <p className="text-muted-foreground mx-auto text-sm">
            Don't have an account? <Link href={"/register"}>Sign up.</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
