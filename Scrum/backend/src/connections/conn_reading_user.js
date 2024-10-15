import dotenv from 'dotenv';
import pg from 'pg';

// Carga las variables del archivo .env
dotenv.config({ path: '../../../../.env' });

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

client.connect()
  .then(() => console.log('Database connected successfully (Reading User)'))
  .catch(err => console.error('Error connecting to the database (Reading User):', err.stack));

export default client;
