import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useToken from '@hooks/useToken'
import Login from '../Login/Login';
import Registro from '../Registro/Registro';
import Pages from './Pages';
import { useState, useEffect } from 'react';
const Indice = () => {
  const [pi, setPi] = useState(localStorage.getItem('pi') || "");
  const { token } = useToken() 

  useEffect(() => {
    localStorage.setItem('pi', pi); // Actualiza el valor de pi en el localStorage cuando cambia
  }, [pi]);

    // Función para actualizar el valor de pi
    const actualizarPi = (nuevoPi, lugar) => {
      //console.log("me actualizaron desde ", lugar)
      //console.log("pi antes:", pi)
      setPi(nuevoPi)
    };

    //console.log("pi despues:", pi, "susurro: debería ser: 12345")



  return (
    <Router>
      <Routes>
        {token ? (
          <Route path="*" element={<Pages pi={pi}/>} />
        ) : ( 
          <>
            <Route path="/" element={<Login setPi={actualizarPi} />} />
            <Route path="/register" element={<Registro />} />
          </>
        )}
      </Routes>
    </Router>


  );
}

export default Indice