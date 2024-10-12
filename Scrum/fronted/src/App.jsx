import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from '@components/UI/AnimatedLogo'; // Importa el componente Logo
import { TokenProvider } from '@hooks/auth/useToken';
import Indice from '@pages/AppRouter';
import OneSignal from 'react-onesignal'; // Importa OneSignal

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      OneSignal.init({
        appId: '0b7d4e8e-e5ad-4eec-8bda-63563d2dd47a', // Reemplaza con tu appId real
        notifyButton: {
          enable: true,
        },
        serviceWorkerParam: {
          scope: '/',
          path: '/OneSignalSDKWorker.js', // Especifica la ruta de tu Service Worker aquí
        },
        // allowLocalhostAsSecureOrigin: true // Descomentar para pruebas en localhost
      });
    }
  }, []);

  return (
    <TokenProvider>
      <div className="app-container">
        {showLogo && <Logo />} {/* Muestra el logo solo si showLogo es true */}
        {!showLogo && <Indice />}
      </div>
    </TokenProvider>
  );
}

export default App;
