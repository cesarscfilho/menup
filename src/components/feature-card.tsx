import * as React from 'react'

import { CheckIcon } from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="bg-background hover:bg-secondary/95 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg shadow-sm transition-colors">
      <CardHeader>
        <div className="grid h-11 w-11 place-items-center rounded-full border-2">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-1.5 text-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
