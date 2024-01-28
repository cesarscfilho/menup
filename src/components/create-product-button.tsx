'use client'

import React from 'react'
import { Category } from '@/db/schema'
import { X } from 'lucide-react'

import { CreateProductForm } from './forms/create-product-form'
import { Button } from './ui/button'
import { Modal } from './ui/modal'

export function CreateProductButton({
  storeId,
  categories,
  label,
}: {
  storeId: number
  label: string
  categories: Pick<Category, 'id' | 'name'>[]
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button size={'sm'} onClick={() => setIsOpen(true)}>
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
        <div className="scrollbar-hide grid max-h-[90vh] w-full overflow-auto md:overflow-hidden">
          <div className="p-8 px-5">
            <CreateProductForm
              categories={categories}
              storeId={storeId}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
