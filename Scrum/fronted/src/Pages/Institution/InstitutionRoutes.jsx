import './InstitutionRoutes.css'
import MenuOption from '@components/Navs/TextMenuLink'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '@pages/Institution/InstitutionInfo/InstitutionDataProvider';
import Comentarios from '@pages/Institution/Comments/Comments';
import Requisitos from '@pages/Institution/Requirements/Requisitos';
import Cita from '@pages/Institution/Appointments/Cita'
import IconButton from '@components/Buttons/IconButton';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
const Informacion = ({data, ira}) => {
  const {name_institutions} = data

  return (
    <div className='contenedor-info'>
      <div className='header_institution'>
        <IconButton icono={faArrowLeft} color = '#0069AD' onclick = {() =>{ira(true)}}></IconButton>
        <h3 className="titulo-info">{name_institutions}</h3>
      </div>
      
      
      

      <div className='menu-info'>
        <MenuOption nombre='Información' goto='/'></MenuOption>
        <MenuOption nombre='Comentarios' goto='/comentarios'></MenuOption>
        <MenuOption nombre='Requisitos' goto='/requisitos'></MenuOption>
        <MenuOption nombre='Agendar' goto='/agendar'></MenuOption>
         
      </div>
      <div className='informacion-contenido'>
        <Routes>
          <Route path='/' element={<Dashboard data={data}></Dashboard>}></Route>
          <Route path='/comentarios' element={<Comentarios data={data}></Comentarios>}></Route>
          <Route path='/requisitos' element={<Requisitos data={data}></Requisitos>}></Route>
          <Route path='/agendar' element={<Cita data={data}></Cita>}></Route>
        </Routes> 
      </div>
      
    </div>
  )
} 

export default Informacion