import React, { createContext, useState, useEffect } from 'react';

export const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(Number(localStorage.getItem('fontSize')) || 16);

  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize');
    console.log(`Inicializando FontSizeContext. Tamaño de fuente en localStorage: ${storedFontSize}, Tamaño actual: ${fontSize}`);
    
    // Aplica el tamaño de fuente al cargar el contexto
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const changeFontSize = (newSize) => {
    console.log(`Cambiando tamaño de fuente. Anterior: ${fontSize}, Nueva: ${newSize}`);
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, changeFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
