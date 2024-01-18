import { TrashIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { DeleteStoreForm } from '@/components/forms/delete-store-action'
import { DashboardSettingsHeader } from '@/components/settings-header'

export default function StoreSettingsAdvancedPage({
  params,
}: {
  params: { storeId: string }
}) {
  return (
    <div className="space-y-6">
      <DashboardSettingsHeader title="Advanced settings" />
      <Separator />
      <div>
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
      </div>
    </div>
  )
}
