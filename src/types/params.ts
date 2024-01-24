import { z } from 'zod'

export const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
  per_page: z.coerce.number().default(10),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.string().optional().default('createdAt.desc'),
})

export const productsSearchParamsSchema = searchParamsSchema
  .omit({
    from: true,
    to: true,
  })
  .extend({
    category: z.string().optional(),
    active: z.string().optional().default('true'),
    name: z.string().optional(),
  })
