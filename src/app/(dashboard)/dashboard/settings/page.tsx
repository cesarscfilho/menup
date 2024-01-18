import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AccountForm } from '@/components/forms/settings/account-form'
import { DashboardSettingsHeader } from '@/components/settings-header'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardSettingsHeader title="Account settings" />
      <Separator />
      <div>
        <Card className="p-6">
          <CardContent>
            <AccountForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
