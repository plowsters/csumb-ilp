
import postgres from 'postgres';

const connectionString = process.env.NEON_TECH_DB_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or NEON_TECH_DB_URL environment variable is required');
}

export const pg = postgres(connectionString);
