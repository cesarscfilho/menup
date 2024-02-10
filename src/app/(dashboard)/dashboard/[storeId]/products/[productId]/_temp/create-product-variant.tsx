'use client'

import React from 'react'
import { createProductVariantAction } from '@/actions/variant'

import { Button } from '@/components/ui/button'

export function CreateProductVariantButton() {
  const [isPending, startTransition] = React.useTransition()

  function create() {
    startTransition(async () => {
      await createProductVariantAction({
        productId: '4c5e034b-c761-11ee-ad5e-faafaa4b847e',
        variantId: 'd3ce7ef7-c79d-11ee-ad5e-faafaa4b847e',
      })
    })
  }

  return <Button onClick={create}>Create Product Variant</Button>
}
