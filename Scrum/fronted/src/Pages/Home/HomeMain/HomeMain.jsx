import Principal from '@pages/Home/HomeSearch/HomeSearch';
import useApi from '@hooks/api/useApi';
import { useState, useEffect } from 'react';
import Informacion from '@pages/Institution/InstitutionRoutes';
import SearchInput from '@components/Inputs/SearchInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Box_Search from "@components/Inputs/SearchBox";
import './HomeMain.css';

const Page_Main = ({ pi }) => {
  const [busqueda, setBusqueda] = useState('');
  const [pantalla, setPantalla] = useState(true);
  const { llamadowithoutbody } = useApi(`https://deimoss.web05.lol/institutions/${busqueda}`);
  const [datos, setDatos] = useState([]);
  const [object_datos, setobject_datos] = useState(null);
  const [seeScreens, setSeeScren] = useState(false);

  // useEffect to call onSearch when busqueda changes and is not empty
  useEffect(() => {
    const fetchData = async () => {
      if (busqueda.trim() === '') {
        return;
      }

      const busquedaParseada = busqueda.toLowerCase().replace(/ /g, '%20');
      try {
        console.log(busquedaParseada);
        const response = await llamadowithoutbody('GET', `https://deimoss.web05.lol/institutions/${busquedaParseada}`);
        console.log(response);
        setDatos(response);
        setSeeScren(true);
      } catch (e) {
        setDatos([]);
      }
    };

    fetchData();
  }, [busqueda, llamadowithoutbody]); // Dependencias: `busqueda` y `llamadowithoutbody`

  return (
    <div className='contenido'>
      <div className='cabecera'>
        <SearchInput 
          icono={faSearch} 
          placeholder='Buscar tramite'
          value={busqueda} 
          onChange={(value) => setBusqueda(value)}
          onpressenter={() => {
            // No need to call onSearch directly, it's handled by useEffect
          }}
        />
      </div> 
      <div className='paginas'>
      { pantalla ? (
        seeScreens ? (
          <Principal 
            ira={setPantalla} 
            datos={datos} 
            setobj={setobject_datos} 
            pi={pi}
            setSearch={setBusqueda}
            onSearch={() => {}} // No need for an onSearch prop here
          />
        ) : (
          <div style={{textAlign: 'center'}}>
            <h1>Tramites mas comunes</h1>
            <div style={{padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
              <Box_Search 
                title='Cita controlada' 
                backColor='#DB1A12' 
                onclick={async () => {
                  setBusqueda('cita controlada');
                }}
              />
              <Box_Search 
                title='Solicitud Electrónica de NIT' 
                backColor='#126DDB'
                onclick={async () => {
                  setBusqueda('Solicitud Electrónica de NIT');
                }} />
              <Box_Search 
                title='Incripción NIT sin Obligaciones con invalidez física' 
                backColor='#DB9D12'
                onclick={async () => {
                  setBusqueda('Incripción NIT sin Obligaciones con invalidez física');
                }} />
              <Box_Search 
                title='Inscripción de sociedad' 
                backColor='#08672E' 
                onclick={async () => {
                  setBusqueda('Inscripción de sociedad');
                }}/>
            </div>
          </div>
        ) 
      ) : (
        <Informacion data={object_datos} ira={setPantalla} />
      )}
      </div>
    </div>
  );
};

export default Page_Main;
