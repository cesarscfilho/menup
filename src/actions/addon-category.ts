'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { addonsCategory } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function updateAddonCategoryStatusAction(inputs: {
  addonCategoryId: string
  storeId: string
}) {
  const addonCategoryExist = await db.query.addonsCategory.findFirst({
    where: eq(addonsCategory.id, inputs.addonCategoryId),
  })

  if (!addonCategoryExist) {
    throw new Error('Addon Category not found!')
  }

  await db
    .update(addonsCategory)
    .set({ active: !addonCategoryExist.active })
    .where(eq(addonsCategory.id, inputs.addonCategoryId))

  revalidatePath(
    `/dashboard/${inputs.storeId}/products/${addonCategoryExist.productId}/addons`,
  )
}
