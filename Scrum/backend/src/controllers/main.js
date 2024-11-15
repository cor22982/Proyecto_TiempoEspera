import express from 'express';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { md5 } from "js-md5";
import * as OneSignalLib from '@onesignal/node-onesignal';

import { register, getProcedureInfo, getAllInstitutionInfo, getProcedureRequierements,
         getInstitutionByID, getComments, createComment, getsteps, getUserByPi, getRating,
         insertNewRating, create_new_appointment, get_appointments, getprocedure_id, getUserData, 
         deleteUser, UpdateImage, getStatistics, getUserBday, get_documents, UpdateEmail_telephone, 
         deleteInstitution, addInstitution, UpdatePassw, UpdateName_Apellido,getUserEmail, getOTPData, 
         deleteOTP, createNewOTP,create_new_relation, modifyUserPassword, getUsers, createNewProcedure, 
         getLastIDPrcedure, getProcedures, deleteAppointment, getInstitutionContactInfo, get_Relation_by_id,
         addMessage, getMessagesByConversationId, returnInfoAppointments, getMessagerating, appointment_update, getIDSala,
         firstInsert, updatePasos, firstInsertUserDocuments, getPasos, getUserDocuments, getUserRooms, up_message_like, createNewMessageInRoom } from '../database/db.js';
import { getUserLoginInfo, getAdminLoginInfo} from '../database/auth.js';
import { generateToken, decodeToken, validateToken } from './jwt.js';

dotenv.config({ path: '../../../../.env' });

const app = express();
const PORT = 5000;

const ONESIGNAL_APP_ID = '0b7d4e8e-e5ad-4eec-8bda-63563d2dd47a';
const ONESIGNAL_REST_API_KEY = 'YzI5ZGI0NzgtZWNiMC00ZDEyLTljMzQtMjFjMjMyNzJkNjI3';

const corsOptions = {
  origin: ['https://deimosappforteest.netlify.app', 'http://127.0.0.1:3000'], // Permite tanto el dominio de Netlify como el local
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Configuración de CORS
app.use(cors(corsOptions));

// Middleware de JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta de imágenes
app.use('/images', express.static('/home/ubuntu/Proyecto_TiempoEspera/images'));

// Configuración de almacenamiento de archivos con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/home/ubuntu/Proyecto_TiempoEspera/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deimosgt502@gmail.com', 
    pass: 'nduj ydwl bjkn rlme', 
  },
});

// Configuración de OneSignal
const configuration = OneSignalLib.createConfiguration({
  authMethods: {
    rest_api_key: {
      tokenProvider: {
        getToken() {
          return ONESIGNAL_REST_API_KEY;
        },
      },
    },
  },
});
const client = new OneSignalLib.DefaultApi(configuration);

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

/*

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

*/
const sendNotificaton = async () => {
  
}

app.get('/', (req, res) => {
  res.send('Hello from API PROYECTO DEIMOS');
});

// Endpoint para enviar un mensaje (con o sin imagen)
app.post('/messages', upload.single('image'), async (req, res) => {
  try {
    // Decodificar el token para extraer el PI del usuario
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó el token de autorización' });
    }
    const payload = decodeToken(token); // Usar una función `decodeToken` para decodificar el token y obtener el `pi`

    const { content, conversation_id, date } = req.body; // Incluimos `date` aquí
    const pi = payload.dpi; // Extraer el `pi` del payload decodificado
    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.path; // Ruta de la imagen en el servidor
    }

    // Llama a la función que almacena el mensaje en la base de datos, pasando `date`
    const newMessage = await addMessage(content, pi, conversation_id, imageUrl, date);
    res.status(201).json({ message: 'Mensaje enviado con éxito', data: newMessage });
  } catch (error) {
    console.error('Error en /messages:', error.message);
    res.status(500).send('Error al enviar el mensaje');
  }
});


// Endpoint para obtener todos los mensajes de una conversación específica
app.get('/messages/:conversation_id', async (req, res) => {
  try {
    const { conversation_id } = req.params;
    const messages = await getMessagesByConversationId(conversation_id);
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error en /messages/:conversation_id:', error.message);
    res.status(500).send('Error al obtener los mensajes');
  }
});

app.post('/register', validateRequest, async (req, res) => {
  console.log("body", req.body);
  const { pi, name, lastname, password_md5, birthdate, type_user } = req.body;
  await register(pi, name, lastname, password_md5, birthdate, type_user);
  res.json({ message: 'user created' });
});

app.post('/institution_add', async(req, res) => {
  console.log("body", req.body);
  const {name, adress, hora_apertura, hora_cierre, telefono, Imagen, longitud, latitud} =req.body;
  let respuesta;
  try {
    const addition = await addInstitution(name, adress, hora_apertura, hora_cierre, telefono, Imagen, longitud, latitud)
    respuesta = addition
    res.status(200).send({'succes': true})
  } catch (error) {    
    console.error('Error al crear nueva insitución', respuesta)
    res.status(500).json({message: 'Error en crear la institución', error})
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
    let result = await getUserEmail(req.body.pi)
    if (result[0].email){
      const mail_options = {
        from: 'deimosgt502@gmail.com',       
        to: result[0].email,          
        subject: 'Nuevo inicio de sesión',    
        text: 'Has hecho un nuevo inicio de sesión',  
        html: `<h1>Nuevo inicio de sesión</p>` 
      }
      await transporter.sendMail(mail_options)
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
app.post('/up_message_like', async (req, res) => {
  try {
    const { pi } = req.body;
    if (!pi) {
      return res.status(400).json({ message: 'El campo `pi` es requerido' });
    }

    const result = await up_message_like(pi);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error en /up_message_like:', error);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  }
});
app.post('/create_new_relation', async (req, res) => {
  console.log("body", req.body);
  try {
    const { empleador, usuario } = req.body;
    const id_sala = await getIDSala(empleador)
    console.log(id_sala[0].id)
    const addition = await create_new_relation(usuario, id_sala[0].id);

    res.status(201).json({ message: 'Relación creada', data: addition });
  } catch (error) {
    console.error('Error en crear relación', error);
    res.status(500).json({ message: 'Error: no se pudo crear la relación' });
  }
});

app.get('/userRooms/:pi', async(req, res) =>{
  try {
    res.status(200).json(await getUserRooms(req.params.pi))
  }
  catch(error){
    console.error('ERROR :((')
    res.status(500).json({ message: 'Error: no se pudo hallar la información' })
  }
})

app.get('/contactInfo', async(req, res) =>{
  try {
    res.status(200).json(await getInstitutionContactInfo())
  }
  catch (error){
    console.error('Error al obtener los datos de contacto :(', error);
    res.status(500).json({succes:false})
  }
})

app.get('/relations/:pi', async (req, res) => {
  try {
    res.status(200).json(await get_Relation_by_id(req.params.pi));
  }
  catch(error){
    console.error('Error al obtener los datos que buscas :(', error);
    res.status(500).send('ERROR :((');
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

app.get('/get_message_rating', async (req, res) => {
  try {
    const result = await getMessagerating();
    res.status(200).json({ success: true, data: result});
  } catch (error) {
    res.status(500).json({ message: "error al buscar  ratings" });
  }
});

app.post('/messageRoom', async (req, res) =>{
  try{
    await createNewMessageInRoom(req.body.id, req.body.content, req.body.pi, req.body.image)
    res.status(200).json({ message: 'Mensajecreado' });
  }
  catch(error){
    console.error("Error al crear mensaje: ", error)
    res.status(500).json({message: 'Error al crear el mensaje :(' })
  }
})



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
    const timezoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
    console.log("Fecha actual",currentDate)
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

app.post('/newAppointment_byEmpleador', async (req, res) => {
  try {
      // Asegúrate de que req.body.pi es un arreglo
      const piList = req.body.pi_list; // Lista de PI

      // Verifica que piList sea un arreglo y no esté vacío
      if (!Array.isArray(piList) || piList.length === 0) {
          return res.status(400).json({ succes: false, error: 'La lista de PI está vacía o no es un arreglo.' });
      }

      // Obtener el ID del procedimiento una sola vez
      const procedureId = await getprocedure_id(req.body.id_procedure, req.body.institution);

      // Iterar sobre cada PI y crear la cita
      for (const pi of piList) {
          await create_new_appointment(req.body.date, req.body.time, procedureId, pi);

          // Creación de una notificación
          const result = await getInstitutionByID(req.body.institution);
          const name_i = result[0].name;
          const notification = new OneSignalLib.Notification();
          notification.app_id = ONESIGNAL_APP_ID;
          notification.included_segments = ['All']; // Enviar a todos los usuarios
          notification.target_channel = 'push';
          notification.headings = {
              en: 'Appointment Scheduled',
              es: 'Tienes una cita',
          };

          notification.contents = {
              en: `You have an appointment today at ${req.body.time} on ${name_i}`,
              es: `Tienes una cita hoy a las ${req.body.time} en ${name_i}`,
          };

          const [year, month, day] = req.body.date.split('-');
          const dateString = `${year}-${month}-${day} ${req.body.time}:00 GMT-0600`;
          notification.send_after = dateString;

          // Enviar la notificación solo si es necesario
          const response = await client.createNotification(notification);
      }

      res.status(200).json({ succes: true, message: 'Citas creadas y notificaciones enviadas.' });
  } catch (error) {
      console.error('Error al hacer una nueva reservación :(', error);
      res.status(500).json({ succes: false, error: error.message });
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

app.post('/confirmPasswordChange', async (req, res) => {
  try {
    const otpData = await getOTPData(req.body.pi);  // Obtén los datos del OTP
    console.log(otpData);

    // Busca el OTP en el array para obtener el correcto
    const otp = otpData.find(item => item.otp === req.body.otp);

    if (!otp) {
      return res.status(404).send({ 'success': false, 'message': 'No tienes un código de verificación válido' });
    }

    // Verificar si el código ha expirado
    const currentDate = new Date();
    const timezoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);  // Ajusta la hora para la zona horaria local

    if (new Date(otp.exp_date).getTime() < currentDate.getTime()) {
      return res.status(404).send({ 'success': false, 'message': 'Tu código de verificación ha expirado' });
    }

    // Verificar si el OTP es correcto
    if (req.body.otp !== otp.otp) {
      return res.status(404).send({ 'success': false, 'message': 'Tu código de verificación es incorrecto' });
    }

    // Modificar la contraseña
    await modifyUserPassword(md5(req.body.password), req.body.pi);
    
    // Eliminar el OTP
    const deleteResult = await deleteOTP(req.body.otp, req.body.pi);
    if (deleteResult === 0) {
      console.warn('No se eliminó el registro del OTP');
    }

    res.status(200).send({ 'success': true, 'message': 'Tu contraseña fue modificada' });
  } catch (error) {
    console.error('Error al confirmar la contraseña :(', error);
    res.status(500).json({ 'success': false });
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

app.put('/appointment_update', async (req, res) => {
  try {
    const { pi, date, time } = req.body;
    const result = await appointment_update(pi, date, time);
    if (result.length > 0) {
      console.log("Se actualizó la información de la cita");
      res.status(200).json({ message: "Cita actualizada correctamente" });
    } else {
      console.log("No se encontró una cita con ese ID");
      res.status(404).json({ message: "Cita no encontrada" });
    }
  } catch (error) {
    console.log('Error al actualizar la cita :(', error);
    res.status(500).send('ERROR :(');
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

app.delete('/appointment/:pi', async(req, res) =>{
  try {
    const result = await deleteAppointment(req.params.pi);
    console.log("Appointment eliminado con exito")
    res.status(200).json({success: true})
  }
  catch(error){
    console.log('Error al borrar :(', error)
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

app.get('/all_appointments', async (req, res) => {
  try {
    res.status(200).json(await returnInfoAppointments());
  }
  catch(error){
    console.error('Error en la búsqueda de reservas:', error);
    res.status(500).send('Error del servidor :(');
  }
});


app.post('/firstinsertpasos', async (req, res) =>{
  try {
    await firstInsert(req.body.pi, req.body.procedure)
    res.status(200).json({succes: true});
  }
  catch(error){
    console.error('Error al insertar primero el paso: ', error);
    res.status(500).json({succes: false });
  }
});

app.post('/updatePaso', async (req, res) =>{
  try {
    await updatePasos(req.body.pi, req.body.procedure, req.body.paso)
    res.status(200).json({succes: true});
  }
  catch(error){
    console.error('Error al insertar primero el paso: ', error);
    res.status(500).json({succes: false });
  }
});
app.post('/insertDocument_User', async (req, res) =>{
  try {
    await firstInsertUserDocuments(req.body.pi, req.body.procedure, req.body.document)
    res.status(200).json({succes: true});
  }
  catch(error){
    console.error('Error al insertar primero el paso: ', error);
    res.status(500).json({succes: false });
  }
});

app.post('/getPasos_user', async (req, res) =>{
  try {
    const respuesta = await  getPasos(req.body.pi, req.body.procedure)
    res.status(200).json({succes: true, respuesta});
  }
  catch(error){
    console.error('Error al obtener pasos: ', error);
    res.status(500).json({succes: false });
  }
});

app.post('/getDocuments_user', async (req, res) =>{
  try {
    const respuesta = await  getUserDocuments(req.body.pi, req.body.procedure)
    res.status(200).json({succes: true, respuesta});
  }
  catch(error){
    console.error('Error al obtener documentos: ', error);
    res.status(500).json({succes: false });
  }
});
app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' });
});


app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});

export default app;