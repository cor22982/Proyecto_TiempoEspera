import React from 'react';
import './Login.css';
import LoginTextInput from './LoginTextInput';
import CustomButton from './CustomButton';

const Login = () => {

  const handleClick = () => {
    console.log('Botón clicado');
    // Aquí puedes agregar la lógica que desees ejecutar cuando el botón sea clicado
  }

  return (
    <div className='login-container'>
      <div className='login-left-side'>
        <img src='../src/assets/Login/logotipo.png' alt='Logo'></img>   
      </div>

      <div className='login-right-side'>
        <h1 className='login-title'>Iniciar sesión</h1>
        {/* Utiliza el componente LoginTextInput */}
        <LoginTextInput imageUrl='../src/assets/Login/pi.png' placeholder='Ingrese su DPI/CUI' />
        <LoginTextInput imageUrl='../src/assets/Login/password.png' placeholder='Ingrese su contraseña' />
        <LoginTextInput imageUrl='../src/assets/Login/role.png' placeholder='Ingrese su rol' />
        
        {/* Utiliza el componente CustomButton y pasa el texto y la función de clic */}
        <CustomButton buttonText="Iniciar sesión" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Login;
