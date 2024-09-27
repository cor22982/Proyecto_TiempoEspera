import PopUp from "@components/PopUp";
function Popaccount({activar, setActivar,error}) {
  return ( 
    <PopUp trigger={activar} setTrigger={setActivar}>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2>Ha ocurrido un error</h2>
          <p style={{fontSize: '20px', display: 'flex'}}>La imagen es demasiado pesada pruebe con otra</p>
          <p style={{fontSize: '20px', display: 'flex'}}>{error}</p>        
        </div>
      </PopUp>
  )
}

export default Popaccount