import React, { createContext, useState, useEffect } from 'react';

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('Inika');

  useEffect(() => {
    const storedFont = localStorage.getItem('fontFamily');
    if (storedFont) {
      console.log(`Cargando familia de fuentes desde localStorage: ${storedFont}`);
      setFontFamily(storedFont);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fontFamily', fontFamily);
  }, [fontFamily]);

  const changeFontFamily = (newFont) => {
    console.log(`Familia de fuentes cambiada a: ${newFont}`);
    setFontFamily(newFont);
  };

  return (
    <FontContext.Provider value={{ fontFamily, changeFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};
