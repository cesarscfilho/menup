import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

const includedFeatures = [
  "Private forum access",
  "Private forum access",
  "Member resources",
  "Member resources",
  "Entry to annual conference",
  "Entry to annual conference",
  "Official member t-shirt",
  "Official member t-shirt",
]

interface PrincigCardProps {
  popular?: boolean
}

export default function PrincigCard({ popular }: PrincigCardProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full rounded-3xl bg-background ring-1 ring-border",
        { "border-2 border-blue-500": popular }
      )}
    >
      {popular && (
        <div
          className="text-semibold absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-blue-500 px-8 py-2 text-sm
        "
        >
          Popular
        </div>
      )}
      <div className="p-2 lg:mt-0">
        <div className="rounded-2xl bg-muted/50 py-10 text-center ring-1 ring-inset ring-border lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-6">
            <p className="text-base font-semibold">
              For startups & side projects
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight">$349</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                USD
              </span>
            </p>
            <Button className="mt-10 px-16">Get access</Button>
            <p className="text-md mt-6 leading-5 text-muted-foreground">
              Per month
            </p>
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-10 lg:flex-auto">
        <ul
          role="list"
          className="leading-6sm:gap-6 grid grid-cols-1 gap-4 text-sm text-muted-foreground"
        >
          {includedFeatures.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon className="h-6 w-5 flex-none" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
