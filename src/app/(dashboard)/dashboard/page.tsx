import { Button } from '@/components/ui/button'
import { Container } from '@/components/container'

export default function DashboardIndex() {
  return (
    <>
      <div className="flex h-32 items-center border-b bg-muted">
        <Container className="w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">My stores</h1>
            <Button>Create</Button>
          </div>
        </Container>
      </div>
      <Container>
        <div className="my-10 grid flex-1 grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3"></div>
      </Container>
    </>
  )
}
