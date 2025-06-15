
import { Pool } from "pg";

export const pg = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
