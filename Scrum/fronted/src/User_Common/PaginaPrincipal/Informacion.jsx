import './Informacion.css'
import MenuOption from '@components/MenuOption'
import Dashboard from './Info_Pages/Dashboard';
import Comentarios from './Info_Pages/Comentarios';
import Requisitos from './Info_Pages/Requisitos';
import Cita from '../../agendar/Cita'
import IconButton from '@components/IconButton';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Informacion = ({data, ira}) => {
  const {name_institutions} = data;
  const [selectedSection, setSelectedSection] = useState('dashboard'); // Estado para controlar la sección

  // Función para renderizar la sección según el estado
  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <Dashboard data={data} />;
      case 'comentarios':
        return <Comentarios data={data} />;
      case 'requisitos':
        return <Requisitos data={data} />;
      case 'agendar':
        return <Cita data={data} />;
      default:
        return <Dashboard data={data} />;
    }
  }

  return (
    <div className='contenedor-info'>
      <div className='header_institution'>
        <IconButton icono={faArrowLeft} color='#0069AD' onclick={() => ira(true)}></IconButton>
        <h3 className="titulo-info">{name_institutions}</h3>
      </div>

      <div className='menu-info'>
        <MenuOption nombre='Información' onClick={() => setSelectedSection('dashboard')} />
        <MenuOption nombre='Comentarios' onClick={() => setSelectedSection('comentarios')} />
        <MenuOption nombre='Requisitos' onClick={() => setSelectedSection('requisitos')} />
        <MenuOption nombre='Agendar' onClick={() => setSelectedSection('agendar')} />
      </div>

      <div className='informacion-contenido'>
        {renderContent()}
      </div>
    </div>
  );
}

export default Informacion;
