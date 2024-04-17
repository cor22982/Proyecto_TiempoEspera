import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Registro from './Registro/Registro';
import LoginContext from './LoginContex/LoginContext';
import Logo from '@components/Logo'; // Importa el componente Logo
function App() {
  const [showLogo, setShowLogo] = useState(true);
  const [loggedin, setLoggedIn] = useState(localStorage.getItem('loggedin') === 'true');

  useEffect(() => {
    localStorage.setItem('loggedin', loggedin);
  }, [loggedin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ loggedin, setLoggedIn }}>
      <Router>
        <div className="app-container">
          {showLogo && <Logo />} {/* Muestra el logo solo si showLogo es true */}
          {!showLogo && (
            <Routes>
              <Route path="/" element={loggedin ? <h1>HOME</h1> : <Login />} />
              <Route path="/register" element={loggedin ? <h1>HOME</h1> : <Registro />} />
            </Routes>
          )}
        </div>
      </Router>
    </LoginContext.Provider>
  );
}



export default App;
