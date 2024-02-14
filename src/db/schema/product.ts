import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  decimal,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

import { stores } from '../schema'

// Products

export const products = mysqlTable('products', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar('name', { length: 191 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  active: boolean('active').notNull().default(true),
  categoryId: varchar('categoryId', { length: 128 }).notNull(),
  storeId: varchar('storeId', { length: 128 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewProduct = typeof products.$inferInsert
export type Product = typeof products.$inferSelect

export const productsRelations = relations(products, ({ one, many }) => ({
  store: one(stores, {
    fields: [products.storeId],
    references: [stores.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  addonsCategory: many(addonsCategory),
  productsCategoryAddons: many(productsCategoryAddons),
}))

// Categories

export const categories = mysqlTable('categories', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  storeId: varchar('storeId', { length: 128 }).notNull(),
  name: varchar('name', { length: 191 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewCategory = typeof categories.$inferInsert
export type Category = typeof categories.$inferSelect

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  store: one(stores, { fields: [categories.storeId], references: [stores.id] }),
  products: many(products),
}))

// Addons

export const addons = mysqlTable('addons', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar('name', { length: 191 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  active: boolean('active').notNull().default(true),
  storeId: varchar('storeId', { length: 128 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewAddon = typeof addons.$inferInsert
export type Addon = typeof addons.$inferSelect

export const variantsRelations = relations(addons, ({ many, one }) => ({
  store: one(stores, {
    fields: [addons.storeId],
    references: [stores.id],
  }),
  productsCategoryAddons: many(productsCategoryAddons),
}))

// Addons category

export const addonsCategory = mysqlTable('addons_category', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar('name', { length: 191 }).notNull(),
  productId: varchar('productId', { length: 191 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewAddonsCategory = typeof addonsCategory.$inferInsert
export type AddonsCategory = typeof addonsCategory.$inferSelect

export const addonsCategoryRelations = relations(
  addonsCategory,
  ({ many, one }) => ({
    productsCategoryAddons: many(productsCategoryAddons),
    product: one(products, {
      fields: [addonsCategory.productId],
      references: [products.id],
    }),
  }),
)

// Product category addons

export const productsCategoryAddons = mysqlTable('products_category_addons', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  productId: varchar('productId', { length: 128 }).notNull(),
  addonsId: varchar('addonsId', { length: 128 }).notNull(),
  addonsCategoryId: varchar('addonsCategoryId', { length: 128 }).notNull(),
  active: boolean('active').notNull().default(true),
})

export type NewProductsCategoryAddons =
  typeof productsCategoryAddons.$inferInsert
export type ProductsCategoryAddons = typeof productsCategoryAddons.$inferSelect

export const productsCategoryAddonsRelations = relations(
  productsCategoryAddons,
  ({ one }) => ({
    product: one(products, {
      fields: [productsCategoryAddons.productId],
      references: [products.id],
    }),
    addon: one(addons, {
      fields: [productsCategoryAddons.addonsId],
      references: [addons.id],
    }),
    addonCategory: one(addonsCategory, {
      fields: [productsCategoryAddons.addonsCategoryId],
      references: [addonsCategory.id],
    }),
  }),
)
