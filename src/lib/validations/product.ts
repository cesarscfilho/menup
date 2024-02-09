import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Must be at least 1 character' }),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
})
