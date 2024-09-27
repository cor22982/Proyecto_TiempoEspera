import Dropdowncustom from "./Dropdowncustom";

export default {
  title: 'Components/Dropdowncustom',
  component: Dropdowncustom,
  argTypes: {
    nombre: { control: 'text', description: 'Texto del botón de dropdown' },
    lista: { control: 'array', description: 'Lista de elementos dentro del dropdown' },
    onChange: { action: 'onChange', description: 'Función llamada al seleccionar un item' },
  },
};

// Historia predeterminada
export const DropdowncustomDefault = {
  args: {
    nombre: 'Menu Drop',
    lista: ['Item 1', 'Item 2', 'Item 3'],
  },
};

// Historia con una lista de números
export const DropdowncustomNumerical = {
  args: {
    nombre: 'Numerical Menu',
    lista: [1, 2, 3, 4, 5],
  },
};

// Historia con una lista de elementos largos
export const DropdowncustomLongItems = {
  args: {
    nombre: 'Long Items Menu',
    lista: [
      'This is a long item 1',
      'This is a long item 2',
      'This is a long item 3',
    ],
  },
};

// Historia con diferentes elementos
export const DropdowncustomDifferentItems = {
  args: {
    nombre: 'Custom Items Menu',
    lista: ['First', 'Second', 'Third', 'Fourth'],
  },
};
