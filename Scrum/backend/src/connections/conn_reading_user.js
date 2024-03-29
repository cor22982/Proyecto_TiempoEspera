import { Pool } from 'pg';

const pool = new Pool({
  user: 'reading_user',
  host: 'localhost',
  database: 'deimos',
  password: 'aIyg462vT[-v',
  port: 5432,
});

export default pool;
