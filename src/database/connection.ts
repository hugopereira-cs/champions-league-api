import { Pool } from 'pg';

// Create a new instance of the Pool class from the 'pg' module, which is used to manage a pool of connections to a PostgreSQL database. The connection string is retrieved from the environment variable 'DATABASE_URL'.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
