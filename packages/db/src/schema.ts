import {
  boolean,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  active: boolean("active").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});
