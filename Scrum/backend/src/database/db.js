// eslint-disable-next-line import/extensions
import conn from '../connections/conn.js'

export async function register(pi,name, lastname,password_md5,age,type_user) {
  const ageInt = parseInt(age, 10);
  console.log(isNaN(ageInt))
  const result = await conn.query('INSERT INTO users (pi,name,lastname,password,age,type_user) VALUES (?,?,?,?, ?,?);', [pi,name, lastname,password_md5,ageInt,type_user]) 
  console.log(result.rows)
  return result.rows
}