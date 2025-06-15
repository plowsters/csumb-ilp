
import { Pool } from "pg";

export const pg = new Pool({
  connectionString: process.env.NEON_TECH_DB_URL,
  ssl: { rejectUnauthorized: false }
});
