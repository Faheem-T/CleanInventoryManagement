import "jsr:@std/dotenv/load";

import { drizzle } from "drizzle-orm/node-postgres/driver";
import pg from "pg";
import { productSchema } from "../1-infrastructure/db/schemas/productSchema.ts";

const { Pool } = pg;

const envArr = ["DATABASE_URL", "PORT"] as const;
export const ENV: Record<(typeof envArr)[number], string | undefined> = {
  DATABASE_URL: Deno.env.get("DATABASE_URL"),
  PORT: Deno.env.get("PORT"),
};

export const validateEnv = () => {
  for (const e of envArr) {
    if (!ENV[e]) {
      throw new Error(`Env variable ${e} not set`);
    }
  }
};

export const db = drizzle({
  client: new Pool({ connectionString: ENV.DATABASE_URL }),
  schema: { productSchema },
});
