import SavedComponent from "@components/SavedComponent";
import { useState,  useEffect } from "react";
import PopUpSave from "./PopUpSave/PopUpSave";
import useApi from '@hooks/useApi';
const Guardados = ({pi}) => {
  const [showsave, setShowSave] = useState(false)
  const [information, setInformation] = useState({title: 'Tramite', information: 'Descripcion'})
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/userAppointments/${pi}`);
  const [saved, setSaved] = useState([])
  useEffect(() => {
    const getSaved = async () => {
      const response = await llamadowithoutbody('GET');
      setSaved(response)
      console.log(response)
    }
    getSaved();
  }, [llamadowithoutbody])


  const pressOnSave = () => {
    setShowSave(true)
  }
  return(
    <div style={{padding: '10px', gap: '10px'}}>

      {saved.map((save, index) => (
        <div key={index} style={{marginBottom: '5px'}}>
          <SavedComponent 
            image={save.imagen}
            title={save.name}
            description={`Agendada para el ${save.date} a la hora ${save.time}`}
            funtion={pressOnSave}></SavedComponent>    
            
        </div>
      ))}
            
      <PopUpSave 
        activar={showsave} 
        setActivar={setShowSave}
        nombre={information.title}
        description={information.information}></PopUpSave>
    </div>
  );
}

export default Guardados