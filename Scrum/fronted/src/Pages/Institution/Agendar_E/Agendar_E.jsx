import React, { useEffect, useState } from 'react';
import styles from "../Requirements/Requisitos.module.css";
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
import { faCalendar, faClock, faFile } from '@fortawesome/free-solid-svg-icons';
import useApi from '@hooks/api/useApi';
import Checkbox from "@components/Buttons/Checkbox";
import { parseJwt } from "@hooks/auth/useToken";
import useToken from "@hooks/auth/useToken";
import { CircularProgress } from "@mui/material";
function Agendar_E({ data }) {
    const { token } = useToken();
    const dpi = parseJwt(token).dpi;
    const [userData, setUserData] = useState([]); // Inicializa como un arreglo vacío
    const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/relations/${dpi}`);
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
    const getUsers = async () => {
        const response = await llamadowithoutbody('GET');
        setUserData(response)
        setLoading(true);
    };
    getUsers();
    }, [llamadowithoutbody]); // Asegúrate de incluir llamadowithoutbody en las dependencias

  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Tramite</h4>
      <div className='info-cita-container'>
        <div className='procedure-container'>
          <TextInputIcon
            type='text'
            name='procedure_name'
            placeholder={data.name_procedure}
            value={data.name_procedure}
            icon={faFile}
            readOnly={true}
          />
        </div>
        <div className='hora-container'>
          <TextInputIcon
            type='time'
            name='time'
            placeholder='Ingrese la hora'
            icon={faClock}
          />
        </div>
        <div className='fecha-container'> 
          <TextInputIcon
            type='date'
            name='date'
            placeholder='Ingrese la fecha'
            icon={faCalendar}
          />
        </div>
      </div>
      <br />
      <h4 className={styles.heading}>Colaboradores</h4>
      <div className="colaboradores_data">
        {userData && userData.length > 0 &&  loading  ? (
          userData.map((req, index) => (
            <Checkbox key={index} name={'Dpi: '+req.pi + ' |  Nombre:' + req.name} />
          ))
        ) : (
            <CircularProgress />  // Mensaje alternativo en caso de que no haya colaboradores
        )}
      </div>
    </div>
  );
}

export default Agendar_E;
