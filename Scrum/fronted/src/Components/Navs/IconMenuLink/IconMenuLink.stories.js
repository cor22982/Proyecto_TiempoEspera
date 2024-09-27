import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import MenuButton from './IconMenuLink';

export default {
  component: MenuButton,
};

// Historia para el botón de "Home"
export const MenuButtonHome = {
  args: {
    nombre: 'Home',
    goto: '/',
    icono: faHome,
    isInStorybook: true, // Añadir esta prop para evitar el uso de rutas
  }
};

// Historia para el botón de "User"
export const MenuButtonUser = {
  args: {
    nombre: 'Cuenta',
    goto: '/cuenta',
    icono: faUser,
    isInStorybook: true,
  }
};

// Historia para el botón de "Settings"
export const MenuButtonSettings = {
  args: {
    nombre: 'Configuración',
    goto: '/configuracion',
    icono: faCog,
    isInStorybook: true,
  }
};
