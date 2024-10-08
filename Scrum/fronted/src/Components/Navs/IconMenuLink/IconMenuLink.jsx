import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconMenuLink.css'

const IconMenuLink = ({ nombre, goto, icono, onClick }) => {
  return (
    <div className='contenedor' onClick={onClick}> {/* Llama a la función onClick cuando se haga clic */}
      <FontAwesomeIcon icon={icono} className="icon" />
      <span className='link-menu'>{nombre}</span> {/* Ya no necesitas un <Link> */}
    </div>
  );
};

export default IconMenuLink