import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from '@hooks/useToken';
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Pages from './Pages';
import { parseJwt } from '@hooks/useToken';
import { useLocation } from 'react-router-dom';

const MainContent = () => {
  const location = useLocation();
  const { state } = location;

  return state?.from === 'register' ? <Registro /> : <Login />;
};

const Indice = () => {
  const { token } = useToken();

  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;
  }

  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="*" element={<Pages pi={dpi} />} />
        ) : (
          <Route path="/" element={<MainContent />} />
        )}
      </Routes>
    </Router>
  );
};

export default Indice;
