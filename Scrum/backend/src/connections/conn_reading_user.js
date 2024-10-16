import dotenv from 'dotenv';
import pg from 'pg';

// Carga las variables del archivo .env
dotenv.config({ path: '../../../../.env' });

const { Client } = pg;

const client = new Client({
  user: 'owner',
  host: 'localhost',
  database: 'deimos',
  password: '36L8W7Nm',
  port: 5432,
});

client.connect()
  .then(() => console.log('Database connected successfully (Reading User)'))
  .catch(err => console.error('Error connecting to the database (Reading User):', err.stack));

export default client;
