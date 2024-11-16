import useApi from "@hooks/api/useApi";
import Checkbox from "@components/Buttons/Checkbox/Checkbox";
import { useEffect, useState } from "react";
import styles from "./Requisitos.module.css";
import { useBusqueda } from "../../../hooks/busqueda/useBusqueda";
import useToken from "@hooks/auth/useToken";
import { parseJwt } from "@hooks/auth/useToken";
import Spinner from '@components/UI/Spinner/Spinner';
const Requisitos = ({ data, ira }) => {
  const { id_procedure } = data;
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/requirements/${id_procedure}`
  );
  const { llamado: updatePaso } = useApi(`https://deimoss.web05.lol/updatePaso`);
  const { llamado: insertDocuments } = useApi(`https://deimoss.web05.lol/insertDocument_User`);
  const { llamado: getPasos } = useApi(`https://deimoss.web05.lol/getPasos_user`);
  const { llamado: getDocuments } = useApi(`https://deimoss.web05.lol/getDocuments_user`);
  
  const [pasos,setPasos] =  useState([])
  
  const { token } = useToken();
  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;
  }
  const { busqueda, setBusqueda } = useBusqueda();  
  const [requirements, setRequirements] = useState([]);
  const [pasos_vistos, setPasos_V] = useState([]);
  const [docs_vistos, setDocs_Vistos] =useState([]);

  //USE EFECTS

  // useEffect para obtener datos de llamadowithoutbody
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = { pi: dpi, procedure: id_procedure };
  
        const [data_get, respuesta_pasos, respuesta_docs] = await Promise.all([
          llamadowithoutbody("GET"),
          getPasos(body, "POST"),
          getDocuments(body, "POST"),
        ]);
  
        setRequirements(data_get.requirements);
        setPasos(data_get.steps[0].pasos);
        setPasos_V(respuesta_pasos.respuesta);
        setDocs_Vistos(respuesta_docs.respuesta);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    fetchData();
  }, [llamadowithoutbody, getPasos, dpi, id_procedure, getDocuments]);
  

  


  // FUNCIONES
  const callInsertDocumento = async (item) => {
    try {
      const body = { pi: dpi, procedure: id_procedure , document: item };
      const response = await insertDocuments(body,"POST")
    } catch (error) {
      console.error("Error en firinsert:", error);
    }
  };
  const handleCheckboxChange = (name) => {
    setBusqueda(name); // Establecer el nombre del documento como la búsqueda
    ira(true)
    console.log(name)
  };

  const callInsertPaso = async (item) => {
    try {
      const body = { pi: dpi, procedure: id_procedure , paso: item };
      const response = await updatePaso(body,"POST")
    } catch (error) {
      console.error("Error en updatear pasos", error);
    }
  };
  
  
  

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Pasos</h4>
      {pasos.map((paso, index) => {
        const isActive = pasos_vistos.some((visto) => visto === paso);
        return (
          <Checkbox 
              key={index} 
              name={paso}
              onPress={callInsertPaso}
              active={isActive}
              />
        )
        
      })}

      <h4 className={styles.heading}>Documentos</h4>
      {requirements.map((req, index) => {
        const isActive = docs_vistos.some((doc) => doc === req.id_document);
        return (
          <Checkbox
            key={index}
            name={req.name}
            type={true}
            onChange={callInsertDocumento} // Pasa la función para manejar cambios
            onPress={(name) => console.log(`Pressed: ${name}`)} // Opcional: para manejar el estado del nombre
            id={req.id_document}
            onsearch={handleCheckboxChange}
            active={isActive} // Define si está activo inicialmente
          />
  );
})}

      
    </div>
  );
};

export default Requisitos;
