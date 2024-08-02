import client from '../src/connections/conn.js';

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query:', err.stack);
  } else {
    console.log('Database connected successfully:', res.rows);
  }
  client.end();
});
