import './TextInputIcon.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { useRef } from 'react';

const TextInputIcon = ({ type, name, placeholder, value, onChange, icon, onIconClick }) => {
  const [inputType, setInputType] = useState(type) // Nuevo estado para el tipo de input
  const inputRef = useRef(null); // Referencia al campo de entrada

  const handleIconClick = () => {
    if (onIconClick) {
      if (inputType === 'date') {
        inputRef.current.focus(); // Enfoca el campo de entrada
        inputRef.current.click(); // Simula el clic en el campo de entrada
      }
      onIconClick();
    }
  };
  
  

  return (
    <div className='input-icon'>
      {icon && <FontAwesomeIcon className='icon-font' icon={icon} onClick={handleIconClick} />}
      <input
        type={inputType} // Usa el estado inputType para determinar el tipo de input
        id={name} // Agrega un id al campo de entrada para identificarlo
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

TextInputIcon.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  onIconClick: PropTypes.func // Se espera que sea una función, pero es opcional
}

export default TextInputIcon
