import { cn } from "@/lib/utils";
import { Button } from "@menup/ui";
import { CheckIcon } from "@radix-ui/react-icons";

const includedFeatures = [
  "Private forum access",
  "Private forum access",
  "Member resources",
  "Member resources",
  "Entry to annual conference",
  "Entry to annual conference",
  "Official member t-shirt",
  "Official member t-shirt",
];

interface PrincigCardProps {
  popular?: boolean
}

export default function PrincigCard({ popular }: PrincigCardProps) {
  return (
    <div className={cn("relative bg-background ring-border mx-auto w-full rounded-3xl ring-1", { "border border-2 border-blue-500" : popular })}>
      {popular && (
        <div className="absolute px-8 py-2 bg-blue-500 rounded-xl text-semibold text-sm absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        ">Popular</div>
      )}

      <div className="p-2 lg:mt-0">
        <div className="bg-muted/50 ring-border rounded-2xl py-10 text-center ring-1 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-6">
            <p className="text-base font-semibold">
              For startups & side projects
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight">$349</span>
              <span className="text-muted-foreground text-sm font-semibold leading-6 tracking-wide">
                USD
              </span>
            </p>
            <Button className="mt-10 px-16">Get access</Button>
            <p className="mt-6 text-md leading-5 text-muted-foreground">Per month</p>
          </div>
        </div>
      </div>
      <div className="p-8 sm:p-10 lg:flex-auto">
        <ul
          role="list"
          className="leading-6sm:gap-6 text-muted-foreground grid grid-cols-1 gap-4 text-sm"
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
  );
}
