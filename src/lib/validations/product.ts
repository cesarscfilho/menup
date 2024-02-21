import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Must be at least 1 character' }),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: 'Must be a valid price',
  }),
})

export const getProductSchema = z.object({
  id: z.string(),
  storeId: z.string(),
})

export const productCategoriesWithAddonsSchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  quantityMin: z.number(),
  quantityMax: z.number(),
  mandatory: z.boolean(),
  active: z.boolean(),
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      price: z.string().nullable(),
    }),
  ),
})
