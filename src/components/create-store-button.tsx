'use client'

import React from 'react'
import { X } from 'lucide-react'

import { CreateStoreForm } from './forms/create-store-form'
import { Button } from './ui/button'
import { Modal } from './ui/modal'

export function CreateStoreButton({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Create store</Button>
      <Modal
        preventDefaultClose={true}
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0 z-20 m-3 hidden items-center md:flex"
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="scrollbar-hide grid min-h-[90vh] w-full overflow-auto md:overflow-hidden">
          <div className="p-5 pt-8">
            <CreateStoreForm userId={userId} setIsOpen={setIsOpen} />
          </div>
        </div>
      </Modal>
    </>
  )
}
