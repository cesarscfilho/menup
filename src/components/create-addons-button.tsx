'use client'

import React from 'react'
import { X } from 'lucide-react'

import { CreateAddonsForm } from './forms/create-addons-form'
import { Button } from './ui/button'
import { Modal } from './ui/modal'

export function CreateAddonsButton({
  storeId,
  label,
}: {
  storeId: string
  label: string
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
            <CreateAddonsForm storeId={storeId} setIsOpen={setIsOpen} />
          </div>
        </div>
      </Modal>
    </>
  )
}
