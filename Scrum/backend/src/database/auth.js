import client from '../connections/conn_reading_user.js';

// Obtener información de inicio de sesión por pi y tipo de usuario
export async function getUserLoginInfo(pi, type_user) {
  try {
    const query = 'SELECT pi, password, type_user FROM Users WHERE pi = $1 AND type_user = $2';
    const result = await client.query(query, [pi, type_user]);
    return result.rows[0]; // Devuelve solo el primer resultado
  } catch (error) {
    console.error('Error fetching user login info:', error);
    throw error;
  }
}