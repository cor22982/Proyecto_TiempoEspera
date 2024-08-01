import './Informacion.css'
import MenuOption from '@components/MenuOption'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Info_Pages/Dashboard';
import Comentarios from './Info_Pages/Comentarios';
import Requisitos from './Info_Pages/Requisitos';
import Cita from '../../agendar/Cita'

 
const Informacion = ({data}) => {
  const {name_institutions} = data

  return (
    <div className='contenedor-info'>
      <h3 className="titulo-info">{name_institutions}</h3>
      

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