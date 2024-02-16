import { MinusCircle, Plus } from 'lucide-react'
import { Control, useFieldArray } from 'react-hook-form'
import uuid from 'react-uuid'

import { FormValues } from './product-addons-list'
import { Button } from './ui/button'
import { CardContent, CardFooter } from './ui/card'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

interface AddonsNestedArrayProps {
  nestIndex: number
  control: Control<FormValues>
  categoryId: string
}

export function AddonsNestedArray({
  nestIndex,
  control,
}: AddonsNestedArrayProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `items.${nestIndex}.categoryAddons`,
  })

  return (
    <>
      <CardContent className="grid gap-4 p-4">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between space-x-2"
          >
            <div className="flex items-center space-x-4">
              <div className="h-9 w-9 rounded-sm bg-green-400/80" />
              <FormField
                control={control}
                name={`items.${nestIndex}.categoryAddons.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <FormField
                control={control}
                name={`items.${nestIndex}.categoryAddons.${index}.price`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={'destructive'}
                size={'icon'}
                className="size-7"
                onClick={() => {
                  remove(index)
                }}
              >
                <MinusCircle className="size-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4">
        <Button
          type="button"
          onClick={() => append({ id: uuid(), name: '', price: '0' })}
          size="sm"
          variant="outline"
          className="w-full"
        >
          <Plus className="mr-2 size-3" /> Add addon
        </Button>
      </CardFooter>
    </>
  )
}
