import IconButton from './IconButton';
import { faCoffee, faUser, faBell } from '@fortawesome/free-solid-svg-icons';

export default {
  component: IconButton,
};

export const IconButtonDefault = {
  args: {
    icono: faCoffee,
    color: '#000000',
    onclick: () => alert('Icon Button Clicked!'),
  },
};

export const IconButtonWithUserIcon = {
  args: {
    icono: faUser,
    color: '#FF5733',
    onclick: () => alert('User Icon Button Clicked!'),
  },
};

export const IconButtonWithBellIcon = {
  args: {
    icono: faBell,
    color: '#28A745',
    onclick: () => alert('Bell Icon Button Clicked!'),
  },
};
