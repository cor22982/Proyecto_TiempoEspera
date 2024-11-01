import React, { useState, useEffect } from "react";
import PopUp from "@components/Modals/MessagePopUp";
import Swal from "sweetalert2";
import useApi from "@hooks/api/useApi";
import { Button, TextField, CircularProgress } from "@mui/material";
import styles from "../../../Pages/User/Configuration/configuration.module.css";
import ListDisplay from "../../UI/ListDisplay/ListDisplay";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import InputHolder from "@components/Inputs/InputHolder/InputHolder";
import IconButton from "@components/Buttons/IconButton/IconButton";
import Checkbox from "@components/Buttons/Checkbox";
import CustomTextField from "@components/Inputs/TextFieldUI/TextFieldUI";
import "./PopUpInsertTramite.css";

function PopUpInsertTramite({ activar, setActivar }) {
  const [stepList, setStepList] = useState([]);
  const [stepInput, setStepInput] = useState("");
  const { llamadowithoutbody } = useApi(
    `https://deimoss.web05.lol/institutions`
  );
  const [inst, setInst] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await llamadowithoutbody("GET");
      setInst(response);
    };
    getUsers();
  }, [llamadowithoutbody]);

  // Function to send data to the server
  const press = async () => {
    setLoading(true);
    try {
      const newProcedure = {
        name,
        description,
        steps: stepList,
        url,
        institutions: selectedInstitutions,
      };

      const response = await fetch("https://deimoss.web05.lol/newProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProcedure),
      });

      if (response.ok) {
        Swal.fire(
          "Success",
          "The procedure has been added successfully!",
          "success"
        );
        setActivar(false);
      } else {
        Swal.fire("Error", "Failed to add the procedure", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStep = () => {
    if (stepInput.trim()) {
      setStepList([...stepList, stepInput.trim()]);
      setStepInput("");
    }
  };

  const handleInstitutionChange = (id) => {
    setSelectedInstitutions((prev) =>
      prev.includes(id) ? prev.filter((instId) => instId !== id) : [...prev, id]
    );
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
        <h1 className="titulo-info">Insertar Tramite</h1>

        {/* Wrapper with margin for spacing */}
        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Nombre Tramite"
            fullWidth
            placeholder="Ingresa el nombre del tramite"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Descripcion"
            fullWidth
            placeholder="Ingresa la descripcion del tramite"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <h4 className="titulo-info">Pasos</h4>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <InputHolder
            value={stepInput}
            onChange={(value) => setStepInput(value)}
          />
          <IconButton icono={faPlus} onclick={handleAddStep} />
          <ListDisplay items={stepList} />
        </div>

        <br />
        <h4 className="titulo-info">Instituciones</h4>
        <div className="lista_inst">
          {inst.map((req) => (
            <Checkbox
              key={req.id_institutions}
              name={req.name}
              id={req.id_institutions}
              onChange={() => handleInstitutionChange(req.id_institutions)}
            />
          ))}
        </div>

        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <CustomTextField
            type="text"
            label="Url"
            fullWidth
            placeholder="Ingresa el link del tramite"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            className={styles.saveButton}
            variant="contained"
            sx={{ fontSize: "inherit" }}
            onClick={press}
          >
            Ingresar Tramite
          </Button>
        )}
      </div>
    </PopUp>
  );
}

export default PopUpInsertTramite;
