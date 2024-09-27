import TextMenuLink from './TextMenuLink';

export default {
  component: TextMenuLink,
};

// Historia para la opción del menú "Home"
export const MenuOptionHome = {
  args: {
    nombre: 'Información',
    goto: '/informacion',
    isInStorybook: true, // Pasar esta prop para evitar el uso de <Link>
  }
};

// Historia para la opción del menú "Perfil de Usuario"
export const MenuOptionUser = {
  args: {
    nombre: 'Comentarios',
    goto: '/comentarios',
    isInStorybook: true, // Mismo enfoque
  }
};

// Historia para la opción del menú "Configuración"
export const MenuOptionSettings = {
  args: {
    nombre: 'Requisitos',
    goto: '/requisitos',
    isInStorybook: true,
  }
};
