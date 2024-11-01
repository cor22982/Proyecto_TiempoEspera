import React, { useState } from "react";
import PopUp from "@components/Modals/MessagePopUp";
import Swal from "sweetalert2";
import useApi from '@hooks/api/useApi';
import { useEffect } from "react";
import {
  Button,
  TextField,
} from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
import ListDisplay from "../../UI/ListDisplay/ListDisplay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputHolder from "@components/Inputs/InputHolder/InputHolder";
import IconButton from "@components/Buttons/IconButton/IconButton";
import Checkbox from "@components/Buttons/Checkbox";
import './PopUpInsertTramite.css'
function PopUpInsertTramite({ activar, setActivar }) {
  const [stepList, setStepList] = useState([]); // Lista de pasos
  const [stepInput, setStepInput] = useState(""); // Valor del input
  const {  llamadowithoutbody } = useApi(`https://deimoss.web05.lol/institutions`);
  const [inst, setInst] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await llamadowithoutbody('GET');
      setInst(response)
    };
    getUsers();
  }, [llamadowithoutbody]);

  // Función para agregar el paso a la lista
  const handleAddStep = () => {
    if (stepInput.trim()) { // Verifica si el input no está vacío
      setStepList([...stepList, stepInput.trim()]); // Agrega el paso a la lista
      setStepInput(""); // Limpia el input
    }
  };

  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1 className="titulo-info">Insertar Tramite</h1>
        <TextField
          type="text"
          label="Nombre Tramite"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Ingresa el nombre del tramite"
        />

        <TextField
          type="text"
          label="Descripcion"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Ingresa la descripcion del tramite"
        />

        <h4 className="titulo-info">Pasos</h4>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <InputHolder
            value={stepInput}
            onChange={(value) => setStepInput(value)}
          />
          <IconButton icono={faPlus} onclick={handleAddStep} />
          <ListDisplay items={stepList} />
        </div>
        <br></br>
        <h4 className="titulo-info">Instituciones</h4>
        <div className="lista_inst">
        {inst.map((req, index) => (
          <Checkbox key={index} name={req.name} />
          ))}
        </div>
        <TextField
          type="text"
          label="Url"
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Ingresa el link del tramite"
        />
        <Button
          className={styles.saveButton}
          variant="contained"
          sx={{ fontSize: "inherit" }}
        >
          Ingresar Tramite
        </Button>
      </div>
    </PopUp>
  );
}

export default PopUpInsertTramite;
