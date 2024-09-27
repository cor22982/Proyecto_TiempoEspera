import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './IconButton.css'
function IconButton({icono,onclick, color}) {
  return (
    <div onClick={onclick}>
      <FontAwesomeIcon
        icon={icono}
        className={'icon_button'}
        style={{ '--icon-color': color}}
      />
    </div>
  )
}

export default IconButton