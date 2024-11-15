import React, { createContext, useState, useEffect } from "react";

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState(
    localStorage.getItem("fontFamily") || "Inika"
  );

  useEffect(() => {
    // const storedFont = localStorage.getItem('fontFamily');
    // console.log(`Inicializando FontContext. Fuente en localStorage: ${storedFont}, Fuente actual: ${fontFamily}`);

    // Aplica la fuente al cargar el contexto
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  const changeFontFamily = (newFont) => {
    console.log(`Cambiando fuente. Anterior: ${fontFamily}, Nueva: ${newFont}`);
    setFontFamily(newFont);
    localStorage.setItem("fontFamily", newFont);
  };

  return (
    <FontContext.Provider value={{ fontFamily, changeFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};
