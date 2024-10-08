import SideBar from "./SideBar";
import { action } from '@storybook/addon-actions';

export default {
  component: SideBar,
  title: 'Components/SideBar',
  argTypes: {
    sidebarOpen: { control: 'boolean' }, // Controlador booleano para modificar el estado desde la UI
  },
};

export const SideBarDefault = {
  args: {
    sidebarOpen: true, // Estado inicial
    setSidebarOpen: action('setSidebarOpen'), // Acción que simula la función
  },
};
