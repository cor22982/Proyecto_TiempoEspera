import express from 'express';
import { validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, getProcedureInfo, getAllInstitutionInfo, getProcedureRequierements, 
  getInstitutionByID, getComments, createComment, getsteps, getUserByPi, getRating, 
  insertNewRating, create_new_appointment, get_appointments, getprocedure_id, getUserData, deleteUser, UpdateImage
, getStatistics, getUserBday, get_documents} from '../database/db.js';
import { getUserLoginInfo } from '../database/auth.js';
import { generateToken, decodeToken } from './jwt.js';


const app = express();
const PORT = 5000;
export default app;
// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isPassword = (realPassword, currentPassword) => realPassword === currentPassword

// Middleware de validación de solicitud
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'No mandaste los campos correctos' });
  }
  return next();
};

// Rutas
app.get('/', (req, res) => {
  res.send('Hello from API PROYECTO DEIMOS');
});


// Registro de usuario
app.post('/register', validateRequest, async (req, res) => {
  console.log("body", req.body);
  const { pi, name, lastname, password_md5, birthdate, type_user } = req.body;
  await register(pi, name, lastname, password_md5, birthdate, type_user);
  res.json({ message: 'user created' });
});

// Endpoint para obtener un usuario por su PI
app.get('/users/:pi', async (req, res) => {
  const { pi } = req.params;
  try {
    const users = await getUserByPi(pi);
    const {birthdate} = await users
    res.json(users);
  } catch (error) {
    console.error('Error al buscar usuario por PI:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// Endpoint para obtener una fecha de nacimiento por su PI

app.get('/users_bdate/:pi', async (req, res) => {
  const { pi } = req.params;
  try {
    const date = await getUserBday(pi);
    res.json(date);
  } catch (error) {
    console.error('Error al buscar usuario por PI:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


// End point para sacar la edad basado en fecha de nacimiento

app.get('/users_age/:pi', async (req, res) => {
  const { pi } = req.params;
  try {
    const date = await getUserBday(pi);
    //genero la fecha actual en la que hace el request (basado en la computadora)
    var today = new Date();
    //tomo la variable Birthdate de la base de datos traida por getUserbday
    var birthDate = new Date(date.birthDate);
    // calculo el año haciendo un getfullyear que me da el año completo del individuo
    var age = today.getFullYear() - birthDate.getFullYear();
    // calculo la diferencia de mes
    var m = today.getMonth() - birthDate.getMonth();
    // reviso si es plausible tanto los meses como el año, siendo que si en algun momento esta en emismo mes tengo que comprobar en que momento cumple años
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    //regreso la edad
    res.json(age);
  } catch (error) {
    console.error('Error al buscar usuario por PI:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}); 


// Endpoint para el inicio de sesión
app.post('/login', async (req, res) => {
  try {
    const userLoginInfo = await getUserLoginInfo(req.body.pi, req.body.rol);
    if (!userLoginInfo) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    if (!isPassword(userLoginInfo.password, req.body.password)) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
    res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', acces_token: generateToken({ dpi: req.body.pi, rol: req.body.rol }) });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});


//Endpoint de búsqueda de instituciones

app.get('/institutions/:name', async (req, res) => {
  try{
    res.status(200).json(await getProcedureInfo(req.params.name));
  }
  catch (error){
    console.error('Error en la búsqueda de instituciones:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.get('/institution/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const institution = await getInstitutionByID(id);
    res.json(institution);
  } catch (error) {
    console.error('Error al obtener la institución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/institution_req/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const institution = await get_documents(id);
    res.json(institution);
  } catch (error) {
    console.error('Error al obtener la institución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/institutions', async (req, res) => {
  try{
    const institutions = await getAllInstitutionInfo();
    res.status(200).json(institutions);
  }
  catch (error){
    console.error('Error en la búsqueda de instituciones:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.get('/requirements/:id_procedure', async (req, res) => {
  try {
    const { id_procedure } = req.params;
    const requirements = await getProcedureRequierements(id_procedure);
    const steps = await getsteps(id_procedure);

    // Combina los datos en un solo objeto
    const data = { requirements, steps };

    res.status(200).json(data);

  } catch(error) {
    console.error('Error en la búsqueda de requisitos:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.get('/comments/:id_institution', async (req, res) => {
  try {
    const { id_institution } = req.params;
    const comments = await getComments(id_institution);
    res.status(200).json(comments);
  }
  catch(error){
    console.error('Error en la búsqueda de comentarios:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.post('/comment', async (req, res) => {
  try {
    const payload = decodeToken(req.body.token)
    await createComment(payload.dpi, req.body.content, req.body.conversation_id);
    res.status(200).json({ message: 'Comentario creado' });
  }
  catch(error){
    console.error('Error al crear comentario:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.get('/rating/:id_institution', async (req, res) => {
  try {
    res.status(200).json(await getRating(req.params.id_institution));
  }
  catch(error){
    console.error('Error en la búsqueda de comentarios:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.post('/rating', async (req, res) => {
  try {
    const payload = decodeToken(req.body.token)
    await insertNewRating(req.body.institution, req.body.rating, payload.dpi);
    res.status(200).json({ succes: true });
  }
  catch(error){
    console.error('Error al crear rating:', error);
    res.status(500).json({ succes: false });
  }
});

app.post('/newAppointment', async (req, res) => {
  try {
    await create_new_appointment(req.body.date, req.body.time, await getprocedure_id(req.body.id_procedure, req.body.institution), req.body.pi);
    res.status(200).json({succes: true});
  }
  catch(error){
    console.error('Error al hacer una nueva reservación :(', error);
    res.status(500).json({succes: false});
  }

});

app.get('/userAppointments/:pi', async (req, res) =>{
  try {
    res.status(200).json(await get_appointments(req.params.pi));
  }
  catch(error){
    console.error('Error al obtener los datos que buscas :(', error);
    res.status(500).send('ERROR :((');
  }
})

app.get('/userInfo/:pi', async(req, res)=>{
  try{
    res.status(200).json(await getUserData(req.params.pi));
  }
  catch(error){
    console.log('Error al obtener datos del usuario :(', error);
    res.status(500).send('ERROR :(')
  }
})

app.put('/user_Update_Image', async(req, res)=>{
  try{
    const result = await UpdateImage(req.body.pi, req.body.image);
    if (result.rowCount > 0) {
      console.log("Se guardó la imagen");
      res.status(200).json({ message: "Imagen actualizada correctamente" });
    } else {
      console.log("No se encontró un usuario con ese PI");
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  }
  catch(error){
    console.log('Error al guardar la imagen :(', error);
    res.status(500).send('ERROR :(')
  }
})

app.delete('/user/:pi', async(req, res) =>{
  try {
    const result = await deleteUser(req.params.pi);
    console.log("Usuario eliminado con exito")
    res.status(200).json({success: true})
  }
  catch(error){
    console.log('Error al borrar el usuario :(', error)
    res.status(500).send('ERROR :(')
  }
})

app.get('/statistics/:id_institution', async(req, res) =>{
  try{
    res.status(200).json(await getStatistics(req.params.id_institution))
  }
  catch(error){
    console.log('ERROR al encontrar los datos :(')
    res.status(500).send('ERROR :(')
  }
})



// Manejo de rutas no implementadas
app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});