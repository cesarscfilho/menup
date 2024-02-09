import { Store } from '@/db/schema'

interface MenuHeaderProps {
  store: Store
}

export default function MenuHeader({ store }: MenuHeaderProps) {
  return (
    <header>
      <div>{store.name}</div>
    </header>
  )
}
