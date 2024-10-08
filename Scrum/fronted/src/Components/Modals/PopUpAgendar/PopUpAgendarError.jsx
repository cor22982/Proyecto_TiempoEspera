import PopUp from "@components/Modals/MessagePopUp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
const PopUpAgendarError = ({activar, setActivar}) => {
  return(
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2>ERROR AL AGENDAR</h2>
        <div style={{fontSize: '90px', display: 'flex', justifyContent: 'center', color: 'red'}}>
          <FontAwesomeIcon icon={faCircleExclamation}/>
        </div>
        <p style={{fontSize: '20px', display: 'flex'}}>No se pudo agendar la cita ocurrio un erro</p>          
        
      </div>
    </PopUp>
); 

}

export default PopUpAgendarError