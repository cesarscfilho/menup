'use client'

import React from 'react'
import {
  updateAddonCategoryAction,
  updateAddonCategoryStatusAction,
} from '@/actions/addon-category'
import { Addon } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import uuid from 'react-uuid'
import { toast } from 'sonner'
import { z } from 'zod'

import { updateAddonSchema } from '@/lib/validations/addon'

import { AddonsNestedArray } from './addons-nested-array'
import { InfoCard } from './info-card'
import { Button } from './ui/button'
import { Card, CardHeader } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Switch } from './ui/switch'

interface ProductAddonsListProps {
  productCategoriesWithAddons: {
    categoryId: string
    name: string
    quantityMin: number
    quantityMax: number
    mandatory: boolean
    active: boolean
    items: Pick<Addon, 'id' | 'name' | 'price'>[]
  }[]
  storeId: string
  productId: string
}

export type FormValues = z.infer<typeof updateAddonSchema>

export function ProductAddonsList({
  productCategoriesWithAddons,
  storeId,
  productId,
}: ProductAddonsListProps) {
  const [isPendingUpdateStatus, startTransitionUpdate] = React.useTransition()
  const [isPendingSubmit, startTransitionSubmit] = React.useTransition()

  const defaultValues = {
    items: productCategoriesWithAddons.map((item) => ({
      categoryId: item.categoryId,
      name: item.name,
      quantityMin: item.quantityMin,
      quantityMax: item.quantityMax,
      mandatory: item.mandatory,
      active: item.active,
      categoryAddons: item.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price ?? '0',
      })),
    })),
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(updateAddonSchema),
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: form.control,
  })

  function onSubmit(data: FormValues) {
    startTransitionSubmit(async () => {
      try {
        await updateAddonCategoryAction({
          inputs: { items: { ...data.items }, productId, storeId },
        })

        toast.success('Addons updated succefully.')
      } catch (err) {
        console.log(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-3">
          <div className="col-span-2 space-y-6">
            {fields.length < 1 ? (
              <InfoCard heading="This product dons't have addons yet" />
            ) : null}

            {fields.map((item, categoryIndex) => {
              return (
                <Card key={item.id}>
                  <CardHeader className="space-y-3 p-4">
                    <div className="flex flex-row items-center justify-between">
                      <FormField
                        control={form.control}
                        name={`items.${categoryIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-row items-center gap-2">
                        <Switch
                          {...form.register(`items.${categoryIndex}.active`)}
                          disabled={isPendingUpdateStatus}
                          defaultChecked={item.active}
                          onCheckedChange={() => {
                            startTransitionUpdate(async () => {
                              await updateAddonCategoryStatusAction({
                                addonCategoryId:
                                  fields[categoryIndex].categoryId,
                                storeId,
                              })
                            })
                          }}
                        />
                        <Button
                          type="button"
                          className="size-7"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            remove(categoryIndex)
                          }}
                        >
                          <Trash className="size-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex w-[200px] flex-row items-center gap-3">
                        <span className="text-sm">Min</span>
                        <FormField
                          control={form.control}
                          name={`items.${categoryIndex}.quantityMin`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <span className="text-sm">Max</span>
                        <FormField
                          control={form.control}
                          name={`items.${categoryIndex}.quantityMax`}
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
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...form.register(`items.${categoryIndex}.mandatory`)}
                          className="bg-background"
                          id="terms"
                        />
                        <Label htmlFor="terms">Mandatory filling</Label>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />

                  <AddonsNestedArray
                    categoryId={fields[categoryIndex].categoryId}
                    nestIndex={categoryIndex}
                    control={form.control}
                  />
                </Card>
              )
            })}
          </div>

          <Card className="fixed inset-x-0 bottom-0 h-fit flex-col items-center justify-around rounded-b-none p-2 md:sticky md:top-32 md:flex md:space-y-2 md:rounded-xl md:p-4">
            <Button
              type="button"
              onClick={() =>
                append({
                  categoryId: uuid(),
                  name: 'New category',
                  active: true,
                  mandatory: false,
                  categoryAddons: [{ id: uuid(), name: 'Item', price: '0' }],
                  quantityMax: 1,
                  quantityMin: 0,
                })
              }
              variant={'outline'}
              className="hidden w-full md:flex"
            >
              Add category
            </Button>
            <div className="flex w-full flex-row gap-2">
              <Button
                type="button"
                className="w-full"
                variant={'outline'}
                onClick={() => {
                  form.reset(defaultValues)
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isPendingSubmit}
                type="submit"
                className="w-full"
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      </form>
    </Form>
  )
}
