import { z } from 'zod'

export const addonsSchema = z.object({
  name: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
})

export const getAddonSchema = z.object({
  id: z.string(),
  storeId: z.string(),
})
