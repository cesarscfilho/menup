import { redirect } from 'next/navigation'
import { getStoresAction } from '@/actions/store'

import { auth } from '@/lib/auth'
import { Container } from '@/components/container'
import CreateStoreButton from '@/components/create-store-button'
import { StoreCard } from '@/components/store-card'

export default async function DashboardIndex() {
  const session = await auth()

  if (!session) {
    redirect('login')
  }

  const stores = await getStoresAction(session.user.id)

  return (
    <>
      <div className="flex h-32 items-center border-b bg-muted">
        <Container className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My stores</h1>
            <CreateStoreButton />
          </div>
        </Container>
      </div>
      <Container>
        <div className="my-10 grid flex-1 grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <StoreCard key={store.id} title={store.name} />
          ))}
        </div>
      </Container>
    </>
  )
}
