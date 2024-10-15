import { faX} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DeletuserCard.css'
function DeletuserCard({onDelete, name_user, dpi_user, type_user, imagen_src}) {
  return (
    <div className='container-saved'>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
        <div
        className="checks-buttons"
        style={{ '--icon-color': 'red' }}
        onClick={async() =>{await onDelete()}} // Aquí corregimos la llamada a la función
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="image-container-user">
          <img src={imagen_src} alt="" />
        </div>
        <p>{dpi_user}.</p>
        <p>Nombre: {name_user}</p>
        <p>Tipo: {type_user}</p>
      </div>
    </div>
  )
}

export default DeletuserCard