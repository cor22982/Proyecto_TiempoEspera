import './TextInputIcon.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

const TextInputIcon = ({ type, name, placeholder, value, onChange, icon, onIconClick, iconOnClick }) => {
  const [inputType, setInputType] = useState(type) // Nuevo estado para el tipo de input

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
  

  return (
    <div className='input-icon'>
      {icon && <FontAwesomeIcon className='icon-font' icon={icon}/>}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
