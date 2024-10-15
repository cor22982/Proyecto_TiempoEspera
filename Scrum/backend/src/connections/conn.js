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
  port: 5000,
});

client.connect()
  .then(() => console.log('Database connected successfully (Owner)'))
  .catch(err => console.error('Error connecting to the database (Owner):', err.stack));

export default client;
