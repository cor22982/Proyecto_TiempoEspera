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


export async function getProcedureInfo(name){
  const likePattern = `%${name}%`
  const result = await conn.query('SELECT intitutions.name, intitutions.adress, intitutions.id_institutions, p.id as id_procedure FROM procedures p join institutionsprocedures ip on p.id = ip."id procedure" join intitutions on ip."id intitution" = intitutions.id_institutions where p.name ilike $1;',[likePattern]);
  return result.rows
}

export async function getAllInstitutionInfo(){
  const result = await conn.query('SELECT i.id_institutions, i.name, i.address, c."id conversation" FROM intitutions i join conversations c on i.id_institutions = c.id_institution;');
  return result.rows
}


export async function getInstitutionByID(id){
  const result = await conn.query('SELECT * FROM intitutions WHERE id_institutions = $1;', [id]);
  return result.rows
}


export async function getProcedureRequierements(id_procedure){
  const result = await conn.query('SELECT d.name, d.description FROM proceduresdocuments pd JOIN procedures p on pd."id preocedure" = p.id JOIN documents d on pd."id documents" = d.id_document WHERE p.id = $1;', [id_procedure]);
  return result.rows
}


export async function getComments(id_institution){
  const result = await conn.query('select u.name, u.lastname, m.content, m.date from messages m join conversations c on m.conversation_id = c."id conversation" join users u on m.pi = u.pi where c.id_institution = $1;', [id_institution])
  return result.rows
  
}

export async function createComment(){

}
