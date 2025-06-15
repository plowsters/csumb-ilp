
import postgres from 'postgres';

const connectionString = process.env.NEON_TECH_DB_URL;

if (!connectionString) {
  throw new Error('NEON_TECH_DB_URL environment variable is not set');
}

// Ensure the connection string has the proper protocol
const formattedConnectionString = connectionString.startsWith('postgresql://') 
  ? connectionString 
  : `postgresql://${connectionString}`;

console.log('Connecting to database with URL format check:', formattedConnectionString.substring(0, 20) + '...');

export const pg = postgres(formattedConnectionString, {
  ssl: 'require',
  max: 1, // Limit connections for serverless
});
