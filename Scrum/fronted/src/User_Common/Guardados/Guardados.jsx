import SavedComponent from "@components/Cards/SavedProcedureCard";
import { useState, useEffect } from "react";
import PopUpSave from "./PopUpSave/PopUpSave";
import useApi from '@hooks/useApi';

const Guardados = ({ pi }) => {
  const [showsave, setShowSave] = useState(false);
  const [information, setInformation] = useState({ title: '', information: '' , imagen:'', address: '' });
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/userAppointments/${pi}`);
  const [saved, setSaved] = useState([]);

  const setValue = (name, value) => {
    setInformation(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  useEffect(() => {
    const getSaved = async () => {
      const response = await llamadowithoutbody('GET');
      setSaved(response);
      console.log(response);
    };
    getSaved();
  }, [llamadowithoutbody, pi]);

  const pressOnSave = (save) => {
    setValue('title', save.name);
    setValue('information', `Se agendo una cita para ${save.institution_name} para el ${save.date} a las ${save.time} `);
    setValue('imagen', save.imagen);
    setValue('address', `La direccion de la institucion es en  "${save.adress}`);
    setShowSave(true);
  };

  return (
    <div style={{ padding: '10px', gap: '10px' }}>
      {saved.map((save, index) => (
        <div key={index} style={{ marginBottom: '5px' }}>
          <SavedComponent 
            image={save.imagen}
            title={save.name}
            description={`Agendada para el ${save.date} a la hora ${save.time}`}
            funtion={() => pressOnSave(save)}
          />
        </div>
      ))}
      <PopUpSave 
        activar={showsave} 
        setActivar={setShowSave}
        nombre={information.title}
        description={information.information}
        image={information.imagen}
        address={information.address}
      />
    </div>
  );
}

export default Guardados;
