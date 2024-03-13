import Link from "next/link"
import { env } from "@/env"

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <Link href={`/login`}> Home</Link>
    </div>
  )
}
