import React from "react"
import { createAddons } from "@/actions/addon"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { addonsSchema } from "@/lib/validations/variant"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type Inputs = z.infer<typeof addonsSchema>

export function CreateAddonsForm({
  storeId,
  setIsOpen,
}: {
  storeId: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(addonsSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await createAddons({ ...inputs, storeId })

        if (setIsOpen) {
          setIsOpen(false)
        }

        toast.success("Addon created successfully")
      } catch (error) {}
    })
  }

  return (
    <Form {...form}>
      <form className="h-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Addon name:</FormLabel>
              <FormControl>
                <Input placeholder="Cobertura, Frutas..." {...field} />
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
