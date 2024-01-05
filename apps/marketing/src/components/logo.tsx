import Link from "next/link";

import siteConfig from "@/config/site";
import { Icons } from "./icons";

export function Logo() {
  return (
    <Link href="/" className="text-primary flex items-center">
      <Icons.logo className="h-8 w-auto" />
      <p className="ml-2 text-base font-extrabold">{siteConfig.name}</p>
    </Link>
  );
}
