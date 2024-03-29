// eslint-disable-next-line import/extensions
import conn from '../connections/conn.js'

export async function register(pi,name, lastname,password_md5,age,type_user) {
  const ageInt = parseInt(age, 10);
  const result = await conn.query('INSERT INTO users (pi, name, lastname, password, age, type_user) VALUES ($1, $2, $3, $4, $5, $6);', [pi, name, lastname, password_md5, ageInt, type_user]);
  if (type_user==='usuario_comun'){
    await conn.query('INSERT INTO userroles (id_role,pi) values (2,$1);',[pi]);
  }
  else if (type_user==='empleador'){
    await conn.query('INSERT INTO userroles (id_role,pi) VALUES (3,$1);',[pi]);
  }
  return result.rows
}