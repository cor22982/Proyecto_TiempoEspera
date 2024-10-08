import './SavedProcedureCard.css'
const SavedComponent = ({image, title, description, funtion}) => {
  return (
    <div className='container-saved' onClick={funtion}>
      <img 
        src= {image}
        className='imagen-institution'></img>
      <div className='saved-information'>
        <h2 className='titulo-information'>{title}</h2>
        <p className='description-information'>{description}</p>
      </div>
    </div>
  );
}

export default SavedComponent