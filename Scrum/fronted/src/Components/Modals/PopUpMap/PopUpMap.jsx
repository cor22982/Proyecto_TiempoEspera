import PopUp from "@components/Modals/MessagePopUp";
import MapView from "@components/UI/InteractiveMap/InteractiveMap";
const PopUpMap =({activar, setActivar, pos}) =>{
  
  return(
    <PopUp trigger={activar} setTrigger={setActivar}>     
      <MapView position={pos}></MapView>
    </PopUp>
  );
}

export default PopUpMap