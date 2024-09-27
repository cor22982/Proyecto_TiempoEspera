import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from '@components/UI/AnimatedLogo'; // Importa el componente Logo
import { TokenProvider } from '@hooks/useToken'
import Indice from './Pages/Indice';

function App() {
  const [showLogo, setShowLogo] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
      <TokenProvider>
          <div className="app-container">
            {showLogo && <Logo />} {/* Muestra el logo solo si showLogo es true */}
            {!showLogo && (
              <Indice></Indice>
            )}
          </div>
        
      </TokenProvider>
  );
}

export default App;
