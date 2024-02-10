'use client'

import React from 'react'
import { updateProductAction } from '@/actions/product'
import { Category, Product } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { productSchema } from '@/lib/validations/product'

import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'

type Inputs = z.infer<typeof productSchema>

export function UpdateProductForm({
  categories,
  product,
}: {
  categories: Pick<Category, 'id' | 'name'>[]
  product: Product
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: product.categoryId,
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await updateProductAction({
          ...inputs,
          productId: product.id,
          storeId: product.storeId,
        })
        toast.success('Product updated successfully.')
      } catch (error) {}
    })
  }

  return (
    <Form {...form}>
      <form
        className="max-w-[600px] space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              defaultValue={product.name}
              placeholder="Acme Inc."
              {...form.register('name')}
            />
          </FormControl>
          <FormDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Description..."
              {...form.register('description')}
              defaultValue={product.description ?? ''}
            />
          </FormControl>
          <FormDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="w-full">
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              placeholder="Type product price here."
              defaultValue={product.price ?? ''}
              {...form.register('price')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button isLoading={isPending} type="submit">
          Save
        </Button>
      </form>
    </Form>
  )
}
