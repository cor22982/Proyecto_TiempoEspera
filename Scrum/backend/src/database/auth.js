import client from '../connections/conn_reading_user.js';

// Obtener información de inicio de sesión por pi y tipo de usuario
export async function getUserLoginInfo(pi) {
  try {
    const query = 'SELECT pi, password FROM users WHERE pi = $1';
    const result = await client.query(query, [pi]);
    return result.rows[0]; // Devuelve solo el primer resultado
  } catch (error) {
    console.error('Error fetching user login info:', error);
    throw error;
  }
}