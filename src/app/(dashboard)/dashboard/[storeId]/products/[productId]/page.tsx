import { notFound } from 'next/navigation'
import { db } from '@/db'
import { products } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/container'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  return (
    <Container className="my-8 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Preview</h2>
        <div className="flex items-center space-x-2">
          <Button>Save</Button>
        </div>
      </div>
      <div className="relative m-auto h-[600px] max-h-fit w-full max-w-4xl rounded-2xl border border-border bg-background p-0 shadow">
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 z-20 m-3 hidden items-center md:flex"
        >
          <X className="size-4" />
        </Button>

        <h1>{product.name}</h1>
      </div>
    </Container>
  )
}
