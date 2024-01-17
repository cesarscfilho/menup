'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function checkEmailExist(email: string) {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  return !!existingUser
}
