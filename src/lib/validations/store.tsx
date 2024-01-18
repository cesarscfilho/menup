import { z } from 'zod'

export const storeSchema = z.object({
  name: z.string().min(1, { message: 'Must be at least 1 character' }),
  description: z.string().optional(),
})
