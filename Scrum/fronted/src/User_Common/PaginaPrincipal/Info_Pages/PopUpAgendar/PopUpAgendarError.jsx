import PopUp from "@components/PopUp";
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
        <p style={{fontSize: '20px', display: 'flex'}}>SE AGENDO UNA CITA PARA Agencia Tributaria Galerias primas el dia DD/MM/AA a las HH:MM</p>          
      </div>
    </PopUp>
); 

}

export default PopUpAgendarError