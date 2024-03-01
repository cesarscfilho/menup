import { relations } from 'drizzle-orm'
import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { stores } from '../schema'

// Products

export const products = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  active: boolean('active').default(false).notNull(),
  categoryId: text('category_id').notNull(),
  storeId: text('store_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
  addonsCategory: many(addonCategories),
  productAddonCategoryRelation: many(productAddonCategoryRelation),
}))

// Categories

export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  storeId: text('store_id').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type NewCategory = typeof categories.$inferInsert
export type Category = typeof categories.$inferSelect

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  store: one(stores, { fields: [categories.storeId], references: [stores.id] }),
  products: many(products),
}))

// Addons

export const addons = pgTable('addons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  active: boolean('active').default(true).notNull(),
  storeId: text('store_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type NewAddon = typeof addons.$inferInsert
export type Addon = typeof addons.$inferSelect

export const variantsRelations = relations(addons, ({ many, one }) => ({
  store: one(stores, {
    fields: [addons.storeId],
    references: [stores.id],
  }),
  productAddonCategoryRelation: many(productAddonCategoryRelation),
}))

// Addons category

export const addonCategories = pgTable('addon_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  quantityMin: integer('quantity_min').notNull().default(0),
  quantityMax: integer('quantity_max').notNull().default(1),
  mandatory: boolean('mandatory').notNull().default(false),
  active: boolean('active').notNull().default(true),
  productId: text('product_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type NewAddonsCategory = typeof addonCategories.$inferInsert
export type AddonCategories = typeof addonCategories.$inferSelect

export const addonCategoriesRelations = relations(
  addonCategories,
  ({ many, one }) => ({
    productAddonCategoryRelation: many(productAddonCategoryRelation),
    product: one(products, {
      fields: [addonCategories.productId],
      references: [products.id],
    }),
  }),
)

// Product category addons

export const productAddonCategoryRelation = pgTable(
  'product_addon_category_relation',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: text('product_id').notNull(),
    addonsId: text('addon_id').notNull(),
    addonCategoryId: text('addon_category_id').notNull(),
    active: boolean('active').notNull().default(true),
  },
)

export type NewProductAddonCategoryRelation =
  typeof productAddonCategoryRelation.$inferInsert
export type ProductAddonCategoryRelation =
  typeof productAddonCategoryRelation.$inferSelect

export const productAddonCategoryRelationRelations = relations(
  productAddonCategoryRelation,
  ({ one }) => ({
    product: one(products, {
      fields: [productAddonCategoryRelation.productId],
      references: [products.id],
    }),
    addon: one(addons, {
      fields: [productAddonCategoryRelation.addonsId],
      references: [addons.id],
    }),
    addonCategory: one(addonCategories, {
      fields: [productAddonCategoryRelation.addonCategoryId],
      references: [addonCategories.id],
    }),
  }),
)
