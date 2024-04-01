import React from 'react';
import './LoginTextInput.css';

const LoginTextInput = ({ imageUrl, placeholder, type,onChange,value  }) => {
  return (
    <div className='text-input-container'>
      
      <div className='image-container'>
        {/* Renderizar la imagen recibida como prop */}
        <img src={imageUrl} alt='Logo' className="icono-blanco" ></img>   
      </div>

      <div className='text-container'>
        {/* Renderizar el texto recibido como prop */}
        <input type={type} placeholder={placeholder} 
          onChange={({ target: { value }}) => onChange(value)}
          value={value}
        />
      </div>

    </div>
  );
}

export default LoginTextInput;
