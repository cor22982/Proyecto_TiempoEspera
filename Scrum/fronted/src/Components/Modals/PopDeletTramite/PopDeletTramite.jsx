import React from "react";
import PopUp from "@components/Modals/MessagePopUp/MessagePopUp";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function PopDeletTramite({ activar, setActivar, id }) {
  return (
    <PopUp trigger={activar} setTrigger={setActivar}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="titulo-info">Se elimino el tramite con Exito</h2>
        <p
          className="titulo-info"
          style={{ fontSize: "20px", display: "flex" }}
        >
          Acaba de eliminar al tramite {id} en la base de datos
        </p>
        <div style={{ color: "red", fontSize: "30px" }}>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>
    </PopUp>
  );
}

export default PopDeletTramite;
