import Link from "next/link";
import { buttonVariants } from "@menup/ui";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import siteConfig from "@/config/site";
import { cn } from "@/lib/utils";
import { Background } from "../(marketing)/background";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <div className="grid h-screen grid-cols-1 items-center justify-center p-5 md:grid-cols-2 ">
        <div className="relative flex h-full flex-col items-center justify-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "absolute right-5 top-2 w-fit",
              }),
            )}
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Go Back
          </Link>
          <Link
            href="/produtos"
            className="absolute left-5 top-2 w-fit text-xl font-bold"
          >
            {siteConfig.name}
          </Link>
          {children}
        </div>
        <div className="bg-primary relative hidden h-full flex-1 rounded-md md:flex">
          <div className="from-background to-background/60 md:to-background/40 absolute inset-0 bg-gradient-to-t" />
        </div>
      </div>
    </>
  );
}
