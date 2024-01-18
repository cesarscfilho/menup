import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from '@/components/forms/settings/appearance-form'
import { DashboardSettingsHeader } from '@/components/settings-header'

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardSettingsHeader
        title="Appearance"
        description="Customize the appearance of the app. Automatically switch between day and night themes."
      />
      <Separator />
      <div>
        <Card className="p-6">
          <CardContent>
            <AppearanceForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
