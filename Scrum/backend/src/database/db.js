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

export async function getUserByPi(pi) {
  const result = await conn.query('SELECT pi, name, lastname, age, type_user FROM users WHERE pi = $1', [pi]);
  return result.rows;
}

 
export async function getProcedureInfo(name){
  const likePattern = `%${name}%`
  const result = await conn.query('SELECT intitutions.name, intitutions.imagen,intitutions.adress, intitutions.id_institutions, p.id as id_procedure, p.name as name_procedure FROM procedures p join institutionsprocedures ip on p.id = ip."id procedure" join intitutions on ip."id intitution" = intitutions.id_institutions where p.name ilike $1;',[likePattern]);
  return result.rows
}
 
export async function getAllInstitutionInfo(){
  const result = await conn.query('SELECT * FROM intitutions;');
  return result.rows
}


export async function getInstitutionByID(id){
  const result = await conn.query('SELECT i.name, i.adress, i.id_institutions, i.hora_apertura, i.telefono, i.hora_cierre, i.rating, ST_X(coordenadas) AS longitud, ST_Y(coordenadas) AS latitud, i.imagen,c."id conversation" as id_conversation FROM intitutions i join conversations c on c.id_institution = i.id_institutions WHERE id_institutions = $1;', [id]);
  return result.rows
}


export async function getProcedureRequierements(id_procedure){
  const result = await conn.query('SELECT d.name, d.description FROM proceduresdocuments pd JOIN procedures p on pd."id preocedure" = p.id JOIN documents d on pd."id documents" = d.id_document WHERE p.id = $1;', [id_procedure]);
  return result.rows
}


export async function getComments(id_institution){
  const result = await conn.query('select u.name, u.lastname, m.content, m.date, m.conversation_id from messages m join conversations c on m.conversation_id = c."id conversation" join users u on m.pi = u.pi where c.id_institution = $1;', [id_institution])
  return result.rows
  
}

export async function createComment(username, content, conversation_id){
  const result = await conn.query('INSERT INTO messages (pi, content, conversation_id) VALUES ($1, $2, $3);', [username, content, conversation_id]);
  return result.rows
}


export async function getsteps (id_procedure) {
  const result = await conn.query('SELECT pasos FROM procedures WHERE id = $1;', [id_procedure]);    
  return result.rows
}

export async function insertNewRating(institution, rating, pi){
  const result = await conn.query('INSERT INTO user_rating (id_institution, rating, user_pi) VALUES ($1, $2, $3);', [institution, rating, pi]);
  return result.rows
}

export async function getRating(id_institution){
  const result = await conn.query('SELECT rating FROM intitutions WHERE id_institutions = $1;', [id_institution]);
  return result.rows
}

export async function create_new_appointment(date, time, procedure, pi){
  const result = await conn.query('CALL  create_appointment($1, $2, $3, $4)', [date, time, procedure, pi]);
  return result.rows
}

export async function get_appointments(pi){
  const result = await conn.query('select a.date::DATE, a.time::TIME, i.imagen, i.name as institution_name, i.hora_cierre, i.adress,p.name from appointments a join userappointments us on us."id appointment" = a.id join institutionsprocedures ip on a."id institution procedure" = ip."id institution procedure" join intitutions i on i.id_institutions = ip."id intitution" join procedures p on p.id = ip."id procedure" where us.pi = $1 and a.date >= CURRENT_DATE;', [pi]);
  const formattedRows = result.rows.map(row => ({
    ...row,
    date: row.date.toISOString().split('T')[0]
  }));

  return formattedRows;
}

export async function getprocedure_id(id_procedure, institution) {
  const result = await conn.query('SELECT "id institution procedure" FROM institutionsprocedures WHERE "id procedure" = $1 AND "id intitution" = $2;', [parseInt(id_procedure), parseInt(institution)]);
  
  // Verificar si hay resultados
  if (result.rows.length > 0) {
    // Extraer el valor y convertirlo a número
    return parseInt(result.rows[0]["id institution procedure"], 10);
  } else {
    // Manejar el caso en que no se encuentren resultados
    return null; // O lanzar un error según tu necesidad
  }
}

export async function getUserData(pi){
  const result = await conn.query(`SELECT pi, name, lastname, age, type_user, encode(perfi_image, 'base64') as imagen_perfil FROM users WHERE pi = $1;`, [pi]);
  return result.rows
}

export async function deleteUser(pi){
  const result = await conn.query('DELETE FROM users WHERE pi = $1', [pi])
  return result.rows
}

export async function UpdateImage(pi, image){
  const result = await conn.query(`UPDATE users SET perfi_image = decode($1, 'base64') WHERE pi = $2;`, [image, pi])
  return result
}

