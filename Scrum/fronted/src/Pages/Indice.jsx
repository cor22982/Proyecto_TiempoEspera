import { useState } from 'react';
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Pages from './Pages';
import useToken from '@hooks/useToken';
import { parseJwt } from '@hooks/useToken';

const Indice = () => {
  const { token } = useToken();
  const [view, setView] = useState('login'); // Controla la vista actual ('login', 'registro', 'pages')

  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;
  }

  const handleLogin = () => {
    setView('pages'); // Cambia a la vista de Pages después del login
  };

  const handleRegistro = () => {
    setView('login'); // Cambia a la vista de Login después de registrar
  };

  const handleToggle = () => {
    setView(view === 'login' ? 'registro' : 'login'); // Alterna entre Login y Registro
  };

  // Renderizado condicional de acuerdo a la vista actual
  if (token) {
    return <Pages pi={dpi} />;
  }

  return (
    <>
      {view === 'login' && <Login onToggle={handleToggle} onLogin={handleLogin} />}
      {view === 'registro' && <Registro onToggle={handleToggle} onRegistro={handleRegistro} />}
    </>
  );
};

export default Indice;
