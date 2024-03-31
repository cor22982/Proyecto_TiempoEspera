import './App.css'
import React, { useState, useEffect } from 'react';
import Logo from './Logo'
import Login from './Login'
import Registro from './Registro/Registro'

function App() {
  const [mostrarComponente1, setMostrarComponente1] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarComponente1(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    <div>
      {mostrarComponente1 ? <Logo /> : <Login />}
    </div>
    </>
  );
}

export default App
