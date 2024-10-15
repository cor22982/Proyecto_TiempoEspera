import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Inika');

    // Cargar las configuraciones guardadas en localStorage
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedFontSize = parseInt(localStorage.getItem('fontSize')) || 16;
        const savedFontFamily = localStorage.getItem('fontFamily') || 'Inika';
        
        setDarkMode(savedDarkMode);
        setFontSize(savedFontSize);
        setFontFamily(savedFontFamily);
    }, []);

    // Guardar las configuraciones en localStorage
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('fontFamily', fontFamily);
    }, [darkMode, fontSize, fontFamily]);

    return (
        <ConfigContext.Provider
            value={{
                darkMode,
                setDarkMode,
                fontSize,
                setFontSize,
                fontFamily,
                setFontFamily,
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
};
