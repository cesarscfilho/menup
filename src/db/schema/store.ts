import { relations } from "drizzle-orm"
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

import { users } from "./user"

export const stores = pgTable("stores", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug"),
  active: boolean("active").notNull().default(true),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

export type NewStore = typeof stores.$inferInsert
export type Store = typeof stores.$inferSelect

export const storesRelations = relations(stores, ({ one }) => ({
  user: one(users, { fields: [stores.userId], references: [users.id] }),
}))
