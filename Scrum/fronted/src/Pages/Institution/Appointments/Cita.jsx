import './Cita.css';
import useApi from '@hooks/api/useApi';
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
import Button from '@components/Buttons/CustomButton/CustomButton';
import { faCalendar, faClock, faFile, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useFormCita from '@hooks/forms/useFormCita';
import PopUpAgendar from '@components/Modals/PopUpAgendar/PopUpAgendar';
import PopUpAgendarError from '@components/Modals/PopUpAgendar/PopUpAgendarError';
 
const Cita = ({ data }) => {
    const [userData, setUserData] = useState(null);
    const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/users/${data.pi_user}`);
    const { llamado } = useApi('https://deimoss.web05.lol/newAppointment');
    const { formData, handleChange } = useFormCita({ time: '', date: '', name_user: '', procedure_name: '', pi: data.pi_user });
    const [agendar, setAgendar] = useState(false);
    const [erragendar , setErrAgendar] = useState(false);
    const [showacepted, setShowAcepted]= useState('')
    const onClick = async() => {
        
        // Crea una copia de formData excluyendo name_user y procedure_name
        const { name_user, procedure_name, ...filteredFormData } = formData;
        // Agrega id_procedure y institution a la copia de formData
        const updatedFormData = {
          ...filteredFormData,
          id_procedure: data.id_procedure,
          institution: data.id_institutions
        };
        const { succes } = await llamado(updatedFormData, 'POST');
        console.log(succes); // Muestra `formData` con `id_procedure` y `institution` añadidos
        if (succes) {
            setShowAcepted(`SE AGENDO UNA CITA PARA ${data.name_institutions} el dia ${formData.date} a las ${formData.time}`)
            setAgendar(true);
        }
        else{
            setErrAgendar(true);
        }
        
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDataResponse = await llamadowithoutbody('GET');
                setUserData(userDataResponse);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchData();

        return () => {
            setUserData(null);
        };
    }, [data.pi_user]);

    return (
        <div className="cita-container">
            <div className='info-cita-container'>
                <div className='name-container'>
                    <TextInputIcon
                        type='text'
                        name='name_user'
                        placeholder={userData ? `${userData[0].name} ${userData[0].lastname}` : ''}
                        value={userData ? `${userData[0].name} ${userData[0].lastname}` : ''}
                        onChange={handleChange}
                        icon={faUser}
                        readOnly={true}
                    />
                </div>

                <div className='procedure-container'>
                    <TextInputIcon
                        type='text'
                        name='procedure_name'
                        placeholder={data.name_procedure}
                        value={data.name_procedure}
                        onChange={handleChange}
                        icon={faFile}
                        readOnly={true}
                    />
                </div>

                <div className='hora-container'>
                    <TextInputIcon
                        type='time'
                        name='time'
                        placeholder='Ingrese la hora'
                        value={formData.time}
                        onChange={handleChange}
                        icon={faClock}
                    />
                </div>
                <div className='fecha-container'>
                    <TextInputIcon
                        type='date'
                        name='date'
                        placeholder='Ingrese la fecha'
                        value={formData.date}
                        onChange={handleChange}
                        icon={faCalendar}
                    />
                </div>
            </div>
            <div className='button-cita-container'>
                <Button onClick={onClick} buttonText='Agendar Cita'/>
            </div>     
            <PopUpAgendar 
                activar={agendar} 
                setActivar={setAgendar}
                description={showacepted}></PopUpAgendar>
            <PopUpAgendarError activar={erragendar} setActivar={setErrAgendar}></PopUpAgendarError>
        </div>
    );
};

export default Cita;
