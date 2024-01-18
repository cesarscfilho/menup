import { Separator } from '@/components/ui/separator'
import { DashboardSettingsHeader } from '@/components/settings-header'

export default function StoreSettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardSettingsHeader
        title="Store profile"
        description="This is how others will see you on the site."
      />
      <Separator />
    </div>
  )
}
