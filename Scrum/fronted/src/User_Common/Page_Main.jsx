import InsttutionComponent from "../Components/InsttutionComponent"
import SearchInput from "../Components/SearchInput"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Page_Main.css'
const Page_Main = () => {

  const onclick = () => {

  } 
  return (
    <div className="contenido">
      <div className='cabecera'>
        <SearchInput icono={faSearch} placeholder='Buscar tramite'></SearchInput>
      </div>

      <div className="componentes">
        <InsttutionComponent
          name= "RENAP zona 1" 
          image= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZadqAgnFLnzDl0RncSwvEo3z8wKa3Thvsn0tZISkCtQ&s  " 
          onClick = {onclick}
          tiempo = "0:00"/>

        
      </div>
      
    </div>
  )
}

export default Page_Main