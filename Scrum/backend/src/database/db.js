// eslint-disable-next-line import/extensions
import conn from '../connections/conn.js'

export async function register(pi,name, lastname,password_md5,age,type_user) {
  const result = await conn.query('INSERT INTO users (pi,name,lastname,password,age,type_user) VALUES (?,?,?,?, ?,?);', [pi,name, lastname,password_md5,age,type_user])
  if (type_user === 'usuario_comun'){
    await conn.query('INSERT INTO userroles (id_role, pi) VALUES (2, ?);', [pi]);
  }
  return result.rows
}