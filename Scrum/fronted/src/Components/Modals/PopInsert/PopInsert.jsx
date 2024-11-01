import PopUp from "@components/Modals/MessagePopUp";
import Swal from "sweetalert2";
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
import Close from "@mui/icons-material/Close";
import House from "@mui/icons-material/House";
import Place from "@mui/icons-material/Place";
function PopInsert ({activar, setActivar}){
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
              placeholder="Ingresa el link de la imagen"
            />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
        >
          Ingresar Institucion
        </Button>
        </div>
      </PopUp>
  )
}

export default PopInsert