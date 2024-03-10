"use client"

import React from "react"
import {
  deleteProductCategoryAddons,
  updateProductCategoryAddons,
} from "@/actions/addon"
import { zodResolver } from "@hookform/resolvers/zod"
import { MinusCircle, Trash } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

import { ProductCategoriesWithAddons } from "@/types/product"
import { productCategoriesWithAddonsSchema } from "@/lib/validations/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import { EditProductCategoryAddons } from "../modals/edit-product-category-addons"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

interface Props {
  allAddons: {
    addonId: string
    name: string
    price: string | null
  }[]
  category: ProductCategoriesWithAddons
  productId: string
  storeId: string
}

export function ProductCategoriesAddonsForm({
  allAddons,
  category,
  productId,
  storeId,
}: Props) {
  const [isPending, startTransition] = React.useTransition()
  const [isDeleting, startTransitionDeleting] = React.useTransition()

  const form = useForm<ProductCategoriesWithAddons>({
    resolver: zodResolver(productCategoriesWithAddonsSchema),
    defaultValues: {
      name: category.name,
      categoryId: category.categoryId,
      quantityMin: category.quantityMin,
      quantityMax: category.quantityMax,
      mandatory: category.mandatory,
      active: category.active,
      addons: category.addons.map((addon) => ({
        addonId: addon.addonId,
        name: addon.name,
        price: addon.price,
      })),
    },
  })

  function onSubmit(inputs: ProductCategoriesWithAddons) {
    startTransition(async () => {
      try {
        await updateProductCategoryAddons({
          ...inputs,
          id: productId,
          storeId,
        })

        toast.success("Category updated successfully")
      } catch (e) {}
    })
  }

  const { fields, append, remove } = useFieldArray({
    name: "addons",
    control: form.control,
  })

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
                        await deleteProductCategoryAddons({
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
                          value={Number.isNaN(field.value) ? "" : field.value}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-sm">Max</span>
                <FormField
                  control={form.control}
                  name="quantityMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={Number.isNaN(field.value) ? "" : field.value}
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
            {category.addons.length < 1 ? <p>No results...</p> : null}

            {category.addons.map((item) => {
              return (
                <div
                  key={item.addonId}
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
                    <Button variant={"destructive"} size={"icon"}>
                      <MinusCircle size={16} />
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>

          <CardFooter className="space-x-4 p-4">
            <EditProductCategoryAddons
              addonCategoryId={category.categoryId}
              productId={productId}
              removeFieldArray={remove}
              appendFieldArray={append}
              categoryName={category.name}
              allAddons={allAddons}
              fields={fields}
              storeId={storeId}
            />
            <Button
              isLoading={isPending}
              size={"sm"}
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
