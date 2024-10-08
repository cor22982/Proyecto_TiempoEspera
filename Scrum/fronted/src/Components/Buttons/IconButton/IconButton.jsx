import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css';

function IconButton({ icono, onclick, color, texto }) {
  return (
    <div onClick={onclick} style={{display: 'flex' , gap: '10px'}} className='icon_button'>
       {texto && <span className="icon_text" style={{ '--icon-color': color }}>{texto}</span>}
      <FontAwesomeIcon
        icon={icono}
        className={'icon_button'}
        style={{ '--icon-color': color }}
      />
    </div>
  );
}

export default IconButton;
