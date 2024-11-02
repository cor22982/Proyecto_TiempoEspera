// eslint-disable-next-line import/extensions
import conn from '../connections/conn.js'

export async function register(pi,name, lastname,password_md5,birthdate,type_user) {
  const imagen_base64 = "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";
  const result = await conn.query(`
    INSERT INTO users (pi, name, lastname, password, birthdate, type_user, perfi_image) 
    VALUES ($1, $2, $3, $4, $5, $6, decode($7, 'base64'));`,  // Corregido: 'base64' en comillas simples
    [pi, name, lastname, password_md5, birthdate, type_user, imagen_base64]
  );  
  if (type_user==='usuario_comun'){
    await conn.query('INSERT INTO userroles (id_role,pi) values (2,$1);',[pi]);
  }
  else if (type_user==='empleador'){
    await conn.query('INSERT INTO userroles (id_role,pi) VALUES (3,$1);',[pi]);
  }
  return result.rows
}
export async function UpdatePassw(pi, password) {
  const imagen_base64 = "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";
  const result = await conn.query(`UPDATE users SET password = decode($2, 'base64') where id = $1 ; `, [pi, password]);
  
}

export async function addInstitution(name, adress, hora_apertura, hora_cierre, telefono, Imagen, longitud, latitud) {
  try {
    // Contar el número de registros actuales en la tabla
    const countResult = await conn.query('SELECT COUNT(*) as count FROM intitutions');
    const currentCount = parseInt(countResult.rows[0].count, 10);
    
    // Calcular el nuevo ID
    const newId = currentCount + 1;

    // Realizar la inserción con el nuevo ID
    const result = await conn.query(
      'INSERT INTO intitutions (id_institutions, name, adress, hora_apertura, hora_cierre, telefono, imagen, coordenadas) VALUES($1, $2, $3, $4, $5, $6, $7, ST_MakePoint($8, $9))',
      [newId, name, adress, hora_apertura, hora_cierre, telefono, Imagen, longitud, latitud]
    );
    
    // Retornar la nueva fila creada
    return result.rows;
  } catch (error) {
    console.error('Error en addInstitution:', error.message);
    throw error; // Re-lanzar el error para que se maneje en la llamada de la API
  }
}

export async function getUserByPi(pi) {
  const result = await conn.query('SELECT pi, name, lastname, birthdate, type_user FROM users WHERE pi = $1;', [pi]);
  return result.rows;
}

export async function getUserBday(pi) {
  const result = await conn.query('SELECT birthdate FROM users WHERE pi = $1', [pi]);
  return result.rows;
}
  
export async function getProcedureInfo(name){
  const likePattern = `%${name}%`
  const result = await conn.query('SELECT intitutions.name, intitutions.imagen,intitutions.adress, intitutions.id_institutions, p.id as id_procedure, p.name as name_procedure, p.url as procedure_url FROM procedures p join institutionsprocedures ip on p.id = ip."id procedure" join intitutions on ip."id intitution" = intitutions.id_institutions where p.name ilike $1;',[likePattern]);
  return result.rows
}
 
export async function getAllInstitutionInfo(){
  const result = await conn.query('SELECT * FROM intitutions;');
  return result.rows
}
export async function get_Relation_by_id_raw(pi) {
  const result = await conn.query('SELECT empleador, string_agg(usuario, ) FROM the_table where empleador = $1 GROUP BY id')
}
export async function get_Relation_by_id(pi) {
  const result = await conn.query('SELECT empleador, usuario FROM relaciones INNER JOIN usuarios ON relaciones.usuario = users.id INNER JOIN empleadores ON relaciones.empleador = users.id WHERE empleador = $1 ORDER BY ASC;', [id])
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
  const result = await conn.query('select u.name, u.lastname, m.content, m.date, m.conversation_id from messages m join conversations c on m.conversation_id = c."id conversation" join users u on m.pi = u.pi where c.id_institution = $1 order by m.date desc;', [id_institution])
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
export async function create_new_relation(empleador, usuario){
  const result = await conn.query('INSERT INTO relaciones (empleador, usuario) VALUES ($1, $2);', [empleador, usuario]);
    return result.rowCount;
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

export async function get_documents(id_procedure) {
  const result = await conn.query('SELECT "id documents" FROM proceduresdocuments LEFT JOIN documents ON proceduresdocuments."id documents" = documents.id_document	WHERE proceduresdocuments."id preocedure" = $1 ', [id_procedure]);
  return result.rows
}

export async function getUserData(pi){
  const result = await conn.query(`SELECT pi, name, lastname, extract(year FROM age(current_timestamp, birthdate::timestamp)) AS birthdate, type_user, encode(perfi_image, 'base64') as imagen_perfil, email, telephone FROM users WHERE pi = $1;`, [pi]);
  return result.rows
}

export async function deleteInstitution(pi){
  const result = await conn.query('DELETE FROM intitutions WHERE id_institution = $1', [pi])
  return result.rows
}

export async function deleteProcedure(id){
  const result = await conn.query('DELETE FROM procedures WHERE id = $1', [id])
  return result.rows
}

export async function deleteUser(pi){
  const result = await conn.query('DELETE FROM users WHERE pi = $1', [pi])
  return result.rows
}

export async function deleteAppointment(pi){
  const result = await conn.query('DELETE FROM appointments WHERE id = $1', [pi])
  return result.rows
}

export async function UpdateImage(pi, image){
  const result = await conn.query(`UPDATE users SET perfi_image = decode($1, 'base64') WHERE pi = $2;`, [image, pi])
  return result
}

export async function UpdateEmail_telephone(pi, data, type){
  let result
  if (type === 'email'){
    result = await conn.query(`UPDATE users SET email = $1 WHERE pi = $2;`, [data, pi])
  }
  else if (type === 'telephone'){
    result = await conn.query(`UPDATE users SET telephone = $1 WHERE pi = $2;`, [data, pi])
  }
  
  return result
}
export async function UpdateName_Apellido(pi, data, type){
  let result
  if (type === 'name'){
    result = await conn.query(`UPDATE users SET name = $1 WHERE pi = $2;`, [data, pi])
  }
  else if (type === 'lastname'){
    result = await conn.query(`UPDATE users SET lastname = $1 WHERE pi = $2;`, [data, pi])
  }
  
  return result
}

export async function getStatistics(id){
  const result = await conn.query('SELECT * from Average_people where Institution = $1;', [id])
  return result.rows
}

export async function createNewOTP(pi, otp, expiration_date){
  const result = await conn.query('INSERT INTO otp (pi, otp, exp_date) values ($1, $2, $3);', [pi, otp, expiration_date])
  return result.rows
}

export async function deleteOTP(otp, pi){
  const result = await conn.query('DELETE FROM otp WHERE otp = $1 and pi = $2;', [otp, pi])
  console.log('Delete OTP result:', result);
  return result.rowCount;  
}

export async function modifyUserPassword(password, pi){
  const result = await conn.query('UPDATE users set password = $1 where pi =$2', [password, pi])
  return result.rows
}

export async function getUserEmail(pi){
  const result = await conn.query('SELECT email from users where pi = $1', [pi])
  return result.rows
}

export async function getOTPData(pi){
  const result = await conn.query('SELECT otp, exp_date from otp where pi = $1', [pi])
  return result.rows
}


export async function getUsers() {
  const result = await conn.query(`SELECT pi, name, type_user, encode(perfi_image, 'base64') as imagen_perfil FROM users;`)
  return result.rows
}

export async function createNewProcedure(id, name, description, steps, url, institutions) {

  const result = await conn.query('CALL create_procedure_with_institutions($1, $2, $3, $4, $5, $6)', [id, name, description, steps, url, institutions])
  return result.rows
}


export async function getLastIDPrcedure(){
  const result = await conn.query('select id from procedures order by id desc limit 1;')
  return result.rows
}


export async function getProcedures(){
  const result = await conn.query('select id, name, description from procedures;')
  return result.rows
}

export async function getInstitutionContactInfo(){
  const result = await conn.query('SELECT id_institutions, name, telefono, imagen from intitutions;')
  return result.rows
}