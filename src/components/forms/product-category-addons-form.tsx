'use client'

import React from 'react'
import {
  deleteProductCategoryAddonsAction,
  updateProductCategoryAddonsAction,
} from '@/actions/addon'
import { zodResolver } from '@hookform/resolvers/zod'
import { MinusCircle, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ProductCategoriesWithAddons } from '@/types/product'
import { productCategoriesWithAddonsSchema } from '@/lib/validations/product'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface Props {
  category: ProductCategoriesWithAddons
  productId: string
  storeId: string
}

const schemaWithoutItems = productCategoriesWithAddonsSchema.omit({
  items: true,
})

type Inputs = z.infer<typeof schemaWithoutItems>

export function ProductCategoriesAddonsForm({
  category,
  productId,
  storeId,
}: Props) {
  const [isPending, startTransition] = React.useTransition()
  const [isDeleting, startTransitionDeleting] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(schemaWithoutItems),
    defaultValues: {
      name: category.name,
      categoryId: category.categoryId,
      quantityMin: category.quantityMin,
      quantityMax: category.quantityMax,
      mandatory: category.mandatory,
      active: category.active,
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await updateProductCategoryAddonsAction({
          ...inputs,
          productId,
          storeId,
        })

        toast.success('Category updated successfully')
      } catch (e) {}
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Card key={category.categoryId}>
          <CardHeader className="space-y-3 p-4">
            <div className="flex flex-row items-center justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row items-center gap-2">
                <Switch id="necessary" defaultChecked />
                <Button
                  type="button"
                  isLoading={isDeleting}
                  onClick={() => {
                    startTransitionDeleting(async () => {
                      try {
                        await deleteProductCategoryAddonsAction({
                          categoryId: category.categoryId,
                          productId,
                          storeId,
                        })
                      } catch (e) {}
                    })
                  }}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="size-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex w-[200px] flex-row items-center gap-3">
                <span className="text-sm">Min</span>
                <FormField
                  control={form.control}
                  name="quantityMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={Number.isNaN(field.value) ? '' : field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-sm">Max</span>{' '}
                <FormField
                  control={form.control}
                  name="quantityMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={Number.isNaN(field.value) ? '' : field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mandatory"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Mandatory
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="grid gap-4 p-4">
            {category.items.length < 1 ? <p>No results...</p> : null}

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
                  <Input className="w-[100px] bg-background" placeholder="$0" />
                  <Button variant={'destructive'} size={'icon'}>
                    <MinusCircle size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>

          <CardFooter className="space-x-4 p-4">
            <Button
              size={'sm'}
              type="button"
              variant="outline"
              className="w-full"
            >
              Add addon
            </Button>
            <Button
              isLoading={isPending}
              size={'sm'}
              type="submit"
              className="w-full"
            >
              Salve
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
