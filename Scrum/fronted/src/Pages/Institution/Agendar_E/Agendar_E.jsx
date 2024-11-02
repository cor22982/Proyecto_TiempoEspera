import React, { useEffect, useState } from 'react';
import styles from "../Requirements/Requisitos.module.css";
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
import { faCalendar, faClock, faFile } from '@fortawesome/free-solid-svg-icons';
import useApi from '@hooks/api/useApi';
import Checkbox from "@components/Buttons/Checkbox";
import { parseJwt } from "@hooks/auth/useToken";
import useToken from "@hooks/auth/useToken";
import { CircularProgress } from "@mui/material";
import Button from '@components/Buttons/CustomButton/CustomButton';
import useFormCita from '@hooks/forms/useFormCita';
import Swal from "sweetalert2";
function Agendar_E({ data }) {
    const { token } = useToken();
    const dpi = parseJwt(token).dpi;
    const [userData, setUserData] = useState([dpi]); // Inicializa como un arreglo vacío
    const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/relations/${dpi}`);
    const [loading, setLoading] = useState(false); 
    const [selectedPis, setSelectedPis] = useState([]);
    const { formData, handleChange } = useFormCita({ time: '', date: ''});
    const { llamado } = useApi('https://deimoss.web05.lol/newAppointment_byEmpleador');
    
    useEffect(() => {
    const getUsers = async () => {
        const response = await llamadowithoutbody('GET');
        setUserData(response)
        setLoading(true);
    };
    getUsers();
    }, [llamadowithoutbody]); // Asegúrate de incluir llamadowithoutbody en las dependencias
    const handleCheckboxChange = (pi) => {
        setSelectedPis((prevSelected) => {
            if (prevSelected.includes(pi)) {
                return prevSelected.filter(item => item !== pi); // Remover si ya está seleccionado
            } else {
                return [...prevSelected, pi]; // Agregar si no está seleccionado
            }
        });
    };

    const send_Procedures = async () => {
        const body = {  
            date: formData.date,
            id_procedure: data.id_procedure,
            institution: data.id_institutions,
            time: formData.time,
            pi_list: selectedPis
        };

        try {
            const { succes } = await llamado(body, 'POST');
            if (succes) {
                Swal.fire({
                    icon: 'success',
                    title: 'Cita agendada',
                    text: 'La cita se ha agendado correctamente.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al agendar la cita. Inténtalo nuevamente.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en la solicitud. Verifica tu conexión o intenta más tarde.',
            });
        }
    };
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
            onChange={handleChange}
            icon={faClock}
          />
        </div>
        <div className='fecha-container'> 
          <TextInputIcon
            type='date'
            name='date'
            placeholder='Ingrese la fecha'
            onChange={handleChange}
            icon={faCalendar}
          />
        </div>
      </div>
      <br />
      <h4 className={styles.heading}>Colaboradores</h4>
      <div className="colaboradores_data">
        {userData && userData.length > 0 &&  loading  ? (
          userData.map((req, index) => (
            <Checkbox 
                key={index}
                id ={req.pi}
                name={'Dpi: '+req.pi + ' |  Nombre:' + req.name}
                onChange={handleCheckboxChange}  />
          ))
        ) : (
            <CircularProgress />  // Mensaje alternativo en caso de que no haya colaboradores
        )}
      </div>
      <Button  buttonText='Agendar Cita' onClick={send_Procedures} />
    </div>
  );
}

export default Agendar_E;
