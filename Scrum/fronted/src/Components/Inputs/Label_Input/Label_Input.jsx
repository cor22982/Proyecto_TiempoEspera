import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import './Label_Input.css';
 
const Label_Input = ({ label_name, onChange, to_Send, value}) => {
  const [show_input, set_ShowInput] = useState(false);

  const onPush = async() => {
    await to_Send();
    set_ShowInput(false); // Cierra el input después de enviar el dato
  };

  return (
    <div>
      {show_input ? (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            onChange={({ target: { value } }) => onChange(value)}
            value={value}
          />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
            <div
              className="checks-buttons"
              style={{ '--icon-color': 'green' }}
              onClick={async() =>{await onPush()}} // Aquí corregimos la llamada a la función
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div
              className="checks-buttons"
              style={{ '--icon-color': 'red' }}
              onClick={() => {set_ShowInput(false)}} // Cierra el input sin guardar
            >
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
          <p>{label_name}</p>
          <div className="styled-button-pen" onClick={() => {set_ShowInput(true); }}>
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Label_Input;
