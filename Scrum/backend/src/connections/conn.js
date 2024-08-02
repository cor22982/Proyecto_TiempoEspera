import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Client } = pg;
const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
}
const client = new Client(connectionData);
client.connect();
export default client;
