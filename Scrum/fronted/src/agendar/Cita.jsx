import './Cita.css';
import useApi from '@hooks/useApi'
import TextInputIcon from '../Components/TextInput/TextInputIcon'
import Button from '../Components/CustomButton/CustomButton'
import {faCalendar, faClock, faFile, faUser } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import useFormCita from '../hooks/useFormCita' 
import PopUpAgendar from '../User_Common/PaginaPrincipal/Info_Pages/PopUpAgendar/PopUpAgendar';
import PopUpAgendarError from '../User_Common/PaginaPrincipal/Info_Pages/PopUpAgendar/PopUpAgendarError';
const Cita = ({ data }) => {
    const [userData, setUserData] = useState(null);
    const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/users/${data.pi_user}`);
    const { formData, handleChange } = useFormCita({ hora: '', fecha: '', name_user: '', procedure: '' })
    const [agendar, setAgendar] = useState(false);
    const [erragendar , setErrAgendar] = useState(false);
    const onClick = () => {
        console.log("Se agendó la cita");
        setAgendar(true);
    }
    
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

        // Limpieza del efecto
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
                        name='procedure'
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
                        name='hora'
                        placeholder='Ingrese la hora'
                        value={formData.hora}
                        onChange={handleChange}
                        icon={faClock}
                    />
                </div>
                <div className='fecha-container'>
                    <TextInputIcon
                        type='date'
                        name='fecha'
                        placeholder='Ingrese la fecha'
                        value={formData.fecha}
                        onChange={handleChange}
                        icon={faCalendar}
                    />
                </div>
            </div>
            <div className='button-cita-container'>
                <Button onClick={onClick} buttonText='Agendar Cita'/>
            </div>     
            <PopUpAgendar activar={agendar} setActivar={setAgendar}></PopUpAgendar>
            <PopUpAgendarError activar={erragendar} setActivar={setErrAgendar}></PopUpAgendarError>
        </div>
    );
};

export default Cita;