import PopUp from "@components/Modals/MessagePopUp";
import CustomTextField from "@components/Inputs/TextFieldUi/TextFieldUi";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
import Close from "@mui/icons-material/Close";
import House from "@mui/icons-material/House";
import Place from "@mui/icons-material/Place";

function PopInsert({ activar, setActivar }) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="titulo-info">Insertar Institucion</h1>

        {/* Wrapper with margin for spacing */}
        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Nombre Institucion"
            fullWidth
            placeholder="Ingresa el nombre de la institucion"
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Direccion"
            fullWidth
            placeholder="Ingresa la direccion"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <CustomTextField
            type="time"
            label="Hora Apertura"
            fullWidth
            placeholder="Ingresa la Hora de Apertura"
          />
          <CustomTextField
            type="time"
            label="Hora Cierre"
            fullWidth
            placeholder="Ingresa la Hora de Cierre"
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="number"
            label="Telefono"
            fullWidth
            placeholder="Ingresa el telefono"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "2rem",
            marginBottom: "1rem",
          }}
        >
          <CustomTextField
            type="text"
            label="Latitud"
            fullWidth
            placeholder="Ingresa la Latitud"
          />
          <CustomTextField
            type="text"
            label="Longitud"
            fullWidth
            placeholder="Ingresa la Longitud"
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Imagen"
            fullWidth
            placeholder="Ingresa el link de la imagen"
          />
        </div>

        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
        >
          Ingresar Institucion
        </Button>
      </div>
    </PopUp>
  );
}

export default PopInsert;
