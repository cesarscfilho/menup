'use client'

import React from 'react'
import Link from 'next/link'
import { Store as StoreType } from '@/db/schema'
import { ShoppingBasket } from 'lucide-react'

import { Icons } from './icons'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface StoreCardProps {
  store: StoreType
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link href={`/dashboard/${store.id}`} className="group">
      <Card className="relative shadow-sm group-hover:border-primary">
        <CardHeader className="p">
          <CardTitle className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="ml-2 flex flex-col gap-2">
              {store.name}
              <CardDescription className="max-h-10  overflow-hidden text-ellipsis font-normal">
                {store.description}
              </CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-3 w-3 text-violet-400" />5 products
          </div>
          <div className="flex items-center gap-2">
            <Icons.menu className="h-3 w-3 text-sky-400" />2 orders
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
