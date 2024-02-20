'use client'

import React from 'react'
import { addProductCategoryAddonsAction } from '@/actions/addon'
import { toast } from 'sonner'

import { Button } from '../ui/button'

export function AddProductCategoryAddons({
  productId,
  storeId,
}: {
  productId: string
  storeId: string
}) {
  const [isPending, startTransition] = React.useTransition()

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          try {
            await addProductCategoryAddonsAction(productId, storeId)
            toast.success('Category added successfully')
          } catch (e) {}
        })
      }}
      isLoading={isPending}
    >
      Add category
    </Button>
  )
}
