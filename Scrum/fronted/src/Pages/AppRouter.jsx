import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from '@hooks/auth/useToken'
import Login from '@pages/auth/Login/Login';
import Registro from '@pages/Auth/SignUp/SignUp';
import Pages from '@pages/Home/HomeRoutes/HomeRoutes';
import { parseJwt } from '@hooks/auth/useToken';

const Indice = () => {
  const { token } = useToken();

  let dpi;
  if (token) {
    const decodedToken = parseJwt(token);
    dpi = decodedToken.dpi;

    //console.log("mi token es:", token);
    //console.log("mi dpi desde token es:", dpi);
  }

  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="*" element={<Pages pi={dpi}/>} />
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