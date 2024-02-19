import { relations } from 'drizzle-orm'
import {
  boolean,
  decimal,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

import { createId } from '@/lib/utils'

import { stores } from '../schema'

// Products

export const products = mysqlTable('products', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
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
  addonsCategory: many(addonCategories),
  productAddonCategoryRelation: many(productAddonCategoryRelation),
}))

// Categories

export const categories = mysqlTable('categories', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
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
    .$defaultFn(() => createId())
    .primaryKey(),
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
  productAddonCategoryRelation: many(productAddonCategoryRelation),
}))

// Addons category

export const addonCategories = mysqlTable('addon_categories', {
  id: varchar('id', { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar('name', { length: 191 }).notNull(),
  productId: varchar('productId', { length: 191 }).notNull(),
  quantityMin: int('quantityMin').notNull().default(0),
  quantityMax: int('quantityMax').notNull().default(1),
  mandatory: boolean('mandatory').notNull().default(false),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').onUpdateNow(),
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

export const productAddonCategoryRelation = mysqlTable(
  'product_addon_category_relation',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    productId: varchar('productId', { length: 128 }).notNull(),
    addonsId: varchar('addonsId', { length: 128 }).notNull(),
    addonCategoriesId: varchar('addonCategoriesId', { length: 128 }).notNull(),
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
      fields: [productAddonCategoryRelation.addonCategoriesId],
      references: [addonCategories.id],
    }),
  }),
)
