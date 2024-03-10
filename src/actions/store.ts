"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { stores } from "@/db/schema"
import { eq } from "drizzle-orm"
import { z } from "zod"

import { slugify } from "@/lib/utils"
import { storeSchema } from "@/lib/validations/store"

export async function deleteStore(storeId: string) {
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
  })

  if (!store) {
    throw new Error("Store not exists.")
  }

  await db.delete(stores).where(eq(stores.id, store.id))

  // TODO: delete all products

  const path = "/dashboard"
  revalidatePath(path)
  redirect(path)
}

const storeSchemaWithUserId = storeSchema.extend({
  userId: z.string(),
})

export async function createStore(
  inputs: z.infer<typeof storeSchemaWithUserId>
) {
  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, inputs.name),
  })

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }

  await db.insert(stores).values({
    userId: inputs.userId,
    name: inputs.name,
    description: inputs.description,
    slug: slugify(inputs.name),
  })

  revalidatePath("/dashboard")
}

export async function getStores(userId: string) {
  const items = await db.select().from(stores).where(eq(stores.userId, userId))

  return items
}
