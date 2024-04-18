import './MenuButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuButton = ({type,nombre, onclick, icono}) => {
  return(
    <div>
     <FontAwesomeIcon icon={icono} className="icon" />
     <button 
      type={type} 
      className="btn-outlined"
      onClick={onclick}
      >{nombre}</button>  
    </div>
    
  );
}

export default MenuButton