import Link from 'next/link'

import { Icons } from './icons'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Separator } from './ui/separator'

export async function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 text-secondary-foreground"
          size="sm"
        >
          <Icons.bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" alignOffset={-30} className="w-80 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Notifications</span>
          <Link className="text-muted-foreground hover:text-primary" href="/">
            <Icons.settings className="h-4 w-4" />
          </Link>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
              <Icons.chevronup className="text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <strong> Cesar Silva</strong>.
              </p>
              <time className="text-xs text-muted-foreground">
                15 minutes ago
              </time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
              <Icons.chevronup className="text-red-500" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <strong> Cesar Silva</strong>.
              </p>
              <time className="text-xs text-muted-foreground">4 hours ago</time>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-full border border-primary/10 bg-primary/5 p-2">
              <Icons.chevronup className="text-red-500" />
            </div>
            <div className="space-y-1">
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                <strong> Cesar Silva</strong>.
              </p>
              <time className="text-xs text-muted-foreground">6 hours ago</time>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            See all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
