'use client'

import React from 'react'
import { createVariantAction } from '@/actions/variant'

import { Button } from '@/components/ui/button'

export function CreateVariantButton({ storeId }: { storeId: string }) {
  const [isPending, startTransition] = React.useTransition()

  function create() {
    startTransition(async () => {
      await createVariantAction({ name: 'Variant 3', storeId, price: '20' })
    })
  }

  return <Button onClick={create}>Create Variant</Button>
}
