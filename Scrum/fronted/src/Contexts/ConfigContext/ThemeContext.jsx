import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    const initialMode = savedTheme ? JSON.parse(savedTheme) : false;
    console.log(
      `Inicializando ThemeContext. Modo en localStorage: ${savedTheme}, Modo inicial: ${
        initialMode ? "Oscuro" : "Claro"
      }`
    );
    return initialMode;
  });

  const toggleDarkMode = () => {
    console.log(
      `Cambiando modo. Anterior: ${isDarkMode ? "Oscuro" : "Claro"}, Nuevo: ${
        !isDarkMode ? "Oscuro" : "Claro"
      }`
    );
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    console.log(
      `Aplicando modo de tema. Modo actual: ${isDarkMode ? "Oscuro" : "Claro"}`
    );
    if (isDarkMode) {
      document.body.classList.add("darkMode");
    } else {
      document.body.classList.remove("darkMode");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
