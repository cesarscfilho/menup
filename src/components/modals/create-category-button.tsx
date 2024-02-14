'use client'

import React from 'react'
import { deleteCategoryAction } from '@/actions/category'
import { Category } from '@/db/schema'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Trash, X } from 'lucide-react'
import { toast } from 'sonner'

import { CreateCategoryForm } from '../forms/create-category-form'
import { Button } from '../ui/button'
import { Modal } from '../ui/modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export function CreateCategoryButton({
  storeId,
  label,
  categories,
}: {
  categories: Category[]
  storeId: string
  label: string
}) {
  const [isPending, startTransition] = React.useTransition()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        {label}
      </Button>
      <Modal
        className="min-h-[260px]"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 z-20 m-3 hidden items-center md:flex"
        >
          <X className="size-4" />
        </Button>

        <Tabs
          className="flex flex-col justify-center"
          defaultValue={categories.length > 0 ? 'all' : 'new'}
        >
          <TabsList className="mx-auto mt-5">
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="all">All categories</TabsTrigger>
          </TabsList>
          <TabsContent className="p-5" value="new">
            <CreateCategoryForm storeId={storeId} />
          </TabsContent>
          <TabsContent value="all">
            {categories.length < 1 ? (
              <p className="mt-5 text-muted-foreground">No results...</p>
            ) : (
              <h3 className="m-5 text-base font-bold">All categories</h3>
            )}
            <div className="divide-y">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex h-full flex-row items-center justify-between p-4 hover:bg-muted"
                >
                  <p className="text-base">{category.name}</p>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Pencil1Icon className="size-4" />
                    </Button>
                    <Button
                      isLoading={isPending}
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
          </TabsContent>
        </Tabs>
      </Modal>
    </>
  )
}
