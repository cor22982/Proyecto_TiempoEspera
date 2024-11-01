import express from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import { register, getProcedureInfo, getAllInstitutionInfo, getProcedureRequierements, 
  getInstitutionByID, getComments, createComment, getsteps, getUserByPi, getRating, 
  insertNewRating, create_new_appointment, get_appointments, getprocedure_id, getUserData, deleteUser, UpdateImage
, getStatistics, getUserBday, get_documents, UpdateEmail_telephone, deleteInstitution, addInstitution, UpdatePassw, UpdateName_Apellido,
getUserEmail, getOTPData, deleteOTP, createNewOTP, modifyUserPassword, getUsers, createNewProcedure, getLastIDPrcedure, getProcedures} from '../database/db.js';
import { getUserLoginInfo, getAdminLoginInfo } from '../database/auth.js';
import { generateToken, decodeToken, validateToken } from './jwt.js';
import * as OneSignalLib from '@onesignal/node-onesignal';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 5000;
export default app;
const ONESIGNAL_APP_ID = '0b7d4e8e-e5ad-4eec-8bda-63563d2dd47a';
const ONESIGNAL_REST_API_KEY = 'YzI5ZGI0NzgtZWNiMC00ZDEyLTljMzQtMjFjMjMyNzJkNjI3';
dotenv.config({ path: '../../../../.env' });

const configuration = OneSignalLib.createConfiguration({
  authMethods: {
    rest_api_key: {
      tokenProvider: {
        getToken() {
          return ONESIGNAL_REST_API_KEY; // El token de la API
        },
      },
    },
  },
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deimosgt502@gmail.com', 
    pass: 'nduj ydwl bjkn rlme', 
  },
});



const client = new OneSignalLib.DefaultApi(configuration);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const isPassword = (realPassword, currentPassword) => realPassword === currentPassword

const getAge = (userBirthDay) =>{
  age = new Date().getFullYear() - new Date(userBirthDay).getFullYear()
  return new Date().getMonth < new Date(userBirthDay).getMonth ? age-- : age

};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'No mandaste los campos correctos' });
  }
  return next();
};


app.get('/', (req, res) => {
  res.send('Hello from API PROYECTO DEIMOS');
});



app.post('/register', validateRequest, async (req, res) => {
  console.log("body", req.body);
  const { pi, name, lastname, password_md5, birthdate, type_user } = req.body;
  await register(pi, name, lastname, password_md5, birthdate, type_user);
  res.json({ message: 'user created' });
});

app.post('/institution_add', async(req, res) => {
  console.log("body", req.body);
  const {pi, name, adress, hora_apertura, hora_cierre, telefono, Imagen} =req.params;
  try {
    const addition = await addInstitution(pi, name, adress, hora_apertura, hora_cierre, telefono, Imagen)
  } catch (error) {
    console.error('Error al crear nueva insitución')
    res.status(500).json({message: 'Error en el servidor'})
  }
});

app.get('/users/:pi', async (req, res) => {
  const { pi } = req.params;
  try {
    const users = await getUserByPi(pi);
    const {birthdate} = await users
    res.status(200).json(await getUserByPi(req.params.pi));
  } catch (error) {
    console.error('Error al buscar usuario por PI:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


app.get('/users_bdate/:pi', async (req, res) => {
  try {
    res.json(await getUserBday(req.params.pi));
  } catch (error) {
    console.error('Error al buscar usuario por PI:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.get('/users_age/:pi', async (req, res) => {
  const { pi } = req.params;
  try {
    const date = await getUserBday(pi);
    console.log(date)
    //genero la fecha actual en la que hace el request (basado en la computadora)
    var today = new Date();
    console.log(today)
    console.log(getAge(date))
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


app.post('/login', async (req, res) => {
  try {
    let userLoginInfo;
    if (req.body.rol != 'administrador') {
      userLoginInfo = await getUserLoginInfo(req.body.pi, req.body.rol);  
    }
    else{
      userLoginInfo = await getAdminLoginInfo(req.body.pi, req.body.rol);
    }
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
    res.json(await getInstitutionByID(req.params.id));
  } catch (error) {
    console.error('Error al obtener la institución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
app.get('/institution_req/:id', async (req, res) => {
  try {
    res.json(await get_documents(req.params.id));
  } catch (error) {
    console.error('Error al obtener la institución:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/institutions', async (req, res) => {
  try{
    res.status(200).json(await getAllInstitutionInfo());
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

    const data = { requirements, steps };

    res.status(200).json(data);

  } catch(error) {
    console.error('Error en la búsqueda de requisitos:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.get('/comments/:id_institution', async (req, res) => {
  try {
    res.status(200).json(await getComments(req.params.id_institution));
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



app.post('/passwordRequest', async (req, res) =>{
  try {
    const OTP = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    const result = await getUserEmail(req.body.pi)
    const mail_options = {
      from: 'deimosgt502@gmail.com',       
      to: result[0].email,          
      subject: 'Cambio de contrraseña',    
      text: 'Has solicitado un cambio de contraseña, este es tu código de verificación',  
      html: `<h1>Tu código de verificación es: </h1><p>${OTP}</p>` 
    }

    const currentDate = new Date();  // Get the current date and time
    currentDate.setMinutes(currentDate.getMinutes() + 10);

    await transporter.sendMail(mail_options)
    await createNewOTP(req.body.pi, OTP, currentDate)
    const notification = new OneSignalLib.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['All']; 
    notification.target_channel = 'push';
    notification.headings = {
      en: 'A verification code has been sent to your email',
      es: 'Un código de verificación fue enviado a tu correo electrónico',
    };

    notification.contents = {
      en: `Revisa tu correo para obtener tu código de verificación`,
      es: `Check your email for your verification code`,
    };

    await client.createNotification(notification);

    res.status(200).json({'succes': true})  
    }
  catch(error){
    console.error('Error in /passwordRequest:', error);
    res.status(500).json({ success: false, error: 'Failed to process the request' });
  }
})

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
    //Creación de una notificación
    const result = await getInstitutionByID(req.body.institution)
    const name_i = result[0].name
    const notification = new OneSignalLib.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    notification.included_segments = ['All']; // Enviar a todos los usuarios
    notification.target_channel = 'push';
    notification.headings = {
      en: 'Appointment Scheduled',
      es: 'Tienes una cita',
    };

    notification.contents = {
      en: `You have an apointment today at ${req.body.time} on ${name_i}`,
      es: `Tienes una cita hoy a las  ${req.body.time} en ${name_i}`,
    };
    
    
    const [year, month, day] = req.body.date.split('-');
    const dateString = `${year}-${month}-${day} ${req.body.time}:00 GMT-0600`;
    notification.send_after = dateString
    const response = await client.createNotification(notification);
    res.status(200).json({succes: true, response});
  }
  catch(error){    
    console.error('Error al hacer una nueva reservación :(', error);
    res.status(500).json({succes: false, error: error.message});
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
});

app.post('/confirmPasswordChange', async (req, res) =>{
  try {
    const otpData = await getOTPData(req.body.pi)
    console.log(otpData)
    console.log(otpData[0].exp_date)

    if (!otpData){
      res.status(404).send({'succes': false, 'message': 'No tienes un código de verificación'})
    }
    if(Date(otpData[0].exp_date).getTime() < Date.now()){
      res.status(404).send({'succes': false, 'message': 'Tu código de verificación ha expirado'})
    }
    if(req.body.otp != otpData[0].otp){
      res.status(404).send({'succes': false, 'message': 'Tu código de verificación es incorrecto'})
    }
    await modifyUserPassword(req.body.password, req.body.pi);
    const deleteResult = await deleteOTP(req.body.otp, req.body.pi);
    if (deleteResult === 0) {
      console.warn('No OTP record was deleted');
    } 
    res.status(200).send({'succes': true, 'message': 'Tu contraseña fue modificada'})
  }
  catch(error){
    console.error('Error al confirmar la contraseña :(', error);
    res.status(500).json({'succes': false})
  }
});

app.get('/userInfo/:pi', async(req, res)=>{
  try{
    res.status(200).json(await getUserData(req.params.pi));
  }
  catch(error){
    console.log('Error al obtener datos del usuario :(', error);
    res.status(500).send('ERROR :(')
  }
});

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
});
app.put('/user_update_name_lastname', async(req, res)=>{
  try{
    const result = await UpdateName_Apellido(req.body.pi, req.body.data, req.body.type);
    if (result.rowCount > 0) {
      console.log("Se guardó la informacion del usuario");
      res.status(200).json({ message: "Informacion actualizada correctamente" });
    } else {
      console.log("No se encontró un usuario con ese PI");
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  }
  catch(error){
    console.log('Error al cambiar nombre o apellido', error);
    res.status(500).send('ERROR :(')
  }
});


app.put('/user_Update_info', async(req, res)=>{
  try{
    const result = await UpdateEmail_telephone(req.body.pi, req.body.data, req.body.type);
    if (result.rowCount > 0) {
      console.log("Se guardó la informacion del usuario");
      res.status(200).json({ message: "Informacion actualizada correctamente" });
    } else {
      console.log("No se encontró un usuario con ese PI");
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  }
  catch(error){
    console.log('Error al guardar la imagen :(', error);
    res.status(500).send('ERROR :(')
  }
});
app.put ('/user_Update_passw',validateRequest, async(req, res)=>{
  try {
    const result = await UpdatePassw(req.body.pi ,req.body.passw);
    console.log("Cambio de contraseña exitoso")
  } catch (error) {
    console.log('Error tratar de cambiar la contraseña', error);
    res.status(500).send('ERROR :(')
  }
});

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
});

app.get('/statistics/:id_institution', async(req, res) =>{
  try{
    res.status(200).json(await getStatistics(req.params.id_institution))
  }
  catch(error){
    console.log('ERROR al encontrar los datos :(')
    res.status(500).send('ERROR :(')
  }
});
app.delete('/institution/:id', async(req, res)=>{
  try {
    const result = await deleteInstitution(req.params.id);
    console.log("Institución eliminada con exito")
    res.status(200).json({success: true})
  }
  catch(error){
    console.log('Error al borrar la institución :(', error)
    res.status(500).send('ERROR :(')
  }
});

app.delete('/procedure/:id', async(req, res)=>{
  try {
    const result = await deleteProcedure(req.params.id);
    console.log("Procedimiento eliminada con exito")
    res.status(200).json({success: true})
  }
  catch(error){
    console.log('Error al borrar la institución :(', error)
    res.status(500).send('ERROR :(')
  }
});

app.post('/users_info', async (req, res) => {
  try {
    const payload = decodeToken(req.body.token)
    if (validateToken(req.body.token) && payload.rol == 'administrador'){
      res.status(200).json(await getUsers())
    }
    else{
      res.status(401).json({message: 'Non authorized'})
    }
    
  }
  catch(error){
    console.error('Error al crear rating:', error);
    res.status(500).json({ succes: false });
  }
});

app.post('/newProcedure', async (req, res) =>{
  try {
    let query_result = await getLastIDPrcedure()
    let id_procedure = query_result[0].id
    console.log(id_procedure)
    await createNewProcedure(id_procedure +1 , req.body.name, req.body.description, req.body.steps, req.body.url, req.body.institutions);
    res.status(200).json({succes: true});
  }
  catch(error){
    console.error('Error al insertar el trámite: ', error);
    res.status(500).json({succes: false });
  }
});

app.get('/all_procedures', async (req, res) => {
  try {
    res.status(200).json(await getProcedures());
  }
  catch(error){
    console.error('Error en la búsqueda de tramites:', error);
    res.status(500).send('Error del servidor :(');
  }
});

app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' });
});


app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});