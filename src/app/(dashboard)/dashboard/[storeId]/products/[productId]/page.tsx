import { db } from '@/db'
import {
  addons,
  AddonsCategory,
  addonsCategory,
  productsCategoryAddons,
} from '@/db/schema'
import { and, eq } from 'drizzle-orm'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '@/components/container'
import { InfoCard } from '@/components/info-card'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params

  const productAddons = await db
    .select({
      category: {
        id: addonsCategory.id,
        name: addonsCategory.name,
      },
      items: {
        id: addons.id,
        name: addons.name,
      },
    })
    .from(addonsCategory)
    .where(eq(addonsCategory.productId, productId))
    .leftJoin(
      productsCategoryAddons,
      and(
        eq(productsCategoryAddons.productId, productId),
        eq(productsCategoryAddons.addonsCategoryId, addonsCategory.id),
      ),
    )
    .leftJoin(addons, eq(addons.id, productsCategoryAddons.addonsId))
    .then((res) => {
      const items = res.reduce<
        Record<
          string,
          {
            name: string
            id: string
            items: Pick<AddonsCategory, 'id' | 'name'>[]
          }
        >
      >((acc, row) => {
        const category = row.category
        const item = row.items

        if (!acc[category.name]) {
          acc[category.name] = {
            ...category,
            items: [],
          }
        }

        if (item) {
          acc[category.name].items.push(item)
        }

        return acc
      }, {})

      return Object.values(items)
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

          {/* <UpdateProductForm product={product} categories={allCategories} /> */}
        </TabsContent>
        <TabsContent value="variants">
          <div className="mb-5 flex items-center gap-2 space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Variants</h2>
          </div>
          {productAddons.length < 1 ? (
            <InfoCard heading="This product dons't have variants yet" />
          ) : null}

          {productAddons.map((item) => (
            <div key={item.id}>
              {item.name} =
              {item.items.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </Container>
  )
}
