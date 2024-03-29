import express from 'express'
import { validationResult } from 'express-validator'
import cors from 'cors'
import { register } from './db.js'

const app = express()
const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'No mandaste los campos correctos' })
  }
  return next()
}

app.use(express.json())
app.use(cors())


const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Hello from API PROYECTO DEIMOS')
})
app.use(validateRequest)

app.post('/register', async (req, res) => {
  console.log("body", req.body)
  const { pi,name, lastname,password_md5,age,type_user } = req.body
  await register(pi,name, lastname,password_md5,age,type_user)
  res.send('{ "message": "user created" }')
})

app.use((req, res) => {
  res.status(501).json({ error: 'Método no implementado' })
})
