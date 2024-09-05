import React from 'react';
import './Login.css';
import { useContext,useState } from 'react'
import LoginTextInput from '@components/LoginTextInput';
import CustomButton from '@components/CustomButton';
import { Link } from 'react-router-dom';
import { md5 } from 'js-md5'
import LoginContext from '../LoginContex/LoginContext';
import Dropdowncustom from '@components/Dropdowncustom';
import useToken from '@hooks/useToken'
import {faUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import TextInputIcon from '../Components/TextInput/TextInputIcon';
import useFormLogin from '../hooks/useFormLogin'

 
const Login = () => {
  const [formState, setFormState] = useState({ pi: '',type_user: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const { formData, handleChange } = useFormLogin({ pi: '', password: '' })
  const { setLoggedIn } = useContext(LoginContext)
  const { setToken } = useToken()
  
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
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
    body.pi = formData.pi
    body.rol = formState.type_user
    body.password = md5(formData.password)
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
        <div className='content-right-side'>
          <h1 className='login-title'>Iniciar sesión</h1>
          {
          errorMessage !== '' ? (
            <div className='error-message' onClick={() => setErrorMessage('')}>
              {errorMessage}
            </div>
          ) : null
          } 

          <div className='login-dpi-container'>
          <TextInputIcon
              type='text'
              name='pi'
              placeholder='Ingrese su DPI/CUI'
              value={formData.pi}
              onChange={handleChange}
              icon={faUser}
          />
          </div>

          <div className='login-password-container'>
          <TextInputIcon
              type='password'
              name='password'
              placeholder='Ingrese su contraseña'
              value={formData.password}
              onChange={handleChange}
              icon={faLock}
              iconOnClick={showPassword ? faEye: faEyeSlash}
              onIconClick={handlePasswordVisibility}
          />
          </div>

          <div className='login-rol-container'>
          <Dropdowncustom 
            nombre="Seleccionar rol" 
            lista = {['usuario_comun', 'empleador']}
            onChange={handleDropdownChange} 
          />
          </div>

          <div className='login-register-container'>
          <div className='text-info-register-container'>
            ¿No te has registrado aún?
          </div>
          <div className='text-register-container'>
            <Link to="/" state={{ from: 'register' }}>Regístrate aquí</Link>
          </div>
          </div>

          <div className='login-button-container'>
            <CustomButton buttonText="Iniciar sesion" onClick={handleClick} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
