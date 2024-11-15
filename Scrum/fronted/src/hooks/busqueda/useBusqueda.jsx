import { useState } from 'react';

const useBusqueda = () => {
  const [busqueda, setBusqueda] = useState('');
  return { busqueda, setBusqueda };
};

export default useBusqueda;