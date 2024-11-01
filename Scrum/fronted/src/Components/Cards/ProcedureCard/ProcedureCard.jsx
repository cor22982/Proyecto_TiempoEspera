import React from 'react'
import { faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ProcedureCard({onDelete, procedure}) {
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
        <p>{procedure}.</p>

      </div>
    </div>
  )
}

export default ProcedureCard