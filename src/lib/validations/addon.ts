import { z } from 'zod'

export const updateAddonSchema = z.object({
  items: z.array(
    z.object({
      categoryId: z.string(),
      name: z.string().min(1),
      mandatory: z.boolean(),
      active: z.boolean(),
      quantityMin: z.number(),
      quantityMax: z.number(),
      categoryAddons: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1),
          price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
            message: 'Must be a valid price',
          }),
        }),
      ),
    }),
  ),
})
