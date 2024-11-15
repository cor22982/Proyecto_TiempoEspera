import React, { useState } from 'react';
import './Forgot_Psw.css';
import CustomTextField from "@components/Inputs/TextFieldUI/TextFieldUI";
import styles from "../../User/Configuration/configuration.module.css";
import Swal from "sweetalert2";
import useApi from '@hooks/api/useApi';
import Spinner from '@components/UI/Spinner/Spinner';
import { Button } from "@mui/material";

function Forgot_Psw() {
  const { llamado: confirmarCambioPassword } = useApi(`https://deimoss.web05.lol/confirmPasswordChange`);
  const { llamado: passwordRequest } = useApi(`https://deimoss.web05.lol/passwordRequest`);
  const [datos, setDatos] = useState({ pi: "" });
  const [datos2, setDatos2] = useState({ password: "", otp: "" });
  const [loading, setLoading] = useState(false); // Estado de carga
  const [loading2, setLoading2] = useState(false); // Estado de carga
  const [changed, setChanged] = useState(false); 

  const setValue = (name, value) => {
    setDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const setValue2 = (name, value) => {
    setDatos2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const requestPassw = async () => {
    setLoading(true); // Activar el estado de carga
    try {
      const body = { pi: datos.pi };
      const response = await passwordRequest(body, 'POST');
      
      if (response && response.succes) {
        setChanged(true)
        Swal.fire({
          title: 'Éxito',
          text: 'Se mandó un código de verificación a su correo. Ingréselo en el campo para cambiar la contraseña.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        throw new Error(`Error al solicitar código de acceso ${response.message}`);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo hacer el request',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };


  const ChangedPasw= async () => {
    setLoading2(true); // Activar el estado de carga
    try {
      const body = { pi: datos.pi, 
                    password:datos2.password,
                    otp:datos2.otp };
      const response = await confirmarCambioPassword(body, 'POST');
      
      console.log(body)
      if (response && response.success) {
        Swal.fire({
          title: 'Éxito',
          text: 'Se cambió la contraseña con éxito',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          setTimeout(() => {
            window.location.reload(); // Recarga la página después de 2 segundos
          }, 1000); // Retraso de 2 segundos
        });
      } else {
        throw new Error(`Error al cambiar contraseña ${response.message}`);
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo cambiar la contraseña',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading2(false); // Desactivar el estado de carga
    }
  };



  return (
    <div className='forgot-pas-back'>
      {changed ? ( // Muestra el spinner si está cargando
       <div className="">
        <div className="titule">Cambiar Contraseña</div>
        <CustomTextField
          label="Nueva Contraseña"
          onChange={(e) => setValue2('password', e.target.value)}
          fullWidth
          type="password"
          margin="normal"
          placeholder="Ingrese su nueva contraseña"
        />
        <br></br>
        <br></br>

        <CustomTextField
          label="Codigo Verificacion"
          onChange={(e) => setValue2('otp', e.target.value)}
          fullWidth
          type="text"
          margin="normal"
          placeholder="Ingrese su codigo de verificacion"
        />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
          onClick={ChangedPasw}
          disabled={loading2} // Desactivar botón mientras está en carga
      >
        {loading2 ? <Spinner /> : "Cambiar Contraseña"} {/* Mostrar spinner o texto */}
      </Button>
       </div>
      ) : (
    <div className="">
      <div className="titule">Solicitar cambio Contraseña</div>
      <CustomTextField
        label="DPI"
        onChange={(e) => setValue('pi', e.target.value)}
        fullWidth
        margin="normal"
        placeholder="Ingrese su DPI"
      />
      <Button
        className={styles.saveButton}
        variant="contained"
        sx={{ fontSize: "inherit" }}
        onClick={requestPassw}
        disabled={loading} // Desactivar botón mientras está en carga
      >
        {loading ? <Spinner /> : "Solicitar cambio"} {/* Mostrar spinner o texto */}
      </Button>
    </div>
        
      )}
      </div>
  )
}

export default Forgot_Psw;
