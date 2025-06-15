
import postgres from 'postgres';

let pgInstance: postgres.Sql | null = null;
let pgInitError: Error | null = null;

try {
  const connectionString = process.env.NEON_TECH_DB_URL;

  if (!connectionString) {
    throw new Error('FATAL: NEON_TECH_DB_URL environment variable is not set.');
  }

  console.log('DB Initializing: Creating postgres client...');
  
  pgInstance = postgres(connectionString, {
    ssl: 'require',
    max: 1,
    connect_timeout: 10,
  });

  console.log('DB Initialized: Connection pool created.');

} catch (e) {
  console.error('DB Initialization failed:', e);
  pgInitError = e instanceof Error ? e : new Error('Unknown database connection error');
}

export const pg = pgInstance;
export const pgError = pgInitError;
