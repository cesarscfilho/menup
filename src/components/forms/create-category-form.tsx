import React from "react"
import { createCategory } from "@/actions/category"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { storeSchema } from "@/lib/validations/store"

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

type Inputs = z.infer<typeof storeSchema>

export function CreateCategoryForm({
  storeId,
  setIsOpen,
}: {
  storeId: string
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(inputs: Inputs) {
    startTransition(async () => {
      try {
        await createCategory({ ...inputs, storeId })

        if (setIsOpen) {
          setIsOpen(false)
        }

        toast.success("Category created successfully")
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
              <FormLabel>Category name:</FormLabel>
              <FormControl>
                <Input placeholder="Pizzas, Drinks..." {...field} />
              </FormControl>
              <FormDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </FormDescription>
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
