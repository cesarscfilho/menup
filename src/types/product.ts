import { z } from 'zod'

import { productCategoriesWithAddonsSchema } from '@/lib/validations/product'

export type ProductCategoriesWithAddons = z.infer<
  typeof productCategoriesWithAddonsSchema
>
