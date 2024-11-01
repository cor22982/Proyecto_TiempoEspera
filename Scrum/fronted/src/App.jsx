// app.jsx

import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Logo from "@components/UI/AnimatedLogo";
import { TokenProvider } from "@hooks/auth/useToken";
import Indice from "@pages/AppRouter";
import OneSignal from "react-onesignal";
import {
  ThemeProvider,
  ThemeContext,
} from "@contexts/ConfigContext/ThemeContext";
import { FontProvider } from "@contexts/ConfigContext/FontContext";
import { FontSizeProvider } from "@contexts/ConfigContext/FontSizeContext";
import "@styles/colors.css";

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.OneSignalInitialized) {
      OneSignal.init({
        appId: "0b7d4e8e-e5ad-4eec-8bda-63563d2dd47a",
        notifyButton: { enable: true },
        serviceWorkerParam: { scope: "/", path: "/OneSignalSDKWorker.js" },
      });
      window.OneSignalInitialized = true;
    }
  }, []);

  return (
    <TokenProvider>
      <ThemeProvider>
        <FontProvider>
          <FontSizeProvider>
            <ThemedApp showLogo={showLogo} />
          </FontSizeProvider>
        </FontProvider>
      </ThemeProvider>
    </TokenProvider>
  );
}

// Subcomponente para aplicar el tema
const ThemedApp = ({ showLogo }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Asegurarnos de que la clase darkMode se aplique o elimine correctamente
  useEffect(() => {
    document.body.classList.toggle("darkMode", isDarkMode);
  }, [isDarkMode]); // Aquí controlamos el modo oscuro en toda la aplicación

  return (
    <div className="app-container">{showLogo ? <Logo /> : <Indice />}</div>
  );
};

export default App;
