import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

export default function OnboardingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-around">
      <Logo />
      <div className="mx-auto min-h-screen w-full max-w-7xl rounded-md border bg-background/90 shadow lg:min-h-[70vh]">
        <div className="grid h-full grid-cols-1 divide-x lg:grid-cols-2">
          <div className="flex flex-col items-center justify-around p-8 text-start">
            <h2>Wellcome!</h2>
            <Button>Next step</Button>
          </div>
          <div className="hidden flex-col items-center justify-center bg-muted p-8 text-start lg:flex">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            tempora laudantium, natus reprehenderit officiis, repellat expedita
            cupiditate iusto modi ea esse at ex obcaecati doloremque! Fuga
            temporibus velit quas. Dignissimos!
          </div>
        </div>
      </div>
      <p className="text-left text-sm leading-loose text-muted-foreground">
        Built by{' '}
        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold transition-colors hover:text-foreground"
        >
          Cesar Silva
        </Link>
        .
      </p>
    </div>
  )
}
