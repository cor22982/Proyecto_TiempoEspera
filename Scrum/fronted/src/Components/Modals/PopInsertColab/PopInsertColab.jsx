import React, { useState } from "react";
import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";
import CustomTextField from "@components/Inputs/TextFieldUI/TextFieldUI";
import Swal from "sweetalert2";
import useToken from "@hooks/auth/useToken";
import { parseJwt } from "@hooks/auth/useToken";
import { TextField, CircularProgress, Button } from "@mui/material";
import useApi from "@hooks/api/useApi";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
function PopInsertColab({ activar, setActivar }) {
  const [colab, setColab] = useState("");
  const { llamado } = useApi(`https://deimoss.web05.lol/create_new_relation`);
  const { token } = useToken();
  const dpi = parseJwt(token).dpi;

  const insertColaborator = async () => {
    try {
      const body = {
        empleador: dpi,
        usuario: colab,
      };

      const response = await llamado(body, "POST");
      console.log(response);
      // Verifica si la respuesta indica éxito
      if (response && response.message === "Relación creada") {
        Swal.fire({
          title: "Éxito",
          text: "Colaborador agregado correctamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setActivar(false); // Cerrar el popup después de insertar
      } else {
        // Si no se ingresó correctamente, lanza un error
        throw new Error("Error al insertar la institución");
      }
    } catch (error) {
      console.error("Error al insertar la institución:", error); // Imprime más información del error
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "No se pudo agregar al colaborador. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 className="titulo-info">Agregar Colaborador</h1>
        <CustomTextField
          type="text"
          label="Colaborador"
          fullWidth
          placeholder="Ingresa el DPI del colaborador"
          onChange={(e) => setColab(e.target.value)}
        />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
          onClick={insertColaborator}
        >
          Agregar Colaborador
        </Button>
      </div>
    </PopUp>
  );
}

export default PopInsertColab;
