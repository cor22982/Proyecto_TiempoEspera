// eslint-disable-next-line import/extensions
import conn from '../connections/conn.js'

export async function register(pi,name, lastname,password_md5,age,type_user) {
  const result = await conn.query('INSERT INTO users (pi,name,lastname,password,age,type_user) VALUES (?,?,?,?, ?,?);', [pi,name, lastname,password_md5,age,type_user])
  
  return result.rows
}