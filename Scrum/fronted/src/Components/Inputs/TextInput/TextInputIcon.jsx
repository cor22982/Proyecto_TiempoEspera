import './TextInputIcon.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const TextInputIcon = ({ type, name, placeholder, value, onChange, icon, onIconClick, iconOnClick }) => {
  const [inputType, setInputType] = useState(type) // Nuevo estado para el tipo de input
  const [mytype] = useState(type)
  const handleIconClick = () => {
    if (onIconClick) {
      if (inputType === 'password') {
        setInputType('text')
      } else {
        setInputType('password')
      }
      onIconClick()
    }
  }
  
  const handleFocus = () => {
    if (mytype === 'date'){
      setInputType('date') // Cambiamos a 'date' cuando el usuario hace clic
    }
    else if (mytype === 'time'){
      setInputType('time')
    }
  }

  return (
    <div className='input-icon'>
      {icon && <FontAwesomeIcon className='icon-font' icon={icon}/>}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
      />
      {onIconClick && <FontAwesomeIcon className='icon-font-condition' icon={iconOnClick} onClick={handleIconClick} />}
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
