import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background shadow-sm transition-colors hover:bg-secondary/95">
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
  );
}
