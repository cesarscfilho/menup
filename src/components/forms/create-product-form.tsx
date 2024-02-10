import React from 'react'
import { createProductAction } from '@/actions/product'
import { Category } from '@/db/schema'
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

export function CreateProductForm({
  storeId,
  setIsOpen,
  categories,
}: {
  categories: Pick<Category, 'id' | 'name'>[]
  storeId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: String(categories[0].id),
      price: '',
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await createProductAction({ ...inputs, storeId })
        setIsOpen(false)
        toast.success('Category created successfully')
      } catch (error) {}
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'description'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description..." {...field} />
              </FormControl>
              <FormDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type product price here."
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" isLoading={isPending} type="submit">
          Create
        </Button>
      </form>
    </Form>
  )
}
