import React from 'react'
import PopUp from "@components/Modals/MessagePopUp";
import {
  TextField, 
  CircularProgress,
  Button
} from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
function PopInsertColab({activar, setActivar}) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="titulo-info">Agregar Colaborador</h1>
      <TextField
          type="text"
          label="Colaborador"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Ingresa el DPI del colaborador"
          value={name}
          
        />
        <Button
            className={styles.saveButton}
            variant="contained"
            sx={{ fontSize: "inherit" }}
  
          >
            Agregar Colaborador
          </Button>
      </div>
      
    </PopUp>
  )
}

export default PopInsertColab