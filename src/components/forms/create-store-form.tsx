import React from 'react'
import { createStoreAction } from '@/actions/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { storeSchema } from '@/lib/validations/store'

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
import { Textarea } from '../ui/textarea'

type Inputs = z.infer<typeof storeSchema>

export function CreateStoreForm({
  userId,
  setIsOpen,
}: {
  userId: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await createStoreAction({ ...inputs, userId })
        setIsOpen(false)
        toast.success('Store created successfully')
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
                This is the name that will be displayed on your profile and in
                emails.
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
                <Textarea placeholder="Acme description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button isLoading={isPending} type="submit">
          Create
        </Button>
      </form>
    </Form>
  )
}
