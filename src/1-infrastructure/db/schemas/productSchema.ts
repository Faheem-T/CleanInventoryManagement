import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";

export const productSchema = pgTable("products", {
  id: serial().primaryKey(),
  name: text().notNull(),
  price: real().default(0).notNull(),
  qty: integer().default(0).notNull(),
});
