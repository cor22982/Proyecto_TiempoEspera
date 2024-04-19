import InsttutionComponent from "../Components/InsttutionComponent"
import SearchInput from "../Components/SearchInput"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'
import './Page_Main.css'
const Page_Main = () => {
  const [busqueda, setBusqueda] = useState('')
  const [datos , setDatos] = useState([]);

  const onSearch = async () => {
    const busquedaParseada = busqueda.toLowerCase().replace(/ /g, '%20');
    console.log(busquedaParseada)
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(`https://deimoss.web05.lol/institutions/${busqueda}`, fetchOptions)
    if (response.ok) {
      const data = await response.json();
      setDatos(data)
      return  
    }
    setDatos([])
  }
  const onclick = () => {

  } 
  return (
    <div className="contenido">
      <div className='cabecera'>
        <SearchInput 
          icono={faSearch} 
          placeholder='Buscar tramite'
          value={busqueda}
          onChange={(value) => setBusqueda(value)}
          onpressenter={onSearch}
          ></SearchInput>
      </div>

      <div className="componentes">

        {
          datos.map((dato, index) => (
            <InsttutionComponent
            key={index}
            name={dato.name}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadqAgnFLnzDl0RncSwvEo3z8wKa3Thvsn0tZISkCtQ&s"
            onClick={onclick}
            tiempo="0:00"
          />
          ))
        }
        
      </div>
      
    </div>
  )
}

export default Page_Main