import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/1-infrastructure/db/schemas",
  dialect: "postgresql",
  dbCredentials: { url: Deno.env.get("DATABASE_URL")!, user: "postgres" },
});
