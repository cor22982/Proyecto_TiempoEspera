import useApi from '@hooks/useApi';
import Checkbox from "@components/Buttons/Checkbox";
import { useEffect, useState } from 'react';

const Requisitos = ({ data }) => {
  const { id_procedure } = data;
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/requirements/${id_procedure}`);
  const [requirements, setRequirements] = useState([]);
  const [pasos, setPasos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data_get = await llamadowithoutbody('GET');
      setRequirements(data_get.requirements);
      setPasos(data_get.steps[0].pasos); // Acceder al array de pasos dentro de steps
    };

    fetchData();
  }, [llamadowithoutbody]);

  return (
    <div style={{ overflowY: 'auto', maxHeight: '450px' }}>
      <h4>Pasos</h4>
      
        {pasos.map((paso, index) => (
          
          
          <Checkbox
            key={index}
            name={paso}
        />
        ))}
      
      <h4>Documentos</h4>
      {requirements.map((req, index) => (
        <Checkbox
          key={index}
          name={req.name + " (" + req.description + ")"}
        />
      ))}
    </div>
  );
};

export default Requisitos;
