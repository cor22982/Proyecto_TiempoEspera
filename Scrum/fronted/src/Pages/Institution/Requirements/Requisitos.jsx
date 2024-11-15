import useApi from "@hooks/api/useApi";
import Checkbox from "@components/Buttons/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import styles from "./Requisitos.module.css";
import { useBusqueda } from "../../../hooks/busqueda/useBusqueda";

const Requisitos = ({ data, ira }) => {
  const { id_procedure } = data;
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/requirements/${id_procedure}`
  );
  const { busqueda, setBusqueda } = useBusqueda();  
  const [requirements, setRequirements] = useState([]);
  const [pasos, setPasos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data_get = await llamadowithoutbody("GET");
      setRequirements(data_get.requirements);
      setPasos(data_get.steps[0].pasos); // Acceder al array de pasos dentro de steps
    };

    fetchData();
  }, [llamadowithoutbody]);


  const handleCheckboxChange = (name) => {
    setBusqueda(name); // Establecer el nombre del documento como la búsqueda
    ira(true)
    console.log(name)
  };
  

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Pasos</h4>
      {pasos.map((paso, index) => (
        <Checkbox key={index} name={paso} />
      ))}

      <h4 className={styles.heading}>Documentos</h4>
      {requirements.map((req, index) => (
        <Checkbox 
          key={index} 
          name={req.name} 
          type= {true}
          onsearch={handleCheckboxChange}/>
      ))}
    </div>
  );
};

export default Requisitos;
