import { env } from "@/env.js"
import { neon, NeonQueryFunction } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import * as schema from "./schema"

const connection: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL)

export const db = drizzle(connection, { schema })
