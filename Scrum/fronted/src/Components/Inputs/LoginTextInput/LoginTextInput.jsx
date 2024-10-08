import { useState } from 'react'
import React from 'react';
import './LoginTextInput.css';
 
const LoginTextInput = ({ imageUrl, placeholder, type,onChange,value  }) => {
  const [ eyeClosed, setEyeClosed ] = useState(true) 
  return (
    <div className='textinput-login-container'>
      
      <div className='image-container-1'>
        {/* Renderizar la imagen recibida como prop */}
        <img src={imageUrl} alt='Logo' className="icono-blanco-1" ></img>   
      </div>

      <div className='text-container-1'>
        {/* Renderizar el texto recibido como prop */}
        <input 
          type={!eyeClosed && type === 'password' ? 'text' : type }
          placeholder={placeholder} 
          onChange={({ target: { value }}) => onChange(value)}
          value={value}
        />
         {
        type === 'password' ? (
          <div
            className={`eye ${eyeClosed ? 'closed' : 'open'}`}
            onClick={() => setEyeClosed((oldEye) => !oldEye)}
          >
            👁
          </div>
        ) : null 
        }
      </div>

    </div>
  );
}

export default LoginTextInput; 
