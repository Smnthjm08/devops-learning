import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load .env from the current directory
dotenv.config({ path: resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!, // use from loaded env
  },
});
