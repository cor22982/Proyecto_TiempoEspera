import PopUp from "@components/Modals/MessagePopUp";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
import useApi from '@hooks/api/useApi';
function PopInsert ({activar, setActivar}){
  const { llamado } = useApi(`https://deimoss.web05.lol/institution_add`);
  const [datos, setDatos] = useState({
    name: "",
    adress: "",
    hora_apertura: "",
    hora_cierre: "",
    telefono: "",
    imagen: "",
    latitud: "",
    longitud: ""
  });

  const setValue = (name, value) => {
    setDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const insertInstitution = async () => {
    try {
      const body = {
        name: datos.name,
        adress: datos.adress,
        hora_apertura: datos.hora_apertura,
        hora_cierre: datos.hora_cierre,
        telefono: datos.telefono,
        Imagen: datos.imagen,
        latitud: datos.latitud,
        longitud: datos.longitud,
      };
  
      const response = await llamado(body, 'POST');
  
      // Verifica si la respuesta indica éxito
      if (response && response.succes) {
        Swal.fire({
          title: 'Éxito',
          text: 'Institución ingresada correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setActivar(false); // Cerrar el popup después de insertar
      } else {
        // Si no se ingresó correctamente, lanza un error
        throw new Error('Error al insertar la institución');
      }
    } catch (error) {
      console.error('Error al insertar la institución:', error); // Imprime más información del error
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudo ingresar la institución. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  
  

  return(
    <PopUp trigger={activar} setTrigger={setActivar}>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1 className="titulo-info">Insertar Institucion</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>
        
        </div>
        
        <TextField
              type="text"
              label="Nombre Institucion"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('name', e.target.value)}
              placeholder="Ingresa el nombre de la institucion"
            />

          <div style={{display: 'flex', flexDirection: 'row'}}>
          
          </div>
       
            <TextField
              type="text"
              label="Direccion"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('adress', e.target.value)}
              placeholder="Ingresa la direccion"
            />
          
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '2rem'}}>
            <TextField
              type="time"
              label="Hora Apertura"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('hora_apertura', e.target.value)}
              placeholder="Ingresa la Hora de Apertura"
            />
            <TextField
              type="time"
              label="Hora Cierre"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('hora_cierre', e.target.value)}
              placeholder="Ingresa la Hora de Apertura"
            />
          </div>
          <TextField
              type="number"
              label="Telefono"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('telefono', e.target.value)}
              placeholder="Ingresa el telefono"
            />
          
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '2rem'}}>
            <TextField
              type="text"
              label="Latitud"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('latitud', e.target.value)}
              placeholder="Ingresa la Latidud"
            />
            <TextField
              type="text"
              label="Longitud"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('longitud', e.target.value)}
              placeholder="Ingresa la Longitud"
            /></div>
        <TextField 
              type="text"
              label="Imagen"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              InputLabelProps={{
                style: { fontFamily: "inherit", fontSize: "inherit" },
              }}
              onChange={(e) => setValue('imagen', e.target.value)}
              placeholder="Ingresa el link de la imagen"
            />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
          onClick={insertInstitution}
        >
          Ingresar Institucion
        </Button>
        </div>
      </PopUp>
  )
}

export default PopInsert