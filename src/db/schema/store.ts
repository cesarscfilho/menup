import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

import { users } from './user'

export const stores = mysqlTable('stores', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  userId: varchar('userId', { length: 191 }).notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  slug: text('slug'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewStore = typeof stores.$inferInsert
export type Store = typeof stores.$inferSelect

export const storesRelations = relations(stores, ({ one }) => ({
  user: one(users, { fields: [stores.userId], references: [users.id] }),
}))
