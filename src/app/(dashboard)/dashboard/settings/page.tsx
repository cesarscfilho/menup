import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountForm } from '@/components/forms/settings/account-form'

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearence settings</CardTitle>
      </CardHeader>
      <CardContent>
        <AccountForm />
      </CardContent>
    </Card>
  )
}
