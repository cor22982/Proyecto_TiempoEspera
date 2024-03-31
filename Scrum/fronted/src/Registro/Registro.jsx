import React from 'react';
import '../Login.css';
import LoginTextInput from '../LoginTextInput';
import CustomButton from '../CustomButton';

const Register = () => {
  const click = () => {
    console.log('Registro completado')
  }
  return (
    <div className='login-container'>
      <div className='login-left-side'>
        <img src='../src/assets/Login/logotipo.png' alt='Logo'></img>   
      </div>

      <div className='login-right-side'>
        <h1 className='login-title'>Registro</h1>
        {/* Utiliza el componente LoginTextInput */}
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='Usuario' />
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='Correo' />
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='DPI/CUI' />
        <LoginTextInput imageUrl='../src/assets/Login/password.png' placeholder='Contraseña' />
        <LoginTextInput imageUrl='../src/assets/Login/role.png' placeholder='Ingrese su rol' />
        
        {/* Utiliza el componente CustomButton y pasa el texto y la función de clic */}
        <CustomButton buttonText='Registrarse' onClick={click} />
      </div>
    </div>
  )


}

export default Register;