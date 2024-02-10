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
  productsVariants: many(productsVariants),
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

// Variants

export const variants = mysqlTable('variants', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar('name', { length: 191 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }),
  storeId: varchar('storeId', { length: 128 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
})

export type NewVariant = typeof variants.$inferInsert
export type Variant = typeof variants.$inferSelect

export const variantsRelations = relations(variants, ({ many, one }) => ({
  productsVariants: many(productsVariants),
  store: one(stores, {
    fields: [variants.storeId],
    references: [stores.id],
  }),
}))

export const productsVariants = mysqlTable('product_variants', {
  id: varchar('id', { length: 128 })
    .primaryKey()
    .default(sql`(uuid())`),
  productId: varchar('productId', { length: 128 }).notNull(),
  variantId: varchar('variantId', { length: 128 }).notNull(),
})

export type NewProductVariant = typeof productsVariants.$inferInsert
export type ProductVariant = typeof productsVariants.$inferSelect

export const productsVariantsRelations = relations(
  productsVariants,
  ({ one }) => ({
    products: one(products, {
      fields: [productsVariants.productId],
      references: [products.id],
    }),
    variants: one(variants, {
      fields: [productsVariants.variantId],
      references: [variants.id],
    }),
  }),
)
