import { Container } from '@/components/container'
import { CreateAddonsButton } from '@/components/create-addons-button'

interface AddonsPageProps {
  params: {
    storeId: string
  }
}

export default async function AddonsPage({ params }: AddonsPageProps) {
  const { storeId } = params

  return (
    <Container className="mt-8 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Addons</h2>
        <div className="flex items-center space-x-2">
          <CreateAddonsButton label="Create addon" storeId={storeId} />
        </div>
      </div>

      {/* <AddonsTableShell /> */}

      {/* {items.length < 1 ? <InfoCard heading="Not addons" /> : null} */}
    </Container>
  )
}
