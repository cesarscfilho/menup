import React from 'react'
import { db } from '@/db'
import { Addon, addons } from '@/db/schema'
import { and, asc, desc, eq, like, sql } from 'drizzle-orm'

import { addonsSearchParamsSchema } from '@/types/params'
import { Container } from '@/components/container'
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton'
import { CreateAddonsButton } from '@/components/modals/create-addons-button'
import { AddonsTableShell } from '@/components/shells/addons-table-shell'

interface AddonsPageProps {
  params: {
    storeId: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function AddonsPage({
  params,
  searchParams,
}: AddonsPageProps) {
  const { storeId } = params

  const { page, per_page, sort, active, name } =
    addonsSearchParamsSchema.parse(searchParams)

  const fallbackPage = isNaN(page) || page < 1 ? 1 : page

  const limit = isNaN(per_page) ? 10 : per_page

  const offset = fallbackPage > 1 ? (fallbackPage - 1) * limit : 0

  const [column, order] = (sort.split('.') as [
    keyof Addon | undefined,
    'asc' | 'desc' | undefined,
  ]) ?? ['createdAt', 'desc']

  const promise = db.transaction(async (tx) => {
    try {
      const data = await tx
        .select()
        .from(addons)
        .where(
          and(
            eq(addons.storeId, storeId),
            name ? like(addons.name, `%${name}`) : undefined,
            active
              ? active === 'false'
                ? eq(addons.active, false)
                : eq(addons.active, true)
              : undefined,
          ),
        )
        .offset(offset)
        .orderBy(
          column && column in addons
            ? order === 'asc'
              ? asc(addons[column])
              : desc(addons[column])
            : desc(addons.createdAt),
        )

      const count = await tx
        .select({
          count: sql<number>`count(${addons.id})`,
        })
        .from(addons)
        .where(
          and(
            eq(addons.storeId, storeId),
            name ? like(addons.name, `%${name}`) : undefined,
            active
              ? active === 'false'
                ? eq(addons.active, false)
                : eq(addons.active, true)
              : undefined,
          ),
        )
        .offset(offset)
        .orderBy(
          column && column in addons
            ? order === 'asc'
              ? asc(addons[column])
              : desc(addons[column])
            : desc(addons.createdAt),
        )
        .then((res) => res[0].count ?? 0)

      const pageCount = Math.ceil(count / limit)

      return {
        data,
        pageCount,
      }
    } catch (err) {
      console.log(err)
      return {
        data: [],
        pageCount: 0,
      }
    }
  })

  console.log((await promise).data)
  return (
    <Container className="mt-8 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Addons</h2>
        <div className="flex items-center space-x-2">
          <CreateAddonsButton label="Create addon" storeId={storeId} />
        </div>
      </div>

      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            isNewRowCreatable={true}
            isRowsDeletable={true}
          />
        }
      >
        <AddonsTableShell promise={promise} storeId={storeId} />
      </React.Suspense>
    </Container>
  )
}
