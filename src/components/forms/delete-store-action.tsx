"use client"

import React from "react"
import { deleteStore } from "@/actions/store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { deleteStoreSchema } from "@/lib/validations/store"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface CreateStoreFormProps {
  storeId: string
}

export function DeleteStoreForm({ storeId }: CreateStoreFormProps) {
  const [isDeletingStore, startDeletingStore] = React.useTransition()

  const form = useForm<z.infer<typeof deleteStoreSchema>>({
    resolver: zodResolver(deleteStoreSchema),
  })

  function onSubmit() {
    startDeletingStore(async () => {
      try {
        await deleteStore(storeId)
        toast.success("Store delete successfully.")
      } catch (error) {
        toast.error("Error")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormControl>
            <Input
              placeholder="I understand and I want to store my account"
              {...form.register("confirmPhase")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button
          disabled={isDeletingStore || !form.formState.isValid}
          isLoading={isDeletingStore}
          type="submit"
          variant={"destructive"}
          className="w-full"
        >
          Delete account
        </Button>
      </form>
    </Form>
  )
}
