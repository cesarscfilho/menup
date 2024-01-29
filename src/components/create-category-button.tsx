'use client'

import React from 'react'
import { deleteCategoryAction } from '@/actions/category'
import { Category } from '@/db/schema'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Trash, X } from 'lucide-react'
import { toast } from 'sonner'

import { CreateCategoryForm } from './forms/create-category-form'
import { Button } from './ui/button'
import { Modal } from './ui/modal'
import { Separator } from './ui/separator'

export function CreateCategoryButton({
  storeId,
  label,
  categories,
}: {
  categories: Category[]
  storeId: number
  label: string
}) {
  const [isPending, startTransition] = React.useTransition()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      <Modal showModal={isOpen} setShowModal={setIsOpen}>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 z-20 m-3 hidden items-center md:flex"
        >
          <X className="size-4" />
        </Button>
        <div className="scrollbar-hide grid w-full overflow-auto md:overflow-hidden">
          <div className="space-y-4 p-8 px-4 md:px-8">
            <CreateCategoryForm storeId={storeId} />
            {categories.length > 0 ? (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">All categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex flex-row items-center justify-between rounded-md border border-border p-2"
                      >
                        <p className="text-base">{category.name}</p>
                        <div className="flex gap-2">
                          <Button size="icon" variant="outline">
                            <Pencil1Icon className="size-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              startTransition(async () => {
                                try {
                                  await deleteCategoryAction(category.id)
                                } catch (err) {
                                  toast.success('Category deleted succefully.')
                                }
                              })
                            }}
                            size="icon"
                            variant="destructive"
                          >
                            <Trash className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  )
}
