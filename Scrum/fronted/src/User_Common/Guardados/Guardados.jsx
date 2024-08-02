import SavedComponent from "@components/SavedComponent";
import { useState } from "react";
import PopUpSave from "./PopUpSave/PopUpSave";
const Guardados = () => {
  const [showsave, setShowSave] = useState(false)
  const [information, setInformation] = useState({title: 'Tramite', information: 'Descripcion'})
  const pressOnSave = () => {
    setShowSave(true)
  }
  return(
    <div style={{padding: '10px', gap: '10px'}}>
      <SavedComponent 
        image='https://thumbs.dreamstime.com/z/prueba-web-con-preguntas-de-la-opción-múltiple-vector-el-icono-del-118526760.jpg?ct=jpeg'
        title='TRAMITE'
        funtion={pressOnSave}></SavedComponent>
      <br></br>
      
      <PopUpSave 
        activar={showsave} 
        setActivar={setShowSave}
        nombre={information.title}
        description={information.information}></PopUpSave>
    </div>
  );
}

export default Guardados