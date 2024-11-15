import { useState } from 'react';
import useToken from '@hooks/auth/useToken';
import Login from '@pages/Auth/LogIn/LogIn';
import Registro from '@pages/Auth/SignUp/SignUp';
import Pages from '@pages/Home/HomeRoutes/HomeRoutes';
import Forgot_Psw from '@pages/Auth/Forgot_Psw/Forgot_Psw';
import { parseJwt } from '@hooks/auth/useToken';

const Indice = () => {
  const { token } = useToken();
  const [view, setView] = useState('login'); // Control the current view ('login', 'registro', 'pages', 'forgot_password')

  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;
  }

  const handleLogin = () => {
    setView('pages'); // Switch to Pages view after login
  };

  const handleRegistro = () => {
    setView('login'); // Switch back to Login after registration
  };

  const handleToggle = () => {
    setView(view === 'login' ? 'registro' : 'login'); // Toggle between Login and Register
  };

  const handleForgotPassword = () => {
    setView('forgot_password'); // Switch to Forgot Password view
  };

  // Render based on the current view
  if (token) {
    return <Pages pi={dpi} />;
  }

  return (
    <>
      {view === 'login' && (
        <Login onToggle={handleToggle} onLogin={handleLogin} onForgotPassword={handleForgotPassword} />
      )}
      {view === 'registro' && <Registro onToggle={handleToggle} onRegistro={handleRegistro} />}
      {view === 'forgot_password' && <Forgot_Psw />}
    </>
  );
};

export default Indice;
