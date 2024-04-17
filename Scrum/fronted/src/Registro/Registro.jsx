import React from 'react';
import '../Login/Login.css';
import LoginTextInput from '@components/LoginTextInput';
import CustomButton from '@components/CustomButton';
import Dropdowncustom from '@components/Dropdowncustom';
import { md5 } from 'js-md5';
import { useContext,useState } from 'react';
import LoginContext from '../LoginContex/LoginContext';
const Register = () => {
  const [formState, setFormState] = useState({ pi: '',name: '', lastname: '',password_md5: '',age: '',type_user: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const { setLoggedIn } = useContext(LoginContext)
  const setValue = (name, value) => {
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleDropdownChange = (selectedItem) => {
    setValue('type_user', selectedItem);
  }

  const click = async () => {
    const body = { }
    body.pi = formState.pi
    body.name = formState.name
    body.lastname = formState.lastname
    body.password_md5 = md5(formState.password_md5)
    body.age = formState.age
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
      console.log('success!')
      setLoggedIn(true)
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
        <h1 className='login-title'>Registro</h1>
        {
          errorMessage !== '' ? (
            <div className='error-message' onClick={() => setErrorMessage('')}>
              {errorMessage}
            </div>
          ) : null
        }

        {/* Utiliza el componente LoginTextInput */}
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='Nombre' type='text'
          value={formState.name} onChange={(value) => setValue('name', value)}
        />
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='Apellido' type='text'
          value={formState.lastname} onChange={(value) => setValue('lastname', value)}
        />
        
        <LoginTextInput imageUrl='../src/assets/Login/role.png' placeholder='DPI/CUI' type='text'
          value={formState.pi} onChange={(value) => setValue('pi', value)}
        />
        <LoginTextInput imageUrl='../src/assets/Login/age.png' placeholder='Edad' type='number'
          value={formState.age} onChange={(value) => setValue('age', value)}
        />
        <LoginTextInput imageUrl='../src/assets/Login/password.png' placeholder='Contraseña' type='password'
          value={formState.password_md5} onChange={(value) => setValue('password_md5', value)}
        />
        <Dropdowncustom nombre="Seleccionar rol" lista = {['usuario_comun', 'empleador']}
        onChange={handleDropdownChange}></Dropdowncustom>
        
        {/* Utiliza el componente CustomButton y pasa el texto y la función de clic */}
        <CustomButton buttonText='Registrarse' onClick={click} />
      </div>
    </div>
  )


}

export default Register;