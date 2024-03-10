import { env } from "@/env.mjs"
import { connect } from "@planetscale/database"

export const pscaleConfig = {
  url: env.DATABASE_URL,
}

export const conn = connect(pscaleConfig)
