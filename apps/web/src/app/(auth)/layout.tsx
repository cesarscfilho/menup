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
    <div className="flex h-screen w-screen justify-center">
      <Background />
      {children}
    </div>
  );
}
