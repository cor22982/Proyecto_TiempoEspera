import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";
import CustomTextField from "@components/Inputs/TextFieldUI/TextFieldUI";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";

import useApi from "@hooks/api/useApi";
import { useEffect, useState } from "react";

function PopInsert({ activar, setActivar }) {
  const { llamado } = useApi(`https://deimoss.web05.lol/institution_add`);
  const [datos, setDatos] = useState({
    name: "",
    adress: "",
    hora_apertura: "",
    hora_cierre: "",
    telefono: "",
    imagen: "",
    latitud: "",
    longitud: "",
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

      const response = await llamado(body, "POST");

      // Verifica si la respuesta indica éxito
      if (response && response.succes) {
        Swal.fire({
          title: "Éxito",
          text: "Institución ingresada correctamente.",
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
          "No se pudo ingresar la institución. Intenta nuevamente.",
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
        <h1 className="titulo-info">Insertar Institucion</h1>

        {/* Wrapper with margin for spacing */}
        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Nombre Institucion"
            fullWidth
            placeholder="Ingresa el nombre de la institucion"
            onChange={(e) => setValue("name", e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Direccion"
            fullWidth
            placeholder="Ingresa la direccion"
            onChange={(e) => setValue("adress", e.target.value)}
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
            onChange={(e) => setValue("hora_apertura", e.target.value)}
          />
          <CustomTextField
            type="time"
            label="Hora Cierre"
            fullWidth
            placeholder="Ingresa la Hora de Cierre"
            onChange={(e) => setValue("hora_cierre", e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="number"
            label="Telefono"
            fullWidth
            placeholder="Ingresa el telefono"
            onChange={(e) => setValue("telefono", e.target.value)}
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
            onChange={(e) => setValue("latitud", e.target.value)}
          />
          <CustomTextField
            type="text"
            label="Longitud"
            fullWidth
            placeholder="Ingresa la Longitud"
            onChange={(e) => setValue("longitud", e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Imagen"
            fullWidth
            placeholder="Ingresa el link de la imagen"
            onChange={(e) => setValue("imagen", e.target.value)}
          />
        </div>

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
  );
}

export default PopInsert;
