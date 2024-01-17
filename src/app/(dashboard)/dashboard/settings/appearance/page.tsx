import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppearanceForm } from '@/components/forms/settings/appearance-form'

export default function AppearanceSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearence settings</CardTitle>
      </CardHeader>
      <CardContent>
        <AppearanceForm />
      </CardContent>
    </Card>
  )
}
