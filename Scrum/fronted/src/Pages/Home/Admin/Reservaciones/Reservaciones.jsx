import { useState, useEffect } from "react";
import './Reservaciones.css';
import Institution_Appoint from '../../../../Components/Cards/Institution_Appoint/Institution_Appoint';
import { CircularProgress } from "@mui/material";
import useApi from '@hooks/api/useApi';

const Reservaciones = () => {
  const [loading, setLoading] = useState(true);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/all_appointments`);

  useEffect(() => {
    const getAppoints = async () => {
      const response = await llamadowithoutbody('GET');
      
      // Agrupar las citas por institution_id
      const grouped = response.reduce((acc, item) => {
        const { institution_id, institution_name, institution_imagen } = item;
        
        if (!acc[institution_id]) {
          acc[institution_id] = {
            institution_name,
            institution_imagen,
            appointments: []
          };
        }

        acc[institution_id].appointments.push(item);
        return acc;
      }, {});

      setGroupedAppointments(grouped);
      setLoading(false);
    };

    getAppoints();
  }, [llamadowithoutbody]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '2.2rem' }}>
      <div className="titule">Reservaciones</div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="appointments-items">
          {Object.keys(groupedAppointments).map((institutionId) => {
            const { institution_name, institution_imagen, appointments } = groupedAppointments[institutionId];

            return (
              <Institution_Appoint 
                key={institutionId} 
                name={institution_name} 
                imagen_inst={institution_imagen}
                list_appointments={appointments} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reservaciones;
