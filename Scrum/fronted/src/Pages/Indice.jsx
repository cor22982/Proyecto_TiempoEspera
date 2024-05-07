import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from '@hooks/useToken'
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Pages from './Pages';
const Indice = () => {
  const { token } = useToken() 
  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="*" element={<Pages />} />
        ) : ( 
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registro />} />
          </>
        )}
      </Routes>
    </Router>


  );
}

export default Indice