import { notFound } from 'next/navigation'
import { db } from '@/db'
import {
  categories,
  Product,
  products,
  productsVariants,
  Variant,
  variants,
} from '@/db/schema'
import { eq } from 'drizzle-orm'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '@/components/container'
import { UpdateProductForm } from '@/components/forms/update-product-form'
import { InfoCard } from '@/components/info-card'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params

  const { product, productVariants } = await db
    .select({
      product: products,
      productVariant: {
        id: variants.id,
        name: variants.name,
        price: variants.price,
      },
    })
    .from(products)
    .where(eq(products.id, productId))
    .leftJoin(productsVariants, eq(products.id, productsVariants.productId))
    .leftJoin(variants, eq(productsVariants.variantId, variants.id))
    .then((items) => {
      const products = items.reduce<
        Record<
          string,
          {
            product: Product
            productVariants: Pick<Variant, 'name' | 'price'>[]
          }
        >
      >((acc, row) => {
        const product = row.product
        const productVariant = row.productVariant

        if (!acc[product.id]) {
          acc[product.id] = {
            product,
            productVariants: [],
          }
        }
        if (productVariant) {
          acc[product.id].productVariants.push(productVariant)
        }

        return acc
      }, {})

      return Object.values(products)[0]
    })

  if (!product) {
    notFound()
  }

  const allCategories = await db.query.categories.findMany({
    where: eq(categories.storeId, product.storeId),
  })

  return (
    <Container className="my-8">
      <Tabs defaultValue="product" className="space-y-4">
        <TabsList>
          <TabsTrigger value="product">Product</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          <div className="mb-5 flex items-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Update product
            </h2>
          </div>

          <UpdateProductForm product={product} categories={allCategories} />
        </TabsContent>
        <TabsContent value="variants">
          <div className="mb-5 flex items-center gap-2 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Variants</h2>
          </div>
          {productVariants.length < 1 ? (
            <InfoCard heading="This product dons't have variants yet" />
          ) : null}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
