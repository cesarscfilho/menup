import type { AdapterAccount } from '@auth/core/adapters'
import { relations } from 'drizzle-orm'
import {
  boolean,
  decimal,
  int,
  mysqlTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
})

export type NewUser = typeof users.$inferInsert
export type User = typeof users.$inferSelect

export const usersRelations = relations(users, ({ many }) => ({
  stores: many(stores),
}))

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const sessions = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const stores = mysqlTable('stores', {
  id: serial('id').primaryKey(),
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

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  active: boolean('active').notNull().default(true),
  categoryId: int('categoryId').notNull(),
  storeId: int('storeId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  variants: many(variants),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))

export const categories = mysqlTable('categories', {
  id: serial('id').primaryKey(),
  storeId: int('storeId').notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export const categoriesRelations = relations(categories, ({ one }) => ({
  store: one(stores, { fields: [categories.storeId], references: [stores.id] }),
}))

export const variants = mysqlTable('variants', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull().default('0'),
  productId: int('productId').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export const variantsRelations = relations(variants, ({ one }) => ({
  product: one(products, {
    fields: [variants.productId],
    references: [products.id],
  }),
}))
