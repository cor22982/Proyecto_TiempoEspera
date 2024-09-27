import PopUp from './MessagePopUp';

export default {
  component: PopUp,
};

export const DefaultPopUp = {
    args: {
      trigger: true,
      setTrigger: () => {},
      children: 'Contenido básico del Pop-up',
    },
  };
  
