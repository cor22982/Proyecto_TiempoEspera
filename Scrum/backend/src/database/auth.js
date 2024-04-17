import client from '../connections/conn_reading_user.js';

// Obtener información de inicio de sesión por pi y tipo de usuario
export async function getUserLoginInfo(pi, rol) {
  try {
    const query = 'select users.password , users.name, users.lastname, users.age from users join userroles on users.pi = userroles.pi join roles on roles.id_role = userroles.id_role where users.pi = $1 and roles.name = $2;';
    const result = await client.query(query, [pi, rol]);
    return result.rows[0]; // Devuelve solo el primer resultado
  } catch (error) {
    console.error('Error fetching user login info:', error);
    throw error;
  }
}