import Principal from './Principal';
import useApi from '@hooks/useApi';
import { useState } from 'react';
import Informacion from './Informacion';
import SearchInput from '../Components/SearchInput';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Page_Main.css'
const Page_Main = () => {
  const [busqueda, setBusqueda] = useState('')
  const [pantalla, setPantalla] = useState(true)
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/institutions/${busqueda}`);
  const [datos , setDatos] = useState([]);
  const [object_datos, setobject_datos] = useState(null)

  const onSearch = async () => {
    const busquedaParseada = busqueda.toLowerCase().replace(/ /g, '%20');
    console.log(busquedaParseada)
    try {
      const response = await llamadowithoutbody('GET')
      setDatos(response) 
    } catch (e) {
      setDatos([])
    }
  }


  return (
    <div className='contenido'>
      <div className='cabecera'>
      <SearchInput 
        icono={faSearch} 
        placeholder='Buscar tramite'
        value={busqueda} 
        onChange={(value) => setBusqueda(value)}
        onpressenter={onSearch}
        ></SearchInput>
    </div>
      <div className='paginas'>
      { pantalla ? (
        <Principal ira={setPantalla} datos={datos} setobj={setobject_datos}></Principal>
      ) : (
        <Informacion data={object_datos}></Informacion>
      )

      }
      </div>
    </div>
  )
}

export default Page_Main