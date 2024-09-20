import { useState } from 'react';
import './Pages.css';
import MenuButton from '@components/MenuButton';
import { faUser, faHome, faSave, faGear, faBell, faRightFromBracket, faFire } from '@fortawesome/free-solid-svg-icons';
import '../assets/Login/logotipo.png';
import Logout from '../Login/Logout';
import Page_Main from '../User_Common/PaginaPrincipal/Page_Main';
import Guardados from '../User_Common/Guardados/Guardados';
import Account from '../account/account';

const Pages = ({ pi }) => {
  const [selectedView, setSelectedView] = useState('main'); // Controla la vista seleccionada

  const handleMenuClick = (view) => {
    setSelectedView(view);
  };

  const renderView = () => {
    switch (selectedView) {
      case 'main':
        return <Page_Main pi={pi}></Page_Main>;
      case 'cuenta':
        return <Account />;
      case 'guardados':
        return <Guardados pi={pi} />;
      case 'configuracion':
        return <ConfiguracionPage />;
      case 'notificaciones':
        return <NotificacionesPage />;
      case 'recomendados':
        return <Recomendados />;
      case 'salir':
        return <Logout />;
      default:
        return <Page_Main pi={pi}></Page_Main>;
    }
  };

  return (
    <div className="contenedor-principal">
      <div className='opciones'>
        <img src='../src/assets/Login/logotipo.png' className='imagen-portada' alt="Logotipo" />
        <MenuButton nombre='Principal' icono={faHome} goto='main' onClick={() => handleMenuClick('main')} />
        <div style={{ width: '150px', height: '0px', border: '1px solid #FFFFFF' }}></div>
        <br />
        <MenuButton nombre='Cuenta' icono={faUser} goto='cuenta' onClick={() => handleMenuClick('cuenta')} />
        <br />
        <MenuButton nombre='Guardados' icono={faSave} goto='guardados' onClick={() => handleMenuClick('guardados')} />
        <br />
        <MenuButton nombre='Notificaciones' icono={faBell} goto='notificaciones' onClick={() => handleMenuClick('notificaciones')} />
        <br />
        <MenuButton nombre='Recomendados' icono={faFire} goto='recomendados' onClick={() => handleMenuClick('recomendados')} />
        <br />
        <MenuButton nombre='Configuracion' icono={faGear} goto='configuracion' onClick={() => handleMenuClick('configuracion')} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <MenuButton nombre='Salir' icono={faRightFromBracket} goto='salir' onClick={() => handleMenuClick('salir')} />
      </div>

      <div className='interfaz'>
        {renderView()} {/* Renderiza la vista seleccionada */}
      </div>
    </div>
  );
};

const Recomendados = () => <h1>Contenido de Recomendados</h1>;
const ConfiguracionPage = () => <h1>Contenido de la página de configuración</h1>;
const NotificacionesPage = () => <h1>Contenido de la página de notificaciones</h1>;

export default Pages;
