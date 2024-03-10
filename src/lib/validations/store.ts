import { z } from "zod"

export const storeSchema = z.object({
  name: z.string().min(1, { message: "Must be at least 1 character" }),
  description: z.string().optional(),
})

export const deleteStoreSchema = z.object({
  confirmPhase: z.string().refine(
    (input) => {
      return input === "I understand and I want to delete my store"
    },
    {
      message: "The phrase entered does not correspond to the expected phase.",
    }
  ),
})
