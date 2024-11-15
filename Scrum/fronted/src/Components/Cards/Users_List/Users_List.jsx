import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ImageDefault from "@assets/default_profile.jpg";

function Users_List({ onDelete, name_user, dpi_user, imagen_src }) {
  const validImage = imagen_src || ImageDefault;

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
          onClick={onDelete}
          role="button"
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className="image-container-user">
          <img
            src={validImage}
            alt="User profile"
            onError={(e) => (e.target.src = ImageDefault)}
          />
        </div>
        <p>DPI: {dpi_user}.</p>
        <p>Nombre: {name_user}</p>
      </div>
    </div>
  );
}

export default Users_List;
