import './Pages.css'
import MenuButton from '@components/MenuButton';
import { faUser, faHome, faSave, faGear, faBell, faRightFromBracket, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/Login/logotipo.png'
import SearchInput from '@components/SearchInput';
const Pages = () => {

  const logout = () => {
    localStorage.clear()
    window.location.href = '/';

  }

  return (
    <div className="contenedor-principal">
      <div className='opciones'>
        <img src='../src/assets/Login/logotipo.png' className='imagen-portada'></img>
        <MenuButton nombre='Principal' icono={faHome}></MenuButton>
        <div style={{width: '150px' ,height: '0px', border: '1px solid #FFFFFF'}}></div>
        <MenuButton nombre='Cuenta' icono={faUser}></MenuButton>
        <MenuButton nombre='Guardados' icono={faSave}></MenuButton>
        <MenuButton nombre='Configuracion' icono={faGear}></MenuButton>
        <MenuButton nombre='Notificaciones' icono={faBell}></MenuButton>
        <br></br> 
       
        <br></br>   
        <MenuButton nombre='Salir' icono={faRightFromBracket} onclick={logout}></MenuButton>
      </div>

      <div className='interfaz'>
         <div className='cabecera'>
          <SearchInput icono={faSearch}></SearchInput>
         </div>
         <div className='cuerpo'>
          
         </div>

      </div>
    </div>
  );

}

export default Pages