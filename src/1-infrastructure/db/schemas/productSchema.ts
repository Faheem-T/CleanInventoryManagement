import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const productSchema = pgTable("products", {
  id: serial().primaryKey(),
  name: text().notNull(),
  price: integer().default(0).notNull(),
  qty: integer().default(0).notNull(),
});
