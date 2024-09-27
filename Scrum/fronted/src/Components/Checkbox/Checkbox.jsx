import './Checkbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
const Checkbox = ({name}) => {
  const [pressed, setPressed] = useState(false);
  const handleClick = () => {
    setPressed(!pressed); // Cambiar el estado de presionado
  };
  return (
    <div className='checkbox-container'>
      <button 
        className= {pressed ? 'button-checkbox-click' : 'button-checkbox' } 
        onClick={handleClick}></button>
      <p className='titulo-checkbox'>{name}</p>
    </div>
  )
}

export default Checkbox