import { db } from '@/db'
import { addons } from '@/db/schema'
import { eq } from 'drizzle-orm'

import { Container } from '@/components/container'
import { CreateAddonsButton } from '@/components/create-addons-button'
import { InfoCard } from '@/components/info-card'

interface AddonsPageProps {
  params: {
    storeId: string
  }
}

export default async function AddonsPage({ params }: AddonsPageProps) {
  const { storeId } = params

  const items = await db
    .select()
    .from(addons)
    .where(eq(addons.storeId, storeId))

  return (
    <Container className="mt-8 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Addons</h2>
        <div className="flex items-center space-x-2">
          <CreateAddonsButton label="Create addon" storeId={storeId} />
        </div>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {items.length < 1 ? <InfoCard heading="Not addons" /> : null}
    </Container>
  )
}
