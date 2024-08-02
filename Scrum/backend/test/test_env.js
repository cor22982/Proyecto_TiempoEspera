import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import clientOwner from '../src/connections/conn.js'; // Cliente 'owner'
import clientReader from '../src/connections/conn_reading_user.js'; // Cliente 'reader'

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv con la ruta correcta al archivo .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Probar conexión con el cliente 'owner'
clientOwner.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query with owner client:', err.stack);
  } else {
    console.log('Owner Database connected successfully:', res.rows);
  }
  clientOwner.end();
});

// Probar conexión con el cliente 'reader'
clientReader.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query with reader client:', err.stack);
  } else {
    console.log('Reader Database connected successfully:', res.rows);
  }
  clientReader.end();
});

// Mostrar las variables de entorno para depuración
console.log({
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_PORT: process.env.DB_PORT,
  DB_READER_USER: process.env.DB_READER_USER,
  DB_READER_HOST: process.env.DB_READER_HOST,
  DB_READER_DATABASE: process.env.DB_READER_DATABASE,
  DB_READER_PASSWORD: process.env.DB_READER_PASSWORD,
  DB_READER_PORT: process.env.DB_READER_PORT
});
