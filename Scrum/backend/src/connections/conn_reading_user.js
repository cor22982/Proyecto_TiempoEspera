import pg from 'pg';
const { Client } = pg;

const connectionData = {
  user: 'reading_user',
  host: 'localhost',
  database: 'deimos',
  password: 'aIyg462vT[-v',
  port: 5432,
};

const client = new Client(connectionData);
client.connect();

export default client;