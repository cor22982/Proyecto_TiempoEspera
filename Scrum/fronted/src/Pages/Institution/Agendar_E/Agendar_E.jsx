import React from 'react'
import styles from "../Requirements/Requisitos.module.css";
import TextInputIcon from '@components/Inputs/TextInput/TextInputIcon';
function Agendar_E({data}) {
  return (
    <div className={styles.container}>
      <h4 className={styles.heading}>Tramite</h4>
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
      <h4 className={styles.heading}>Colaboradores</h4>
    </div> 
  )
}

export default Agendar_E