import { Pool } from 'pg';

// Pool mantém as conexões disponíveis e as reutiliza
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
