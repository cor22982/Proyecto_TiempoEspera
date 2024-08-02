import './Pages.css'
import MenuButton from '@components/MenuButton';
import { faUser, faHome, faSave, faGear, faBell, faRightFromBracket, faSearch, faFire } from '@fortawesome/free-solid-svg-icons';
import '../assets/Login/logotipo.png'
import { Route, Routes } from 'react-router-dom';
import Logout from '../Login/Logout';
import Page_Main from '../User_Common/PaginaPrincipal/Page_Main';
import Guardados from '../User_Common/Guardados/Guardados';
const Pages = ({ pi }) => {
  return (
    <div className="contenedor-principal">
      <div className='opciones'>
        <img src='../src/assets/Login/logotipo.png' className='imagen-portada'></img>
        <MenuButton nombre='Principal' icono={faHome} goto='/'></MenuButton>
        <div style={{width: '150px' ,height: '0px', border: '1px solid #FFFFFF'}}></div>
        <br></br>
        <MenuButton nombre='Cuenta' icono={faUser} goto='/cuenta'></MenuButton>
        <br></br>
        <MenuButton nombre='Guardados' icono={faSave} goto='/guardados'></MenuButton>
        <br></br>
        <MenuButton nombre='Notificaciones' icono={faBell} goto='/notificaciones'></MenuButton>
        <br></br>
        <MenuButton nombre='Recomendados' icono={faFire} goto='/recomendados'></MenuButton>
        <br></br>
        <MenuButton nombre='Configuracion' icono={faGear} goto='/configuracion'></MenuButton>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <MenuButton nombre='Salir' icono={faRightFromBracket} goto='/salir'></MenuButton>

        
      </div>

      <div className='interfaz'>
        
        
         <Routes>  
            <Route path="*" element={<Page_Main pi={pi}/>} />
            <Route path="/cuenta" element={<CuentaPage />} />
            <Route path="/guardados" element={<Guardados/>} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
            <Route path="/notificaciones" element={<NotificacionesPage />} />
            <Route path="/recomendados" element={<Recomendados></Recomendados>} />
            <Route path='/salir' element={<Logout/>}></Route>
          </Routes>   
        

      </div>
    </div>
  );

}

const Recomendados = () => <h1>Contenido de Recomendados</h1>;
const CuentaPage = () => <h1>Contenido de la página de cuenta</h1>;
const ConfiguracionPage = () => <h1>Contenido de la página de configuración</h1>;
const NotificacionesPage = () => <h1>Contenido de la página de notificaciones</h1>;


export default Pages