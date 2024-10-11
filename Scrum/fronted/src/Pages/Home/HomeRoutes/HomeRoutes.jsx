import { useState } from 'react';
import './HomeRoutes.css'
import { faUser, faHome, faSave, faGear, faBell, faRightFromBracket, faFire } from '@fortawesome/free-solid-svg-icons';
import '@assets/Login/logotipo.png'
import Logout from '@pages/Auth/LogOut/LogOut';
import Page_Main from '@pages/Home/HomeMain/HomeMain';
import Guardados from '@pages/User/Saved/Guardados';
import Account from '@pages/User/Account/account';
import Configuration from '@pages/User/Configuration/configuration';
import Sidebar from '@components/SideBar/SideBar';

const Pages = ({ pi }) => {
  const [selectedView, setSelectedView] = useState('main'); // Controla la vista seleccionada
  const [sidebarOpen, setSidebarOpen] = useState(true);


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
        return <Configuration />;
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

  const linksArray = [
    {
      label: "Home",
      icon:faHome,
      to: "main",
    },
    {
      label: "Cuenta",
      icon: faUser,
      to: "cuenta",
    },
    {
      label: "Guardados",
      icon: faSave,
      to: "guardados",
    },
    {
      label: "Recomendados",
      icon: faFire,
      to: "recomendados",
    },
    {
      label: "Notificaciones",
      icon: faBell,
      to: "notificaciones",
    },
  ];
  const secondarylinksArray = [
    {
      label: "Configuración",
      icon: faGear, 
      to: "configuracion",
    },
    {
      label: "Salir",
      icon: faRightFromBracket,
      to: "salir",
    },
  ];
  return (
    <div className={sidebarOpen ? "contenedor-principal-activate": "contenedor-principal"}>
      <div className='opciones'>
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          linksArray={linksArray}
          secondarylinksArray={secondarylinksArray}
          handleMenuClick={handleMenuClick}></Sidebar>
      </div>

      <div className='interfaz'>
        {renderView()} {/* Renderiza la vista seleccionada */}
      </div>
    </div>
  );
};


const Recomendados = () => <h1>Contenido de Recomendados</h1>;
const NotificacionesPage = () => <h1>Contenido de la página de notificaciones</h1>;

export default Pages;
