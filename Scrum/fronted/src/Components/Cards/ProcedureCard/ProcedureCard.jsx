import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "lodash";

function ProcedureCard({ onDelete, procedure }) {
  // Envuelve la función `onDelete` con `debounce` para que se dispare solo una vez cada cierto tiempo
  const handleDelete = debounce(onDelete, 300); // Ajusta el tiempo del debounce según tus necesidades

  return (
    <div className="container-saved">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
          paddingLeft: "10px",
        }}
      >
        <div
          className="checks-buttons"
          style={{ "--icon-color": "red" }}
          onClick={handleDelete} // Usa la función debounced aquí
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <p>{procedure}.</p>
      </div>
    </div>
  );
}

export default ProcedureCard;
