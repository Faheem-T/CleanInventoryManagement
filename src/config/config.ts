import "jsr:@std/dotenv/load";

import { drizzle } from "drizzle-orm/node-postgres/driver";
import pg from "pg";
import { productSchema } from "../1-infrastructure/db/schemas/productSchema.ts";

const { Pool } = pg;

console.log(Deno.env.get("DATABASE_URL"));

export const db = drizzle({
  client: new Pool({ connectionString: Deno.env.get("DATABASE_URL") }),
  schema: { productSchema },
});
