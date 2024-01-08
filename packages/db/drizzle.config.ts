import type { Config } from "drizzle-kit";

import { env } from "./env.mjs";

export default {
  schema: "./src/schema.ts",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    uri: env.DATABASE_URL,
  },
} satisfies Config;
