import React from 'react';

import CustomButton from '@components/Buttons/CustomButton';
import Dropdowncustom from '@components/Buttons/DropDown';
import {faUser, faEye, faEyeSlash, faLock, faIdCard, faCake } from '@fortawesome/free-solid-svg-icons'
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
import useFormLogin from '../hooks/useFormLogin'


import { md5 } from 'js-md5';
import { useState } from 'react';
const Registro = () => {
  const { formData, handleChange } = useFormLogin({ pi: '', name:'', lastname:'', age: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({ pi: '',name: '', lastname: '',password_md5: '',age: '',type_user: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleDropdownChange = (selectedItem) => {
    setValue('type_user', selectedItem);
  }

  const click = async () => {
    const body = { }
    body.pi = formData.pi
    body.name = formData.name
    body.lastname = formData.lastname
    body.password_md5 = md5(formData.password)
    body.age = formData.age
    body.type_user = formState.type_user
    
    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('https://deimoss.web05.lol/register', fetchOptions)
    
    if (response.ok) {
      window.location.href = '/';
      console.log('success!')
      setErrorMessage('')
      return
    }else{
      setErrorMessage('Esta intentando ingresar a un usuario no admitido')
    }
    
  }
  return (
    <div className='login-container'>
      <div className='login-left-side'>
        <img src='../src/assets/Login/logotipo.png' alt='Logo'></img>   
      </div>

      <div className='login-right-side'>
        <div className='content-right-side'>
          <h1 className='login-title'>Registro</h1>
          {
            errorMessage !== '' ? (
              <div className='error-message' onClick={() => setErrorMessage('')}>
                {errorMessage}
              </div>
            ) : null
          }
          <div className='register-name-container'>
            <TextInputIcon
                type='text'
                name='name'
                placeholder='Ingrese su nombre'
                value={formData.name}
                onChange={handleChange}
                icon={faUser}
            />
          </div>
          
          <div className='register-lastname-container'>
            <TextInputIcon
                type='text'
                name='lastname'
                placeholder='Ingrese su apellido'
                value={formData.lastname}
                onChange={handleChange}
                icon={faUser}
            />
          </div>

          <div className='register-pi-container'>
            <TextInputIcon
                  type='text'
                  name='pi'
                  placeholder='Ingrese su DPI/CUI'
                  value={formData.pi}
                  onChange={handleChange}
                  icon={faIdCard}
              />
          </div>

          <div className='register-age-container'>
            <TextInputIcon
                type='number'
                name='age'
                placeholder='Ingrese su edad'
                value={formData.age}
                onChange={handleChange}
                icon={faCake}
            />          
          </div>

          <div className='register-password-container'>
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

          <div className='register-rol-container'>
            <Dropdowncustom 
              nombre="Seleccionar rol" 
              lista = {['usuario_comun', 'empleador']}
              onChange={handleDropdownChange}/>
          </div>

          <div className='register-button-container'>
            <CustomButton buttonText='Registrarse' onClick={click} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro;