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
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Place from "@mui/icons-material/Place";
function PopInsert ({activar, setActivar}){
  return(
    <PopUp trigger={activar} setTrigger={setActivar}>
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>Insertar Institucion</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Place className={styles.icon} />
          <Typography className={styles.subtitle} variant="h6">
                  Institucion
          </Typography>
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
            <Typography className={styles.subtitle} variant="h6">
                Direccion
            </Typography>


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
        </div>
      </PopUp>
  )
}

export default PopInsert