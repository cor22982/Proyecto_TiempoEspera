import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX} from '@fortawesome/free-solid-svg-icons';
function Users_List({onDelete, name_user, dpi_user, imagen_src}) {
  return (
    <div className='container-saved'>
      <div 
      style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', paddingLeft: '10px'}}>
        <div
        className="checks-buttons"
        style={{ '--icon-color': 'red' }}
        onClick={onDelete} // Aquí corregimos la llamada a la función
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="image-container-user">
          <img src={imagen_src} alt="" />
        </div>
        <p>{dpi_user}.</p>
        <p>Nombre: {name_user}</p>
      </div>
    </div>
  )
}

export default Users_List