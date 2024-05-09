import './Informacion.css'
import MenuOption from '@components/MenuOption'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Info_Pages/Dashboard';
import Comentarios from './Info_Pages/Comentarios';
import Requisitos from './Info_Pages/Requisitos';
const Informacion = ({data}) => {
  const {name_institutions} = data
  return (
    <div className='contenedor-info'>
      <h3 className="titulo-info">{name_institutions}</h3>
      <div className='menu-info'>
        <MenuOption nombre='Dashboard' goto='/'></MenuOption>
        <MenuOption nombre='Comentarios' goto='/comentarios'></MenuOption>
        <MenuOption nombre='Requisitos' goto='/requisitos'></MenuOption>
        
      </div>
      <div className='informacion-contenido'>
        <Routes>
          <Route path='/' element={<Dashboard></Dashboard>}></Route>
          <Route path='/comentarios' element={<Comentarios></Comentarios>}></Route>
          <Route path='/requisitos' element={<Requisitos data={data}></Requisitos>}></Route>
        </Routes>
      </div>
      
    </div>
  )
} 

export default Informacion