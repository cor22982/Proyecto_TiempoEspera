import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import './Label_Input.css'


const Label_Input=({label_name})=>{
  const [show_input, set_ShowInput] = useState(false)
  return(
    <div >
      {show_input ? (
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
          <input type="text" placeholder={label_name} />
          <div style={{display: 'flex', flexDirection: 'row', gap:'10px', alignItems: 'center'}}>
              <div className='checks-buttons' style={{'--icon-color': 'green'}}>
                <FontAwesomeIcon
                  icon={faCheck}
                />
              </div>
              <div className='checks-buttons' style={{'--icon-color': 'red'}}>
                <FontAwesomeIcon
                  icon={faX}
                />
              </div>
          </div>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
          <p>{label_name}</p>
          <div className='styled-button-pen' onClick={() => {set_ShowInput(!show_input)}}>
            <FontAwesomeIcon
            icon={faPen}
            />
          </div>
            
        </div>
                
      )}
      
    </div>
  )
}

export default Label_Input