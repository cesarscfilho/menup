import { TrashIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Container } from '@/components/container'
import { DeleteStoreForm } from '@/components/forms/delete-store-action'

export default function StoreSettingsAdvancedPage({
  params,
}: {
  params: { storeId: string }
}) {
  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Advanced</h2>
      </div>
      <Card className={cn('max-w-[580px] shadow-sm')}>
        <CardHeader>
          <CardTitle className="flex flex-row items-center p-0">
            <TrashIcon className="mr-2 h-5 w-5 " />
            Delete account
          </CardTitle>
          <CardDescription>Delete your store and products.</CardDescription>
        </CardHeader>
        <CardContent className="rounded-nome m-2 grid gap-2 border-t bg-background p-6">
          <p className="text-base">Confirm deletion:</p>
          <p className="text-sm text-muted-foreground">
            Please type &quot;I understand and I want to delete my store&quot;
            in the field below to confirm account deletion.
          </p>
          <DeleteStoreForm storeId={params.storeId} />
        </CardContent>
      </Card>
    </Container>
  )
}
