"use client"

import React from "react"
import { addAddonInProductAddonCategoryRelation } from "@/actions/addon"
import { MinusCircle, Plus, X } from "lucide-react"
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { toast } from "sonner"

import { ProductCategoriesWithAddons } from "@/types/product"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Modal } from "../ui/modal"
import { Separator } from "../ui/separator"

export function EditProductCategoryAddons({
  fields,
  allAddons,
  categoryName,
  productId,
  addonCategoryId,
  storeId,
  appendFieldArray,
  removeFieldArray,
}: {
  storeId: string
  productId: string
  addonCategoryId: string
  fields: {
    addonId: string
    name: string
    price: string | null
  }[]
  allAddons: {
    addonId: string
    name: string
    price: string | null
  }[]
  categoryName: string
  appendFieldArray: UseFieldArrayAppend<ProductCategoriesWithAddons, "addons">
  removeFieldArray: UseFieldArrayRemove
}) {
  const [isPending, startTransition] = React.useTransition()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"sm"}
        type="button"
        variant="outline"
        className="w-full"
      >
        Add addon
      </Button>

      <Modal
        preventDefaultClose={true}
        showModal={isOpen}
        setShowModal={setIsOpen}
        className="flex h-[90vh] flex-col justify-between p-4"
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 z-20 m-3 hidden items-center md:flex"
        >
          <X className="size-4" />
        </Button>

        <div>
          <h3 className="text-2xl font-bold tracking-tight">{categoryName}</h3>

          <div className="mt-8 space-y-3">
            {fields.map((item, i) => (
              <div
                key={item.addonId}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-base">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Input className="w-[100px] bg-background" placeholder="$0" />
                  <Button
                    onClick={() => removeFieldArray(i)}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <MinusCircle size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {fields.length < 1 && <p>No results...</p>}

          <Separator className="my-4" />

          <div className="space-y-3">
            {allAddons.map((addon) => (
              <div
                key={addon.addonId}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-base">{addon.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      appendFieldArray({
                        addonId: addon.addonId,
                        name: addon.name,
                        price: addon.price,
                      })
                    }
                    variant={"outline"}
                    size={"icon"}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          isLoading={isPending}
          onClick={() => {
            startTransition(async () => {
              try {
                await addAddonInProductAddonCategoryRelation({
                  items: fields.map((field) => ({
                    id: field.addonId,
                    name: field.name,
                    price: field.price,
                  })),
                  productId,
                  addonCategoryId,
                  storeId,
                })
                setIsOpen(false)

                toast.success("Addons added successfully.")
              } catch (e) {}
            })
          }}
          className="w-full"
        >
          Save
        </Button>
      </Modal>
    </>
  )
}
