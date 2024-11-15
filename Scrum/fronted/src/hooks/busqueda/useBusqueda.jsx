import React, { createContext, useState, useContext } from 'react';

const BusquedaContext = createContext();

export const useBusqueda = () => {
  return useContext(BusquedaContext);
};

export const BusquedaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("");
  
  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
};
