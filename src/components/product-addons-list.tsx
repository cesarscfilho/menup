import React from 'react'
import { AddonsCategory } from '@/db/schema'
import { MinusCircle } from 'lucide-react'

import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'

interface ProductAddonsListProps {
  addons: {
    name: string
    id: string
    items: Pick<AddonsCategory, 'id' | 'name'>[]
  }[]
}

export default function ProductAddonsList({ addons }: ProductAddonsListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-3">
      <div className="col-span-2 space-y-6">
        {addons.map((category) => (
          <Card key={category.id}>
            <CardHeader className="space-y-3 p-4">
              <div className="flex flex-row items-center justify-between">
                <Input
                  className="w-[60%] bg-background  font-semibold leading-none tracking-tight"
                  value={category.name}
                />
                <Switch id="necessary" defaultChecked />
              </div>
              <div className="space-y-2">
                <div className="flex w-[200px] flex-row items-center gap-3">
                  <span className="text-sm">Min</span>
                  <Input className="bg-background" />
                  <span className="text-sm">Max</span>
                  <Input className="bg-background" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox className="bg-background" id="terms" />
                  <Label htmlFor="terms">Mandatory filling</Label>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="grid gap-4 p-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-2"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-sm bg-green-400/80" />
                    <span className="text-base">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      className="w-[100px] bg-background"
                      placeholder="$0"
                    />
                    <Button variant={'destructive'} size={'icon'}>
                      <MinusCircle size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>

            <CardFooter className="p-4">
              <Button variant="outline" className="w-full">
                Add addon
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="fixed inset-x-0 bottom-0 h-fit flex-col items-center justify-around rounded-b-none p-2 md:sticky md:top-32 md:flex md:space-y-2 md:rounded-xl md:p-4">
        <Button variant={'outline'} className="hidden w-full md:flex">
          Add category
        </Button>
        <Button className="w-full">Save</Button>
      </Card>
    </div>
  )
}
