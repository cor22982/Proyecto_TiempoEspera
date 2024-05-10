import { useEffect, useState } from 'react'
import Tramite from '../../tramites/tramite' 
import image from '../../assets/calle.jpg'
import mapa from '../../assets/mapa_croquis.jpg'
import './Dashboard.css'

const Dashboard = ({ data }) => {
  const [institutionData, setInstitutionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://deimoss.web05.lol/institution/${data.id_institutions}`);
        const jsonData = await response.json();
        data.id_conversation =  jsonData[0].id_conversation;
        // Convertir los datos en el formato deseado
        const formattedData = {
          nombre: jsonData[0].name,
          t_promedio: '1:00:00', // Puedes establecer el tiempo promedio según tus necesidades
          telefono: '24161900', // Puedes establecer el número de teléfono según tus necesidades
          direccion: jsonData[0].adress,
          horario: 'Lunes a Viernes 7:00 am a 8:00 pm', // Puedes establecer el horario según tus necesidades
          puntuacion: 2.5, // Puedes establecer la puntuación según tus necesidades
          img: image, // Puedes establecer la imagen según tus necesidades
          mapa: mapa, // Puedes establecer el mapa según tus necesidades
          dias: {
            Lunes: 100, // Puedes establecer la disponibilidad para cada día según tus necesidades
            Martes: 50,
            Miércoles: 90,
            Jueves: 90,
            Viernes: 100,
            Sábado: 20,
            Domingo: 100,
          }
        };


        setInstitutionData(formattedData);
      } catch (error) {
        console.error('Error fetching institution data:', error);
      }
    };

    fetchData();
  }, [data.id_institutions]);

  return (
    <div className='dasboard-container'>
      {institutionData && (
        <Tramite institucion={institutionData} />
      )}
    </div>
  );
};

export default Dashboard;
