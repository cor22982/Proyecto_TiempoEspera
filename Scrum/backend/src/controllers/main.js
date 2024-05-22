import express from 'express';
import { validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, getProcedureInfo, getAllInstitutionInfo, getProcedureRequierements, getInstitutionByID, getComments, createComment, getsteps, getUserByPi} from '../database/db.js';
import { getUserLoginInfo } from '../database/auth.js';
import { generateToken, decodeToken } from './jwt.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  const { pi, name, lastname, password_md5, age, type_user } = req.body;
  await register(pi, name, lastname, password_md5, age, type_user);
  res.send('{ "message": "user created" }');
});

app.post('/getUserByPi', async (req, res) => {
  const { pi } = req.body;

  try {
    const user = await getUserByPi(pi);
    if (user.length > 0) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Endpoint para el inicio de sesión
app.post('/login', async (req, res) => {
  const { pi, password , rol} = req.body;

  try {
    // Obtener la información de inicio de sesión del usuario
    const userLoginInfo = await getUserLoginInfo(pi, rol);
    
    // Verificar si se encontró la información de inicio de sesión
    if (userLoginInfo) {
      // Cifrar la contraseña proporcionada con MD5 de crypto-js
      const hashedPassword = password;
      // Verificar la contraseña
      if (userLoginInfo.password === hashedPassword) {
        const user = {
          dpi: pi,
          rol: rol
        }
        const token = generateToken(user)
        // Autenticación exitosa
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', acces_token: token });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      // Usuario no encontrado
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

//Endpoint de búsqueda de instituciones

app.get('/institutions/:name', async (req, res) => {
  const { name } = req.params;
  try{
    const { name } = req.params;
    const institutions = await getProcedureInfo(name);
    res.status(200).json(institutions);
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
    const { token, content, conversation_id } = req.body;
    const payload = decodeToken(token)
    const { dpi } = payload;
    await createComment(dpi, content, conversation_id);
    res.status(200).json({ message: 'Comentario creado' });
  }
  catch(error){
    console.error('Error al crear comentario:', error);
    res.status(500).send('Error del servidor :(');
  }
});



// Manejo de rutas no implementadas
app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});