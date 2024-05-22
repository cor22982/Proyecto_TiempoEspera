import React from 'react';
import './Login.css';
import { useContext,useState } from 'react'
import LoginTextInput from '@components/LoginTextInput';
import CustomButton from '@components/CustomButton';
import { Link } from 'react-router-dom';
import { md5 } from 'js-md5'
import LoginContext from '../LoginContex/LoginContext';
import Dropdowncustom from '@components/Dropdowncustom';
import  useToken from '@hooks/useToken'
const Login = ({ setPi }) => {
  const [formState, setFormState] = useState({ pi: '',type_user: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const { setLoggedIn } = useContext(LoginContext)
  const { setToken } = useToken() 
  
  const handleDropdownChange = (selectedItem) => {
    setValue('type_user', selectedItem);
  }
  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }


  const handleClick = async () => {
    const body = { }
    body.pi = formState.pi
    body.rol = formState.type_user
    body.password = md5(formState.password)
    console.table(body)
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('https://deimoss.web05.lol/login', fetchOptions)
    const {  acces_token } = await response.json()
    // Aquí puedes agregar la lógica que desees ejecutar cuando el botón sea clicado
    if (response.ok) {
      setToken( acces_token)
      console.log(acces_token)
      setLoggedIn(true)
      setErrorMessage('')
      return
    }
    setErrorMessage('Incorrect user or password')
  }

  return (
    <div className='login-container'>
      <div className='login-left-side'>
        <img src='../src/assets/Login/logotipo.png' alt='Logo'></img>   
      </div>

      <div className='login-right-side'>
        <h1 className='login-title'>Iniciar sesión</h1>

        {
        errorMessage !== '' ? (
          <div className='error-message' onClick={() => setErrorMessage('')}>
            {errorMessage}
          </div>
        ) : null
        } 

        {/* Utiliza el componente LoginTextInput */}
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='DPI/CUI' type='text'
          value={formState.pi} onChange={(value) => setValue('pi', value)}
        />
        <LoginTextInput imageUrl='../src/assets/Login/password.png' placeholder='Contraseña' type='password'
          value={formState.password} onChange={(value) => setValue('password', value)}
        />
         <Dropdowncustom nombre="Seleccionar rol" lista = {['usuario_comun', 'empleador']}
        onChange={handleDropdownChange}></Dropdowncustom>
        <p style={{ fontSize: '30px' }}>
          ¿No te has registrado aún? <Link to="/register" style={{ fontSize: '30px', fontWeight: 'bold' }}>Regístrate aquí</Link>
        </p>
        
        
        {
          /* Utiliza el componente CustomButton y pasa el texto y la función de clic */}
        <CustomButton buttonText="Iniciar sesión" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Login;
