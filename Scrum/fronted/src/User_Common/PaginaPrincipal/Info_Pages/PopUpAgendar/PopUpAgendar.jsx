import PopUp from "@components/UI/MessagePopUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
const PopUpAgendar = ({activar, setActivar, description}) => {
  return(
      <PopUp trigger={activar} setTrigger={setActivar}>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2>CITA AGENDADA EXITOSAMENTE</h2>
          <div style={{fontSize: '90px', display: 'flex', justifyContent: 'center', color: '#03B100'}}>
            <FontAwesomeIcon icon={faCheckCircle}/>
          </div>
          <p style={{fontSize: '20px', display: 'flex'}}>{description}</p>          
        </div>
      </PopUp>
  ); 
}

export default PopUpAgendar