import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import './Label_Input.css'


const Label_Input=({label_name, onChange,value, to_Send})=>{
  const [show_input, set_ShowInput] = useState(false)
  const onPush = async({label}) => {
    await  to_Send(label)
    set_ShowInput(!show_input)
  }
  return(
    <div >
      {show_input ? (
        <div style={{display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center'}}>
          <input 
            type="text" 
            placeholder={label_name} 
            onChange={({ target: { value }}) => onChange(value)}
            value={value}/>
          <div style={{display: 'flex', flexDirection: 'row', gap:'10px', alignItems: 'center'}}>
              <div 
                className='checks-buttons' 
                style={{'--icon-color': 'green'}}>
                <FontAwesomeIcon
                  icon={faCheck}
                />
              </div>
              <div className='checks-buttons' 
                   style={{'--icon-color': 'red'}}
                   onClick={()=>{set_ShowInput(!show_input)}}>
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