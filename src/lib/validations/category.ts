import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Must be at least 1 character" }),
})

export const getCategorySchema = z.object({
  id: z.string(),
})
