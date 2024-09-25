import PopUp from "@components/PopUp";
import MapView from "../../Components/MapView/MapView";
const PopUpMap =({activar, setActivar, pos}) =>{
  
  return(
    <PopUp trigger={activar} setTrigger={setActivar}>     
      <MapView position={pos}></MapView>
    </PopUp>
  );
}

export default PopUpMap