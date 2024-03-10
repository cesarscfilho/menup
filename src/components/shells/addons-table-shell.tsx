"use client"

import React from "react"
import Link from "next/link"
import { deleteAddon, updateAddonStatus } from "@/actions/addon"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { toast } from "sonner"

import { formatPrice } from "@/lib/utils"

import { DataTable } from "../data-table/data-table"
import { DataTableColumnHeader } from "../data-table/data-table-column-header"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Switch } from "../ui/switch"

type AwaitedAddon = {
  id: string
  name: string
  price: string | null
  active: boolean
}

interface ProductsTableShellProps {
  promise: Promise<{
    data: AwaitedAddon[]
    pageCount: number
  }>
  storeId: string
}

export function AddonsTableShell({
  promise,
  storeId,
}: ProductsTableShellProps) {
  const { data, pageCount } = React.use(promise)

  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([])

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<AwaitedAddon, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length ? [] : data.map((row) => row.id)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id]
                  : prev.filter((id) => id !== row.original.id)
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
      },
      {
        accessorKey: "active",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Active" />
        ),
        cell: ({ cell, row }) => {
          return (
            <Switch
              disabled={isPending}
              checked={cell.getValue() as boolean}
              onCheckedChange={() => {
                startTransition(async () => {
                  await updateAddonStatus({
                    id: row.original.id,
                  })
                })
              }}
            />
          )
        },
        enableColumnFilter: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/${storeId}/products/${row.original.id}`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/product/${row.original.id}`}>
                  View on storefront
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false)
                  })

                  toast.promise(
                    deleteAddon({
                      id: row.original.id,
                      storeId,
                    }),
                    {
                      loading: "Deleting...",
                      success: () => "Addon deleted successfully.",
                      error: (err: unknown) => {
                        console.log(err)
                        return null
                      },
                    }
                  )
                }}
                disabled={isPending}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, storeId, isPending]
  )

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(
        selectedRowIds.map((id) =>
          deleteAddon({
            id,
            storeId,
          })
        )
      ),
      {
        loading: "Deleting...",
        success: () => {
          setSelectedRowIds([])
          return "Addonds deleted successfully."
        },
        error: (err: unknown) => {
          setSelectedRowIds([])
          console.log(err)
          return null
        },
      }
    )
  }

  return (
    <DataTable
      data={data}
      pageCount={pageCount}
      columns={columns}
      filterableColumns={[
        {
          id: "active",
          title: "Active",
          options: [
            {
              value: "true",
              label: "Active",
            },
            {
              value: "false",
              label: "Inactive",
            },
          ],
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
      //   newRowButton={
      //     <CreateProductButton label="New product" storeId={storeId} />
      //   }
      deleteRowsAction={() => void deleteSelectedRows()}
    />
  )
}
