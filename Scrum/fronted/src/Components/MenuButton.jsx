import './MenuButton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const MenuButton = ({nombre, goto, icono}) => {
  return(
    <div className='contenedor'>
     <FontAwesomeIcon icon={icono} className="icon" />
     <Link 
      to={goto} 
      className='link-menu'>{nombre}</Link>
    </div>
    
  );
}

export default MenuButton