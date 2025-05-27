import "jsr:@std/dotenv/load";

import { drizzle } from "drizzle-orm/node-postgres/driver";
import pg from "pg";
import { productSchema } from "../1-infrastructure/db/schemas/productSchema.ts";

const { Pool } = pg;

// const generateEnvVars = () => {
//   const envVars = ["DATABASE_URL", "PORT"] as const;
//   const env:
//     | Record<(typeof envVars)[number], string>
//     | Record<string | number | symbol, never> = {};
//   for (const v of envVars) {
//     const e = Deno.env.get(v);
//     if (!e) {
//       throw new Error(`Env variable ${v} not defined!`);
//     }
//     env[v] = e;
//   }
//   return env;
// };

// export const env = generateEnvVars();

// console.log(Deno.env.get("DATABASE_URL"));

export const db = drizzle({
  client: new Pool({ connectionString: Deno.env.get("DATABASE_URL") }),
  schema: { productSchema },
});
