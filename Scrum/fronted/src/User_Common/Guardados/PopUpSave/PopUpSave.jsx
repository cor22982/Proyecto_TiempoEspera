import PopUp from "@components/PopUp";
function PopUpSave({activar, setActivar, nombre, description}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2>{nombre}</h2>
          <p style={{fontSize: '20px', display: 'flex'}}>{description}</p>          
        </div>
      </PopUp>
  )
}

export default PopUpSave